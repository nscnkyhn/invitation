<?php

namespace enesnilaykayhan;

use PDO;
use PDOException;

class PostgresDB {
    private $pdo;

    // Constructor to create PDO connection
    public function __construct($dbname, $user, $password) {
        $dsn = "pgsql:host=localhost;port=5432;dbname=$dbname";
        try {
            $this->pdo = new PDO($dsn, $user, $password, [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,   // Throw exceptions on error
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC // Fetch assoc arrays by default
            ]);
        } catch (PDOException $e) {
            die("Connection failed: " . $e->getMessage());
        }
    }

    // Example: Run a SELECT query with optional parameters
    public function select($query, $params = []) {
        $stmt = $this->pdo->prepare($query);
        $stmt->execute($params);
        return $stmt->fetchAll();
    }

    public function selectOne($query, $params = []) {
        $stmt = $this->pdo->prepare($query);
        $stmt->execute($params);
        return $stmt->fetch();
    }

    // Example: Run INSERT/UPDATE/DELETE query with optional parameters
    public function execute($query, $params = []) {
        $stmt = $this->pdo->prepare($query);
        return $stmt->execute($params);
    }

    // Get last inserted ID (works with SERIAL or IDENTITY columns)
    public function lastInsertId() {
        return $this->pdo->lastInsertId();
    }

    // Optional: Close connection explicitly
    public function close() {
        $this->pdo = null;
    }
}
