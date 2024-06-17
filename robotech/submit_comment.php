<?php
header('Content-Type: application/json');

// Получаване на данните от заявката
$name = $_POST['name'];
$email = $_POST['email'];
$comment = $_POST['comment'];
$post_id = $_POST['post_id'];

// Валидиране на email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'message' => 'Invalid email address.']);
    exit;
}

// Свързване към базата данни
$conn = new mysqli('localhost', 'root', '', 'blog');

if ($conn->connect_error) {
    die('Connection failed: ' . $conn->connect_error);
}

// Подготвяне на заявката
$stmt = $conn->prepare("INSERT INTO comments (post_id, name, email, comment) VALUES (?, ?, ?, ?)");
$stmt->bind_param('isss', $post_id, $name, $email, $comment);

// Изпълнение на заявката
if ($stmt->execute()) {
    echo json_encode(['success' => true, 'comment' => ['name' => $name, 'comment' => $comment]]);
} else {
    echo json_encode(['success' => false, 'message' => 'Failed to save comment.']);
}

// Затваряне на връзката
$stmt->close();
$conn->close();
?>
