const express = require('express');
const router = express.Router();
const { Restaurant } = require('../models');

router.get('/', async (req, res) => {
  const restaurants = await Restaurant.findAll();
  res.json(restaurants);
});

router.post('/', async (req, res) => {
  const { name, address, phone, cuisine } = req.body;
  const restaurant = await Restaurant.create({ name, address, phone, cuisine });
  res.json(restaurant);
});

router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const { name, address, phone, cuisine } = req.body;
  const restaurant = await Restaurant.findByPk(id);
  if (!restaurant) {
    return res.status(404).json({ error: 'Restaurant not found' });
  }
  restaurant.name = name;
  restaurant.address = address;
  restaurant.phone = phone;
  restaurant.cuisine = cuisine;
  await restaurant.save();
  res.json(restaurant);
});

router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  const restaurant = await Restaurant.findByPk(id);
  if (!restaurant) {
    return res.status(404).json({ error: 'Restaurant not found' });
  }
  await restaurant.destroy();
  res.json({ message: 'Restaurant deleted successfully' });
});

module.exports = router;
