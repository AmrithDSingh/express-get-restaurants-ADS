const express = require("express");
const app = express();
const {Restaurant} = require("./models/index")
const {sequelize} = require("./db");
const { request, response } = require("express");

const port = 3000;

//TODO: Create your GET Request Route Below: 
app.get("/restaurants", async (req, res) => {
    const restaurants = await Restaurant.findAll();
    res.json(restaurants);
  });
  app.get("/restaurants/:id", async (req, res) => {
    const id = req.params.id;
    const restaurant = await Restaurant.findByPk(id);
    res.json(restaurant);
  });
  app.listen(port, async () => {
    console.log(`App listening on port ${port}`);
  
    try {
      await sequelize.authenticate();
      console.log("Connection has been established successfully.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  });

  app.use(express.json());
  app.use(express.urlencoded({extended: true}));
  //answer
  app.post("/resturants",async (req, res) => {
    try {
      const restaurant = await Restaurant.create(req.body);
      res.json(restaurant);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  app.put("/resturants/:id",async (req, res) =>{
    const id = req.params.id;
    try {
      // Find the restaurant with the given ID
      const restaurant = await Restaurant.findByPk(id);
  
      if (!restaurant) {
        // If the restaurant is not found, return a 404 (Not Found) response
        res.status(404).json({ message: `Restaurant with ID ${id} not found` });
      } else {
        // Update the restaurant with the new data
        await restaurant.update(req.body);
  
        // Return the updated restaurant
        res.json(restaurant);
      }
    } catch (error) {
      // If there's an error, return a 400 (Bad Request) response
      res.status(400).json({ message: error.message });
    }
  });
  app.delete("/resturants/:id",async (req, res) =>{
    const id = req.params.id;
    try {
      
      const restaurant = await Restaurant.findByPk(id);
  
      if (!restaurant) {
        
        res.status(404).json({ message: `Restaurant with ID ${id} not found` });
      } else {
        
        await restaurant.destroy();
  
        
        res.json({ message: `Restaurant with ID ${id} deleted successfully` });
      }
    } catch (error) {
      
      res.status(400).json({ message: error.message });
    }
  });
  
  
  
  
  