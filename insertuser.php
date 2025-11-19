<?php
// Enable error reporting for debugging
ini_set('display_errors', 1);
error_reporting(E_ALL);

session_start();

// Database connection parameters
$host = "localhost"; 
$username = "root"; 
$password = "";
$database = "db_users";

// Connect to database
$conn = new mysqli($host, $username, $password, $database);
if ($conn->connect_error) {
    die("Database connection failed: " . $conn->connect_error);
}

// Check if form submitted via POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header("Location: register.html?error=" . urlencode("Invalid request method."));
    exit();
}

// Retrieve and sanitize form data
$fullname = isset($_POST['fullname']) ? trim($_POST['fullname']) : '';
$email = isset($_POST['email']) ? trim($_POST['email']) : '';
$phone = isset($_POST['phone']) ? trim($_POST['phone']) : '';
$password = isset($_POST['password']) ? $_POST['password'] : '';
$agree = isset($_POST['agree']) ? $_POST['agree'] : '';

// Basic validation
if (empty($fullname) || empty($email) || empty($phone) || empty($password)) {
    header("Location: register.html?error=" . urlencode("All fields are required."));
    exit();
}

if ($agree !== 'on') {
    header("Location: register.html?error=" . urlencode("You must agree to the terms."));
    exit();
}

// Check if email already exists
$stmt = $conn->prepare("SELECT id FROM users WHERE email = ?");
if (!$stmt) {
    die("Prepare failed: (" . $conn->errno . ") " . $conn->error);
}
$stmt->bind_param("s", $email);
if (!$stmt->execute()) {
    die("Execute failed: (" . $stmt->errno . ") " . $stmt->error);
}
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    // Email exists
    header("Location: register.html?error=" . urlencode("Email already registered."));
    exit();
}
$stmt->close();

// Hash password
$hashed_password = password_hash($password, PASSWORD_DEFAULT);

// Insert new user
$insert_stmt = $conn->prepare("INSERT INTO users (fullname, email, phone, password) VALUES (?, ?, ?, ?)");
if (!$insert_stmt) {
    die("Prepare insert failed: (" . $conn->errno . ") " . $conn->error);
}
$insert_stmt->bind_param("ssss", $fullname, $email, $phone, $hashed_password);
if ($insert_stmt->execute()) {
    // Success
    header("Location: register.html?message=" . urlencode("Registration successful! Please login."));
    exit();
} else {
    die("Insert failed: (" . $insert_stmt->errno . ") " . $insert_stmt->error);
}
$insert_stmt->close();
$conn->close();
?>