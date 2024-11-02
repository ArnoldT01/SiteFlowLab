function generatePassword(length, useUpperCase, useLowerCase, useNumbers, useSymbols) {
    const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_+[]{}|;:,.<>?';
    
    let characterPool = '';
    if (useUpperCase) characterPool += upperCaseChars;
    if (useLowerCase) characterPool += lowerCaseChars;
    if (useNumbers) characterPool += numberChars;
    if (useSymbols) characterPool += symbolChars;

    if (characterPool.length === 0) return '';

    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characterPool.length);
        password += characterPool[randomIndex];
    }
    return password;
}

function updatePassword() {
    const length = document.getElementById('passwordLength').value;
    const useUpperCase = document.getElementById('upperCase').checked;
    const useLowerCase = document.getElementById('lowerCase').checked;
    const useNumbers = document.getElementById('numbers').checked;
    const useSymbols = document.getElementById('symbols').checked;

    const generatedPassword = generatePassword(length, useUpperCase, useLowerCase, useNumbers, useSymbols);
    document.getElementById('generatedPassword').value = generatedPassword;
}

document.addEventListener('DOMContentLoaded', () => {
    updatePassword();

    document.querySelector('button').addEventListener('click', updatePassword);
    
    document.querySelectorAll('button')[1].addEventListener('click', () => {
        const passwordTextarea = document.getElementById('generatedPassword');
        passwordTextarea.select();
        document.execCommand('copy');
        alert('Password copied to clipboard!');
    });

    document.getElementById('passwordLength').addEventListener('input', (event) => {
        const value = event.target.value;
        document.getElementById('generatedPassword').placeholder = `Password length: ${value}`;
        updatePassword();
    });

    const checkboxes = document.querySelectorAll('.parametersContainer input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updatePassword);
    });
});