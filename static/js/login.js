async function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const backendURL = "https://8000-xbrandonmor-autenbacken-b2ajw23ji1b.ws-us106.gitpod.io/"; // Reemplaza con la URL de tu backend

    try {
        const response = await fetch(`${backendURL}/token`, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`,
        });

        if (response.ok) {
            const data = await response.json();
            
            // Almacenar el token en las cookies
            document.cookie = `token=${data.token}; path=/`;

            // Redirigir a la página "/home"
            window.location.href = "/home";
        } else {
            const data = await response.json();
            document.getElementById("message").innerText = `Login failed. ${data.detail}`;
        }
    } catch (error) {
        console.error("Error during login:", error);
        document.getElementById("message").innerText = "An error occurred during login.";
    }
}
