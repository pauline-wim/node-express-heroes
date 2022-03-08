const express = require("express");
const app = express();
const PORT = 8000;

app.use(express.json());

app.use((req, res, next) => {
  console.log("debug");
  next();
});

const mid = (req, res, next) => {
  console.log("Ok, héros ajouté");
  next();
};

const transformName = (req, res, next) => {
  if (req.body.name) {
    superheroes.push({
      name: req.body.name.toLowerCase(),
      power: req.body.power,
    });
  }
  next();
};

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

// Get hero's powers
app.get("/heroes/:name/powers", (req, res) => {
  const powers = superheroes.find((hero) => {
    return req.params.name === hero.name;
  });
  res.json(powers.power);
});

// Add hero to list of superheroes
app.post("/heroes", mid, transformName, (req, res) => {
  //   superheroes.push({
  //     // id: superheroes.length + 1,
  //     name: req.body.name,
  //     power: req.body.power,
  //   });
  res.json(superheroes);
});

// ERROR
app.get("*", (req, res) => {
  res.status(404).send("Page not found - 404");
});

app.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log("Server listening on PORT", PORT);
});
