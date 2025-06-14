<?php
include "database/EnesNilayKayhanDB.php";

use enesnilaykayhan\EnesNilayKayhanDB;

$db = new EnesNilayKayhanDB();
var_dump($db->select("SELECT 10"));


include 'index.html';