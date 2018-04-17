<?php
require_once(ROOT."/components/Db.php");
class UserCreate
{

	public static function createUser($userData){
		$user_id;
		$db = Db::getConnection();
		$password = ( isset($userData->password) ) ? $userData->password : '';
		$name = ( isset($userData->name) ) ? $userData->name : '';
		$lastname = ( isset($userData->lastname) ) ? $userData->lastname : '';
		$email = ( isset($userData->email) ) ? $userData->email : '';		
		$login = ( isset($userData->login) ) ? $userData->login : '';		
		try
        {
            $stmt = $db->prepare("insert into users(name, lastname, password, login, email, last_seen, registered_at) values(:name, :lastname, :password, :login, :email, now(), now())");
            $stmt->bindparam(":password",$password, PDO::PARAM_STR);
            $stmt->bindparam(":name",$name, PDO::PARAM_STR);
            $stmt->bindparam(":email",$email, PDO::PARAM_STR);
            $stmt->bindparam(":lastname",$lastname, PDO::PARAM_STR);
            $stmt->bindparam(":login",$login, PDO::PARAM_STR);
            $stmt->execute();
            if($stmt->rowCount() == 1)
            {
                $user_id = $db->lastInsertId();            }
            else {
                return $stmt->errorInfo();
            }
        }
        catch(PDOException $e)
        {
            echo $e->getMessage();
            return false;
        }
        return $user_id;
	}

	
}
?>