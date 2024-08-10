import express from "express";
import { connectDB } from "./config/db.config.js";
import formRouter from "./forms/form.router.js";
import { APP_PORT, RESPONSE } from "./utils/constants.js";
import { Respond } from "./utils/helper.js";
import cors from 'cors';
import responseRouter from "./form_response/response.router.js";

const app = express();

app.use(cors())
app.use(express.text());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.all('/v1', (req, res) => {
    return Respond(res, 200, "Success");
})

app.use(formRouter);
app.use(responseRouter);

app.all("*", (req, res) => {
    return Respond(res, RESPONSE.NOT_FOUND.CODE, RESPONSE.NOT_FOUND.ROUTE);
})
app.listen(APP_PORT, () => {
    //log into file for tracking
    console.log(`Express listening on port  ${APP_PORT}  ${new Date()}`);
    connectDB();
})
export default app;