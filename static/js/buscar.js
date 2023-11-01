function searchByEmail() {
    const emailInput = document.getElementById("searchEmail").value; // Obtener el correo electrónico ingresado por el usuario
    const request = new XMLHttpRequest();

    // Hacer una solicitud GET al endpoint del backend para buscar por correo electrónico
    request.open('GET', `https://api-contactos-backend-0e75b19d44da.herokuapp.com/contactos/${emailInput}`);
    request.send();

    request.onload = (e) => {
        const response = request.responseText;
        const json = JSON.parse(response);

        // Obtener el div donde se mostrará el resultado
        const resultDiv = document.getElementById("searchResult");

        // Limpiar cualquier contenido previo en el resultado
        resultDiv.innerHTML = "";

        if (request.status === 200) {
            // Mostrar el resultado si se encontró un contacto
            const contact = json;
            var contactInfo = document.createElement("p");
            contactInfo.innerHTML = `Nombre: ${contact.nombre}, Teléfono: ${contact.telefono}`;
            resultDiv.appendChild(contactInfo);
        } else {
            // Mostrar un mensaje si no se encontró el contacto
            const errorMessage = document.createElement("p");
            errorMessage.innerHTML = "Contacto no encontrado.";
            resultDiv.appendChild(errorMessage);
        }
    };
}
