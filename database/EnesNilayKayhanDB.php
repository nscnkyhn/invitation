<?php

namespace enesnilaykayhan;

include "PostgreDB.php";

class EnesNilayKayhanDB extends PostgresDB
{
    public function __construct()
    {
        $dbConfig = require __DIR__ . '/../secrets/db_configs.php';
        parent::__construct($dbConfig["dbname"], $dbConfig["user"], $dbConfig["password"]);
    }

}