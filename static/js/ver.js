document.addEventListener("DOMContentLoaded", function () {
    // Verificar el token al cargar la página
    checkTokenAndRedirect();

    // Obtén el parámetro del correo electrónico de la URL
    const params = new URLSearchParams(window.location.search);
    const email = params.get("email");

    // Realiza una solicitud para obtener detalles del contacto con el correo electrónico proporcionado
    // Puedes utilizar una ruta en tu backend (FastAPI o Flask) para manejar esta solicitud

    // Ejemplo de solicitud con Fetch API
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

function checkTokenAndRedirect() {
    const token = getCookie("token");  // Obtener el token almacenado en las cookies
    const request = new XMLHttpRequest();

    // Hacer una solicitud GET al endpoint del backend (puedes ajustar el endpoint según tus necesidades)
    request.open('GET', 'https://8000-xbrandonmor-autenbacken-b2ajw23ji1b.ws-us106.gitpod.io');
    
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