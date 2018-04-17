<?php

class PublicController
{
  public function actionGetPublic() {
    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    header('Content-Type: application/json');
    echo json_encode(PublicInform::getPublic());
    return true;
  }

  public function actionUpdate() {
    if(file_get_contents("php://input") !== "") {
      $postdata = file_get_contents("php://input");
      $request = json_decode($postdata);
      header('Content-Type: application/json');
      $data = $request->data;
      print_r(PublicInform::update($data));
      return true;
    }
    return true;
  } 
}
