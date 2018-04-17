<?php

//include_once ROOT.'/models/Category.php';
//include_once ROOT.'/models/Product.php';


class SiteController
{
    public function actionIndex()
    {
        require_once (ROOT.'/main-page.html');
        return true;
    }
    public function actionNotfound(){
        require_once (ROOT.'/main-page.html');
        return true;
    }
    public function actionFourhundredfour(){
        require_once (ROOT.'/404.html');
        return true;
    }
    public function actionAbout()
    {
        require_once (ROOT.'/main-page.html');
        return true;
    }
    public function actionServices()
    {
        require_once (ROOT.'/main-page.html');
        return true;
    }
    public function actionProjects()
    {
        require_once (ROOT.'/main-page.html');
        return true;
    } 
    public function actionJobs()
    {
        require_once (ROOT.'/main-page.html');
        return true;
    } 
    public function actionVacancyDetails()
    {
        require_once (ROOT.'/main-page.html');
        return true;
    } 
    public function actionCandidate()
    {
        require_once (ROOT.'/main-page.html');
        return true;
    }
    public function actionContacts()
    {
        require_once (ROOT.'/main-page.html');
        return true;
    }
    public function actionGoogleMap() {
        $markers = array(
            array(
                "id"=>1,
                "latitude"=>50.450645,
                "longitude"=>30.523180,
                "title"=>'Футбольное поле №1',
                "description"=>'Супер-пупер офигенное футбольное поле №1',
                "id_cat"=>1,
                "id_sub_cat"=>1,
                "opts"=>array(
                    "icon"=>'../img/Stadium-48.png'
                )
            )
        );
        echo json_encode($markers);
        return true;
    }
    
    public function actionEncode(){
        // $postdata = file_get_contents("php://input");
        // $request = json_decode($postdata);
        // $request = $_FILES;
        // header('Access-Control-Allow-Origin: *'); 
        // header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
        if(!is_dir("uploads/wav")) {
          mkdir("uploads/wav", 0777, true);
        }
        $file = "uploads/wav/wav-".time().$_FILES['file']['name'].'.wav';

        move_uploaded_file($_FILES['file']['tmp_name'], $file);
        echo( json_encode(Vacancies::Encode($file) ) );
        // var_dump($_FILES['file']);

        return true;
    }

}