<?php

/**
 * Created by PhpStorm.
 * User: Alexandr
 * Date: 28.02.2017
 * Time: 17:30
 */
class Admin
{
    public static function getAllVacancies()
    {
        $db = Db::getConnection();
        $stmt = $db->prepare("SELECT * FROM vacancies");
        $stmt->execute();
        $allVacancies=$stmt->fetchAll();

        return $allVacancies;
    }


    public static function getAllMessages()
    {
        $db = Db::getConnection();
        $stmt = $db->prepare("SELECT * FROM candidates");
        $stmt->execute();
        $allMessages=$stmt->fetchAll();

        return $allMessages;
    }

    public static function getVacancyByCode($code) { 

        $db = Db::getConnection();
        $stmt = $db->prepare("SELECT * FROM vacancies where code ='".$code."'");
        $stmt->execute();
        $vacancy=$stmt->fetch();

        return $vacancy;
    }

    public static function change_project_moder($id, $moder)
    {
        $db = Db::getConnection();
        try
        {
            $stmt = $db->prepare("UPDATE mes_products set moder=:moder WHERE id=:id");
            $stmt->bindparam(":id", $id, PDO::PARAM_INT);
            $stmt->bindparam(":moder", $moder, PDO::PARAM_INT);
            $stmt->execute();
            if($stmt->rowCount() == 1)
            {
                return true;
            }

            else
            {
                return false;
            }

        }
        catch(PDOException $e)
        {
            return $e->getMessage();
        }
    }


    public static function addVacancy($code, $category_code, $title, $country, $applicant, $languages, $destination, $description) {
        $db = Db::getConnection(); 
        try
        {
            $stmt = $db->prepare("insert into vacancies(code, category_code, title, country, applicant, languages, destination, description, created_at) values(:code, :category_code, :title, :country, :applicant, :languages, :destination, :description, now())");
            $stmt->bindparam(":code", $code, PDO::PARAM_INT);
            $stmt->bindparam(":category_code", $category_code, PDO::PARAM_STR);
            $stmt->bindparam(":title", $title, PDO::PARAM_STR);
            $stmt->bindparam(":country", $country, PDO::PARAM_STR);
            $stmt->bindparam(":applicant", $applicant, PDO::PARAM_STR);
            $stmt->bindparam(":languages", $languages, PDO::PARAM_STR);
            $stmt->bindparam(":destination", $destination, PDO::PARAM_STR);
            $stmt->bindparam(":description", $description, PDO::PARAM_STR);
            $stmt->execute(); 
            if($stmt->rowCount() == 1)
            {
                return true;
            }
        }

        catch(PDOException $e)
        {
           return $e->getMessage();
        }
    }

    public static function updateVacancy($id, $code, $title, $country, $applicant, $languages, $destination, $description) {
        $db = Db::getConnection(); 
        try
        {
            $stmt = $db->prepare("UPDATE vacancies set code=:code, title=:title, country=:country, applicant=:applicant, languages=:languages, destination=:destination, description=:description WHERE id=:id");
            $stmt->bindparam(":id", $id, PDO::PARAM_INT);
            $stmt->bindparam(":code", $code, PDO::PARAM_STR);
            $stmt->bindparam(":country", $country, PDO::PARAM_STR);
            $stmt->bindparam(":title", $title, PDO::PARAM_STR);
            $stmt->bindparam(":applicant", $applicant, PDO::PARAM_STR);
            $stmt->bindparam(":languages", $languages, PDO::PARAM_STR);
            $stmt->bindparam(":destination", $destination, PDO::PARAM_STR);
            $stmt->bindparam(":description", $description, PDO::PARAM_STR);
            $stmt->execute();
            if($stmt->rowCount() == 1)
            {
                return true;
            }
        }
        catch(PDOException $e)
        {
            return $e->getMessage();
        }
    }

    public static function remove_project_moder($id)
    {
        $db = Db::getConnection();
        try
        {
            $stmt = $db->prepare("DELETE from mes_products WHERE id=:id");
            $stmt->bindparam(":id", $id, PDO::PARAM_INT);
            $stmt->execute();
            if($stmt->rowCount() == 1)
            {
                return true;
            }

            else
            {
                return false;
            }

        }
        catch(PDOException $e)
        {
            return $e->getMessage();
        }
    }


    public static function login($login, $password)
    {
        $db = Db::getConnection();
        header('Content-Type: application/json');
        $login = isset($login) ? $login : '';
        // $passwordMd5 = md5($password);
        $passwordMd5 = $password;
        try
        {
            $stmt = $db->prepare("SELECT * FROM admin WHERE login=:login AND password=:password");
            $stmt->bindparam(":login",$login, PDO::PARAM_STR);
            $stmt->bindparam(":password",$passwordMd5, PDO::PARAM_STR);
            $stmt->execute();
            // $result = [];
            $count = 0;
            $param = false;
            $user = [];
            $data = $stmt->fetch(PDO::FETCH_ASSOC);
            if( !empty($data) ){
                $param = true;
                $id = $data['id'];
                $user['id'] = $data['id'];
                $user['name'] = $data['name'];
                $user['lastname'] = $data['lastname'];
                $user['password'] = $data['password'];
                $user['email'] = $data['email'];
                $user['login'] = $data['login'];
                $user['level'] = $data['level'];
                $user['photo'] = $data['photo'];
                $user['phone'] = $data['phone'];
            } 
            if($param)
            {
                $_SESSION['admin_session'] = $user['id'];
                return $user;
            }
            else
            {
                return $stmt->errorInfo();
            }
        }
        catch(PDOException $e)
        {
            echo $e->getMessage();
        }
    }

    public static function get_users_id()
    {
        if(isset($_SESSION['admin_session']))
        {
            return $_SESSION['admin_session'];
        }
    }

    public static function logout()
    {
        // $_SESSION=array();
        unset($_SESSION['admin_session']);
        return true;
    }
}