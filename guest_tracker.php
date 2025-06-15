<?php

include "database/EnesNilayKayhanDB.php";
use enesnilaykayhan\EnesNilayKayhanDB;

session_start(['cookie_lifetime' => 10368000]);
$sessionId = session_id();

$db = new EnesNilayKayhanDB();
$guestName = $_POST["guestName"];
if (empty($guestName)) {
    echo "İsim soyisim girmek zorunludur.";
    return;
}

$guestCount = $_POST["guestCount"];
if (empty($guestCount)) {
    echo "Misafir sayısı girmek zorunludur.";
    return;
}

$type = $_POST["type"];
$table = "";
if (empty($type)) {
    echo "";
    return;
} else if ($type == "wedding") {
    $table = "wedding_guests";
} else if ($type == "ceremony") {
    $table = "ceremony_guests";
}

$action = $_POST["action"];
if (empty($action)) {
    echo "";
    return;
}

$additionalGuestNames = $_POST["additionalGuestNames"];
$clientIp = $_SERVER["REMOTE_ADDR"];

if ($action == "addGuest") {
    $db->execute("INSERT INTO $table (client_ip, guest_name, guest_count, additional_guest_names, session_id) VALUES (:clientIp, :guestName, :guestCount, :additionalGuestNames, :sessionId);", [$clientIp, $guestName, $guestCount, $additionalGuestNames, $sessionId]);
    echo "addGuest ok";
    return;
}

if ($action == "updateGuest") {
    $guestId = $_POST['guestId'];
    $record = $db->selectOne("SELECT * FROM $table WHERE id = '$guestId'");

    if (empty($record)) {
        echo "Güncellenecek kayıt bulunamadı.";
        return;
    }

    $guestName = $guestName != $record['guest_name'] ? $guestName : $record['guest_name'];
    $guestCount = $guestCount != $record['guest_count'] ? $guestCount : $record['guest_count'];
    $clientIp = $clientIp != $record['client_ip'] ? $clientIp : $record['client_ip'];
    $additionalGuestNames = $additionalGuestNames != $record['additional_names'] ? $additionalGuestNames : $record['additional_names'];

    var_dump($guestCount);
    $db->execute("UPDATE $table SET client_ip = :clientIp, guest_name = :guest_name, guest_count = :guest_count, additional_guest_names = :additional_guest_names WHERE id = :id;", [$clientIp, $guestName, $guestCount, $additionalGuestNames, $guestId]);
    echo "updateGuest ok";
    return;
}

if ($action == "deleteGuest") {
    $guestId = $_POST['guestId'];
    $db->execute("UPDATE $table SET is_deleted = true WHERE id = :id", [$guestId]);
    echo "deleteGuest ok";
    return;
}