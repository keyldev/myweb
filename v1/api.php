<?php
    include 'funcs.php';
    $db = new Functions();
    $result = array();
    $result = $db->getInfo();
    echo json_encode($result);
?>