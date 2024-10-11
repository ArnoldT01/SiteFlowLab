if (!localStorage.getItem("isLoggedIn")) {
    window.location.href = "login.html";
}

function logout() {
    localStorage.removeItem("isLoggedIn");
    window.location.href = "login.html";
}