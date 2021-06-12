const express = require("express");
const chalk = require("chalk");
const ApiRoutes = require("./routes");
const cors = require("cors");

const app = express();

app.use(cors());

// Add the apiRoutes stack to the server
app.use("/api", ApiRoutes);

// We need this to make sure we don't run a second instance
if (!module.parent) {
  app.listen("3333", (err) => {
    if (err) {
      console.log(chalk.red("Cannot run!"));
    } else {
      console.log(
        chalk.green.bold(
          `
        Yep this is working 🍺
        App listen on port: ${3333} 🍕
      `
        )
      );
    }
  });
}

module.exports = app;
