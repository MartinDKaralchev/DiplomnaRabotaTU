<?php
header('Content-Type: application/json');

$post_id = $_GET['post_id'];

// Свързване към базата данни
$conn = new mysqli('localhost', 'root', '', 'blog');

if ($conn->connect_error) {
    die('Connection failed: ' . $conn->connect_error);
}

// Подготвяне на заявката
$sql = "SELECT id, name, comment FROM comments WHERE post_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param('i', $post_id);
$stmt->execute();
$result = $stmt->get_result();

// Извличане на резултатите
$comments = [];
while ($row = $result->fetch_assoc()) {
    $comments[] = $row;
}

echo json_encode(['success' => true, 'comments' => $comments]);

// Затваряне на връзката
$stmt->close();
$conn->close();
?>
