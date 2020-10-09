import {Router} from "express";

import {
    actsDevPageLastReport,
    actsDevPageReportByYear,
    actsDevYears,
    constituentDocsPage,
    corruptionCounteringPageLocalActs,
    corruptionCounteringPageReports,
    eventsParticipationPageLastReport,
    eventsParticipationReportByYear,
    eventsParticipationYears,
    expertCouncilPageProfiles,
    expertsCouncilPageLastMeetings,
    expertsCouncilPageLastWorkingGroups,
    expertsCouncilPastMeetingsPage,
    expertsCouncilPastMeetingsPageByYear,
    expertsCouncilPastMeetingsPageCount,
    expertsCouncilPastMeetingsPageCountByYear,
    expertsCouncilPastMeetingsYears,
    expertsCouncilWorkingGroupPage,
    expertsCouncilWorkingGroupPageByYear,
    expertsCouncilWorkingGroupPageByYearCount,
    expertsCouncilWorkingGroupPageCount,
    expertsCouncilWorkingGroupYears,
    federalLegislationMonitoringPageByMonth,
    federalLegislationMonitoringPageByYear,
    federalLegislationMonitoringPageLast,
    federalLegislationYears,
    InstNewsPage,
    instNewsPageByYear,
    instNewsPageCountByYear,
    instNewsPageNewsCount, instNewsYears,
    lawNewsPage,
    lawNewsPageByYear,
    lawNewsPageCountByYear,
    lawNewsPageNewsCount,
    lawNewsYears,
    legalExpertisePageLastReport,
    legalExpertisePageReportByYear,
    legalExpertiseYears,
    legislationAnalysisPageLastReport,
    legislationAnalysisPageReportByYear,
    legislationAnalysisYears,
    legislationReviewsPage,
    legislationReviewsPageByYear,
    legislationReviewsPageCountByYear,
    legislationReviewsPageReviewsCount,
    legislationReviewsPageYears,
    legislationStatusPage,
    mainPageLastInstNews,
    mainPageLastLawNews,
    publicationsPage,
    regionalLegislationGeneralDocumentsYears,
    regionalLegislationGovernmentDecreesYears,
    regionalLegislationGovernorDecreesYears,
    regionalLegislationPageGeneralDocumentsByYear,
    regionalLegislationPageGeneralDocumentsLast,
    regionalLegislationPageGovernmentDecreesByMonth,
    regionalLegislationPageGovernmentDecreesByYear,
    regionalLegislationPageGovernmentDecreesLast,
    regionalLegislationPageGovernorDecreesByMonth,
    regionalLegislationPageGovernorDecreesByYear,
    regionalLegislationPageGovernorDecreesLast,
    regionalLegislationPageRegionLawByMonth,
    regionalLegislationPageRegionLawByYear,
    regionalLegislationPageRegionLawLast, regionalMonitoringRegionLawYears,
    structurePage
} from "../Controllers/apiController";

export const apiRouter = Router();

apiRouter.get("/structure", structurePage);

apiRouter.get("/lastInstNews", mainPageLastInstNews);

apiRouter.get("/lastLawNews", mainPageLastLawNews);

apiRouter.get("/lawNewsYears", lawNewsYears);

apiRouter.get("/lawNews/:pageNumber([0-9]*)", lawNewsPage);

apiRouter.get("/lawNewsCount", lawNewsPageNewsCount);

apiRouter.get("/lawNewsByYear/:year/:pageNumber([0-9]*)", lawNewsPageByYear);

apiRouter.get("/lawNewsCountByYear/:year", lawNewsPageCountByYear);

apiRouter.get("/uniNews/:pageNumber([0-9]*)", InstNewsPage);

apiRouter.get("/uniNewsYears", instNewsYears);

apiRouter.get("/uniNewsCount", instNewsPageNewsCount);

apiRouter.get("/uniNewsByYear/:year/:pageNumber([0-9]*)", instNewsPageByYear);

apiRouter.get("/uniNewsCountByYear/:year", instNewsPageCountByYear);

apiRouter.get("/constituent_docs", constituentDocsPage);

apiRouter.get("/corruption/local_acts", corruptionCounteringPageLocalActs);

apiRouter.get("/corruption/corruption_reports", corruptionCounteringPageReports);

apiRouter.get("/legislation_status_reports", legislationStatusPage);

apiRouter.get("/publications", publicationsPage);

apiRouter.get("/legislationReviews/:pageNumber", legislationReviewsPage);

apiRouter.get("/legislationReviewsYears", legislationReviewsPageYears);

apiRouter.get("/legislationReviewsCount", legislationReviewsPageReviewsCount);

apiRouter.get("/legislationReviewsByYear/:year/:pageNumber", legislationReviewsPageByYear);

apiRouter.get("/legislationReviewsCountByYear/:year", legislationReviewsPageCountByYear);

apiRouter.get("/federalMonitoringLastReport", federalLegislationMonitoringPageLast);

apiRouter.get("/federalMonitoringYears", federalLegislationYears);

apiRouter.get("/federalMonitoringReportByYear/:year", federalLegislationMonitoringPageByYear);

apiRouter.get("/federalMonitoringReportByMonth/:year/:month", federalLegislationMonitoringPageByMonth);

apiRouter.get("/expertsCouncilProfiles", expertCouncilPageProfiles);

apiRouter.get("/expertsCouncilLastMeetings", expertsCouncilPageLastMeetings);

apiRouter.get("/expertsCouncilPastMeetings/:pageNumber", expertsCouncilPastMeetingsPage);

apiRouter.get("/expertsCouncilPastMeetingYears", expertsCouncilPastMeetingsYears);

apiRouter.get("/expertsCouncilPastMeetingsCount", expertsCouncilPastMeetingsPageCount);

apiRouter.get("/expertsCouncilPastMeetingsByYear/:year/:pageNumber", expertsCouncilPastMeetingsPageByYear);

apiRouter.get("/expertsCouncilPastMeetingsCountByYear/:year", expertsCouncilPastMeetingsPageCountByYear);

apiRouter.get("/expertsCouncilLastWorkingGroups", expertsCouncilPageLastWorkingGroups);

apiRouter.get("/expertsCouncilWorkingGroupYears", expertsCouncilWorkingGroupYears);

apiRouter.get("/expertsCouncilWorkingGroup/:pageNumber", expertsCouncilWorkingGroupPage);

apiRouter.get("/expertsCouncilWorkingGroupCount", expertsCouncilWorkingGroupPageCount);

apiRouter.get("/expertsCouncilWorkingGroupByYear/:year/:pageNumber", expertsCouncilWorkingGroupPageByYear);

apiRouter.get("/expertsCouncilWorkingGroupCountByYear/:year", expertsCouncilWorkingGroupPageByYearCount);

apiRouter.get("/generalDocumentsMonitoringLastReport", regionalLegislationPageGeneralDocumentsLast);

apiRouter.get("/generalDocumentsYears", regionalLegislationGeneralDocumentsYears);

apiRouter.get("/generalDocumentsMonitoringReportByYear/:year", regionalLegislationPageGeneralDocumentsByYear);

apiRouter.get("/governmentDecreesMonitoringLastReport", regionalLegislationPageGovernmentDecreesLast);

apiRouter.get("/governmentDecreesYears", regionalLegislationGovernmentDecreesYears);

apiRouter.get("/governmentDecreesMonitoringReportByYear/:year", regionalLegislationPageGovernmentDecreesByYear);

apiRouter.get("/governmentDecreesMonitoringReportByMonth/:year/:month", regionalLegislationPageGovernmentDecreesByMonth);

apiRouter.get("/governorDecreesMonitoringLastReport", regionalLegislationPageGovernorDecreesLast);

apiRouter.get("/governorDecreesYears", regionalLegislationGovernorDecreesYears);

apiRouter.get("/governorDecreesMonitoringReportByYear/:year", regionalLegislationPageGovernorDecreesByYear);

apiRouter.get("/governorDecreesMonitoringReportByMonth/:year/:month", regionalLegislationPageGovernorDecreesByMonth);

apiRouter.get("/regionalMonitoringLastReport", regionalLegislationPageRegionLawLast);

apiRouter.get("/regionalMonitoringYears", regionalMonitoringRegionLawYears);

apiRouter.get("/regionalMonitoringReportByYear/:year", regionalLegislationPageRegionLawByYear);

apiRouter.get("/regionalMonitoringReportByMonth/:year/:month", regionalLegislationPageRegionLawByMonth);

apiRouter.get("/actsDevLastReport", actsDevPageLastReport);

apiRouter.get("/actsDevYears", actsDevYears);

apiRouter.get("/actsDevReportByYear/:year", actsDevPageReportByYear);

apiRouter.get("/legalExpertiseLastReport", legalExpertisePageLastReport);

apiRouter.get("/legalExpertiseYears", legalExpertiseYears);

apiRouter.get("/legalExpertiseReportByYear/:year", legalExpertisePageReportByYear);

apiRouter.get("/legislationAnalysisLastReport", legislationAnalysisPageLastReport);

apiRouter.get("/legislationAnalysisYears", legislationAnalysisYears);

apiRouter.get("/legislationAnalysisReportByYear/:year", legislationAnalysisPageReportByYear);

apiRouter.get("/eventsParticipationLastReport", eventsParticipationPageLastReport);

apiRouter.get("/eventsParticipationYears", eventsParticipationYears);

apiRouter.get("/eventsParticipationReportByYear/:year", eventsParticipationReportByYear);
