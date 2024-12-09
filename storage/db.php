<?php
class TextStorage {
    private $db;

    public function __construct() {
        $this->db = new SQLite3('texts.db');
        $this->db->exec('
            CREATE TABLE IF NOT EXISTS texts (
                id TEXT PRIMARY KEY,
                content TEXT,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        ');
    }

    public function saveText($text) {
        $id = uniqid();  // Generate unique ID
        $stmt = $this->db->prepare('INSERT INTO texts (id, content) VALUES (:id, :content)');
        $stmt->bindValue(':id', $id, SQLITE3_TEXT);
        $stmt->bindValue(':content', $text, SQLITE3_TEXT);
        $stmt->execute();
        return $id;
    }

    public function getText($id) {
        $stmt = $this->db->prepare('SELECT content FROM texts WHERE id = :id');
        $stmt->bindValue(':id', $id, SQLITE3_TEXT);
        $result = $stmt->execute();
        $row = $result->fetchArray(SQLITE3_ASSOC);
        return $row ? $row['content'] : null;
    }
}
?>