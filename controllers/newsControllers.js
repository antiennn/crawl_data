const newsModels = require("../models/news");
const axios = require("axios");
const cheerio = require("cheerio");
const ManageNews = {
  addNewFromVnexpress: async (req, res) => {
    try {
      const url = "https://vnexpress.net/kinh-doanh/quoc-te";

      axios(url).then((res) => {
        const html = res.data;
        const $ = cheerio.load(html);

        const articles = $("article").get().reverse(); // Convert to array and reverse

        articles.forEach(async function (element) {
          const text = $(element).find("p.description a").text().trim();
          if (text.length != 0) {
            const news = {
              content: text,
              date: Date.now(),
              source: "vnexpress",
            };
            const res = await newsModels.create(news);
          }
        });
      });
      return res.status(200).json("complete");
    } catch (err) {
      return res.status(500).json(err);
    }
  },
};
module.exports = ManageNews;
