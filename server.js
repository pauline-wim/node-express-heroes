var express = require("express");
var app = express();
var PORT = 8000;

app.use(express.json());

app.use((req, res, next) => {
  console.log("debug");
  next();
});

const superheroes = [
  {
    name: "Iron Man",
    power: ["money"],
    color: "red",
    isAlive: true,
    age: 46,
    image:
      "https://blog.fr.playstation.com/tachyon/sites/10/2019/07/unnamed-file-18.jpg?resize=1088,500&crop_strategy=smart",
  },
  {
    name: "Thor",
    power: ["electricity", "worthy"],
    color: "blue",
    isAlive: true,
    age: 300,
    image:
      "https://www.bdfugue.com/media/catalog/product/cache/1/image/400x/17f82f742ffe127f42dca9de82fb58b1/9/7/9782809465761_1_75.jpg",
  },
  {
    name: "Daredevil",
    power: ["blind"],
    color: "red",
    isAlive: false,
    age: 30,
    image:
      "https://aws.vdkimg.com/film/2/5/1/1/251170_backdrop_scale_1280xauto.jpg",
  },
];

// All heroes
app.get("/heroes", (_req, res) => {
  res.json(superheroes);
});

// Get heroes by name
app.get("/heroes/:name", (req, res) => {
  const hero = superheroes.find((hero) => {
    return req.params.name === hero.name;
  });
  res.json(hero);
});

// Get heroes powers
app.get("/heroes/:name/powers", (req, res) => {
  const powers = superheroes.find((hero) => {
    return req.params.name === hero.name;
  });
  res.json(powers.power);
});

// ERROR
app.get("*", (req, res) => {
  res.status(404).send("Page not found - 404");
});

app.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log("Server listening on PORT", PORT);
});
