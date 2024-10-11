if (!localStorage.getItem("isLoggedIn")) {
    window.location.href = "../../login.html";
}

const apiUrl = './quotes.txt';

async function getRandomQuote() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const quotes = data.quotes;
        const randomIndex = Math.floor(Math.random() * quotes.length);
        const randomQuote = quotes[randomIndex];
        document.querySelector('.generatedQuote').textContent = `${randomQuote.quote} - ${randomQuote.author}`;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        document.querySelector('.generatedQuote').textContent = 'Failed to generate quote';
    }
}

getRandomQuote();