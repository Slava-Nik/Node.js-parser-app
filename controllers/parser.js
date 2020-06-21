const axios = require("axios");
const htmlParser = require("node-html-parser");
const utils = require("../utils");

exports.getPageData = async (req, res) => {
  try {
    const pageData = await axios.get("https://www.innoscripta.de/");
    const stylesData = await axios.get(
      "https://www.innoscripta.de/css/style.min.css"
    );
    const root = htmlParser.parse(pageData.data);

    const getSortedLinks = () => {
      const links = root.querySelectorAll("a");
      const linksHref = links
        .map((link) => {
          const raw = link.rawAttrs;
          const parsedLink = raw.match(/href=["'](.*?)["']/);
          const result = parsedLink ? parsedLink[1] : null;
          return result;
        })
        .filter((link) => Boolean(link));

      return utils.getSortedUniqueValues(linksHref);
    };

    const getSortedWords = () => {
      const body = root.querySelector("body");
      const words = body.rawText
        .split(" ")
        .map((word) => word.trim().toLowerCase())
        .filter((word) => {
          const isExist = Boolean(word);
          return isExist && word.match(/[a-zA-Z]+/);
        });
      return utils.getSortedUniqueValues(words);
    };

    const getSortedImages = () => {
      const stylesContent = stylesData.data;
      const parsedImageLinks = stylesContent
        .match(/background-image:url\(.+?\)/gi)
        .map((image) => {
          const link = image.match(/assets[^")]+/);
          return `https://www.innoscripta.de/${link}`;
        });
      return utils.getSortedUniqueValues(parsedImageLinks);
    };

    const result = {
      words: getSortedWords(),
      links: getSortedLinks(),
      images: getSortedImages(),
    };

    const htmlToReturn = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
          <style>
          h2 {
            padding-left: 10px;
          }
          li{
            padding: 5px;
          }  
        </style>
        <title>SlavaNik parser app</title>
      </head>
      <body>
          <h2>Links</h2>
          <ol>${result.links
            .map((link) => `<li><a href="${link}">${link}</a>.</li>`)
            .join("")}</ol>
      <h2>Images</h2>
      <ol>${result.images
        .map((image) => `<li><a href="${image}">${image}</a></li>`)
        .join("")}</ol>
      <h2>Words</h2>
      <ol>${result.words.map((word) => `<li>${word}</li>`).join("")}</ol>

      </body>
      </html>
    `;
    res.status(200).send(htmlToReturn);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .send("An error occured while fetching the innoscripta main page");
  }
};
