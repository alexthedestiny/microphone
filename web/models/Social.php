<?php

require_once(ROOT."/components/Db.php");
class Social
{
    public static function getSocial()
    {
        $id = 1;
        $db = Db::getConnection();
        $stmt = $db->prepare("SELECT * FROM social_responsibility where id=:id ");
        $stmt->bindparam(":id",$id, PDO::PARAM_INT);
        $stmt->execute();
        $data = $stmt->fetch(PDO::FETCH_ASSOC);
        $social_responsibility = array(
            "id"=>$data['id'],
            "post"=>$data['post']
        );

        return $social_responsibility;
    }

    public static function update($data) {
        $db = Db::getConnection();
        try
        {
            $stmt = $db->prepare("UPDATE social_responsibility set post=:post WHERE id=:id");
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
