<?php

/**
 * Created by PhpStorm.
 * User: Alexandr
 * Date: 11.02.2017
 * Time: 20:55
 */
class Chat
{
    public $chats = [];

    public function showChatBox($user_id) {
        return $chat = include ROOT."/views/layouts/chatBox1.php";
    }

    public function activeChats() {
        return isset($_SESSION['chats']) ? $_SESSION['chats'] : [];
    }

    public function addChat($id)
    {
        $_SESSION['chats'] = $id;
        return true;
    }

    public function removeChat($id)
    {
        $this->chats = isset($_SESSION['chats']) ? $_SESSION['chats'] : [];

        if (in_array($id, $this->chats)){
            unset($this->chats[$id]);
        }
        $_SESSION['chats'] = $this->chats;

    }
}