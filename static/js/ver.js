document.addEventListener("DOMContentLoaded", function () {
    // Obtén el parámetro del correo electrónico de la URL
    const params = new URLSearchParams(window.location.search);
    const email = params.get("email");

    // Realiza una solicitud para obtener detalles del contacto con el correo electrónico proporcionado
    // Puedes utilizar una ruta en tu backend (FastAPI o Flask) para manejar esta solicitud

    // Ejemplo de solicitud con Fetch API
    fetch(`https://contactos-backend-2x51.onrender.com/contactos/${encodeURIComponent(email)}`)
        .then(response => response.json())
        .then(data => {
            // Manipula los detalles del contacto y actualiza el contenido en la página
            const contactDetailsDiv = document.getElementById("contact-details");
            contactDetailsDiv.innerHTML = `
                <p>Email: ${data.email}</p>
                <p>Nombre: ${data.nombre}</p>
                <p>Teléfono: ${data.telefono}</p>
            `;
        })
        .catch(error => console.error("Error al obtener detalles del contacto:", error));
});
