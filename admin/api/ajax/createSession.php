<?php
    session_start();
    if(!isset($_SESSION['user_id'])) {
        $_SESSION['user_id'] = $_POST['user_id'];
        $_SESSION['firstname'] = $_POST['firstname'];
        $_SESSION['lastname'] = $_POST['lastname'];
        echo true;
    }
?>