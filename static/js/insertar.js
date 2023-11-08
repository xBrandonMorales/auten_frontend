document.addEventListener("DOMContentLoaded", () => {
    const insertForm = document.getElementById("insertForm");
    const insertResultDiv = document.getElementById("insertResult");

    insertForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        
        const email = document.getElementById("email").value;
        const nombre = document.getElementById("nombre").value;
        const telefono = document.getElementById("telefono").value;

        try {
            const response = await fetch("http://127.0.0.1:8000/contactos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, nombre, telefono }),
            });

            if (response.status === 200) {
                const data = await response.json();
                insertResultDiv.innerHTML = `<p>Contacto insertado: ${data.email}</p>`;
                // Limpiar los campos del formulario después de la inserción
                document.getElementById("email").value = "";
                document.getElementById("nombre").value = "";
                document.getElementById("telefono").value = "";
            } else {
                insertResultDiv.innerHTML = "<p>Error al insertar el contacto.</p>";
            }
        } catch (error) {
            console.error(error);
        }
    });
});
