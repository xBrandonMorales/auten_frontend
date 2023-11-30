function getAll() {
    var request = new XMLHttpRequest();
    request.open('GET', "https://contactos-backend-2x51.onrender.com/contactos");
    request.send();

    request.onload = (e) => {
        const response = request.responseText;
        const json = JSON.parse(response);
        console.log("response: " + response);
        console.log("json: " + JSON.stringify(json));
        console.log("status_code: " + request.status);

        const tbody_contactos = document.getElementById("tbody_contactos");

        // Limpiar cualquier contenido previo en la tabla
        tbody_contactos.innerHTML = "";

        json.forEach((contact) => {
            var tr = document.createElement("tr");
            var td_email = document.createElement("td");
            var td_nombre = document.createElement("td");
            var td_telefono = document.createElement("td");
            var td_options = document.createElement("td");

            td_email.innerHTML = contact["email"];
            td_nombre.innerHTML = contact["nombre"];
            td_telefono.innerHTML = contact["telefono"];

            // Crear botón "Ver" para cada registro
            var viewButton = document.createElement("button");
            viewButton.textContent = "Ver";
            viewButton.className = "btn btn-primary"; // Aplicar la clase de Bootstrap

            viewButton.addEventListener("click", function () {
                // Redirige a la página "ver.html" con el correo electrónico como parámetro
                window.location.href = `ver?email=${contact["email"]}`;
            });

            // Crear botón "Editar" para cada registro
            var editButton = document.createElement("button");
            editButton.textContent = "Editar";
            editButton.className = "btn btn-success"; // Aplicar la clase de Bootstrap

            editButton.addEventListener("click", function () {
                // Redirige a la página "editar.html" con el correo electrónico como parámetro
                window.location.href = `editar?email=${contact["email"]}`;
            });

            // Crear botón "Borrar" para cada registro
            var deleteButton = document.createElement("button");
            deleteButton.textContent = "Borrar";
            deleteButton.className = "btn btn-danger"; // Aplicar la clase de Bootstrap

            deleteButton.addEventListener("click", function () {
                // Redirige a la página "borrar.html" con el correo electrónico como parámetro
                window.location.href = `borrar?email=${contact["email"]}`;
            });

            // Agregar los botones a la celda de opciones
            td_options.appendChild(viewButton);
            td_options.appendChild(editButton);
            td_options.appendChild(deleteButton);

            tr.appendChild(td_email);
            tr.appendChild(td_nombre);
            tr.appendChild(td_telefono);
            tr.appendChild(td_options);

            tbody_contactos.appendChild(tr);
        });
    };
}
