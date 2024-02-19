<?php

class Database
{

    public static $connection;

    public static function setUpConnection()
    {
        if (!isset(Database::$connection)) {
            Database::$connection =
                new mysqli("localhost", "root", "IharaThathsara31@#", "mynote");


            Database::$connection->set_charset("utf8");
        }
    }

    public static function iud($q, $types = null, $values = null)
    {
        Database::setUpConnection();
        $stmt = mysqli_prepare(Database::$connection, $q);
        if ($types != null && $values != null) {
            $stmt->bind_param($types, ...$values);
        }
        $stmt->execute();
    }

    public static function search($q, $types = null, $values = null)
    {
        Database::setUpConnection();
        $stmt = mysqli_prepare(Database::$connection, $q);
        if ($types != null && $values != null) {
            $stmt->bind_param($types, ...$values);
        }
        $stmt->execute();
        $resultset = $stmt->get_result();
        return $resultset;
    }
}
