<?php

require_once(ROOT."/components/Db.php");
class Stores
{

    public static function getAddresses()
    {
        $db = Db::getConnection();
        $stmt = $db->prepare("SELECT * FROM `store-addresses`");
        $stmt->execute();
        while($data = $stmt->fetch( PDO::FETCH_ASSOC )){
           $addresses[] = array(
            "id"=>$data['id'],
            "lat"=>$data['lat'],
            "lng"=>$data['lng'],
            "content"=>$data['content'],
            "photo"=>$data['photo']
          );
        }
        return $addresses;
    }

    public static function update($data) {
        $db = Db::getConnection();
        print_r($data);
        foreach ($data as $marker) {
            try
            {
                if($marker->removed==1){
                    print('remove: '.$marker->id);
                    $stmt = $db->prepare("DELETE FROM `store-addresses` WHERE id=:id");
                    $stmt->bindparam(":id", $marker->id, PDO::PARAM_INT);
                    $stmt->execute();
                }else if($marker->id == null && $marker->removed==0){
                    $stmt = $db->prepare("INSERT INTO `store-addresses`(lat, lng, content) VALUES (:lat, :lng, :content) ");
                    $stmt->bindparam(":lat",$marker->lat, PDO::PARAM_STR);
                    $stmt->bindparam(":lng",$marker->lng, PDO::PARAM_STR);
                    $stmt->bindparam(":content",$marker->content, PDO::PARAM_STR);
                    $stmt->execute();
                }else{
                    $stmt = $db->prepare("UPDATE `store-addresses` set lat=:lat, lng=:lng, content=:content WHERE id=:id");
                    $stmt->bindparam(":id",$marker->id, PDO::PARAM_INT);
                    $stmt->bindparam(":lat",$marker->lat, PDO::PARAM_STR);
                    $stmt->bindparam(":lng",$marker->lng, PDO::PARAM_STR);
                    $stmt->bindparam(":content",$marker->content, PDO::PARAM_STR);
                    $stmt->execute();
                }
            }
            catch(PDOException $e)
            {
                return $e->getMessage();
            }
        }
        return true;
    }
}
