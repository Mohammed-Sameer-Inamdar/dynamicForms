import express from 'express';
import { ROUTE_NAMES } from '../utils/constants.js';
import { responseCreate } from './response.controller.js';
const responseRouter = express.Router();

responseRouter.post(ROUTE_NAMES.RESPONSE.CREATE, responseCreate);

export default responseRouter;