// Selecting HTML Elements by using their unique ID
const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");
let recievedFromAPI = [];

async function getQuotesFromAPI() {
  startLoadingSpinner();
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const respose = await fetch(apiUrl);
    recievedFromAPI = await respose.json();
    sendNewQuoteFromRecievedQuoteArray();
  } catch (error) {
    // alert(error);
  }
}

function sendNewQuoteFromRecievedQuoteArray() {
  startLoadingSpinner();
  const quoto =
    recievedFromAPI[Math.floor(Math.random() * recievedFromAPI.length)];
  authorText.textContent = quoto.author != null ? quoto.author : "Unknown";
  quoteText.textContent = quoto.text;
  if (quoto.text.length > 100) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  stopLoadingSpinner();
}

function tweetTheQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}

function startLoadingSpinner() {
  loader.hidden = false;
  quoteText.hidden = true;
  authorText.hidden = true;
}

function stopLoadingSpinner() {
  loader.hidden = true;
  quoteText.hidden = false;
  authorText.hidden = false;
}

newQuoteBtn.addEventListener("click", sendNewQuoteFromRecievedQuoteArray);
twitterBtn.addEventListener("click", tweetTheQuote);
getQuotesFromAPI();
