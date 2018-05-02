<?php
    session_start();
    if(isset($_SESSION['lastname']) && isset($_SESSION['firstname'])) {
    	echo $_SESSION['lastname'] . ', ' . $_SESSION['firstname'];
    }
?>