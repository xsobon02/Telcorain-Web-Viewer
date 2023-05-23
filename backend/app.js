const express = require("express");
const bodyParser = require("body-parser");

const linksRoutes = require("./routes/links");
const authRoutes = require("./routes/auth");
const influxRoutes = require("./routes/influx");
const raingridsRoutes = require("./routes/raingrids");

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/links", linksRoutes);
app.use("/auth", authRoutes);
app.use("/influx", influxRoutes);
app.use("/output", raingridsRoutes);

app.listen(8080);
