import {Router} from "express";

import {
    constituentDocsPage, corruptionCounteringPageLocalActs, corruptionCounteringPageReports,
    InstNewsPage, instNewsPageByYear, instNewsPageCountByYear, instNewsPageNewsCount,
    lawNewsPage, lawNewsPageByYear, lawNewsPageCountByYear, lawNewsPageNewsCount, legislationStatusPage,
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

apiRouter.get("/lawNewsByYear/:year/:pageNumber([0-9]*)", lawNewsPageByYear);

apiRouter.get("/lawNewsCountByYear/:year", lawNewsPageCountByYear);

apiRouter.get("/uniNews/:pageNumber([0-9]*)", InstNewsPage);

apiRouter.get("/uniNewsCount", instNewsPageNewsCount);

apiRouter.get("/uniNewsByYear/:year/:pageNumber([0-9]*)", instNewsPageByYear);

apiRouter.get("/uniNewsCountByYear/:year", instNewsPageCountByYear);

apiRouter.get("/constituent_docs", constituentDocsPage);

apiRouter.get("/corruption/local_acts", corruptionCounteringPageLocalActs);

apiRouter.get("/corruption/corruption_reports", corruptionCounteringPageReports);

apiRouter.get("/legislation_status_reports", legislationStatusPage);

apiRouter.get("/publications", publicationsPage);
