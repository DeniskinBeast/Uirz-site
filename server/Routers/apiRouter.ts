import {Router} from "express";

import {
    constituentDocsPage,
    corruptionCounteringPageLocalActs,
    corruptionCounteringPageReports,
    federalLegislationMonitoringPageByMonth,
    federalLegislationMonitoringPageByYear,
    federalLegislationMonitoringPageLast,
    InstNewsPage,
    instNewsPageByYear,
    instNewsPageCountByYear,
    instNewsPageNewsCount,
    lawNewsPage,
    lawNewsPageByYear,
    lawNewsPageCountByYear,
    lawNewsPageNewsCount,
    legislationReviewsPage,
    legislationReviewsPageByYear,
    legislationReviewsPageCountByYear,
    legislationReviewsPageReviewsCount,
    legislationStatusPage,
    mainPageLastInstNews,
    mainPageLastLawNews,
    publicationsPage,
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

apiRouter.get("/legislationReviews/:pageNumber", legislationReviewsPage);

apiRouter.get("/legislationReviewsCount", legislationReviewsPageReviewsCount);

apiRouter.get("/legislationReviewsByYear/:year/:pageNumber", legislationReviewsPageByYear);

apiRouter.get("/legislationReviewsCountByYear/:year", legislationReviewsPageCountByYear);

apiRouter.get("/federalMonitoringLastReport", federalLegislationMonitoringPageLast);

apiRouter.get("/federalMonitoringReportByYear/:year", federalLegislationMonitoringPageByYear);

apiRouter.get("/federalMonitoringReportByMonth/:year/:month", federalLegislationMonitoringPageByMonth);
