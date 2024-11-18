<?php
include 'config.php';

$sql = "SELECT * FROM inventory_history";
$result = $conn->query($sql);

while ($row = $result->fetch_assoc