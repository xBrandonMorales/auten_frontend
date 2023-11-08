document.addEventListener("DOMContentLoaded", function () {
    // Obtén el parámetro de correo electrónico de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get("email");

    // Puedes usar el valor de 'email' para cargar y mostrar los detalles del contacto
    // en esta página, por ejemplo, haciendo una solicitud al servidor.

    // Simulación de detalles de contacto (puedes ajustarlo a tu lógica real)
    const contactDetails = {
        email: email,
        nombre: "Nombre del Contacto",
        telefono: "555-123-4567"
    };

    // Muestra los detalles del contacto en la página
    document.getElementById("email").textContent = contactDetails.email;
    document.getElementById("nombre").textContent = contactDetails.nombre;
    document.getElementById("telefono").textContent = contactDetails.telefono;
});
