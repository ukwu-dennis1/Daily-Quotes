// // Function to fetch and display a random quote
// async function fetchQuote() {
//     try {
//         const response = await fetch("https://api.quotable.io/random");// Fetching a quote 
//         if (!response.ok) {
//             throw new Error("Failed to fetch quote");
//         }

//         const data = await response.json();
//         updateQuote(data.content, data.author);//Update the quote and author

//     } catch (error) {
//         console.error("Error fetching quote:",error);
//         updateQuote("Could not load a new quote. Please try again.","Unknown");
//     }
// }

// //Function to update the quote and author in the DOM 
// function updateQuote(quote, author) {
//     const quoteText = document.getElementById("quote-text");
//     const quoteAuthor = document.getElementById("quote-author");

//     //Update text content
//     quoteText.textContent = quote;
//     quoteAuthor.textContent = `- ${author}`;

//     //Update the WhatsaApp share link
//     const shareButton = document.getElementById("share-whatsapp")
// }

const quoteText = document.getElementById("quote-text");
const quoteAuthor = document.getElementById("quote-author");
const newQuoteButton = document.getElementById("new-quote");
const readQuoteButton = document.getElementById("read-quote");
const copyQuoteButton = document.getElementById("copy-quote");
const shareWhatsappButton = document.getElementById("share-whatsapp");

// Function to fetch a random quote from the Quotable.io API
async function fetchQuote() {
    try {
        const response = await fetch("http://api.quotable.io/random");
        if (!response.ok) {
            throw new Error("Failed to fetch quote");
        }
        const data = await response.json();
        updateQuote(data.content, data.author);
    } catch (error) {
        console.error("Error fetching quote:", error);
        updateQuote("Could not fetch a new quote. Please try again.", "Error");
    }
}

// Function to update the quote and author on the webpage
function updateQuote(text, author) {
    quoteText.textContent = `"${text}"`;
    quoteAuthor.textContent = `- ${author}`;
    updateWhatsappShareLink(text, author);
}

// Function to read the quote aloud
function readQuote() {
    const speech = new SpeechSynthesisUtterance(`${quoteText.textContent} ${quoteAuthor.textContent}`);
    window.speechSynthesis.speak(speech);
}

// Function to copy the quote to the clipboard
function copyQuote() {
    const quote = `${quoteText.textContent} ${quoteAuthor.textContent}`;
    navigator.clipboard.writeText(quote).then(() => {
        alert("Quote copied to clipboard!");
    });
}

// Function to update the WhatsApp share link
function updateWhatsappShareLink(text, author) {
    const quote = `${text} - ${author}`;
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(quote)}`;
    shareWhatsappButton.href = whatsappUrl;
}

// Event Listeners
newQuoteButton.addEventListener("click", fetchQuote);
readQuoteButton.addEventListener("click", readQuote);
copyQuoteButton.addEventListener("click", copyQuote);

// Fetch the first quote on page load
fetchQuote();
