const route = require("express").Router();
const ManageNews = require("../controllers/newsControllers");

route.get("/vnexpress",ManageNews.addNewFromVnexpress);

module.exports = route;