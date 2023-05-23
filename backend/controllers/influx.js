const { InfluxDB } = require("@influxdata/influxdb-client");

exports.getRealTimeData = (req, res, next) => {
  res.status(200).json({
    realTimeData: realTimeData,
  });
};

const url = "URL" || "";
const token = "TOKEN";
const org = "ORG" || "";

const queryApi = new InfluxDB({ url, token }).getQueryApi(org);

const fluxQuery =
  'from(bucket:"output_cml") |> range(start: -36h, stop: 0h) |> filter(fn: (r) => r._measurement == "telcorain") |> filter(fn: (r) => r._field == "rain_intensity")';

let realTimeData = {};
const fluxObserver = {
  next(row, tableMeta) {
    const o = tableMeta.toObject(row);
    if (!realTimeData[`${o.cml_id}`]) {
      realTimeData[`${o.cml_id}`] = {
        values: [o._value],
        timeStamps: [o._time],
      };
    } else {
      realTimeData[`${o.cml_id}`].values.push(o._value);
      realTimeData[`${o.cml_id}`].timeStamps.push(o._time);
    }
  },
  error(error) {
    console.error(error);
    console.log("\nFinished ERROR");
  },
  complete() {
    console.log("\nFinished SUCCESS");
  },
};

queryApi.queryRows(fluxQuery, fluxObserver);
setInterval(() => {
  queryApi.queryRows(fluxQuery, fluxObserver);
}, 300000);
