function checkPath() {
    const validPaths = ["./", "http://127.0.0.1:5500/services/index.html", "signin.html", "signup.html", "en-za/"];

    const currentPath = window.location.pathname;

    if (!validPaths.includes(currentPath)) {
        window.location.href = "../404.html";
    }
}

window.onload = checkPath;