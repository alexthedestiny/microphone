<?php

require_once(ROOT."/components/Db.php");

require 'Product.php';
class Cart
{
    static function add($id_product, $count){
        $db = Db::getConnection();
        if(isset($_SESSION['user_session'])){
        	$id_user = $_SESSION['user_session'];
        	$stmt = $db->prepare("insert into cart(id_user, id_product, count, created_at) values(:id_user, :id_product, :count, now())");
	        $stmt->bindparam(":id_user",$id_user, PDO::PARAM_INT);
	        $stmt->bindparam(":id_product",$id_product, PDO::PARAM_INT);
	        $stmt->bindparam(":count",$count, PDO::PARAM_INT);
	        $stmt->execute();
        }
        if( isset($_SESSION['user']['cart']) && !empty($_SESSION['user']['cart']) ){
        	$_SESSION['user']['cart'][] = ["id_product"=>$id_product, "count"=>$count];
        }else{
        	$_SESSION['user']['cart'] = [["id_product"=>$id_product, "count"=>$count]];
        }
        return true;
    }

    static function getCartByUserId($id_user){
    	$db = Db::getConnection();
    	$stmt = $db->prepare("SELECT * FROM cart WHERE id_user = :id_user");
    	$stmt->bindparam(":id_user",$id_user, PDO::PARAM_INT);
    	$stmt->execute();
    	$cart = [];
    	while($data = $stmt->fetch( PDO::FETCH_ASSOC )){
    		$cart[]=["id_product"=>$data['id_product'], "count"=>$data['count']];
    	}
    	$_SESSION['user']['cart'] = $cart;
    	return $cart;
    }

    static function getSessionCart(){
    	return $_SESSION['user']['cart'];
    }

    static function getSessionCartProducts(){
    	$products = [];
    	if (isset($_SESSION['user']['cart']) && !empty($_SESSION['user']['cart'])){
    		foreach ($_SESSION['user']['cart'] as $product_arr) {
    			$product = Product::getById($product_arr['id_product']);
    			$product['count']=$product_arr['count'];
    			$products[] = $product;
    		}
    	}
    	return $products;
    }
}
