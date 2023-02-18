const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");
//console.log(quoteContainer);
let apiQuotes = [];
function loading() {
  loader.hidden = false;
  quoteText.hidden = true;
  authorText.hidden = true;
}
function complete() {
  loader.hidden = true;
  quoteText.hidden = false;
  authorText.hidden = false;
}
function newQuote() {
  loading();
  const quoto = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  authorText.textContent = quoto.author != null ? quoto.author : "Unknown";
  quoteText.textContent = quoto.text;
  if (quoto.text.length > 100) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  complete();
  console.log(quoto);
}
async function getQuotes() {
  loading();
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const respose = await fetch(apiUrl);
    apiQuotes = await respose.json();
    newQuote();
  } catch (error) {
    alert(error);
  }
}
getQuotes();

function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);
