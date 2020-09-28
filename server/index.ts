import bodyParser from "body-parser";
import express, {Request, Response} from "express";
import next from "next";
import path from "path";
import {parse} from "url";
import {makeConnector} from "./SequelizeConnector/connector";
import {initializeModels} from "./SequelizeConnector/modelsInitializer";
import {apiRouter} from "./Routers/apiRouter";
import {contentRouter} from "./Routers/contentRouter";

const sequelize = makeConnector();
initializeModels(sequelize);

const server = express();
const app = next({dev: process.env.NODE_ENV !== "production"});


const requestHandler = (req: Request, res: Response) => app.getRequestHandler()(req, res, parse(req.url, true));

const publicDir = path.join(__dirname, "/public");

server.use(express.static(publicDir));
server.use(bodyParser.urlencoded({extended: true}));

app.prepare().then(() => {
    server.use("/api/v1", apiRouter);
    server.use("/docs", contentRouter);
    server.all("*", requestHandler);
    server.listen(process.env.APP_PORT || process.env.PORT || 3000);
});
