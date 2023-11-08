function getAll() {
    var request = new XMLHttpRequest();
    request.open('GET', "http://127.0.0.1:8000/contactos");
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
            viewButton.addEventListener("click", function () {
                // Redirige a la página "ver.html" con el correo electrónico como parámetro
                window.location.href = `ver.html?email=${contact["email"]}`;
            });

            // Agregar el botón "Ver" junto a la fila de la tabla
            td_options.appendChild(viewButton);

            tr.appendChild(td_email);
            tr.appendChild(td_nombre);
            tr.appendChild(td_telefono);
            tr.appendChild(td_options);

            tbody_contactos.appendChild(tr);
        });
    };
}

document.body.onload = getAll();
