<?php

class AboutController
{
  public function actionGetAbout() {
    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    header('Content-Type: application/json');
    echo json_encode(About::getAbout());
    return true;
  }

  public function actionUpdate() {
    if(file_get_contents("php://input") !== "") {
      $postdata = file_get_contents("php://input");
      $request = json_decode($postdata);
      header('Content-Type: application/json');
      $data = $request->data;
      print_r(About::update($data));
      return true;
    }
    return true;
  } 
}
