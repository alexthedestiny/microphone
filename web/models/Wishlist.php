<?php

require_once(ROOT."/components/Db.php");
class Wishlist
{
    static function add($id_product, $count){
        $db = Db::getConnection();
        if(isset($_SESSION['user_session'])){
        	$id_user = $_SESSION['user_session'];
        	$stmt = $db->prepare("insert into wishlist(id_user, id_product, created_at) values(:id_user, :id_product, now())");
	        $stmt->bindparam(":id_user",$id_user, PDO::PARAM_INT);
	        $stmt->bindparam(":id_product",$id_product, PDO::PARAM_INT);
	        $stmt->execute();
        }
        if( isset($_SESSION['user']['wishlist']) && !empty($_SESSION['user']['wishlist']) ){
        	$_SESSION['user']['wishlist'][] = ["id_product"=>$id_product, "count"=>$count];
        }else{
        	$_SESSION['user']['wishlist'] = [["id_product"=>$id_product, "count"=>$count]];
        }
        return true;
    }

    static function getWishlistByUserId($id_user){
    	$db = Db::getConnection();
    	$stmt = $db->prepare("SELECT * FROM wishlist WHERE id_user = :id_user");
    	$stmt->bindparam(":id_user",$id_user, PDO::PARAM_INT);
    	$stmt->execute();
    	$wishlist = [];
    	while($data = $stmt->fetch( PDO::FETCH_ASSOC )){
    		$wishlist[]=["id_product"=>$data['id_product'], "count"=>$data['count']];;
    	}
    	$_SESSION['user']['wishlist'] = $wishlist;
    	return $wishlist;
    }

    static function getSessionWishlist(){
    	return $_SESSION['user']['wishlist'];
    }

    static function getSessionWishlistProducts(){
    	$products = [];
    	if (isset($_SESSION['user']['wishlist']) && !empty($_SESSION['user']['wishlist'])){
    		foreach ($_SESSION['user']['wishlist'] as $product_arr) {
    			$product = Product::getById($product_arr['id_product']);
    			$product['count']=$product_arr['count'];
    			$products[] = $product;
    		}
    	}
    	return $products;
    }
}
