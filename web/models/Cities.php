<?php

require_once(ROOT."/components/Db.php");
class Cities
{
    static function getAll(){
        $db = Db::getConnection();
        $brands = [];
        $stmt = $db->prepare("SELECT * FROM cities");
        $stmt->execute();
        while($data = $stmt->fetch( PDO::FETCH_ASSOC )){
           $brands[] = $data;
        }
        return $brands;
    }

    
}
