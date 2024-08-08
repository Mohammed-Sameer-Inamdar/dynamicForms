import express from 'express';
import { ROUTE_NAMES } from '../utils/constants.js';
import { createForm, deletForm, formDetails, listForm, updateForm } from './form.controller.js';
const formRouter = express.Router();

formRouter.get(ROUTE_NAMES.FORM.LIST, listForm);
formRouter.post(ROUTE_NAMES.FORM.CREATE, createForm);
formRouter.post(ROUTE_NAMES.FORM.UPDATE, updateForm);
formRouter.get(ROUTE_NAMES.FORM.VIEW, formDetails);
formRouter.delete(ROUTE_NAMES.FORM.DELETE, deletForm)

export default formRouter;