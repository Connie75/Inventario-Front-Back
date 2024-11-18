<?php
include 'config.php';

$category = $_GET['category'];
$machineRef = $_GET['machineRef'];
$productId = $_GET['productId'];

$sql = "SELECT * FROM products WHERE category LIKE ? OR machine_ref LIKE ? OR product_id LIKE ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sss", $category, $machineRef, $productId);
$stmt->execute();
$result = $stmt->get_result();

while ($row = $result->fetch_assoc()) {
    echo $row['name'] . " - " . $row['quantity'] . " - " . $row['description'] . "<br>";
}

$stmt->close();
$conn->close();
?>