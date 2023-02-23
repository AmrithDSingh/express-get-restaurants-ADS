const express = require("express");
const app = express();
const { sequelize } = require("./db");
const restaurantsRouter = require("./routes/restaurants");

const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/restaurants", restaurantsRouter);

app.listen(port, async () => {
  console.log(`App listening on port ${port}`);

  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});
