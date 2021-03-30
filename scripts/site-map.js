const fs = require("fs");
const axios = require("axios");
const prettier = require("prettier");

const formatted = (sitemap) => prettier.format(sitemap, { parser: "html" });

const domain = "https://drinklikeafish.xyz";
const categoryOptions = [
  1000,
  1100,
  1200,
  1300,
  1400,
  1500,
  2000,
  2100,
  2200,
  2300,
  3000,
  3100,
  3200,
  4000,
  4100,
  4200,
  4300,
  4400,
  4500,
  5000,
  5100,
  5200,
  5300,
  5400,
  5500,
  5600,
  5700,
  6000,
  6100,
  6200,
  6300,
  6400,
  6500,
  7000,
  7100,
  7200,
  7300,
];

axios
  .get(`https://api.drinklikeafish.xyz/alcohols/all`)
  .then(({ data: alcoholList }) => {
    const date = new Date().toISOString();

    const spaceReg = /\s/g;
    const alcoholSiteMap = `
        ${alcoholList
          .map((alcohol) => {
            return `
              <url>
                <loc>${domain}/alcoholDetail/${alcohol.name.replace(
              spaceReg,
              "%20"
            )}</loc>
                <lastmod>${date}</lastmod>
              </url>
            `;
          })
          .join("")}
      `;

    const categorySiteMap = `
      ${categoryOptions
        .map((category) => {
          return `
            <url>
              <loc>${domain}/alcoholCategory/${category}</loc>
              <lastmod>${date}</lastmod>
            </url>
          `;
        })
        .join("")}
    `;

    const generatedSitemap = `
      <?xml version="1.0" encoding="UTF-8"?>
      <urlset
        xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
      >
        <url>
          <loc>https://drinklikeafish.xyz/</loc>
          <lastmod>${date}</lastmod>
          <priority>1.00</priority>
        </url>
        <url>
          <loc>https://drinklikeafish.xyz/login</loc>
          <lastmod>${date}</lastmod>
        </url>
        <url>
          <loc>https://drinklikeafish.xyz/signup</loc>
          <lastmod>${date}</lastmod>
          <priority>1.00</priority>
        </url>
        ${categorySiteMap}
        ${alcoholSiteMap}
      </urlset>
      `;

    const formattedSitemap = formatted(generatedSitemap);

    fs.writeFileSync("../public/sitemap.xml", formattedSitemap, "utf8");
    console.log("sitemap generated");
  })
  .catch((err) => console.log(err));
