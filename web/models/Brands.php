<?php

require_once(ROOT."/components/Db.php");
class Brands
{
    static function getBrands(){
        $db = Db::getConnection();
        $brands = [];
        $stmt = $db->prepare("SELECT * FROM brands");
        $stmt->execute();
        while($data = $stmt->fetch( PDO::FETCH_ASSOC )){
           $brands[] = $data;
        }
        return $brands;
    }

    static function getBrandById($id){
        $db = Db::getConnection();
        $brand = [];
        $stmt = $db->prepare("SELECT * FROM brands WHERE id=:id");
        $stmt->bindparam(":id",$id, PDO::PARAM_INT);
        $stmt->execute();
        while($data = $stmt->fetch( PDO::FETCH_ASSOC )){
           $brand = $data;
        }
        return $brand;
    }

    static function addBrand($brand){
        $db = Db::getConnection();
        $stmt = $db->prepare("insert into brands(title, description, photo) values(:title, :description, :photo)");
        $stmt->bindparam(":title",$brand->title, PDO::PARAM_STR);
        $stmt->bindparam(":description",$brand->description, PDO::PARAM_STR);
        $stmt->bindparam(":photo",$brand->photo, PDO::PARAM_STR);
        $stmt->execute();
        return true;
    }

    static function removeBrand($id){
        $db = Db::getConnection();
        $stmt = $db->prepare("DELETE FROM brands WHERE id=:id");
        $stmt->bindparam(":id",$id, PDO::PARAM_INT);
        $stmt->execute();
        return true;
    }

    static function editBrand($brand){
        $db = Db::getConnection();
        $stmt = $db->prepare("UPDATE brands SET title=:title, description=:description, photo=:photo WHERE id=:id");
        $stmt->bindparam(":id",$brand->id, PDO::PARAM_INT);
        $stmt->bindparam(":title",$brand->title, PDO::PARAM_STR);
        $stmt->bindparam(":description",$brand->description, PDO::PARAM_STR);
        $stmt->bindparam(":photo",$brand->photo, PDO::PARAM_STR);
        $stmt->execute();
        return true;
    }
}
