<?php

require_once(ROOT."/components/Db.php");
class Product
{

    public static function add($product){
        $db = Db::getConnection();
        try
        {
            $stmt = $db->prepare("insert into catalog(title, description, price, id_category, id_subcategory, photo, availability, age_restrictions, brand_id, dimensions, size, vendor, created_at) values(:title, :description, :price, :id_category, :id_subcategory, :photo, :availability, :age_restrictions, :brand_id, :dimensions, :size, :vendor, now())");
            $availability = json_encode($product->availability);
            $stmt->bindparam(":title",$product->title, PDO::PARAM_STR);
            $stmt->bindparam(":description",$product->description, PDO::PARAM_STR);
            $stmt->bindparam(":price",$product->price, PDO::PARAM_STR);
            $stmt->bindparam(":id_category",$product->id_category, PDO::PARAM_STR);
            $stmt->bindparam(":id_subcategory",$product->id_subcategory, PDO::PARAM_STR);
            $stmt->bindparam(":photo",$product->photo, PDO::PARAM_STR);
            $stmt->bindparam(":availability",$availability, PDO::PARAM_STR);
            $stmt->bindparam(":age_restrictions",$product->age_restrictions, PDO::PARAM_STR);
            $stmt->bindparam(":brand_id",$product->brand_id, PDO::PARAM_STR);
            $stmt->bindparam(":dimensions",$product->dimensions, PDO::PARAM_STR);
            $stmt->bindparam(":size",$product->size, PDO::PARAM_STR);
            $stmt->bindparam(":vendor",$product->vendor, PDO::PARAM_STR);
            $stmt->execute();
            if($stmt->rowCount() == 1)
            {
                $id_product = $db->lastInsertId();
                if(isset($product->gallery) &&!empty($product->gallery)){
                    $count_gallery = count($product->gallery);
                    $count_inserted = 0;
                    foreach ($product->gallery as $photo) {
                        $stmt = $db->prepare("insert into gallery(id_product, photo) values(:id_product, :photo)");
                        $stmt->bindparam(":id_product",$id_product, PDO::PARAM_INT);
                        $stmt->bindparam(":photo",$photo, PDO::PARAM_STR);
                        $stmt->execute();  
                        if($stmt->rowCount() == 1){
                            $count_inserted++;
                        }
                    }
                    if($count_inserted == $count_gallery){
                        return true;
                    }
                }else{
                    return true;  
                }
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

    public static function edit($product){
        $db = Db::getConnection();
        try
        {
            $stmt = $db->prepare("UPDATE catalog SET title=:title, description=:description, price=:price, id_category=:id_category, id_subcategory=:id_subcategory, photo=:photo, availability=:availability, age_restrictions=:age_restrictions, brand_id=:brand_id, dimensions=:dimensions, size=:size, vendor=:vendor WHERE id=:id");
            $availability = json_encode($product->availability);
            $stmt->bindparam(":title",$product->title, PDO::PARAM_STR);
            $stmt->bindparam(":description",$product->description, PDO::PARAM_STR);
            $stmt->bindparam(":price",$product->price, PDO::PARAM_STR);
            $stmt->bindparam(":id_category",$product->id_category, PDO::PARAM_STR);
            $stmt->bindparam(":id_subcategory",$product->id_subcategory, PDO::PARAM_STR);
            $stmt->bindparam(":photo",$product->photo, PDO::PARAM_STR);
            $stmt->bindparam(":availability",$availability, PDO::PARAM_STR);
            $stmt->bindparam(":age_restrictions",$product->age_restrictions, PDO::PARAM_STR);
            $stmt->bindparam(":brand_id",$product->brand_id, PDO::PARAM_STR);
            $stmt->bindparam(":dimensions",$product->dimensions, PDO::PARAM_STR);
            $stmt->bindparam(":size",$product->size, PDO::PARAM_STR);
            $stmt->bindparam(":vendor",$product->vendor, PDO::PARAM_STR);
            $stmt->bindparam(":id",$product->id, PDO::PARAM_INT);
            $stmt->execute();
            if($stmt->rowCount() == 1)
            {
                if(isset($product->gallery) &&!empty($product->gallery)){
                    $count_gallery = count($product->gallery);
                    $count_inserted = 0;

                    $stmt = $db->prepare("DELETE FROM gallery WHERE id_product=:id_product");
                    $stmt->bindparam(":id_product",$product->id, PDO::PARAM_INT);
                    $stmt->execute();

                    foreach ($product->gallery as $photo) {
                        $stmt = $db->prepare("insert into gallery(id_product, photo) values(:id_product, :photo)");
                        $stmt->bindparam(":id_product",$product->id, PDO::PARAM_INT);
                        $stmt->bindparam(":photo",$photo, PDO::PARAM_STR);
                        $stmt->execute();  
                        if($stmt->rowCount() == 1){
                            $count_inserted++;
                        }
                    }
                    if($count_inserted == $count_gallery){
                        return true;
                    }
                }else{
                    return true;  
                }
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

    public static function getAllProducts()
    {
        $db = Db::getConnection();
        $stmt = $db->prepare("SELECT * FROM catalog ORDER BY created_at DESC");
        $stmt->execute();
        $all_products = [];
        while($data = $stmt->fetch( PDO::FETCH_ASSOC )){
           $all_products[] = array(
            "id"=>$data['id'],
            "title"=>$data['title'],
            "description"=>$data['description'],
            "price"=>$data['price'],
            "photo"=>$data['photo'],
            "availability"=>Product::getAvailibleStores(json_decode($data['availability'])),
            "created_at"=>$data['created_at'],
            "gallery"=>Product::getProductGallery($data['id'])
          );
        }
        return $all_products;
    }

    public static function getById($id)
    {
        $db = Db::getConnection();
        $stmt = $db->prepare("SELECT * FROM catalog WHERE id=:id");
        $stmt->bindparam(":id", $id, PDO::PARAM_INT);
        $stmt->execute();
        $product = [];
        while($data = $stmt->fetch( PDO::FETCH_ASSOC )){
            $product = array(
                "id"=>$data['id'],
                "title"=>$data['title'],
                "description"=>$data['description'],
                "price"=>$data['price'],
                "photo"=>$data['photo'],
                "availability"=>Product::getAvailibleStores(json_decode($data['availability'])),
                "created_at"=>$data['created_at'],
                "gallery"=>Product::getProductGallery($data['id']),
                "vendor"=>$data['vendor'],
                "dimensions"=>$data['dimensions'],
                "size"=>$data['size'],
                "brand_id"=>$data['brand_id'],
                "age_restrictions"=>$data['age_restrictions'],
                "brand"=>Product::getProductBrand($data['brand_id']),
                "id_category"=>$data['id_category'],
                "id_subcategory"=>$data['id_subcategory'],
                "categories"=>Product::getProductCategories($data['id_category'], $data['id_subcategory'])
            );
        }
        return $product;
    }


    //heplers
    static function getProductGallery($id_product){
        $db = Db::getConnection();
        $stmt = $db->prepare("SELECT * FROM gallery WHERE id_product=:id_product");
        $stmt->bindparam(":id_product", $id_product, PDO::PARAM_INT);
        $stmt->execute();
        $product_gallery = [];
        while($data = $stmt->fetch( PDO::FETCH_ASSOC )){
           $product_gallery[] = $data['photo'];
        }
        return $product_gallery;
    }

    static function getProductBrand($brand_id){
        $product_brand = null;
        if($brand_id){
            $db = Db::getConnection();
            $stmt = $db->prepare("SELECT title FROM brands WHERE id=:brand_id");
            $stmt->bindparam(":brand_id", $brand_id, PDO::PARAM_INT);
            $stmt->execute();
            while($data = $stmt->fetch( PDO::FETCH_ASSOC )){
               $product_brand = $data['title'];
            }
        } 
        return $product_brand;
    }

    static function getProductCategories($id_category, $id_subcategory){
        $categories = null;
        if($id_category && $id_subcategory){
            $db = Db::getConnection();
            $stmt = $db->prepare("SELECT product_categories.title AS category_title, product_subcategories.title AS subcategory_title FROM product_categories INNER JOIN product_subcategories ON product_categories.id = :id_category AND product_subcategories.id = :id_subcategory");
            $stmt->bindparam(":id_subcategory", $id_subcategory, PDO::PARAM_INT);
            $stmt->bindparam(":id_category", $id_category, PDO::PARAM_INT);
            $stmt->execute();
            while($data = $stmt->fetch( PDO::FETCH_ASSOC )){
               $categories = $data;
            }
        } 
        return $categories;
    }

    static function getAvailibleStores($availability_array){
        //для конкретного продукту
        $db = Db::getConnection();
        $stores = [];
        if(isset($availability_array) && !empty($availability_array)){
            foreach ($availability_array as $store_id) {
                $stmt = $db->prepare("SELECT cities.title AS city_title, `store-addresses`.lat, `store-addresses`.lng, stores.title AS store_title, stores.id AS store_id FROM ((stores INNER JOIN `store-addresses` ON stores.id = :store_id  AND `store-addresses`.id = stores.address_id) INNER JOIN cities ON cities.id = stores.city_id )");
                $stmt->bindparam(":store_id", $store_id, PDO::PARAM_INT);
                $stmt->execute();
                while($data = $stmt->fetch( PDO::FETCH_ASSOC )){
                   $stores[] = $data;
                }
            }
        }
        return($stores);
    }

    static function getStoresList(){
        $db = Db::getConnection();
        $stores = [];
        $stmt = $db->prepare("SELECT cities.title AS city_title, `store-addresses`.lat, `store-addresses`.lng, stores.title AS store_title, stores.id AS store_id FROM ((stores INNER JOIN `store-addresses` ON `store-addresses`.id = stores.address_id) INNER JOIN cities ON cities.id = stores.city_id )");
        $stmt->execute();
        while($data = $stmt->fetch( PDO::FETCH_ASSOC )){
           $stores[] = $data;
        }
        return($stores);
    }

    static function getCategories(){
        $db = Db::getConnection();
        $categories = [];
        $stmt = $db->prepare("SELECT product_categories.id AS id_category, product_categories.title AS category_title, product_subcategories.id AS id_subcategory, product_subcategories.title AS subcategory_title FROM product_subcategories INNER JOIN product_categories ON product_subcategories.id_category = product_categories.id");
        $stmt->execute();
        while($data = $stmt->fetch( PDO::FETCH_ASSOC )){
           $categories[] = $data;
        }
        return($categories);
    }

}
