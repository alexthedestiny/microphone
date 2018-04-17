<?php

class CitiesController
{
    public function actionGetAll(){
        print(json_encode(Cities::getAll()));
        return true;
    }

}
