let apiQuotes = [];
const quoteText = document.querySelector("#quote");
const quoteContainer = document.querySelector("#quote-container");
const quoteAuthor = document.querySelector("#author");
const newBtn = document.querySelector("#new-quote");
const twitterBtn = document.querySelector("#twitter");
const loader = document.querySelector("#loader");

// Show Loading
function showLoading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Hide Loading
function complete() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}

// Show Quote
function newQuotes() {
  showLoading();
  let ran = Math.random();
  quote = apiQuotes[Math.floor(ran * apiQuotes.length)];
  quoteAuthor.innerHTML = !quote.author ? "Unknown" : quote.author;
  if (quote.text.length > 80) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  quoteText.innerHTML = quote.text;
  complete();
}

// Quotes From API
async function getQuotes() {
  showLoading();
  const apiUrl = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuotes();
  } catch (error) {}
}

//Tweet Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.innerHTML} - ${quoteAuthor.innerHTML}`;
  window.open(twitterUrl, "_blank");
}

// Event Listeners
newBtn.addEventListener("click", getQuotes);
twitterBtn.addEventListener("click", tweetQuote);

getQuotes();
