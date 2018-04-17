<?php
function myProtect($link, $data) {
    /*$result = htmlspecialchars($data);*/
    return mysqli_real_escape_string($link, trim($data)); //Функция трим удаляет пробелы вначале и вконце данных
//Функция mysqli_real_escape_string делает безопасными эскейп-последовательности(точка с запятой, косая черта и т.д) и имеет параметры 1) Идентификатор подключения к бд 2) Сами данные в которых нужно найти ескейп символы и заменить их на безопасные
}


function myProtect_html($link, $data) {
    $result = htmlspecialchars($data);
    return mysqli_real_escape_string($link, trim($result)); //Функция трим удаляет пробелы вначале и вконце данных
//Функция mysqli_real_escape_string делает безопасными эскейп-последовательности(точка с запятой, косая черта и т.д) и имеет параметры 1) Идентификатор подключения к бд 2) Сами данные в которых нужно найти ескейп символы и заменить их на безопасные
}


function param() {
    if (isset($_GET['directions']) &&
        !empty($_GET['directions']) &&
        isset($_GET['summ']) &&
        !empty($_GET['summ']) &&
        isset($_GET['org']) &&
        !empty($_GET['org']))
    {
        switch($_GET['summ']) {
            case 1:
                $summ = "BETWEEN 0 AND 400000";
                break;
            case 2:
                $summ = "BETWEEN 401000 AND 750000";
                break;
            case 3:
                $summ = "BETWEEN 751000 AND 1250000";
                break;
            case 4:
                $summ = "BETWEEN 1251000 AND 2000000";
                break;
            case 5:
                $summ = "BETWEEN 2000000 AND 3750000";
                break;
            case 6:
                $summ = "> 3751000";
        }

        $sql = "and (id_directions like '%".$_GET['directions']."%') and (need_to_collect ".$summ.") and (org_prav_form = ".$_GET['org'].")";
        $allProjects = Project::getProjectsByParameters($sql);
    }
    else if(isset($_GET['directions']) &&
        !empty($_GET['directions']) &&
        isset($_GET['summ']) &&
        !empty($_GET['summ']) &&
        !isset($_GET['org']) &&
        empty($_GET['org']))
    {
        switch($_GET['summ']) {
            case 1:
                $summ = "BETWEEN 0 AND 400000";
                break;
            case 2:
                $summ = "BETWEEN 401000 AND 750000";
                break;
            case 3:
                $summ = "BETWEEN 751000 AND 1250000";
                break;
            case 4:
                $summ = "BETWEEN 1251000 AND 2000000";
                break;
            case 5:
                $summ = "BETWEEN 2000000 AND 3750000";
                break;
            case 6:
                $summ = "> 3751000";
        }

        $sql = "and (id_directions like '%".$_GET['directions']."%') and (need_to_collect ".$summ.")";
        $allProjects = Project::getProjectsByParameters($sql);
    }
    else if(isset($_GET['directions']) &&
        !empty($_GET['directions']) &&
        !isset($_GET['summ']) &&
        empty($_GET['summ']) &&
        isset($_GET['org']) &&
        !empty($_GET['org']))
    {
        $sql = "and (id_directions like '%".$_GET['directions']."%') and (org_prav_form = ".$_GET['org'].")";
        $allProjects = Project::getProjectsByParameters($sql);
    }
    else if(!isset($_GET['directions']) &&
        empty($_GET['directions']) &&
        isset($_GET['summ']) &&
        !empty($_GET['summ']) &&
        isset($_GET['org']) &&
        !empty($_GET['org']))
    {
        switch($_GET['summ']) {
            case 1:
                $summ = "BETWEEN 0 AND 400000";
                break;
            case 2:
                $summ = "BETWEEN 401000 AND 750000";
                break;
            case 3:
                $summ = "BETWEEN 751000 AND 1250000";
                break;
            case 4:
                $summ = "BETWEEN 1251000 AND 2000000";
                break;
            case 5:
                $summ = "BETWEEN 2000000 AND 3750000";
                break;
            case 6:
                $summ = "> 3751000";
        }
        $sql = "and (need_to_collect ".$summ.") and (org_prav_form = ".$_GET['org'].")";
        $allProjects = Project::getProjectsByParameters($sql);
    }
    else if(isset($_GET['directions']) &&
        !empty($_GET['directions']) &&
        !isset($_GET['summ']) &&
        empty($_GET['summ']) &&
        !isset($_GET['org']) &&
        empty($_GET['org']))
    {

        $sql = "and (id_directions like '%".$_GET['directions']."%')";
        $allProjects = Project::getProjectsByParameters($sql);
    }
    else if(!isset($_GET['directions']) &&
        empty($_GET['directions']) &&
        isset($_GET['summ']) &&
        !empty($_GET['summ']) &&
        !isset($_GET['org']) &&
        empty($_GET['org']))
    {
        switch($_GET['summ']) {
            case 1:
                $summ = "BETWEEN 0 AND 400000";
                break;
            case 2:
                $summ = "BETWEEN 401000 AND 750000";
                break;
            case 3:
                $summ = "BETWEEN 751000 AND 1250000";
                break;
            case 4:
                $summ = "BETWEEN 1251000 AND 2000000";
                break;
            case 5:
                $summ = "BETWEEN 2000000 AND 3750000";
                break;
            case 6:
                $summ = "> 3751000";
        }
        $sql = "and (need_to_collect ".$summ.")";
        $allProjects = Project::getProjectsByParameters($sql);
    }
    else if(!isset($_GET['directions']) && empty($_GET['directions']) && !isset($_GET['summ']) && empty($_GET['summ']) && isset($_GET['org']) && !empty($_GET['org']))
    {
        $sql = "and (org_prav_form = ".$_GET['org'].")";
        $allProjects = Project::getProjectsByParameters($sql);
    }
    else {
        $sql = "";
        $allProjects = Project::getAllProjects($sql);
    }
    return $sql;
}


