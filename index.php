<?php

include "database/EnesNilayKayhanDB.php";
use enesnilaykayhan\EnesNilayKayhanDB;
session_start(['cookie_lifetime' => 10368000]);
$db = new EnesNilayKayhanDB();
$weddingGuest = $db->selectOne("SELECT * FROM wedding_guests WHERE session_id = :session_id AND NOT is_deleted;", ['session_id' => session_id()]);
$ceremonyGuest = $db->selectOne("SELECT * FROM ceremony_guests WHERE session_id = :session_id AND NOT is_deleted;", ['session_id' => session_id()]);

$html = file_get_contents("index.html");
$html = str_replace([
    "{{weddingGuestName}}",
    "{{weddingGuestCount}}",
    "{{weddingPopupAction}}",
    "{{weddingSaveButtonValue}}",
    "{{weddingGuestId}}",
    "{{ceremonyGuestName}}",
    "{{ceremonyGuestCount}}",
    "{{ceremonyPopupAction}}",
    "{{ceremonySaveButtonValue}}",
    "{{ceremonyGuestId}}"
], [
    $weddingGuest['guest_name'] ?? "",
    $weddingGuest['guest_count'] ?? "",
    empty($weddingGuest) ? "Ekle" : "Güncelle",
    empty($weddingGuest) ? "addGuest" : "updateGuest",
    $weddingGuest["id"] ?? "0",
    $ceremonyGuest['guest_name'] ?? "",
    $ceremonyGuest['guest_count'] ?? "",
    empty($ceremonyGuest) ? "Ekle" : "Güncelle",
    empty($ceremonyGuest) ? "addGuest" : "updateGuest",
    $ceremonyGuest["id"] ?? "0",
], $html);

echo $html;