<?php

require_once(ROOT."/components/Db.php");
class PublicInform
{
    public static function getPublic()
    {
        $id = 1;
        $db = Db::getConnection();
        $stmt = $db->prepare("SELECT * FROM public_information where id=:id ");
        $stmt->bindparam(":id",$id, PDO::PARAM_INT);
        $stmt->execute();
        $data = $stmt->fetch(PDO::FETCH_ASSOC);
        $public_information = array(
            "id"=>$data['id'],
            "post"=>$data['post']
        );

        return $public_information;
    }

    public static function update($data) {
        $db = Db::getConnection();
        try
        {
            $stmt = $db->prepare("UPDATE public_information set post=:post WHERE id=:id");
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
