<?php
include 'config.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $productName = $_POST['productName'];
    $quantity = $_POST['quantity'];
    $description = $_POST['description'];

    $stmt = $conn->prepare("INSERT INTO products (name, quantity, description) VALUES (?, ?, ?)");
    $stmt->bind_param("sis", $productName, $quantity, $description);

    if ($stmt->execute()) {
        echo "Producto agregado exitosamente";
    } else {
        echo "Error: " . $stmt->error;
    }

    $stmt->close();
    $conn->close();
}
?>