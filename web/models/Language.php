<?php

require_once(ROOT."/components/Db.php");
class Language
{
    static function set($key){
        $_SESSION['user']['language'] = $key;
        return true;
    }

    static function get(){
    	$language = 'ua';
    	if(isset($_SESSION['user']['language'])){
    		$language = $_SESSION['user']['language'];
    	}
        return ['key'=>$language];
    }

    
}
