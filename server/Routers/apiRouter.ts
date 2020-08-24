import {Router} from "express";

import {
    InstNewsPage,
    lawNewsPage,
    mainPageLastInstNews,
    mainPageLastLawNews,
    structurePage
} from "../Controllers/apiController";

export const apiRouter = Router();

apiRouter.get("/structure", structurePage);

apiRouter.get("/lastInstNews", mainPageLastInstNews);

apiRouter.get("/lastLawNews", mainPageLastLawNews);

apiRouter.get("/lawNews/:pageNumber([0-9])", lawNewsPage);

apiRouter.get("/uniNews/:pageNumber([0-9])", InstNewsPage);
