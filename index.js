import express from "express";
import fs from "fs";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

const readData = () => {
  try {
    const data = fs.readFileSync("./db.json");
    return JSON.parse(data);
  } catch (error) {
    console.log(error);
  }
};

const writeData = (data) => {
  try {
    fs.writeFileSync("./db.json", JSON.stringify(data));
  } catch (error) {
    console.log(error);
  }
};

app.get("/", (req, res) => {
  res.send("Welcome to my first API with Node js!");
});

app.get("/plato", (req, res) => {
  const data = readData();
  res.json(data.plato);
});

app.get("/plato/:id", (req, res) => {
  const data = readData();
  const id = parseInt(req.params.id);
  const book = data.plato.find((book) => book.id === id);
  res.json(book);
});

app.post("/plato", (req, res) => {
  const data = readData();
  const body = req.body;
  const newBook = {
    id: data.plato.length + 1,
    ...body,
  };
  data.plato.push(newBook);
  writeData(data);
  res.json(newBook);
});

app.put("/plato/:id", (req, res) => {
  const data = readData();
  const body = req.body;
  const id = parseInt(req.params.id);
  const bookIndex = data.plato.findIndex((book) => book.id === id);
  data.plato[bookIndex] = {
    ...data.books[bookIndex],
    ...body,
  };
  writeData(data);
  res.json({ message: "Plato actualizado" });
});

app.delete("/plato/:id", (req, res) => {
  const data = readData();
  const id = parseInt(req.params.id);
  const bookIndex = data.plato.findIndex((book) => book.id === id);
  data.plato.splice(bookIndex, 1);
  writeData(data);
  res.json({ message: "Plato eliminado" });
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
