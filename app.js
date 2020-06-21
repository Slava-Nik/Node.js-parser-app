const express = require("express");
const port = process.env.PORT || 5000;
const app = express();
const indexRouter = require("./routes/index");
const parserRouter = require("./routes/parser");

app.use("/", indexRouter);
app.use("/parser", parserRouter);

module.exports = () => {
  app.listen(port, (err) => {
    if (err) {
      console.log("Something bad happened", err);
      process.exit(1);
    } else {
      console.log(`Server is launched on port ${port}`);
    }
  });
};
