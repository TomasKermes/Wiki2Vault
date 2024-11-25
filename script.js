async function scrapeWebpage(scrapeUrl) {
  try {
    const url = `https://api.allorigins.win/get?url=${encodeURIComponent(
      scrapeUrl
    )}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "X-Requested-With": "XMLHttpRequest",
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const html = await response.text();

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    // Example: Extract all paragraph texts
    const paragraphs = doc.querySelectorAll("p");
    const paragraphTexts = Array.from(paragraphs).map((p) => p.textContent);

    // Example: Extract all links
    const links = doc.querySelectorAll("a");
    const linkHrefs = Array.from(links).map((a) => decodeURIComponent(a.href));

    // You can add more specific scraping logic here based on your needs

    return {
      links: links,
    };
  } catch (error) {
    console.error("Error scraping webpage:", error);
    return null;
  }
}

const scrapeButton = document.getElementById("scrapeButton");
scrapeButton.addEventListener("click", async () => {
  const url = prompt("Enter the URL to scrape:");
  if (url) {
    const scrapedData = await scrapeWebpage(url);
    if (scrapedData) {
      console.log("Scraped data:", scrapedData);
    }
  }
});

document.body.appendChild(scrapeButton);
