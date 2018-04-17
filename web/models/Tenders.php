<?php

require_once(ROOT."/components/Db.php");
class Tenders
{
    /**
     * @param $name
     * @param $login
     * @param $email
     * @param $tel
     * @param $password
     * @return bool
     */
    public static function create($data)
    {
        $db = Db::getConnection();
        try
        {
            $stmt = $db->prepare('insert into tenders(title, price, photo, description, date_start, date_end, created_at) values(:title, :price, :photo, :description, :date_start, :date_end, now() )');
            $stmt->bindparam(":title",$data->title, PDO::PARAM_STR);
            $stmt->bindparam(":price",$data->price, PDO::PARAM_STR);
            $stmt->bindparam(":photo",$data->photo, PDO::PARAM_STR);
            $stmt->bindparam(":description",$data->description, PDO::PARAM_STR);
            $stmt->bindparam(":date_start",$data->date_start, PDO::PARAM_STR);
            $stmt->bindparam(":date_end",$data->date_end, PDO::PARAM_STR);
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

    public static function getAllTenders()
    {
        $db = Db::getConnection();
        $stmt = $db->prepare("SELECT * FROM tenders ORDER BY created_at DESC");
        $stmt->execute();
        while($data = $stmt->fetch( PDO::FETCH_ASSOC )){
           $allTenders[] = array(
            "id"=>$data['id'],
            "photo"=>$data['photo'],
            "title"=>$data['title'],
            "description"=>$data['description'],
            "price"=>$data['price'],
            "date_start"=>$data['date_start'],
            "date_end"=>$data['date_end'],
            "created_at"=>$data['created_at']
          );
        }
        return $allTenders;
    }


    public static function getTendersById($id)
    {
        $db = Db::getConnection();
        $stmt = $db->prepare("SELECT * FROM tenders where id=:id ");
        $stmt->bindparam(":id",$id, PDO::PARAM_INT);
        $stmt->execute();
        $data = $stmt->fetch(PDO::FETCH_ASSOC);
        $tenders = array(
            "id"=>$data['id'],
            "photo"=>$data['photo'],
            "title"=>$data['title'],
            "description"=>$data['description'],
            "price"=>$data['price'],
            "date_start"=>$data['date_start'],
            "date_end"=>$data['date_end'],
            "created_at"=>$data['created_at']
          );

        return $tenders;
    }

    public static function updateTenders($data) {
        $db = Db::getConnection();
        try
        {
            $stmt = $db->prepare("UPDATE tenders set title=:title, price=:price, photo=:photo, description=:description, date_start=:date_start, date_end=:date_end WHERE id=:id");
            $stmt->bindparam(":id", $data->id, PDO::PARAM_INT);
            $stmt->bindparam(":title",$data->title, PDO::PARAM_STR);
            $stmt->bindparam(":price",$data->price, PDO::PARAM_STR);
            $stmt->bindparam(":photo",$data->photo, PDO::PARAM_STR);
            $stmt->bindparam(":description",$data->description, PDO::PARAM_STR);
            $stmt->bindparam(":date_start",$data->date_start, PDO::PARAM_STR);
            $stmt->bindparam(":date_end",$data->date_end, PDO::PARAM_STR);
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

    
    public static function removeTenders($id)
     {
        $db = Db::getConnection();
        try{
            $stmt = $db->prepare("DELETE from tenders WHERE id=:id");

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
