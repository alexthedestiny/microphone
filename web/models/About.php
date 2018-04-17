<?php

require_once(ROOT."/components/Db.php");
class About
{
    public static function getAbout()
    {
        $id = 1;
        $db = Db::getConnection();
        $stmt = $db->prepare("SELECT * FROM about where id=:id ");
        $stmt->bindparam(":id",$id, PDO::PARAM_INT);
        $stmt->execute();
        $data = $stmt->fetch(PDO::FETCH_ASSOC);
        $about = array(
            "id"=>$data['id'],
            "post"=>$data['post']
        );

        return $about;
    }

    public static function update($data) {
        $db = Db::getConnection();
        try
        {
            $stmt = $db->prepare("UPDATE about set post=:post WHERE id=:id");
            $stmt->bindparam(":id", $data->id, PDO::PARAM_INT);
            $stmt->bindparam(":post", $data->post, PDO::PARAM_INT);
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
}
