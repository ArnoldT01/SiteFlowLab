if (!localStorage.getItem("isLoggedIn")) {
    window.location.href = "../../en-za/";
}

const plainDataInput = document.getElementById('plainData');
const encodedDataInput = document.getElementById('encodedData');
const decodeBtn = document.getElementById('decodeBtn');
const encodeBtn = document.getElementById('encodeBtn');
const resetBtn = document.getElementById('resetBtn');

function updateButtonStates() {
    decodeBtn.disabled = !encodedDataInput.value.trim();
    encodeBtn.disabled = !plainDataInput.value.trim();
}

plainDataInput.addEventListener('input', updateButtonStates);
encodedDataInput.addEventListener('input', updateButtonStates);

encodeBtn.addEventListener('click', () => {
    const plainText = plainDataInput.value;
    const encodedText = btoa(plainText);
    encodedDataInput.value = encodedText;
});

decodeBtn.addEventListener('click', () => {
    const encodedText = encodedDataInput.value;
    try {
        const decodedText = atob(encodedText);
        plainDataInput.value = decodedText;
    } catch (e) {
        alert('Invalid Base64 input.');
    }
});

resetBtn.addEventListener('click', () => {
    plainDataInput.value = '';
    encodedDataInput.value = '';
    updateButtonStates();
});