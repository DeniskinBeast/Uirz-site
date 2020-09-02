import {Router} from "express";

import {
    constituentDocsPage, corruptionCounteringPageLocalActs, corruptionCounteringPageReports,
    InstNewsPage, instNewsPageNewsCount,
    lawNewsPage, lawNewsPageNewsCount, legislationStatusPage,
    mainPageLastInstNews,
    mainPageLastLawNews, publicationsPage,
    structurePage
} from "../Controllers/apiController";

export const apiRouter = Router();

apiRouter.get("/structure", structurePage);

apiRouter.get("/lastInstNews", mainPageLastInstNews);

apiRouter.get("/lastLawNews", mainPageLastLawNews);

apiRouter.get("/lawNews/:pageNumber([0-9]*)", lawNewsPage);

apiRouter.get("/lawNewsCount", lawNewsPageNewsCount);

apiRouter.get("/uniNews/:pageNumber([0-9]*)", InstNewsPage);

apiRouter.get("/uniNewsCount", instNewsPageNewsCount);

apiRouter.get("/constituent_docs", constituentDocsPage);

apiRouter.get("/corruption/local_acts", corruptionCounteringPageLocalActs);

apiRouter.get("/corruption/corruption_reports", corruptionCounteringPageReports);

apiRouter.get("/legislation_status_reports", legislationStatusPage);

apiRouter.get("/publications", publicationsPage);
