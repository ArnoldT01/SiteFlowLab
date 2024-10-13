if (!localStorage.getItem("isLoggedIn")) {
    window.location.href = "en-za/";
}

function logout() {
    localStorage.removeItem("isLoggedIn");
    window.location.href = "login.html";
}