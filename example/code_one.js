const puppeteer = require("puppeteer");
const fs = require("fs");
(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto("https://timesprospect.com/investors");

  const urls = await page.evaluate(() =>
    Array.from(
      document.querySelectorAll(
        "#dataTable > tbody > tr > td.r_title > span > a"
      ),
      (element) => element.href
    )
  );

  for (let i = 0, total_urls = urls.length; i < total_urls; i++) {
    await page.goto(urls[i]);
    await page
      .evaluate(async () => {
        let data = [];
        let elements = document.querySelectorAll("div.site-wrap");

        for (const element of elements) {
          data.push({
            title:
              element.querySelector(
                "div.site-blocks-cover.inner-page-cover.overlay.d-none.d-xl-flex > div > div > div.col-lg-7.col-md-5 > h1"
              )?.innerText || "",
            overall_destinition: element.querySelector("div.col-lg-7.col-md-5 > p")?.innerText || "",

            image:
              element
                .querySelector("div > div > div.col-lg-2.col-md-2 > img")
                ?.getAttribute("src") || "",
            generalInfo: {
              desciption:
                element.querySelector(
                  "div.site-section > div > div > div.col-lg-8 > div:nth-child(3) > div > p"
                )?.innerText || "",
              headquarter:
                element.querySelector(
                  "div.site-section > div > div > div.col-lg-8 > div:nth-child(4) > div:nth-child(2) > p"
                )?.innerText || "",
              keywors_servises:
                element.querySelector(
                  "div.site-section > div > div > div.col-lg-8 > div:nth-child(4) > div:nth-child(3) > p"
                )?.innerText || "",
              founded_date:
                element.querySelector(
                  "div.site-section > div > div > div.col-lg-8 > div:nth-child(4) > div:nth-child(4) > p"
                )?.innerText || "",
              revenue_range:
                element.querySelector(
                  "div.site-section > div > div > div.col-lg-8 > div:nth-child(4) > div:nth-child(5) > p"
                )?.innerText || "",
              revenue_currency:
                element.querySelector(
                  "div.site-section > div > div > div.col-lg-8 > div:nth-child(4) > div:nth-child(6) > p"
                )?.innerText || "",

              total_founders:
                element.querySelector(
                  "div.site-section > div > div > div.col-lg-8 > div:nth-child(4) > div:nth-child(7) > p"
                )?.innerText || "",
              founders_name:
                element.querySelector(
                  "div.site-section > div > div > div.col-lg-8 > div:nth-child(4) > div:nth-child(8) > p"
                )?.innerText || "",
              number_of_employees:
                element.querySelector(
                  "div.site-section > div > div > div.col-lg-8 > div:nth-child(4) > div:nth-child(9) > h4"
                )?.innerText || "",
            },
            fundingDeatils: {
              funding_rounds:
                element.querySelector(
                  "div.site-section > div > div > div.col-lg-8 > div:nth-child(7) > div:nth-child(1) > p"
                )?.innerText || "",
              funding_status:
                element.querySelector(
                  "div.site-section > div > div > div.col-lg-8 > div:nth-child(7) > div:nth-child(2) > p"
                )?.innerText || "",
              lasr_funding_date:
                element.querySelector(
                  "div.site-section > div > div > div.col-lg-8 > div:nth-child(7) > div:nth-child(3) > p"
                )?.innerText || "",
              last_funding_amount:
                element.querySelector(
                  "body > div.site-wrap > div.site-section > div > div > div.col-lg-8 > div:nth-child(7) > div:nth-child(4) > p"
                )?.innerText || "",
              last_funding_amount_currency:
                element.querySelector(
                  "div.site-section > div > div > div.col-lg-8 > div:nth-child(7) > div:nth-child(5) > p"
                )?.innerText || "",
              last_funding_type:
                element.querySelector(
                  "div.site-section > div > div > div.col-lg-8 > div:nth-child(7) > div:nth-child(6) > p"
                )?.innerText || "",

              last_equite_funding_amount:
                element.querySelector(
                  "div.site-section > div > div > div.col-lg-8 > div:nth-child(7) > div:nth-child(7) > p"
                )?.innerText || "",
              last_equite_funding_type:
                element.querySelector(
                  "div.site-section > div > div > div.col-lg-8 > div:nth-child(7) > div:nth-child(8) > p"
                )?.innerText || "",
              total_equite_funding_amount:
                element.querySelector(
                  "div.site-section > div > div > div.col-lg-8 > div:nth-child(7) > div:nth-child(9) > p"
                )?.innerText || "",
              total_funding_amount:
                element.querySelector(
                  "div.site-section > div > div > div.col-lg-8 > div:nth-child(7) > div:nth-child(10) > p"
                )?.innerText || "",
            },
            investorsDeatils: {
              total_lead_investors:
                element.querySelector(
                  "div.site-section > div > div > div.col-lg-8 > div:nth-child(10) > div:nth-child(1) > p"
                )?.innerText || "",
              total_investors:
                element.querySelector(
                  "div.site-section > div > div > div.col-lg-8 > div:nth-child(10) > div:nth-child(2) > p"
                )?.innerText || "",
            },
            ipoDeails: {
              ipoStatus:
                element.querySelector(
                  "div.site-section > div > div > div.col-lg-8 > div:nth-child(13) > div > p"
                )?.innerText || "",
            },
            contacts: {
              techstars:
                element
                  .querySelector(
                    "div.site-blocks-cover.inner-page-cover.overlay.d-none.d-xl-flex > div > div > div.col-lg-3.col-md-5.pl-0.pr-0.item-cover-contact-section > p > a:nth-child(1)"
                  )
                  ?.getAttribute("href") || "",

              facebook:
                element
                  .querySelector(
                    "div.site-blocks-cover.inner-page-cover.overlay.d-none.d-xl-flex > div > div > div.col-lg-3.col-md-5.pl-0.pr-0.item-cover-contact-section > p > a:nth-child(2)"
                  )
                  ?.getAttribute("href") || "",
              twitter:
                element
                  .querySelector(
                    "div.site-blocks-cover.inner-page-cover.overlay.d-none.d-xl-flex > div > div > div.col-lg-3.col-md-5.pl-0.pr-0.item-cover-contact-section > p > a:nth-child(3)"
                  )
                  ?.getAttribute("href") || "",
              linkedin:
                element.querySelector(
                  "div.site-blocks-cover.inner-page-cover.overlay.d-none.d-xl-flex > div > div > div.col-lg-3.col-md-5.pl-0.pr-0.item-cover-contact-section > p > a:nth-child(4)"
                )?.innerText || "",
              phone_number:
                element.querySelector(
                  "div.site-blocks-cover.inner-page-cover.overlay.d-none.d-xl-flex > div > div > div.col-lg-3.col-md-5.pl-0.pr-0.item-cover-contact-section > h3"
                )?.innerText || "",
            },
            location: {
              location:
                element.querySelector(
                  "div.site-section > div > div > div.col-lg-8 > div:nth-child(14) > div > div > div > div.row.align-items-center.pt-2 > div.col-7 > small"
                )?.innerText || "",
              link_destinition:
                element
                  .querySelector(
                    "div.site-section > div > div > div.col-lg-8 > div:nth-child(14) > div > div > div > div.row.align-items-center.pt-2 > div.col-5.text-right > a"
                  )
                  ?.getAttribute("href") || "",
            },
            features: {
              accelerator_progarm_type:
                element.querySelector(
                  "div.site-section > div > div > div.col-lg-8 > div:nth-child(15) > div > div > div.col-9"
                )?.innerText || "",
            },
          });
        }

        return data; // Return our data array
      })
      .then((data) => {
        fs.appendFile("./investors.json", JSON.stringify(data), (err) =>
        err ? console.log(err) : null
      );
    
      });
  }

  await browser.close();
})();

/**
  const result = await page.evaluate(async () => {
    let data = [];
    let elements = document.querySelector("tbody").querySelectorAll("tr");

    for (const element of elements) {
      data.push({
        progarm: element.querySelector('td[class="r_title"] > span')?.innerText,
        image: element
          .querySelector('td[class="r_title"] > span > a > img')
          ?.getAttribute("src"),
      });
    }

    return data; // Return our data array
  });
 */

/*
  
  body > div.site-wrap > div.site-blocks-cover.inner-page-cover.overlay.d-none.d-xl-flex > div > div > div.col-lg-7.col-md-5 > h1
  */
