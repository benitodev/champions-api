let champions = [
  {
    id: 1,
    name: "Garen",
    line: "TopLaner",
  },
  {
    id: 2,
    name: "Akali",
    line: "Midline",
  },
  {
    id: 3,
    name: "Jhin",
    line: "BotLane",
  },
  {
    id: 4,
    name: "Lee sin",
    line: "Jungle",
  },
];
const express = require("express");
const cors = require("cors");
const app = express();
const logger = require("./loggerMiddleware");

app.use(cors());
app.use(express.json());

app.use(logger);

app.get("/", (request, response) => {
  response.send("<h1>Hellouu</h1>");
});
app.get("/api/notes", (request, response) => {
  response.json(champions);
});
app.get("/api/notes/:id", (request, response) => {
  const id = request.params.id;
  const dat = champions.find((item) => item.id === id);

  if (dat) {
    response.send(dat);
  } else {
    response.status(404).end();
  }
  console.log(id);
});

app.delete("/api/notes/:id", (request, response) => {
  const id = request.params.id;
  champions = champions.filter((item) => item.id !== id);

  response.status(204).end();
});
// const app = http.createServer((request, response) => {
//   response.writeHead(200, { "Content-Type": "application/json" });
//   response.end(JSON.stringify(champions));
// });

app.post("/api/notes", (req, res) => {
  const response = req.body;
  if (!response || !response.name) return res.status(404);
  console.log(response);

  let numbers = champions.map((item) => item.id);

  const id = Math.max(...numbers);

  const newchampions = { id: id + 1, name: response.name };

  // response = {
  //   ...response,
  //   newchampions,
  // };

  champions = [...champions, newchampions];
  res.json(response);
});

app.use((req, res) =>
  res.status(404).json({
    err: "Not Found",
  })
);

const PORT = 3001;
app.listen(PORT, () => {
  console.log("hello wordddddd from NODE JSS OMGG!!!!");
});
