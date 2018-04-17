<?php

class ProductController
{
    public function actionAdd(){
        if(isset($_FILES['file']) && !empty($_FILES['file'])){
            if($_FILES['file']['error'] == 0)
            {
              $_SESSION['user']['product-image'] = null;
              if(!is_dir("uploads/catalog/images")) {
                  mkdir("uploads/catalog/images", 0777, true);
              }
              move_uploaded_file($_FILES['file']['tmp_name'], "uploads/catalog/images/product-image-".time().$_FILES['file']['name']);
              $_SESSION['user']['product-image'] = "product-image-".time().$_FILES['file']['name'];
            }
        }
        if(isset($_FILES['gallery'])){
            if($_FILES['gallery']['error'] == 0){
              if(!is_dir("uploads/catalog/images/gallery")) {
                mkdir("uploads/catalog/images/gallery", 0777, true);
              }
              move_uploaded_file($_FILES['gallery']['tmp_name'], "uploads/catalog/images/gallery/product-gallery-image-".time().$_FILES['gallery']['name']);
              $_SESSION['user']['product-gallery'][] = "product-gallery-image-".time().$_FILES['gallery']['name'];
            }
        }
        if(file_get_contents("php://input") !== "") {
            $postdata = file_get_contents("php://input");
            $request = json_decode($postdata);
            if(isset($_SESSION['user']['product-image']) && !empty($_SESSION['user']['product-image'])) {
                $request->photo = $_SESSION['user']['product-image'];
            }
            if(isset($_SESSION['user']['product-gallery']) && !empty($_SESSION['user']['product-gallery'])){
                $request->gallery = $_SESSION['user']['product-gallery'];
            }
            $result = Product::add($request);
            unset($_SESSION['user']['product-image']);
            unset($_SESSION['user']['product-gallery']);
            print_r($result);
        }
        return true;
    }

    public function actionEdit(){
        if(isset($_FILES['file']) && !empty($_FILES['file'])){
            if($_FILES['file']['error'] == 0)
            {
              $_SESSION['user']['product-image'] = null;
              if(!is_dir("uploads/catalog/images")) {
                  mkdir("uploads/catalog/images", 0777, true);
              }
              move_uploaded_file($_FILES['file']['tmp_name'], "uploads/catalog/images/product-image-".time().$_FILES['file']['name']);
              $_SESSION['user']['product-image'] = "product-image-".time().$_FILES['file']['name'];
            }
        }
        if(isset($_FILES['gallery'])){
            if($_FILES['gallery']['error'] == 0){
              if(!is_dir("uploads/catalog/images/gallery")) {
                mkdir("uploads/catalog/images/gallery", 0777, true);
              }
              move_uploaded_file($_FILES['gallery']['tmp_name'], "uploads/catalog/images/gallery/product-gallery-image-".time().$_FILES['gallery']['name']);
              $_SESSION['user']['product-gallery'][] = "product-gallery-image-".time().$_FILES['gallery']['name'];
            }
        }
        if(file_get_contents("php://input") !== "") {
            $postdata = file_get_contents("php://input");
            $request = json_decode($postdata);
            if(isset($_SESSION['user']['product-image']) && !empty($_SESSION['user']['product-image'])) {
                $request->photo = $_SESSION['user']['product-image'];
            }
            if(isset($_SESSION['user']['product-gallery']) && !empty($_SESSION['user']['product-gallery'])){
                $request->gallery = $_SESSION['user']['product-gallery'];
            }
            $result = Product::edit($request);
            unset($_SESSION['user']['product-image']);
            unset($_SESSION['user']['product-gallery']);
            print_r($result);
        }
        return true;
    }

    public function actionGetAllProducts(){
        print(json_encode(Product::getAllProducts()));
        return true;
    }

    public function actionGetById(){
        $postdata = file_get_contents("php://input");
        $request = json_decode($postdata);
        header('Content-Type: application/json');
        print(json_encode(Product::getById($request->id)));
        return true;
    }

    public function actionGetStoresList(){
        print(json_encode(Product::getStoresList()));
        return true;
    }

    public function actionGetCategories(){
        print(json_encode(Product::getCategories()));
        return true;
    }
}

?>