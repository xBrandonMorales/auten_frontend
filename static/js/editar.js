document.addEventListener("DOMContentLoaded", function () {
    // Verificar el token al cargar la página
    checkTokenAndRedirect();

    // Obtén el parámetro del correo electrónico de la URL
    const params = new URLSearchParams(window.location.search);
    const email = params.get("email");

    // Obtén el formulario y los campos
    const editContactForm = document.getElementById("edit-contact-form");
    const emailInput = document.getElementById("email");
    const nombreInput = document.getElementById("nombre");
    const telefonoInput = document.getElementById("telefono");

    // Realiza una solicitud para obtener detalles del contacto con el correo electrónico proporcionado
    const token = getCookie("token");  // Obtener el token almacenado en las cookies
    fetch(`https://8000-xbrandonmor-autenbacken-b2ajw23ji1b.ws-us106.gitpod.io/contactos/${encodeURIComponent(email)}`, {
        headers: {
            'Authorization': `Bearer ${token}`,  // Incluir el token en el encabezado de la solicitud
        },
    })
        .then(response => {
            // Verificar si la respuesta indica un token no válido (código de estado 401)
            if (response.status === 401) {
                // Redirigir a la página de inicio de sesión
                window.location.href = "/";
            }
            return response.json();
        })
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
    const token = getCookie("token");  // Obtener el token almacenado en las cookies
    fetch(`https://8000-xbrandonmor-autenbacken-b2ajw23ji1b.ws-us106.gitpod.io/contactos/${encodeURIComponent(email)}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,  // Incluir el token en el encabezado de la solicitud
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
            window.location.href = "/home";
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

function checkTokenAndRedirect() {
    const token = getCookie("token");  // Obtener el token almacenado en las cookies
    const request = new XMLHttpRequest();

    // Hacer una solicitud GET al endpoint del backend (puedes ajustar el endpoint según tus necesidades)
    request.open('GET', 'https://8000-xbrandonmor-autenbacken-b2ajw23ji1b.ws-us106.gitpod.io/check_token');
    
    // Incluir el token en el encabezado de la solicitud
    request.setRequestHeader("Authorization", `Bearer ${token}`);
    
    request.send();

    request.onload = (e) => {
        // Verificar si la respuesta indica un token no válido (código de estado 401)
        if (request.status === 401) {
            // Redirigir a la página de inicio de sesión
            window.location.href = "/";
        }
    };
}

// Función para obtener el valor de una cookie por su nombre
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}
