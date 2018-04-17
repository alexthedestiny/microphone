<?php

class LanguageController
{
    public function actionSetLanguage(){
    	if( file_get_contents("php://input") !== "" ) {
	        $postdata = file_get_contents("php://input");
	        $request = json_decode($postdata);
	        print(json_encode(Language::set($request->key)));
	    }
	    return true;
    }

    public function actionGetLanguage(){
        print(json_encode(Language::get()) );
        return true;
    }
}
?>