const express= require("express");
const app= express();
const path = require("path");
const methodOverride = require("method-override");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/apis", (req, res)=>{
   
    res.render("apis.ejs");

});

app.get("/", (req, res)=>{
    res.send("app is working");
});

app.listen(8080, (req, res)=>{
    console.log("app is listening on port 8080...");
});
