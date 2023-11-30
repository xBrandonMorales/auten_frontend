document.addEventListener("DOMContentLoaded", function () {
    // Obtén el parámetro del correo electrónico de la URL
    const params = new URLSearchParams(window.location.search);
    const email = params.get("email");

    // Obtén el formulario y los campos
    const editContactForm = document.getElementById("edit-contact-form");
    const emailInput = document.getElementById("email");
    const nombreInput = document.getElementById("nombre");
    const telefonoInput = document.getElementById("telefono");

    // Realiza una solicitud para obtener detalles del contacto con el correo electrónico proporcionado
    fetch(`https://contactos-backend-2x51.onrender.com/contactos/${encodeURIComponent(email)}`)
        .then(response => response.json())
        .then(data => {
            // Llena los campos del formulario con los detalles del contacto
            emailInput.value = data.email;
            nombreInput.value = data.nombre;
            telefonoInput.value = data.telefono;
        })
        .catch(error => console.error("Error al obtener detalles del contacto:", error));
});

function actualizar() {
    // Obtén los nuevos valores de los campos
    const nuevoNombre = document.getElementById("nombre").value;
    const nuevoTelefono = document.getElementById("telefono").value;

    // Obtén el parámetro del correo electrónico de la URL
    const params = new URLSearchParams(window.location.search);
    const email = params.get("email");

    // Realiza una solicitud PUT para actualizar el contacto en el backend
    fetch(`https://contactos-backend-2x51.onrender.com/contactos/${encodeURIComponent(email)}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
            nombre: nuevoNombre,
            telefono: nuevoTelefono,
        }),
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(error => {
                throw new Error(`Error al actualizar el contacto. Código de estado: ${response.status}. Detalles: ${JSON.stringify(error)}`);
            });
        }
        return response.json();
    })
    .then(data => {
        // Muestra el mensaje de éxito en la página
        const mensajeElemento = document.getElementById("mensaje");
        mensajeElemento.innerHTML = `Contacto actualizado con éxito.`;

        // Limpia el mensaje de error si estaba presente
        const errorMensajeElemento = document.getElementById("error-mensaje");
        errorMensajeElemento.innerHTML = "";

        // Redirige a la página principal después de una edición exitosa
        window.location.href = "/";
    })
    .catch(error => {
        // Muestra el mensaje de error en la página
        const errorMensajeElemento = document.getElementById("error-mensaje");
        errorMensajeElemento.innerHTML = `Error al actualizar el contacto: ${error.message}`;

        // Limpia el mensaje de éxito si estaba presente
        const mensajeElemento = document.getElementById("mensaje");
        mensajeElemento.innerHTML = "";
    });
}
