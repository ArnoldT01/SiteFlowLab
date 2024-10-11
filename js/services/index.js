if (!localStorage.getItem("isLoggedIn")) {
    window.location.href = "../login.html";
}

let isAscending = true;

function sortServices() {
    const servicesContainer = document.getElementById('services');
    const services = Array.from(servicesContainer.children);

    services.sort((a, b) => {
        const nameA = a.querySelector('a').textContent.toLowerCase();
        const nameB = b.querySelector('a').textContent.toLowerCase();
        return isAscending ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
    });

    servicesContainer.innerHTML = '';
    services.forEach(service => servicesContainer.appendChild(service));

    isAscending = !isAscending;
    document.getElementById('sortButton').textContent = isAscending ? 'Sort (A-Z)' : 'Sort (Z-A)';
}