if (localStorage.getItem("isLoggedIn")) {
    window.location.href = "./";
}

document.querySelector(".signInBtnLink").onclick = function(event) {
    event.preventDefault();

    const allowedCredentials = {
        email: "user@example.com",
        password: "password123"
    };

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const errorMessage = document.getElementById("error-message");

    errorMessage.style.display = "none";

    if (email === allowedCredentials.email && password === allowedCredentials.password) {
        localStorage.setItem("isLoggedIn", "true");
        window.location.href = "./";
    } else {
        errorMessage.innerText = "Incorrect email or password.";
        errorMessage.style.display = "block";
    }
};