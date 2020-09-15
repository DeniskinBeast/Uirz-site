import {Router} from "express";

import {
    constituentDocsPage,
    corruptionCounteringPageLocalActs,
    corruptionCounteringPageReports,
    expertCouncilPageProfiles,
    expertsCouncilPageLastMeetings,
    expertsCouncilPageLastWorkingGroups,
    expertsCouncilPastMeetingsPage,
    expertsCouncilPastMeetingsPageByYear,
    expertsCouncilPastMeetingsPageCount,
    expertsCouncilPastMeetingsPageCountByYear,
    expertsCouncilWorkingGroupPage,
    expertsCouncilWorkingGroupPageByYear, expertsCouncilWorkingGroupPageByYearCount,
    expertsCouncilWorkingGroupPageCount,
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

apiRouter.get("/expertsCouncilProfiles", expertCouncilPageProfiles);

apiRouter.get("/expertsCouncilLastMeetings", expertsCouncilPageLastMeetings);

apiRouter.get("/expertsCouncilPastMeetings/:pageNumber", expertsCouncilPastMeetingsPage);

apiRouter.get("/expertsCouncilPastMeetingsCount", expertsCouncilPastMeetingsPageCount);

apiRouter.get("/expertsCouncilPastMeetingsByYear/:year/:pageNumber", expertsCouncilPastMeetingsPageByYear);

apiRouter.get("/expertsCouncilPastMeetingsCountByYear/:year", expertsCouncilPastMeetingsPageCountByYear);

apiRouter.get("/expertsCouncilLastWorkingGroups", expertsCouncilPageLastWorkingGroups);

apiRouter.get("/expertsCouncilWorkingGroup/:pageNumber", expertsCouncilWorkingGroupPage);

apiRouter.get("/expertsCouncilWorkingGroupCount", expertsCouncilWorkingGroupPageCount);

apiRouter.get("/expertsCouncilWorkingGroupByYear/:year/:pageNumber", expertsCouncilWorkingGroupPageByYear);

apiRouter.get("/expertsCouncilWorkingGroupCountByYear/:year", expertsCouncilWorkingGroupPageByYearCount);
