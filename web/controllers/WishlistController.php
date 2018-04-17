<?php

class WishlistController
{
    public function actionAdd(){
    	if( file_get_contents("php://input") !== "" ) {
	        $postdata = file_get_contents("php://input");
	        $request = json_decode($postdata);
	        print(json_encode(Wishlist::add($request->id_product, $request->count)));
	    }
	    return true;
    }

    public function actionGetSessionWishlist(){
    	print(json_encode(Wishlist::getSessionWishlist()));
    	return true;
    }

    public function actionGetSessionWishlistProducts(){
    	print(json_encode(Wishlist::getSessionWishlistProducts()));
    	return true;
    }
}
?>