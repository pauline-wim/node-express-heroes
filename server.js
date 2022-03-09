const express = require("express");
const app = express();
const PORT = 8000;

// MIDDLEWARES
const debug = (_req, _res, next) => {
  console.log("Request received");
  next();
};

app.use(express.json(), debug);

const mid = (_req, _res, next) => {
  console.log("Ok, héros ajouté");
  next();
};

const transformName = (req, _res, next) => {
  if (req.body.name) {
    req.body.name = req.body.name.toLowerCase();
  }
  next();
};

const findHero = (req, res, next) => {
  const hero = superheroes.find((hero) => {
    return (
      req.params.name.toLowerCase().replace(" ", "-") ===
      hero.name.toLowerCase().replace(" ", "-")
    );
  });
  req.hero = hero;
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
app.get("/heroes/:name", findHero, (req, res) => {
  res.json(req.hero);
});

// Get hero's powers
app.get("/heroes/:name/powers", findHero, (req, res) => {
  res.json(req.hero.power);
});

// Add hero to list of superheroes
app.post("/heroes", mid, transformName, (req, res) => {
  superheroes.push(req.body);
  res.status(201).json(superheroes);
});

// Add a power to one of the heroes of the list
app.patch("/heroes/:name/powers", findHero, (req, res) => {
  req.hero.power.push(req.body.power);
  res.json(req.hero.power);
  console.log(`Added power to ${req.params.name} : ${req.body.power}`);
});

// ERROR
app.get("*", (req, res) => {
  res.status(404).send("Page not found - 404");
});

app.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log("Server listening on PORT", PORT);
});
