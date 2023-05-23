const { colors, freqBand, calcLength } = require("../functions/linkFunctions");
const pkg = require("mysql");
const { createConnection } = pkg;

exports.getRealLinks = (req, res, next) => {
  res.status(200).json({
    links: realLinks,
  });
};

exports.getFakeLinks = (req, res, next) => {
  res.status(200).json({
    links: fakeLinks,
  });
};

let linksTable = {};
let sitesTable = {};

let realLinks = [];
let fakeLinks = [];

let db = createConnection({
  host: "IP ADDRESS",
  user: "USERNAME",
  password: "PASSWORD",
});

db.connect(function (err) {
  if (err) throw err;
  createLinks();
});

function createLinks() {
  db.query("SELECT * FROM cml_metadata.sites;", function (err, result) {
    if (err) throw err;
    result.forEach((element) => {
      sitesTable[`site${element.ID}`] = element;
    });
  });
  db.query("SELECT * FROM cml_metadata.links;", function (err, result) {
    if (err) throw err;
    result.forEach((element) => {
      linksTable[`link${element.ID}`] = element;
      realLinks.push({
        properties: {
          id: element.ID,
          frequencyA: element.frequency_A,
          frequencyB: element.frequency_B,
          freqBand: freqBand((element.frequency_A + element.frequency_B) / 2),
          technology: element.technology,
          distance: calcLength(
            sitesTable[`site${element.site_A}`].Y_coordinate,
            sitesTable[`site${element.site_B}`].Y_coordinate,
            sitesTable[`site${element.site_A}`].X_coordinate,
            sitesTable[`site${element.site_B}`].X_coordinate
          ),
          polarization: element.polarization,
          color: colors(element.technology),
        },
        coordinates: [
          [
            sitesTable[`site${element.site_A}`].Y_coordinate,
            sitesTable[`site${element.site_A}`].X_coordinate,
          ],
          [
            sitesTable[`site${element.site_B}`].Y_coordinate,
            sitesTable[`site${element.site_B}`].X_coordinate,
          ],
        ],
      });
      fakeLinks.push({
        properties: {
          id: element.ID,
          color: colors(element.technology),
        },
        coordinates: [
          [
            sitesTable[`site${element.site_A}`].Y_dummy_coordinate,
            sitesTable[`site${element.site_A}`].X_dummy_coordinate,
          ],
          [
            sitesTable[`site${element.site_B}`].Y_dummy_coordinate,
            sitesTable[`site${element.site_B}`].X_dummy_coordinate,
          ],
        ],
      });
    });
  });
}
