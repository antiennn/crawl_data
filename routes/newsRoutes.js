const route = require("express").Router();
const ManageNews = require("../controllers/newsControllers");

route.get("/vnexpress",ManageNews.addNewFromVnexpress);
route.get("/vneconomy",ManageNews.addNewFromVneconomy);

module.exports = route;