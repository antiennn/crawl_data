const newsModels = require("../models/news");
const axios = require("axios");
const cheerio = require("cheerio");
const { request, response } = require("express");
const ManageNews = {
  addNewFromVnexpress: async (request, response) => {
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
            await newsModels.create(news).catch(err => {});
          }
        });
      });
    } catch (err) {
      return response.status(500).json(err);
    }finally{
      return response.status(200).json({"detail":"complete"});
    }
  },

  addNewFromVneconomy: async (request,response)=>{
    try{
      const url = "https://vneconomy.vn/the-gioi-kinh-te.htm";
      axios(url).then((res)=>{
        const html = res.data
        const $ = cheerio.load(html);
        const articles = $("article").get().reverse()
        articles.forEach(async function (element) {
          const date = $(element).find("time").text().trim()
          const text = $(element).find("div.story__summary").text().trim();
          if (text.length != 0 && date.length !=0) {
            const news = {
              content: text,
              date: new Date(date.split("/").reverse().join("-")),
              source: "vneconomy",
            };
            await newsModels.create(news).catch(err => {
              console.log(err);
            });
          }
        });
      })
    }catch(err){
      return response.status(500).json(err);
    }finally{
      return response.status(200).json({"detail":"complete"});
    }
  }
};
module.exports = ManageNews;
