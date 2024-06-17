<?php
header('Content-Type: application/json');

$comment_id = $_POST['comment_id'];
$email = $_POST['email'];
$new_comment = $_POST['new_comment'];

// Проверка за валиден имейл адрес
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'message' => 'Invalid email address.']);
    exit;
}

// Свързване към базата данни
$conn = new mysqli('localhost', 'root', '', 'blog');

if ($conn->connect_error) {
    die('Connection failed: ' . $conn->connect_error);
}

// Проверка дали имейлът съвпада
$stmt = $conn->prepare("SELECT email FROM comments WHERE id = ?");
$stmt->bind_param('i', $comment_id);
$stmt->execute();
$stmt->bind_result($stored_email);
$stmt->fetch();
$stmt->close();

if (strcasecmp($stored_email, $email) !== 0) { // Case-insensitive comparison
    echo json_encode(['success' => false, 'message' => 'Email does not match.', 'stored_email' => $stored_email, 'provided_email' => $email]);
    $conn->close();
    exit;
}

// Обновяване на коментара
$stmt = $conn->prepare("UPDATE comments SET comment = ? WHERE id = ?");
$stmt->bind_param('si', $new_comment, $comment_id);

if ($stmt->execute()) {
    echo json_encode(['success' => true, 'message' => 'Comment updated successfully.']);
} else {
    echo json_encode(['success' => false, 'message' => 'Failed to update comment.']);
}

$stmt->close();
$conn->close();
?>
