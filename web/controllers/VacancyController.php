<?php

class VacancyController
{
    public function actionCreate()
    {
      if(isset($_FILES['file']) && !empty($_FILES['file']))
      {
          if($_FILES['file']['error'] == 0)
          {
              $_SESSION['user']['vacancies-image'] = null;
              if(!is_dir("uploads/vacancies/images")) {
                  mkdir("uploads/vacancies/images", 0777, true);
              }
              move_uploaded_file($_FILES['file']['tmp_name'], "uploads/vacancies/images/vacancies-image-".time().$_FILES['file']['name']);
              $_SESSION['user']['vacancies-image'] = "vacancies-image-".time().$_FILES['file']['name'];
          }
      }
      if(file_get_contents("php://input") !== "") {
        $postdata = file_get_contents("php://input");
        $request = json_decode($postdata);
        if(isset($_SESSION['user']['vacancies-image']) && !empty($_SESSION['user']['vacancies-image'])) {
            $request->photo = $_SESSION['user']['vacancies-image'];
        }
        $data = $request; 
        if(!isset($data->photo) ){
          $data->photo = null;
        }
        $result = Vacancies::create( $data );
        unset($_SESSION['user']['vacancies-image']);
        print_r($result);
      }
      return true;
    }

    public function actionGetAllVacancies() {
        $vacancies = Vacancies::getAllVacancies();
        header('Content-Type: application/json');
        echo json_encode($vacancies, true);
        return true;
    }

    public function actionGetVacanciesById() {
      $postdata = file_get_contents("php://input");
      $request = json_decode($postdata);
      header('Content-Type: application/json');
      echo json_encode(Vacancies::getVacanciesById($request->idVacancy));
      return true;
    }

    public function actionUpdateVacanciesData() {
        if(isset($_FILES['file']) && !empty($_FILES['file']))
        {
            if(isset($_FILES['file']) && !empty($_FILES['file']))
            {
                if($_FILES['file']['error'] == 0)
                {
                    $_SESSION['user']['vacancies-image'] = null;
                    if(!is_dir("uploads/vacancies/images")) {
                        mkdir("uploads/vacancies/images", 0777, true);
                    }
                    move_uploaded_file($_FILES['file']['tmp_name'], "uploads/vacancies/images/vacancies-image-".time().$_FILES['file']['name']);
                    $_SESSION['user']['vacancies-image'] = "vacancies-image-".time().$_FILES['file']['name'];
                }
            }
        }
        if(file_get_contents("php://input") !== "") {
          $postdata = file_get_contents("php://input");
          $request = json_decode($postdata);
          if(isset($_SESSION['user']['vacancies-image']) && !empty($_SESSION['user']['vacancies-image'])) {
              $request->data->photo = $_SESSION['user']['vacancies-image'];
          }
          header('Content-Type: application/json');
          $data = $request->data;
          print_r(Vacancies::updateVacancies($data));
          unset($_SESSION['user']['vacancies-image']);
          return true;
        }
        return true;
    }

     public function actionRemoveVacancies() {
      $postdata = file_get_contents("php://input");
      $request = json_decode($postdata);
      header('Content-Type: application/json');
      echo json_encode(Vacancies::removeVacancies($request->id));
      return true;
    }    
}
