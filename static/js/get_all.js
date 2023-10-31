function getAll() {
    var request = new XMLHttpRequest();
    //request.open('GET',"http://localhost:8000/contactos");
    request.open('GET', "https://api-backend-8kg5.onrender.com/contactos");
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

        // Iterar a través de todos los contactos en el arreglo json
        json.forEach((contact) => {
            var tr = document.createElement("tr");
            var td_email = document.createElement("td");
            var td_nombre = document.createElement("td");
            var td_telefono = document.createElement("td");

            td_email.innerHTML = contact["email"];
            td_nombre.innerHTML = contact["nombre"];
            td_telefono.innerHTML = contact["telefono"];

            tr.appendChild(td_email);
            tr.appendChild(td_nombre);
            tr.appendChild(td_telefono);

            tbody_contactos.appendChild(tr);
        });
    };
}

