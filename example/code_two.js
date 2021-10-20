const puppeteer = require("puppeteer");
const fs = require("fs");

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  const url = "https://timesprospect.com/investors";

  await page.goto(url, { waitUntil: "networkidle2" });
  const result = await page.evaluate(async () => {
    let data = [];
    let elements = document.querySelector("div.site-wrap");

    for (const element of elements) {
      data.push({
        id: Date.now().toString(),
        program:
          element.querySelector('td[class="r_title"] > span')?.innerText || "",

        image:
          element
            .querySelector('td[class="r_title"] > span > a > img')
            ?.getAttribute("src") || "",
        type:
          element.querySelector('td[class="r_catory"] > span')?.innerText || "",
        location:
          element.querySelector('td[class="r_city"] > span')?.innerText || "",
        service:
          element.querySelector('td[class="r_service"] > span')?.innerText ||
          "",
        emp: element.querySelector('td[class="r_emp"] > span')?.innerText || "",
        linked: {
          techart:
            element
              .querySelector('td[class="r_linked"] > span > a:nth-child(1)')
              ?.getAttribute("href") || "",

          linkedin:
            element
              .querySelector('td[class="r_linked"] > span > a:nth-child(2)')
              ?.getAttribute("href") || "",

          facebook:
            element
              .querySelector('td[class="r_linked"] > span > a:nth-child(3)')
              ?.getAttribute("href") || "",

          twitter:
            element
              .querySelector('td[class="r_linked"] > span > a:nth-child(4)')
              ?.getAttribute("href") || "",
        },
      });
    }

  

    return data; // Return our data array
  });

  console.log(result);

  fs.appendFile("./investors.json", JSON.stringify(result), (err) =>
        err ? console.log(err) : null
      );

  browser.close();
})();
