<?php

class UserController
{
    public function actionProfile()
    {
        require_once (ROOT.'/main-page.html');
        return true;
    }

    public function actionGetUserSessionId() {
        echo User::get_users_id();
        return true;
    }

    public function actionGetSocialId() {
        $postdata = file_get_contents("php://input");
        $request = json_decode($postdata);
        header('Content-Type: application/json');
        echo json_encode(User::get_social_id($request->userId));
        return true;
    }

    public function actionGetUserById() {
        $postdata = file_get_contents("php://input");
        $request = json_decode($postdata);
        header('Content-Type: application/json');
        echo json_encode(User::getUsersById($request->id));
        return true;
    }

    public function actionUpdateUserData() {
        if(isset($_FILES['file']) && !empty($_FILES['file']))
        {
            if($_FILES['file']['error'] == 0)
            {
                $_SESSION['user']['photo'] = null;
                if(!is_dir("uploads/users/".$_SESSION['user_session']."/images")) {
                  mkdir("uploads/users/".$_SESSION['user_session']."/images", 0777, true);
                }
                move_uploaded_file($_FILES['file']['tmp_name'], "uploads/users/".$_SESSION['user_session']."/images/avatar-".time().$_FILES['file']['name']);
                $_SESSION['user']['photo'] = "avatar-".time().$_FILES['file']['name'];
            }
        }
        if(file_get_contents("php://input") !== "") {
            $putData = file_get_contents("php://input");
            $request = json_decode($putData);
            if(isset($request->data->newPassword) && !empty($request->data->newPassword)) {
              $request->data->password = $request->data->newPassword;
              $request->data->newPassword = null;
            }else{
                $request->data->password = "";
            }
            if(isset($_SESSION['user']['photo']) && !empty($_SESSION['user']['photo'])) {
              $request->data->photo = $_SESSION['user']['photo'];
            }
            header('Content-Type: application/json');
            print_r(User::updateUser($request->data->password, $request->data));
            unset($_SESSION['user']['photo']);
            return true;
        }
        return true;
    }
    
    public function actionGetAllUsers() {
        $postdata = file_get_contents("php://input");
        $request = json_decode($postdata);
        header('Content-Type: application/json');
        echo json_encode(User::getAllUsers());
        return true;
    }

    public function actionRegister()
    {
        if(isset($_POST['register']))
        {
            $result = User::register($_POST['name'], $_POST['login'], $_POST['email'], $_POST['tel'], $_POST['password'], $_FILES['photo']);
        }
        require_once (ROOT.'/main-page.html');
        return true;
    }


    public function actionLoginAjax()
    {
        $postdata = file_get_contents("php://input");
        $request = json_decode($postdata);
        $result = User::login($request->email, $request->password);
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

    public function actionLoginSocial()
    {
        $postdata = file_get_contents("php://input");
        $request = json_decode($postdata);
        $result = User::loginSocial($request->social_id);

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

    public function actionRegisterAjax()
    {
        $postdata = file_get_contents("php://input");
        $request = json_decode($postdata);

        $result = User::register($request);
        echo $result;

        return true;
    }

    public function actionRegisterSocial()
    {
        $postdata = file_get_contents("php://input");
        $request = json_decode($postdata);
        $result = User::registerSocial($request->typeSocial, $request->social_id, $request->name, $request->email, $request->photo);
        echo $result;
        return true;
    }

    public function actionIsLoggedIn()
    {
        return User::is_loggedin();
    }

    public function actionLogout()
    {
        if(User::logout())
        {
            echo true;
        }
        else {
            echo false;
        }
        return true;
    }

    public function actionConfirm($hash)
    {
        if(User::is_confirmed($hash))
        {
            $id = User::getUsersIdByHash($hash);
            $user = User::getUsersById($id['user_id']);
            User::loginAfterEmail($user['login']);
            if(User::is_loggedin())
            {
                require_once (ROOT.'/views/user/confirm.php');
            }
        }
        else
        {

            require_once (ROOT.'/views/site/404.php');
        }
        return true;
    }

    public function actionPasswordRecovery()
    {
        $postdata = file_get_contents("php://input");
        $request = json_decode($postdata);
        $result = User::passwordRecovery($request->email);
        echo $result;
        return true;
    }

    public function actionUpdateUserLocation(){
        $postdata = file_get_contents("php://input");
        $request = json_decode($postdata);
        $result = User::updateUserLocation($request->id_user,$request->location);
        echo $result;
        return true;
    }
}
