import * as express from 'express';

import { PropertyService } from './property.service';

const propertyService = new PropertyService();

const controller = express.Router();

controller.get('/', async (req, res) => {
  const query = req.body;
  const properties = await propertyService.listProperties(query, req.query.offset, req.query.limit);
  res.send(properties);
});

controller.post('/', async (req, res) => {
  const property = req.body;
  const response = await propertyService.insertProperty(property);
  res.send(response);
});

controller.put('/', async (req, res) => {
  const property = req.body;
  const response = await propertyService.updateProperty(property);
  res.send(response);
});

export { controller as PropertyController };
