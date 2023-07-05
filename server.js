const express = require("express");
const app = express();
const fs = require("fs");

const PORT = process.env.PORT;

let data = {
  val: [],
  message: "hello world",
};

/**
 * @param {file data} file
 * @returns resolve Promise
 */

function readFileFun(file) {
  return new Promise((resolve, reject) => {
    fs.readFile(file, "utf8", (err, data) => {
      if (err) throw err;
      resolve(data);
    });
  });
}

/**
 * Create Get API
 */

app.get("/", async (req, res) => {
  let result = await Promise.all([
    readFileFun("files/1.txt"),
    readFileFun("files/2.txt"),
  ]);
  result.map((item) => {
    return data.val.push(item);
  });
  res.send(data);
});

app.listen(PORT, () => console.log(`Running on ${PORT}`));
