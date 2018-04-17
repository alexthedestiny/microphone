<?php

/**
 * Created by PhpStorm.
 * User: Alexandr
 * Date: 28.02.2017
 * Time: 17:30
 */
class AdminController
{
    public function actionIndex()
    {
        require_once (ROOT.'/main-page.html');
        return true;
    }

    public function actionGetAdminSessionId() {
        echo Admin::get_users_id();
        return true;
    }

    public function actionLogin()
    {
        require_once (ROOT.'/main-page.html');
        return true;
    }

    
    public function actionLoginAjax()
    {
        $postdata = file_get_contents("php://input");
        $request = json_decode($postdata);
        $result = Admin::login($request->login, $request->password);
        if($result)
        {
            header('Content-Type: application/json');
            echo json_encode($result);
        }

        else {
            echo "Выввели неправильный логин или пароль";
        }
        return true;
    }

    public function actionLogout()
    {
        if(Admin::logout())
        {
            echo true;
        }
        else {
            echo false;
        }
        return true;
    }

    public function actionGetVacancy() {
        $postdata = file_get_contents("php://input");
        $request = json_decode($postdata);
        $vacancy = Admin::getVacancyByCode($request->codeVacancy);

        header('Content-Type: application/json');
        echo json_encode($vacancy);

        return true;
    }

    public function actionGetVacancies() {
        $allVacancies = Admin::getAllVacancies();
        header('Content-Type: application/json');
        echo json_encode($allVacancies, true);

        return true;
    }


    public function actionGetMessages() {
        $allMessages = Admin::getAllMessages();
        header('Content-Type: application/json');
        echo json_encode($allMessages, true);

        return true;
    }

    public function actionAddVacancy() {
        $postdata = file_get_contents("php://input");
        $request = json_decode($postdata);
        //print_r($request);
        echo $successfulAdd = Admin::addVacancy(
            $request->vacancy->code,
            $request->vacancy->category->value,
            $request->vacancy->title, 
            $request->vacancy->country->value,
            $request->vacancy->applicant, 
            $request->vacancy->languages, 
            $request->vacancy->destination, 
            $request->vacancy->description);
        return true;
    }

    public function actionUpdateVacancy()
    {
        $postdata = file_get_contents("php://input");
        $request = json_decode($postdata);
        //print_r($request);
        echo $successfulUpdate = Admin::updateVacancy(
            $request->vacancy->id,
            $request->vacancy->code, 
            $request->vacancy->title, 
            $request->vacancy->country,
            $request->vacancy->applicant, 
            $request->vacancy->languages, 
            $request->vacancy->destination, 
            $request->vacancy->description);
        return true;
    }



    public static function translit($s) {
        $s = (string) $s; // преобразуем в строковое значение
        $s = strip_tags($s); // убираем HTML-теги
        $s = str_replace(array("\n", "\r"), " ", $s); // убираем перевод каретки
        $s = preg_replace("/s+/", ' ', $s); // удаляем повторяющие пробелы
        $s = trim($s); // убираем пробелы в начале и конце строки
        $s = function_exists('mb_strtolower') ? mb_strtolower($s) : strtolower($s); // переводим строку в нижний регистр (иногда надо задать локаль)
        $s = strtr($s, array('а'=>'a','б'=>'b','в'=>'v','г'=>'g','д'=>'d','е'=>'e','ё'=>'e','ж'=>'j','з'=>'z','и'=>'i','й'=>'y','к'=>'k','л'=>'l','м'=>'m','н'=>'n','о'=>'o','п'=>'p','р'=>'r','с'=>'s','т'=>'t','у'=>'u','ф'=>'f','х'=>'h','ц'=>'c','ч'=>'ch','ш'=>'sh','щ'=>'shch','ы'=>'y','э'=>'e','ю'=>'yu','я'=>'ya','ъ'=>'','ь'=>''));
        //$s = preg_replace("/[^0-9a-z-_ ]/i", "", $s); // очищаем строку от недопустимых символов
        $s = str_replace(" ", "-", $s); // заменяем пробелы знаком минус
        return $s; // возвращаем результат
    }
}