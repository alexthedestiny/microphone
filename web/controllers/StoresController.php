<?php

class StoresController
{
    public function actionGetAddresses() {
      $vacancies = Stores::getAddresses();
      header('Content-Type: application/json');
      echo json_encode($vacancies, true);
      return true;
    }

    public function actionUpdate() {
      if(file_get_contents("php://input") !== "") {
        $postdata = file_get_contents("php://input");
        $request = json_decode($postdata);
        header('Content-Type: application/json');
        print_r(Stores::update($request->data));
        return true;
      }
      return true;
    }
}
