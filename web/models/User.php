<?php
require_once(ROOT."/components/Db.php");

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;
                
require ROOT.'/vendor/phpmailer/phpmailer/src/PHPMailer.php';
require ROOT.'/vendor/phpmailer/phpmailer/src/Exception.php';
require ROOT.'/vendor/phpmailer/phpmailer/src/SMTP.php';

require ROOT.'/vendor/autoload.php';

require 'UserCreate.php';
require 'Cart.php';
require 'Wishlist.php';

class User
{
    public static function passwordRecovery($email){
        $db = Db::getConnection();
        $result = array();
        $find = false;
        try
        {
            $stmt = $db->prepare("SELECT id, email, name, lastname, login FROM users WHERE email=:email");
            $stmt->bindparam(":email",$email, PDO::PARAM_STR);
            $stmt->execute();
            $result = [];
            $count = 0;
            $find = false;
            $user_id;
            $user_name;
            $data = $stmt->fetch(PDO::FETCH_ASSOC);
            if( !empty($data) ){
                $find = true;
                $user_name = $data['name'];
                $user_id = $data['id'];
            }
           
            if($find) {
                $newPassword = rand(100000, 999999);
                $safePassword = md5($newPassword);
                $stmt = $db->prepare("UPDATE users SET password = :password WHERE id = :id");
                $stmt->bindparam(":password",$safePassword, PDO::PARAM_STR);
                $stmt->bindparam(":id",$user_id, PDO::PARAM_STR);
                $stmt->execute();

                $mail = new PHPMailer(true);                              // Passing `true` enables exceptions
                try {
                    //Server settings
                    $mail->SMTPDebug = 0;                                 // Enable verbose debug output
                    $mail->isSMTP();                                      // Set mailer to use SMTP
                    $mail->Host = 'mail.adm.tools';  // Specify main and backup SMTP servers
                    $mail->SMTPAuth = true;                               // Enable SMTP authentication
                    $mail->Username = 'info@sport4nation.com';                 // SMTP username
                    $mail->Password = 'otc35M2rJBI7';                           // SMTP password
                    $mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
                    $mail->Port = 25;   
                    $mail->CharSet = 'UTF-8';                                 // TCP port to connect to

                    //Recipients
                    $mail->setFrom('info@sport4nation.com', 'Password Recovery');
                    $mail->addAddress($email, $user_name);     // Add a recipient
                    //Content
                    $mail->isHTML(true);                                  // Set email format to HTML
                    $mail->Subject = 'Восстановление пароля';
                    $mail->Body    = '<b>Ваш новый пароль для входа на sport4nation.com: </b>'. $newPassword . '<br/> Используйте его для входа на http://sport4nation.com/login';
                    $mail->AltBody = 'Ваш новый пароль для входа на sport4nation.com: '.$newPassword;

                    $mail->send();
                    echo 'Message has been sent';
                } catch (Exception $e) {
                    echo 'Message could not be sent.';
                    echo 'Mailer Error: ' . $mail->ErrorInfo;
                }
            }else{
                return false;
            }
        }
        catch(PDOException $e)
        {
            echo $e->getMessage();
        }
    }

    public static function register($userData)
    {
        $db = Db::getConnection();
        $userData->password = md5($userData->password);
        $request_email = $userData->email;
        $request_login = $userData->login;
        $param = false;
        $stmt = $db->prepare("SELECT id from users WHERE email=:email OR login=:login");
        $stmt->bindparam(":email",$request_email, PDO::PARAM_STR);
        $stmt->bindparam(":login",$request_login, PDO::PARAM_STR);
        $stmt->execute();
        $res = $stmt->fetch(PDO::FETCH_ASSOC);
        $userCreated = false;
        if( !empty($res) ){
            $param = true;
        }else{
            $param = false;
        }
        if(!$param){
            $userCreated = UserCreate::createUser($userData);
            $stmt = $db->prepare("INSERT INTO user_location(id_user) VALUES(:id_user)");
            $stmt->bindparam(":id_user",$userCreated, PDO::PARAM_INT);
            $stmt->execute();
        }else{
            return false;
        }
        return $_SESSION['user_session'] = $userCreated;
    }

    public static function registerSocial($typeSocial, $social_id, $name, $email, $photo)
    {

        $db = Db::getConnection();
        $hash = md5(time());
        $some_id = $social_id;
        try
        {
            if($typeSocial == 1) {
               $stmt = $db->prepare("insert into users( google_id, name, email, photo, registered_at, last_seen) values(:google_id, :name, :email, :photo, now(),now())");
                $stmt->bindparam(":google_id",$some_id, PDO::PARAM_STR);
                $stmt->bindparam(":name",$name, PDO::PARAM_STR);
                $stmt->bindparam(":email",$email, PDO::PARAM_STR);
                $stmt->bindparam(":photo",$photo, PDO::PARAM_STR);
                $stmt->execute();
                if($stmt->rowCount() == 1)
                    {
                        $user_id = $db->lastInsertId();
                        $stmt = $db->prepare("INSERT INTO user_location(id_user) VALUES(:id_user)");
                        $stmt->bindparam(":id_user",$user_id, PDO::PARAM_INT);
                        $stmt->execute();
                        return $_SESSION['user_session'] = $user_id;
                    }
                    else {
                        return $stmt->errorInfo();
                    }
            }
            if($typeSocial == 2){
                $stmt = $db->prepare("insert into users(fb_id, name, email, photo, registered_at, last_seen) values(:fb_id, :name, :email, :photo, now(), now())");
                $stmt->bindparam(":fb_id",$some_id, PDO::PARAM_STR);
                $stmt->bindparam(":name",$name, PDO::PARAM_STR);
                $stmt->bindparam(":email",$email, PDO::PARAM_STR);
                $stmt->bindparam(":photo",$photo, PDO::PARAM_STR);
                $stmt->execute();
                if($stmt->rowCount() == 1)
                {
                    $user_id = $db->lastInsertId();
                    $stmt = $db->prepare("INSERT INTO user_location(id_user) VALUES(:id_user)");
                    $stmt->bindparam(":id_user",$user_id, PDO::PARAM_INT);
                    $stmt->execute();
                    return $_SESSION['user_session'] = $user_id;
                }
                else {
                    return $stmt->errorInfo();
                }
            }
        }
        catch(PDOException $e)
        {
            echo $e->getMessage();
            return false;
        }
    }

    public static function login($email, $password)
    {
        $db = Db::getConnection();
        header('Content-Type: application/json');
        $email = isset($email) ? $email : '';
        $passwordMd5 = md5($password);
        try
        {
            $stmt = $db->prepare("SELECT * FROM users WHERE email=:email AND password=:password");
            $stmt->bindparam(":email",$email, PDO::PARAM_STR);
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
                $user['photo'] = $data['photo'];
                $user['last_seen'] = $data['last_seen'];
            } 
            if($param)
            {
                $_SESSION['user_session'] = $user['id'];
                Cart::getCartByUserId($user['id']);
                Wishlist::getWishlistByUserId($user['id']);
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

    public static function loginSocial($social_id)
    {
        $db = Db::getConnection();
        header('Content-Type: application/json');
        $social_id = isset($social_id) ? $social_id : '';
        try
        {
            $stmt = $db->prepare("SELECT * FROM users WHERE fb_id=:fb_id OR google_id=:google_id ");
            $stmt->bindparam(":fb_id",$social_id, PDO::PARAM_STR);
            $stmt->bindparam(":google_id",$social_id, PDO::PARAM_STR);
            $stmt->execute();
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
                $user['photo'] = $data['photo'];
                $user['last_seen'] = $data['last_seen'];
            }
            if($param)
            {
                $_SESSION['user_session'] = $user['id'];
                Cart::getCartByUserId($user['id']);
                Wishlist::getWishlistByUserId($user['id']);
                return $user['id'];
            }
            else
            {
                return false;
            }
        }
        catch(PDOException $e)
        {
            echo $e->getMessage();
        }
    }

    public static function updateUser($password, $user) {
        print_r($user);
        $db = Db::getConnection();
        $oldUsersData = User::getUsersById($user->id);
        $insertUser = false;

        if( isset($password) && strlen($password) > 0 ){
            $password = $password;
            $safePassword = md5($password);
        }else{
            if( !isset( $oldUsersData['password']) ){
                $oldUsersData['password'] = '';
            }
            $password = $oldUsersData['password'];
            $safePassword = $password;
        }
        try
        {
            $stmt = $db->prepare("UPDATE users set name=:name, lastname=:lastname, password=:password, email=:email, login=:login, photo=:photo, city_id=:city_id, phone=:phone WHERE id=:id");
            $stmt->bindparam(":id", $user->id, PDO::PARAM_INT);
            $stmt->bindparam(":name", $user->name, PDO::PARAM_STR);
            $stmt->bindparam(":lastname", $user->lastname, PDO::PARAM_STR);
            $stmt->bindparam(":password", $safePassword, PDO::PARAM_STR);
            $stmt->bindparam(":email", $user->email, PDO::PARAM_STR);
            $stmt->bindparam(":login", $user->login, PDO::PARAM_STR);
            $stmt->bindparam(":photo", $user->photo, PDO::PARAM_STR);
            $stmt->bindparam(":phone", $user->phone, PDO::PARAM_STR);
            $stmt->bindparam(":city_id", $user->location->city_id, PDO::PARAM_INT);
            $stmt->execute();
            if($stmt->rowCount() == 1)
            {
                $insertUser = true;
            }
        }
        catch(PDOException $e)
        {
            return $e->getMessage();
        }

        if( $insertUser){
            return true;
        }else{
            return false;
        }
    }

    public static function is_loggedin()
    {
        if(isset($_SESSION['user_session']))
        {
            return true;
        }
    }

    public static function get_users_id()
    {
        if(isset($_SESSION['user_session']))
        {
            return $_SESSION['user_session'];
        }
    }

    public static function get_social_id($user_id)
    {
        $db = Db::getConnection();
        try
        {
            $stmt = $db->prepare("SELECT id, fb_id, google_id FROM users WHERE id=:id");
           $stmt->execute(array(':id'=>$user_id));
            $result = [];
            $count = 0;
            while($data = $stmt->fetch(PDO::FETCH_ASSOC)){
                $result[$count]['id'] = $data['id'];
                $result[$count]['fb_id'] = $data['fb_id'];
               $result[$count]['google_id'] = $data['google_id'];
               $count++;
           }
            return $result;
        }
        catch(PDOException $e)
        {
            echo $e->getMessage();
        }
    }


    public static function logout()
    {
        unset($_SESSION['user_session']);
        unset($_SESSION['user_location']);
        unset($_SESSION['user']['cart']);
        unset($_SESSION['user']['wishlist']);
        $_SESSION=array();
        
        return true;
    }


    public static function getUsersById($id)
    {
        $db = Db::getConnection();
        try
        {
            $stmt = $db->prepare("SELECT *, cities.title AS city_title, cities.id AS city_id_b, users.id AS id FROM users INNER JOIN cities ON users.city_id = cities.id WHERE users.id=:id");
            $stmt->bindparam(":id", $id, PDO::PARAM_INT);
            $stmt->execute();
            $user = [];
            $data = $stmt->fetch(PDO::FETCH_ASSOC);
            $id = $data['id'];
            $user['id'] = $data['id'];
            $user['name'] = $data['name'];
            $user['lastname'] = $data['lastname'];
            $user['password'] = $data['password'];
            $user['email'] = $data['email'];
            $user['login'] = $data['login'];
            $user['photo'] = $data['photo'];
            $user['phone'] = $data['phone'];
            $user['last_seen'] = $data['last_seen'];
            $user['location'] = array("city_title"=>$data['city_title'], "city_id"=>$data['city_id']);
            return $user;
        }
        catch(PDOException $e)
        {
            echo $e->getMessage();
        }
    }

    public static function getAllUsers()
    {
        $db = Db::getConnection();

        try
        {
            $stmt = $db->prepare("SELECT * FROM users order by registered_at asc");
            $stmt->execute();
            $result = [];
            while($data = $stmt->fetch( PDO::FETCH_ASSOC )){
                $user = [];
                $id = $data['id'];
                $user['id'] = $data['id'];
                $user['name'] = $data['name'];
                $user['lastname'] = $data['lastname'];
                $user['password'] = $data['password'];
                $user['email'] = $data['email'];
                $user['login'] = $data['login'];
                $user['photo'] = $data['photo'];
                $user['last_seen'] = $data['last_seen'];
                $result[] = $user;
            }
            return $result;

        }
        catch(PDOException $e)
        {
            echo $e->getMessage();
        }
    }

    public static function updateUserLocation($id_user, $location){
        $db = Db::getConnection();
        $stmt = $db->prepare("update user_location set lat=:lat, lng=:lng, city=:city where id_user=:id");
        $stmt->bindparam(":id",$id_user, PDO::PARAM_INT);
        $stmt->bindparam(":lat",$location->latitude, PDO::PARAM_STR);
        $stmt->bindparam(":lng",$location->longitude, PDO::PARAM_STR);
        $stmt->bindparam(":city",$location->city, PDO::PARAM_STR);
        $stmt->execute();
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
