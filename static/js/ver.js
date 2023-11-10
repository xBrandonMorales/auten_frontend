document.addEventListener("DOMContentLoaded", function () {
    // Obtén el parámetro del correo electrónico de la URL
    const params = new URLSearchParams(window.location.search);
    const email = params.get("email");

    // Realiza una solicitud para obtener detalles del contacto con el correo electrónico proporcionado
    // Puedes utilizar una ruta en tu backend (FastAPI o Flask) para manejar esta solicitud

    // Ejemplo de solicitud con Fetch API
    fetch(`http://127.0.0.1:8000/contactos/${encodeURIComponent(email)}`)
        .then(response => response.json())
        .then(data => {
            // Manipula los detalles del contacto y actualiza el contenido en la página
            const contactDetailsDiv = document.getElementById("contact-details");
            contactDetailsDiv.innerHTML = `
                <p>Email: ${data.email}</p>
                <p>Nombre: ${data.nombre}</p>
                <p>Teléfono: ${data.telefono}</p>
                <!-- Agrega más detalles según sea necesario -->
            `;
        })
        .catch(error => console.error("Error al obtener detalles del contacto:", error));
});
