<?php

class CartController
{
    public function actionAdd(){
    	if( file_get_contents("php://input") !== "" ) {
	        $postdata = file_get_contents("php://input");
	        $request = json_decode($postdata);
	        print(json_encode(Cart::add($request->id_product, $request->count)));
	    }
	    return true;
    }

    public function actionGetSessionCart(){
    	print(json_encode(Cart::getSessionCart()));
    	return true;
    }

    public function actionGetSessionCartProducts(){
    	print(json_encode(Cart::getSessionCartProducts()));
    	return true;
    }

    public function actionRemoveProduct(){
    	if( file_get_contents("php://input") !== "" ) {
	        $postdata = file_get_contents("php://input");
	        $request = json_decode($postdata);
	        print(json_encode(Cart::removeProduct($request->id_product)));
	    }
    	return true;
    }
}

?>