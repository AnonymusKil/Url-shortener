console.log("Anonymus");

const input = document.getElementById("get-user-link");
const btn = document.getElementById("btn");
const resultLinks = document.getElementById("result");

const apiKey = "60153382d941400287e36ed90dc98b53";
const menu = document.querySelector(".lists");
const hamburger = document.querySelector(".hamburger");

hamburger.addEventListener("click", () => {
  menu.classList.toggle("active");
});

async function getLink() {
  const userLink = input.value.trim(); // Trim whitespace
  resultLinks.innerHTML = "<h1>Loading...</h1>";

  if (!userLink) {
    resultLinks.innerHTML = "<h1>Please enter a link</h1>";
    return;
  }

  try {
    const response = await fetch("https://api.rebrandly.com/v1/links", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": apiKey,
      },
      body: JSON.stringify({
        destination: userLink,
        domain: { fullName: "rebrand.ly" },
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to shorten the link");
    }

    const data = await response.json();

    resultLinks.innerHTML = `
      <div>
        <a href="${userLink}" target="_blank">${userLink}</a>
      </div>
      <hr>
      <div class="change">
        <a href="${data.shortUrl}" target="_blank">${data.shortUrl}</a>
        <button onclick="copyToClipboard('${data.shortUrl}', this)">Copy</button>
      </div>
    `;
  } catch (error) {
    console.error(error);
    resultLinks.innerHTML = "<h1>Something went wrong. Please try again.</h1>";
  }
}

btn.addEventListener("click", getLink);

// Function to Copy Link
function copyToClipboard(text, button) {
  navigator.clipboard.writeText(text).then(() => {
    button.textContent = "Copied!";
    setTimeout(() => {
      button.textContent = "Copy";
    },2000);
});
}