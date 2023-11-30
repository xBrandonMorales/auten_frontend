document.addEventListener("DOMContentLoaded", function () {
    // Obtén el parámetro del correo electrónico de la URL
    const params = new URLSearchParams(window.location.search);
    const email = params.get("email");

    // Realiza una solicitud GET para obtener detalles del contacto con el correo electrónico proporcionado
    fetch(`https://contactos-backend-2x51.onrender.com/contactos/${encodeURIComponent(email)}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error al obtener detalles del contacto. Código de estado: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Llena la sección de detalles con los datos del contacto
            const emailElemento = document.getElementById("email");
            emailElemento.textContent = data.email;

            const nombreElemento = document.getElementById("nombre");
            nombreElemento.textContent = data.nombre;

            const telefonoElemento = document.getElementById("telefono");
            telefonoElemento.textContent = data.telefono;
        })
        .catch(error => {
            // Muestra el mensaje de error en la página
            const errorMensajeElemento = document.getElementById("error-mensaje");
            errorMensajeElemento.innerHTML = `Error al cargar los detalles del contacto: ${error.message}`;
        });
});

function borrarContacto() {
    // Obtén el parámetro del correo electrónico de la URL
    const params = new URLSearchParams(window.location.search);
    const email = params.get("email");

    // Realiza una solicitud DELETE para borrar el contacto en el backend
    fetch(`https://contactos-backend-2x51.onrender.com/contactos/${encodeURIComponent(email)}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(error => {
                throw new Error(`Error al borrar el contacto. Código de estado: ${response.status}. Detalles: ${JSON.stringify(error)}`);
            });
        }
        return response.json();
    })
    .then(data => {
        // Muestra el mensaje de éxito y redirige a la página principal
        alert(`Contacto borrado con éxito.`);
        window.location.href = "/";
    })
    .catch(error => {
        // Muestra el mensaje de error
        alert(`Error al borrar el contacto: ${error.message}`);
    });
}

function cancelarBorrar() {
    // Redirige a la página principal al cancelar el borrado
    window.location.href = "/";
}
