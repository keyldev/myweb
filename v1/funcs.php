<?php
class Functions
{
    private $conn;
    function __construct()
    {
        require_once 'connection.php';
        $connection = new SQLConnect();
    
        $this->conn = $connection->connect();
        //if($this->conn) echo ' \n[DEBUG]FILE funcs.php STARTED!';
    }

    public function getWorks()
    {
        $data = array();
        $works = mysqli_query($this->conn, "SELECT * FROM `works`");
        while($result = mysqli_fetch_array($works, MYSQLI_ASSOC))// Извлекает результирующий ряд в виде ассоциативного массива
        {
            $data[] = $result;
        }
        return $data;

    }


}



?>