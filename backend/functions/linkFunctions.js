function colors(tech) {
  if (tech === "1s10") {
    return "#d20f39";
  } else if (tech === "ip10") {
    return "#40a02b";
  } else if (tech === "ip20C") {
    return "#df8e1d";
  } else if (tech === "ip20E") {
    return "#1e66f5";
  } else if (tech === "ip20G") {
    return "#88e9ef";
  } else if (tech === "ip20S") {
    return "#179299";
  } else if (tech === "ip50") {
    return "#ea76cb";
  }
}

function calcLength(lat1, lat2, lon1, lon2) {
  const R = 6371e3; // metres
  const φ1 = (lat1 * Math.PI) / 180; // φ, λ in radians
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const d = R * c; // in metres
  return Math.floor(d);
}

function freqBand(freq) {
  if (freq >= 8000 && freq < 12500) {
    return "X";
  } else if (freq >= 12500 && freq < 18000) {
    return "Ku";
  } else if (freq >= 18000 && freq < 26500) {
    return "K";
  } else if (freq >= 26500 && freq < 40000) {
    return "Ka";
  } else if (freq >= 40000 && freq < 75000) {
    return "V";
  } else if (freq >= 75000 && freq < 110000) {
    return "W";
  }
}

module.exports = { colors, calcLength, freqBand };
