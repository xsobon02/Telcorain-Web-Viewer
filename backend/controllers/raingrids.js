const pkg = require("mysql");
const { createConnection } = pkg;
const { createCanvas } = require("canvas");

exports.getRaingrids = (req, res, next) => {
  res.status(200).json({
    raingrids: raingrids,
    X_MIN: x_min,
    X_MAX: x_max,
    Y_MIN: y_min,
    Y_MAX: y_max,
  });
};

exports.setPointValue = (req, res, next) => {
  const lat = req.body.lat;
  const long = req.body.long;
  const index = req.body.index;
  const showTotal = req.body.showTotal;
  const x = Math.round((long - x_min) * 1000);
  const y = Math.round((lat - y_min) * 1000);
  let pointValue;
  let pointValues = [];
  if (x > x_count || y > y_count || x < 0 || y < 0) {
    pointValue = "Out of bounds.";
  } else {
    if (showTotal) {
      pointValue = Number(
        (toGridArray(values[index])[y][x] / (60 / timestep))
          .toString()
          .substring(0, 5)
      );
      values.forEach((arr) => {
        pointValues
          .push(toGridArray(arr)[y][x] / (60 / timestep))
          .toString()
          .substring(0, 5);
      });
    } else {
      pointValue = toGridArray(values[index])[y][x];
      values.forEach((arr) => {
        pointValues.push(toGridArray(arr)[y][x]);
      });
    }
  }

  res.status(200).json({
    pointValue: pointValue,
    pointValues: pointValues,
    times: times,
  });
};
let raingrids = [];
let values = [];
let times = [];
let x_min, x_max, y_min, y_max, x_count, y_count, timestep;

const db = createConnection({
  host: "IP ADDRESS",
  user: "USERNAME",
  password: "PASSWORD",
});

db.connect(function (err) {
  if (err) throw err;

  createRaingrids();
  setInterval(() => {
    createRaingrids();
  }, 300000);
});

function createRaingrids() {
  db.query(
    "SELECT * FROM telcorain_output.realtime_parameters ORDER BY started DESC LIMIT 1",
    function (err, result) {
      if (err) throw err;
      result.forEach((element) => {
        x_min = Number(element.X_MIN);
        x_max = Number(element.X_MAX);
        y_min = Number(element.Y_MIN);
        y_max = Number(element.Y_MAX);
        x_count = Number(element.X_count);
        y_count = Number(element.Y_count);
        timestep = Number(element.timestep) / 60;
      });
      console.log("done1");
    }
  );
  db.query(
    "SELECT * FROM ( SELECT * FROM telcorain_output.realtime_raingrids ORDER BY time DESC LIMIT 25 ) AS sub ORDER BY time ASC",
    function (err, result) {
      if (err) throw err;
      result.forEach((element, index) => {
        values[index] = element.grid;
        times[index] = element.time;
        raingrids[index] = {
          time: element.time,
          links: element.links,
          intensityCanvas: createRainfallMap(element.grid, x_count, y_count),
          totalCanvas: createRainfallMap(
            element.grid,
            x_count,
            y_count,
            60 / timestep,
            10
          ),
        };
      });
      console.log("done2");
    }
  );
}

function createRainfallMap(
  raingrid,
  xcount,
  ycount,
  divideBy = 1,
  isTotal = 1
) {
  let gridArray = toGridArray(raingrid);

  const canvas = createCanvas(xcount, ycount);
  const ctx = canvas.getContext("2d");
  ctx.translate(0, ycount);
  ctx.scale(1, -1);
  for (let y = ycount - 1; y >= 0; y--) {
    for (let x = 0; x < xcount; x++) {
      if (gridArray[y][x] / divideBy < 0.1 / isTotal) {
        ctx.fillStyle = "transparent";
      } else if (gridArray[y][x] / divideBy <= 0.158 / isTotal) {
        ctx.fillStyle = "rgb(48,18,59)";
      } else if (gridArray[y][x] / divideBy <= 0.251 / isTotal) {
        ctx.fillStyle = "rgb(65,70,172)";
      } else if (gridArray[y][x] / divideBy <= 0.398 / isTotal) {
        ctx.fillStyle = "rgb(71,118,238)";
      } else if (gridArray[y][x] / divideBy <= 0.631 / isTotal) {
        ctx.fillStyle = "rgb(58,163,252)";
      } else if (gridArray[y][x] / divideBy <= 1 / isTotal) {
        ctx.fillStyle = "rgb(27,208,213)";
      } else if (gridArray[y][x] / divideBy <= 1.585 / isTotal) {
        ctx.fillStyle = "rgb(37,236,167)";
      } else if (gridArray[y][x] / divideBy <= 2.512 / isTotal) {
        ctx.fillStyle = "rgb(97,252,108)";
      } else if (gridArray[y][x] / divideBy <= 3.981 / isTotal) {
        ctx.fillStyle = "rgb(164,252,60)";
      } else if (gridArray[y][x] / divideBy <= 6.31 / isTotal) {
        ctx.fillStyle = "rgb(210,233,53)";
      } else if (gridArray[y][x] / divideBy <= 10 / isTotal) {
        ctx.fillStyle = "rgb(244,199,58)";
      } else if (gridArray[y][x] / divideBy <= 15.849 / isTotal) {
        ctx.fillStyle = "rgb(254,155,45)";
      } else if (gridArray[y][x] / divideBy <= 25.119 / isTotal) {
        ctx.fillStyle = "rgb(243,99,21)";
      } else if (gridArray[y][x] / divideBy <= 39.811 / isTotal) {
        ctx.fillStyle = "rgb(218,57,7)";
      } else if (gridArray[y][x] / divideBy <= 63.096 / isTotal) {
        ctx.fillStyle = "rgb(178,26,1)";
      } else if (gridArray[y][x] / divideBy <= 100 / isTotal) {
        ctx.fillStyle = "rgb(122,4,3)";
      } else if (gridArray[y][x] / divideBy > 100 / isTotal) {
        ctx.fillStyle = "rgb(0,0,0)";
      }
      ctx.fillRect(x, y, 1, 1);
    }
  }
  return canvas
    .toDataURL("image/png")
    .replace("image/png", "image/octet-stream");
}

function toGridArray(raingrid) {
  return raingrid
    .replace("[[", "")
    .replace("]]", "")
    .split("], ")
    .map((item) => {
      return item
        .replace("[", "")
        .split(",")
        .map((item) => {
          return Number(item);
        });
    });
}
