const express= require("express");
const app= express();
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const axios = require("axios");
const CatFact = require("./models/catFacts");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");


main()
  .then(() => {
    console.log("mongoose is ready");
  })
  .catch((err) => {
    console.log(err);
  });
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/externalApis");
}


app.get("/api/catfact", async (req, res) => {
    try {
        const latestFact = await CatFact.findOne().sort({ fetchedAt: -1 });
        if (latestFact && (new Date() - latestFact.fetchedAt < 3600000)) {
            return res.send({ fact: latestFact.fact, source: "db" });
        }
        const response = await axios.get("https://catfact.ninja/fact");
        const newFact = response.data.fact;
        const savedFact = await CatFact.create({ fact: newFact });
        res.send({ fact: savedFact.fact, source: "api" });
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: "Something went wrong" });
    }
});

app.get("/apis", (req, res)=>{
    res.render("apis.ejs");

});


app.listen(8080, (req, res)=>{
    console.log("app is listening on port 8080...");
});
