<?php

class BrandsController
{
    public function actionGetBrands(){
        print(json_encode(Brands::getBrands()));
        return true;
    }

    public function actionAddBrand(){
      if(isset($_FILES['file']) && !empty($_FILES['file']))
      {
        if($_FILES['file']['error'] == 0)
        {
          $_SESSION['user']['brand-image'] = null;
          if(!is_dir("uploads/brands/images")) {
              mkdir("uploads/brands/images", 0777, true);
          }
          move_uploaded_file($_FILES['file']['tmp_name'], "uploads/brands/images/brand-image-".time().$_FILES['file']['name']);
          $_SESSION['user']['brand-image'] = "brand-image-".time().$_FILES['file']['name'];
        }
      }
      if( file_get_contents("php://input") !== "" ) {
        $postdata = file_get_contents("php://input");
        $request = json_decode($postdata);
        if(isset($_SESSION['user']['brand-image']) && !empty($_SESSION['user']['brand-image'])) {
            $request->photo = $_SESSION['user']['brand-image'];
        }
        print(json_encode(Brands::addBrand($request)));
        unset($_SESSION['user']['brand-image']);
      }
      return true;
    }

    public function actionRemoveBrand(){
      if( file_get_contents("php://input") !== "" ) {
        $postdata = file_get_contents("php://input");
        $request = json_decode($postdata);
        print(json_encode(Brands::removeBrand($request->id)));
      }
      return true;
    }

    public function actionGetBrandById(){
      if( file_get_contents("php://input") !== "" ) {
        $postdata = file_get_contents("php://input");
        $request = json_decode($postdata);
        print(json_encode(Brands::getBrandById($request->id)));
      }
      return true;
    }

    public function actionEditBrand(){
      if(isset($_FILES['file']) && !empty($_FILES['file']))
      {
        if($_FILES['file']['error'] == 0)
        {
          $_SESSION['user']['brand-image'] = null;
          if(!is_dir("uploads/brands/images")) {
              mkdir("uploads/brands/images", 0777, true);
          }
          move_uploaded_file($_FILES['file']['tmp_name'], "uploads/brands/images/brand-image-".time().$_FILES['file']['name']);
          $_SESSION['user']['brand-image'] = "brand-image-".time().$_FILES['file']['name'];
        }
      }
      if( file_get_contents("php://input") !== "" ) {
        $postdata = file_get_contents("php://input");
        $request = json_decode($postdata);
        if(isset($_SESSION['user']['brand-image']) && !empty($_SESSION['user']['brand-image'])) {
            $request->photo = $_SESSION['user']['brand-image'];
        }
        print(json_encode(Brands::editBrand($request)));
        unset($_SESSION['user']['brand-image']);
      }
      return true;
    }
}
?>