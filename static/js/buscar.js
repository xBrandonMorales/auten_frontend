function searchByEmail() {
    const emailInput = document.getElementById("searchEmail").value;
    const request = new XMLHttpRequest();

    // Hacer una solicitud GET al endpoint del backend para buscar por correo electrónico
    request.open('GET', `https://contactos-backend-2x51.onrender.com/contactos/${emailInput}`);
    request.send();

    request.onload = (e) => {
        const response = request.responseText;
        const json = JSON.parse(response);

        // Obtener la tabla donde se mostrará el resultado
        const resultTable = document.getElementById("searchResult");

        // Limpiar cualquier contenido previo en la tabla
        resultTable.innerHTML = "";

        if (request.status === 200) {
            // Crear una fila de la tabla para mostrar el resultado
            const row = resultTable.insertRow(0);

            // Crear celdas para email, nombre y teléfono
            const emailCell = row.insertCell(0);
            const nameCell = row.insertCell(1);
            const phoneCell = row.insertCell(2);

            // Llenar las celdas con los datos del contacto
            emailCell.innerHTML = json.email;
            nameCell.innerHTML = json.nombre;
            phoneCell.innerHTML = json.telefono;
        } else {
            // Mostrar un mensaje si no se encontró el contacto
            const errorMessage = document.createElement("p");
            errorMessage.innerHTML = "Contacto no encontrado.";
            resultTable.appendChild(errorMessage);
        }
    };
}
