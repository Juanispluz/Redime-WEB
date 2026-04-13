const fs = require("fs");
const path = "Agents (1).md";
const lines = fs.readFileSync(path, "utf8").split("\n");
const filtered = lines.filter((l, i) => {
  const n = i + 1;
  if (n >= 25 && n <= 32) return false;
  if (n >= 80 && n <= 96) return false;
  if (n >= 98 && n <= 137) return false;
  if (n >= 156 && n <= 167) return false;
  if (n >= 180 && n <= 195) return false;
  if (n >= 209 && n <= 213) return false;
  if (n === 270 || n === 272 || n === 274) return false;
  if (n >= 319 && n <= 336) return false;
  if (n >= 351 && n <= 368) return false;
  return true;
});
fs.writeFileSync(path, filtered.join("\n"));
