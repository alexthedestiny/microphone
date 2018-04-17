<?php

require_once(ROOT."/components/Db.php");
class Vacancies
{
    /**
     * @param $name
     * @param $login
     * @param $email
     * @param $tel
     * @param $password
     * @return bool
     */
    public static function create($data)
    {
        $db = Db::getConnection();
        try
        {
            $stmt = $db->prepare('insert into vacancies(title, salary, photo, description, created_at) values(:title, :salary, :photo, :description, now() )');
            $stmt->bindparam(":title",$data->title, PDO::PARAM_STR);
            $stmt->bindparam(":salary",$data->salary, PDO::PARAM_STR);
            $stmt->bindparam(":description",$data->description, PDO::PARAM_STR);
            $stmt->bindparam(":photo",$data->photo, PDO::PARAM_STR);
            $stmt->execute();
            if($stmt->rowCount() == 1)
            {
                return true;
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

    public static function getAllVacancies()
    {
        $db = Db::getConnection();
        $stmt = $db->prepare("SELECT * FROM vacancies ORDER BY created_at DESC");
        $stmt->execute();
        while($data = $stmt->fetch( PDO::FETCH_ASSOC )){
           $allVacancies[] = array(
            "id"=>$data['id'],
            "photo"=>$data['photo'],
            "title"=>$data['title'],
            "description"=>$data['description'],
            "salary"=>$data['salary'],
            "created_at"=>$data['created_at']
          );
        }
        return $allVacancies;
    }


    public static function getVacanciesById($id)
    {
        $db = Db::getConnection();
        $stmt = $db->prepare("SELECT * FROM vacancies where id=:id ");
        $stmt->bindparam(":id",$id, PDO::PARAM_INT);
        $stmt->execute();
        $data = $stmt->fetch(PDO::FETCH_ASSOC);
        $vacancies = array(
            "id"=>$data['id'],
            "photo"=>$data['photo'],
            "title"=>$data['title'],
            "description"=>$data['description'],
            "salary"=>$data['salary'],
            "created_at"=>$data['created_at']
        );

        return $vacancies;
    }

    public static function updateVacancies($data) {
        $db = Db::getConnection();
        try
        {
            $stmt = $db->prepare("UPDATE vacancies set title=:title, salary=:salary, photo=:photo, description=:description WHERE id=:id");
            $stmt->bindparam(":id", $data->id, PDO::PARAM_INT);
            $stmt->bindparam(":title",$data->title, PDO::PARAM_STR);
            $stmt->bindparam(":salary",$data->salary, PDO::PARAM_STR);
            $stmt->bindparam(":description",$data->description, PDO::PARAM_STR);
            $stmt->bindparam(":photo",$data->photo, PDO::PARAM_STR);
            $stmt->execute();
            if($stmt->rowCount() == 1)
            {
                return true;
            }
            else
            {
                return $stmt->errorInfo();
            }
        }
        catch(PDOException $e)
        {
            return $e->getMessage();
        }
    }

    
    public static function removeVacancies($id)
     {
        $db = Db::getConnection();
        try{
            $stmt = $db->prepare("DELETE from vacancies WHERE id=:id");

            $stmt->bindparam(":id", $id, PDO::PARAM_INT);

            $stmt->execute();
            
            if($stmt->rowCount() == 1)
            {
                return true;
            }
            else
            {
                return $stmt->errorInfo();
            }
        }catch(PDOException $e){
            return $e->getMessage();
        }
     }


    public static function Encode($file){
        require (ROOT.'/vendor/autoload.php');

        $ffmpeg = FFMpeg\FFMpeg::create();
        $audio = $ffmpeg->open(ROOT.'/'.$file);

        $format = new FFMpeg\Format\Audio\Flac();
        // $format->on('progress', function ($audio, $format, $percentage) {
        //     echo "$percentage % transcoded";
        // });

        $format
            ->setAudioChannels(1)
            ->setAudioKiloBitrate(256);

        $audio->save($format, 'track.flac');
        return ['file'=>'track.flac'];
    }
}
