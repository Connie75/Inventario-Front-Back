<?php
include 'config.php';

// Consulta para obtener el historial de inventario
$sql = "SELECT * FROM inventory_history";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    echo "<table>";
    echo "<tr><th>ID</th><th>Producto</th><th>Cantidad</th><th>Acción</th><th>Fecha</th><th>Usuario</th></tr>";
    while ($row = $result->fetch_assoc()) {
        echo "<tr>";
        echo "<td>" . $row['id'] . "</td>";
        echo "<td>" . $row['product_name'] . "</td>";
        echo "<td>" . $row['quantity'] . "</td>";
        echo "<td>" . $row['action'] . "</td>";
        echo "<td>" . $row['date'] . "</td>";
        echo "<td>" . $row['user'] . "</td>";
        echo "</tr>";
    }
    echo "</table>";
} else {
    echo "No hay registros en el historial de inventario.";
}

$conn->close();
?>