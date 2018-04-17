<?php

require_once(ROOT."/components/Db.php");
class News
{
    /**
     * @param $name
     * @param $login
     * @param $email
     * @param $tel
     * @param $password
     * @return bool
     */
    public static function create($newsData)
    {
        $db = Db::getConnection();

        try
        {
            $stmt = $db->prepare("insert into news(category, title, description, photo, created_at) values(:category, :title, :description, :photo, now())");
            $stmt->bindparam(":category",$newsData->category, PDO::PARAM_STR);
            $stmt->bindparam(":title",$newsData->title, PDO::PARAM_STR);
            $stmt->bindparam(":description",$newsData->description, PDO::PARAM_STR);
            $stmt->bindparam(":photo",$newsData->photo, PDO::PARAM_STR);
            $stmt->execute();
            if($stmt->rowCount() == 1)
            {
                return true;
            }
            else {
                return $stmt->errorInfo();
            }
        }

        catch(PDOException $e)
        {
            echo $e->getMessage();
            return false;
        }
    }

    public static function getAllNews()
    {
        $db = Db::getConnection();
        $stmt = $db->prepare("SELECT * FROM news");
        $stmt->execute();
        while($data = $stmt->fetch( PDO::FETCH_ASSOC )){
           $allNews[] = array(
                "id"=>$data['id'],
                "title"=>$data['title'],
                "category"=>$data['category'],
                "photo"=>$data['photo'],
                "description"=>$data['description'],
                "created_at"=>$data['created_at']
            );
        }
        return array_reverse($allNews);
    }


    public static function getNewsById($id)
    {
        $db = Db::getConnection();
        $stmt = $db->prepare("SELECT * FROM news where id=:id ");
        $stmt->bindparam(":id",$id, PDO::PARAM_INT);
        $stmt->execute();
        $data = $stmt->fetch(PDO::FETCH_ASSOC);
        $news = array(
            "id"=>$data['id'],
            "title"=>$data['title'],
            "category"=>$data['category'],
            "photo"=>$data['photo'],
            "description"=>$data['description'],
            "created_at"=>$data['created_at']
        );
        return $news;
    }

    public static function getNewsByCategory($id, $page, $items_in_page){
        $start = $items_in_page * ($page-1);
        $db = Db::getConnection();
        $stmt = $db->prepare("SELECT COUNT(*) FROM news WHERE category = :id");
        $stmt->bindparam(":id",$id, PDO::PARAM_INT);
        $stmt->execute();
        $d = $stmt->fetch( PDO::FETCH_ASSOC );
        $result['item_count'] = (integer)$d['COUNT(*)'];
        $result['max_page'] = ceil($d['COUNT(*)']/$items_in_page);
        $stmt = $db->prepare("SELECT * FROM news WHERE category = :id ORDER BY created_at DESC LIMIT :start, :items");
        $stmt->bindparam(":id",$id, PDO::PARAM_INT);
        $stmt->bindparam(":start",$start, PDO::PARAM_INT);
        $stmt->bindparam(":items",$items_in_page, PDO::PARAM_INT);
        $stmt->execute();
        $result['category_id'] = $id;
        $result['page'] = $page;
        $result['start'] = $start;
        $news = [];
        while($data = $stmt->fetch( PDO::FETCH_ASSOC )){
            $news[] = array(
                "id"=>$data['id'],
                "title"=>$data['title'],
                "category"=>$data['category'],
                "photo"=>$data['photo'],
                "description"=>$data['description'],
                "created_at"=>$data['created_at']
            );
        }
        $result['news'] = $news;
        return array_reverse($result, true);
    }

    public static function getNLastNews($n)
    {
        $db = Db::getConnection();
        $stmt = $db->prepare("SELECT * FROM news ORDER BY created_at DESC LIMIT :n");
        $stmt->bindparam(":n",$n, PDO::PARAM_INT);
        $stmt->execute();
        while($data = $stmt->fetch( PDO::FETCH_ASSOC )){
            $news[] = array(
                "id"=>$data['id'],
                "title"=>$data['title'],
                "category"=>$data['category'],
                "photo"=>$data['photo'],
                "description"=>$data['description'],
                "created_at"=>$data['created_at']
            );
        }
        if(isset($news)){
            return $news;
        }else{
            return [];
        }
    }


    public static function updateNews($newsData) {
        $db = Db::getConnection();
        
        try
        {
            $stmt = $db->prepare("UPDATE news set category=:category, title=:title, description=:description, photo=:photo WHERE id=:id");
            $stmt->bindparam(":id", $newsData->id, PDO::PARAM_INT);
            $stmt->bindparam(":category",$newsData->category, PDO::PARAM_STR);
            $stmt->bindparam(":title",$newsData->title, PDO::PARAM_STR);
            $stmt->bindparam(":description",$newsData->description, PDO::PARAM_STR);
            $stmt->bindparam(":photo",$newsData->photo, PDO::PARAM_STR);
            $stmt->execute();
            if($stmt->rowCount() == 1)
            {
                return true;
            }
            else
            {
                return $stmt->errorInfo();
            }
        }
        catch(PDOException $e)
        {
            return $e->getMessage();
        }
    }

     public static function removeNews($id)
     {
        $db = Db::getConnection();
        try{
            $stmt = $db->prepare("DELETE from news WHERE id=:id");

            $stmt->bindparam(":id", $id, PDO::PARAM_INT);

            $stmt->execute();
            if($stmt->rowCount() == 1)
            {
                return true;
            }
            else
            {
                return $stmt->errorInfo();
            }
        }catch(PDOException $e){
            return $e->getMessage();
        }
     }
}
