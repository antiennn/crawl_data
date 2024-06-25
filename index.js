const express = require("express");

const mongoose = require("mongoose");
const newsRoutes = require("./routes/newsRoutes");
const dotenv = require("dotenv");
dotenv.config();
const app = express();


mongoose.set('strictQuery', true);

mongoose
    .connect(process.env.MONGODB_URL)
    .then(console.log("Connected to MongoDB"))
    .catch((err) => {
        console.log(err);
    });
// Define a route

app.use("/get_data",newsRoutes);

// Start the server
app.listen(3000, () => {
  console.log(`Server is running`);
});
