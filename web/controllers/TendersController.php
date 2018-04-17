<?php

class TendersController
{
    public function actionCreate()
    {
      if(isset($_FILES['file']) && !empty($_FILES['file']))
      {
          if($_FILES['file']['error'] == 0)
          {
              $_SESSION['user']['tenders-image'] = null;
              if(!is_dir("uploads/tenders/images")) {
                  mkdir("uploads/tenders/images", 0777, true);
              }
              move_uploaded_file($_FILES['file']['tmp_name'], "uploads/tenders/images/tenders-image-".time().$_FILES['file']['name']);
              $_SESSION['user']['tenders-image'] = "tenders-image-".time().$_FILES['file']['name'];
          }
      }
      if(file_get_contents("php://input") !== "") {
        $postdata = file_get_contents("php://input");
        $request = json_decode($postdata);
        if(isset($_SESSION['user']['tenders-image']) && !empty($_SESSION['user']['tenders-image'])) {
            $request->photo = $_SESSION['user']['tenders-image'];
        }
        $data = $request; 
        if(!isset($data->photo) ){
          $data->photo = null;
        }
        $result = Tenders::create( $data );
        unset($_SESSION['user']['tenders-image']);
        print_r($result);
      }
      return true;
    }

    public function actionGetAllTenders() {
        $tenders = Tenders::getAllTenders();
        header('Content-Type: application/json');
        echo json_encode($tenders, true);
        return true;
    }

    public function actionGetTendersById() {
      $postdata = file_get_contents("php://input");
      $request = json_decode($postdata);
      header('Content-Type: application/json');
      echo json_encode(Tenders::getTendersById($request->id));
      return true;
    }

    public function actionUpdateTendersData() {
        if(isset($_FILES['file']) && !empty($_FILES['file']))
        {
            if(isset($_FILES['file']) && !empty($_FILES['file']))
            {
                if($_FILES['file']['error'] == 0)
                {
                    $_SESSION['user']['tenders-image'] = null;
                    if(!is_dir("uploads/tenders/images")) {
                        mkdir("uploads/tenders/images", 0777, true);
                    }
                    move_uploaded_file($_FILES['file']['tmp_name'], "uploads/tenders/images/tenders-image-".time().$_FILES['file']['name']);
                    $_SESSION['user']['tenders-image'] = "tenders-image-".time().$_FILES['file']['name'];
                }
            }
        }
        if(file_get_contents("php://input") !== "") {
          $postdata = file_get_contents("php://input");
          $request = json_decode($postdata);
          if(isset($_SESSION['user']['tenders-image']) && !empty($_SESSION['user']['tenders-image'])) {
              $request->data->photo = $_SESSION['user']['tenders-image'];
          }
          header('Content-Type: application/json');
          $data = $request->data;
          print_r(Tenders::updateTenders($data));
          unset($_SESSION['user']['tenders-image']);
          return true;
        }
        return true;
    }

     public function actionRemoveTenders() {
      $postdata = file_get_contents("php://input");
      $request = json_decode($postdata);
      header('Content-Type: application/json');
      echo json_encode(Tenders::removeTenders($request->id));
      return true;
    }    
}
