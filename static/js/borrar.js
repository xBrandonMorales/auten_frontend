document.addEventListener("DOMContentLoaded", function () {
    // Verificar el token al cargar la página
    checkTokenAndRedirect();

    // Obtén el parámetro del correo electrónico de la URL
    const params = new URLSearchParams(window.location.search);
    const email = params.get("email");

    // Realiza una solicitud GET para obtener detalles del contacto con el correo electrónico proporcionado
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
    const token = getCookie("token");  // Obtener el token almacenado en las cookies
    fetch(`https://8000-xbrandonmor-autenbacken-b2ajw23ji1b.ws-us106.gitpod.io/contactos/${encodeURIComponent(email)}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,  // Incluir el token en el encabezado de la solicitud
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
        window.location.href = "/home";
    })
    .catch(error => {
        // Muestra el mensaje de error
        alert(`Error al borrar el contacto: ${error.message}`);
    });
}

function cancelarBorrar() {
    // Redirige a la página principal al cancelar el borrado
    window.location.href = "/home";
}

function checkTokenAndRedirect() {
    const token = getCookie("token");  // Obtener el token almacenado en las cookies
    const request = new XMLHttpRequest();

    // Hacer una solicitud GET al endpoint del backend (puedes ajustar el endpoint según tus necesidades)
    request.open('GET', 'https://8000-xbrandonmor-autenbacken-b2ajw23ji1b.ws-us106.gitpod.io/contactos/');
    
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
