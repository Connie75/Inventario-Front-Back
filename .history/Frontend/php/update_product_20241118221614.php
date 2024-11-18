<?php
include 'config.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $productId = $_POST['productId'];
    $quantity = $_POST['quantity'];

    $stmt = $conn->prepare("UPDATE products SET quantity = ? WHERE product_id = ?");
    $stmt->bind_param("is", $quantity, $productId);

    if ($stmt->execute()) {
        echo "Producto actualizado exitosamente";
    } else {
        echo "Error: " . $stmt->error;
    }

    $stmt->close();
    $conn->close();
}
?>