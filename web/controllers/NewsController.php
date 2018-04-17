<?php

class NewsController
{
    public function actionCreate()
    {
      if(isset($_FILES['file']) && !empty($_FILES['file']))
      {
        if($_FILES['file']['error'] == 0)
        {
          $_SESSION['user']['news-image'] = null;
          if(!is_dir("uploads/news/images")) {
              mkdir("uploads/news/images", 0777, true);
          }
          move_uploaded_file($_FILES['file']['tmp_name'], "uploads/news/images/news-image-".time().$_FILES['file']['name']);
          $_SESSION['user']['news-image'] = "news-image-".time().$_FILES['file']['name'];
        }
      }
      if(file_get_contents("php://input") !== "") {
        $postdata = file_get_contents("php://input");
        $request = json_decode($postdata);
        if(isset($_SESSION['user']['news-image']) && !empty($_SESSION['user']['news-image'])) {
            $request->photo = $_SESSION['user']['news-image'];
        }
        $newsData = $request;
        $result = News::create($newsData);
        unset($_SESSION['user']['news-image']);
        print_r($result);
      }
      return true;
    }

    public function actionGetAllNews() {
        $news = News::getAllNews();
        header('Content-Type: application/json');
        echo json_encode($news, true);
        return true;
    }

    public function actionGetNewsById() {
      $postdata = file_get_contents("php://input");
      $request = json_decode($postdata);
      header('Content-Type: application/json');
      echo json_encode(News::getNewsById($request->idNews));
      return true;
    }

    public function actionUpdateNewsData() {
        if(isset($_FILES['file']) && !empty($_FILES['file']))
          {
            if($_FILES['file']['error'] == 0)
            {
              $_SESSION['user']['news-image'] = null;
              if(!is_dir("uploads/news/images")) {
                  mkdir("uploads/news/images", 0777, true);
              }
              move_uploaded_file($_FILES['file']['tmp_name'], "uploads/news/images/news-image-".time().$_FILES['file']['name']);
              $_SESSION['user']['news-image'] = "news-image-".time().$_FILES['file']['name'];
            }
          }
        if(file_get_contents("php://input") !== "") {
          $postdata = file_get_contents("php://input");
          $request = json_decode($postdata);
          if(isset($_SESSION['user']['news-image']) && !empty($_SESSION['user']['news-image'])) {
              $request->data->photo = $_SESSION['user']['news-image'];
          }
          header('Content-Type: application/json');
          print_r(News::updateNews($request->data));
          unset($_SESSION['user']['news-image']);
          return true;
        }
        return true;
    }

    public function actionRemoveNews() {
      $postdata = file_get_contents("php://input");
      $request = json_decode($postdata);
      header('Content-Type: application/json');
      print_r($request);
      echo json_encode(News::removeNews($request->id));
      return true;
    }

    public function actionNewsByCat(){
      $postdata = file_get_contents("php://input");
      $request = json_decode($postdata);
      $news = News::getNewsByCategory($request->id, $request->page, $request->itemsInPage);
      header('Content-Type: application/json');
      echo json_encode($news, true);
      return true;
    }

    public function actionGetNLastNews() {
      $postdata = file_get_contents("php://input");
      $request = json_decode($postdata);
      $news = News::getNLastNews($request->n);
      header('Content-Type: application/json');
      echo json_encode($news, true);
      return true;
    }

}