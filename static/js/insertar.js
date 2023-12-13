document.addEventListener("DOMContentLoaded", function () {
    // Verificar el token al cargar la página
    checkTokenAndRedirect();

    // Asociar la función de inserción al evento del formulario
    const insertForm = document.getElementById("insertForm");
    insertForm.addEventListener("submit", insertContact);

    // Asociar la función de cerrar sesión al evento del botón
    const logoutButton = document.getElementById("logoutButton");
    logoutButton.addEventListener("click", logout);
});

function checkTokenAndRedirect() {
    const token = getCookie("token");  // Obtener el token almacenado en las cookies
    const request = new XMLHttpRequest();

    // Hacer una solicitud GET al endpoint del backend (puedes ajustar el endpoint según tus necesidades)
    request.open('GET', 'https://8000-xbrandonmor-autenbacken-b2ajw23ji1b.ws-us106.gitpod.io/');
    
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

function insertContact(e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const nombre = document.getElementById("nombre").value;
    const telefono = document.getElementById("telefono").value;
    const token = getCookie("token");  // Obtener el token almacenado en las cookies

    fetch('https://8000-xbrandonmor-autenbacken-b2ajw23ji1b.ws-us106.gitpod.io/contactos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,  // Incluir el token en el encabezado de la solicitud
        },
        body: JSON.stringify({ email, nombre, telefono }),
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("insertResult").innerHTML = `<p>Contacto insertado correctamente.</p>`;
        // Limpiar los campos del formulario después de la inserción
        document.getElementById("email").value = "";
        document.getElementById("nombre").value = "";
        document.getElementById("telefono").value = "";
    })
    .catch((error) => {
        console.error(error);
        document.getElementById("insertResult").innerHTML = "<p>Error al insertar el contacto.</p>";
    });
}

function logout() {
    // Eliminar la cookie del token
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    // Redirigir a la página de inicio de sesión
    window.location.href = "/";
}

// Función para obtener el valor de una cookie por su nombre
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}
