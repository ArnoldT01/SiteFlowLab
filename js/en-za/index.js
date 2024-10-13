if (localStorage.getItem("isLoggedIn")) {
    window.location.href = "../../";
}

function toggleNav() {
    var x = document.getElementById("nav");
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }
  }