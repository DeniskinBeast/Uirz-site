import {Request, Response} from "express";

import {Structure} from "../Models/Structure";
import {LawNews} from "../Models/LawNews";
import {InstNews} from "../Models/InstituteNews";
import {ConstituentDocs} from "../Models/ConstituentDocs";
import {CorruptionDocs} from "../Models/CorruptionDocs";
import {LegislationStatusReports} from "../Models/LegislationStatusReports";
import {Publications} from "../Models/Publications";
import {Op, QueryTypes} from "sequelize";
import {LegislationReviews} from "../Models/LegislationReviews";
import {FederalLegislationMonitoring} from "../Models/FederalLegislationMonitoring";
import {WorkingGroup} from "../Models/WorkingGroup";
import {RegionalLegislationMonitoring} from "../Models/RegionalLegislationMonitoring";
import { ActsDevelopment } from "Models/ActsDevelopment";
import { LegalExpertise } from "Models/LegalExpertise";
import { LegislationAnalysis } from "Models/LegislationAnalysis";
import { EventsParticipation } from "Models/EventsParticipation";

// @ts-ignore
export async function structurePage(req: Request, res: Response) {

    const profileCards = await Structure.findAll({
            attributes: ["id", "sector", "full_name", "full_midname", "full_surname", "position", "pic", "bio", "phone", "email", "office", "degree", "npp"],
        }
    );

    res.send(JSON.stringify(profileCards));
}

// @ts-ignore
export async function mainPageLastLawNews (req: Request, res: Response) {
    const lastLawNews = await LawNews.findAll({
        attributes: ["id", "pic", "text", "anons", "name", "date"],
        order: [
            ["date", "DESC"]
        ],
        limit: 3
    });

    res.send(JSON.stringify(lastLawNews));
}

// @ts-ignore
export async function mainPageLastInstNews(req: Request, res: Response) {
    const lastInstNews = await InstNews.findAll({
        attributes: ["id", "pic", "text", "anons", "name", "date"],
        order: [
            ["date", "DESC"]
        ],
        limit: 3
    });

    res.send(JSON.stringify(lastInstNews));
}

export async function lawNewsPage(req: Request, res: Response) {
    const offset = 6;

    const lawNews = await LawNews.findAll({
        attributes: ["id", "pic", "text", "anons", "name", "date"],
        order: [
            ["date", "DESC"]
        ],
        limit: 6,
        offset: parseInt(req.params.pageNumber) * offset
    });

    res.send(JSON.stringify(lawNews));
}

export async function lawNewsYears(_req: Request, res: Response) {
    const years = await LawNews.sequelize?.query("SELECT DISTINCT to_char(date, 'YYYY') as year from newslaw ORDER BY year DESC", {type: QueryTypes.SELECT});

    res.send(JSON.stringify(years));
}

// @ts-ignore
export async function lawNewsPageNewsCount(req: Request, res: Response) {
    const lawNewsCount = await LawNews.count();

    res.send(JSON.stringify(lawNewsCount));
}

export async function lawNewsPageByYear(req: Request, res: Response) {
    const year = req.params.year;
    const offset = 6;
    const lawNewsByYear = await LawNews.findAll({
        attributes: ["id", "pic", "text", "anons", "name", "date"],
        where: {
            date: {
                [Op.between]: [`${year}-01-01`, `${year}-12-31`]
            }
        },
        order: [
            ["date", "DESC"]
        ],
        limit: 6,
        offset: parseInt(req.params.pageNumber) * offset
    });

    res.send(JSON.stringify(lawNewsByYear));
}

export async function lawNewsPageCountByYear(req: Request, res: Response) {
    const year = req.params.year;

    const newsCount = await LawNews.count({
        where: {
            date: {
                [Op.between]: [`${year}-01-01`, `${year}-12-31`]
            }
        }
    });

    res.send(JSON.stringify(newsCount));
}

export async function InstNewsPage(req: Request, res: Response) {
    const offset = 6;

    const instNews = await InstNews.findAll({
        attributes: ["id", "pic", "text", "anons", "name", "date"],
        order: [
            ["date", "DESC"]
        ],
        limit: 6,
        offset: parseInt(req.params.pageNumber) * offset
    });

    res.send(JSON.stringify(instNews));
}

export async function instNewsYears(_req: Request, res: Response) {
    const years = await InstNews.sequelize?.query("SELECT DISTINCT to_char(date, 'YYYY') as year from newsinst ORDER BY year DESC", {type: QueryTypes.SELECT});

    res.send(JSON.stringify(years));
}

// @ts-ignore
export async function instNewsPageNewsCount(req: Request, res: Response) {
    const instNewsCount = await InstNews.count();

    res.send(JSON.stringify(instNewsCount));
}

export async function instNewsPageByYear(req: Request, res: Response) {
    const year = req.params.year;
    const offset = 6;
    const instNewsByYear = await InstNews.findAll({
        attributes: ["id", "pic", "text", "anons", "name", "date"],
        where: {
            date: {
                [Op.between]: [`${year}-01-01`, `${year}-12-31`]
            }
        },
        order: [
            ["date", "DESC"]
        ],
        limit: 6,
        offset: parseInt(req.params.pageNumber) * offset
    });

    res.send(JSON.stringify(instNewsByYear));
}

export async function instNewsPageCountByYear(req: Request, res: Response) {
    const year = req.params.year;

    const newsCount = await InstNews.count({
        where: {
            date: {
                [Op.between]: [`${year}-01-01`, `${year}-12-31`]
            }
        }
    });

    res.send(JSON.stringify(newsCount));
}

// @ts-ignore
export async function constituentDocsPage(req: Request, res: Response) {
    const constituentDocs = await ConstituentDocs.findAll({
        order: [
            ["id", "DESC"]
        ]
    });

    res.send(JSON.stringify(constituentDocs));
}


// @ts-ignore
export async function corruptionCounteringPageLocalActs(req: Request, res: Response) {
    const localActs = await CorruptionDocs.findAll(
        {
            where: {
                is_report: false
            }
        }
    );

    res.send(JSON.stringify(localActs));
}

// @ts-ignore
export async function corruptionCounteringPageReports(req: Request, res: Response) {
    const corruptionReports = await CorruptionDocs.findAll(
        {
            where: {
                is_report: true
            }
        }
    );

    res.send(JSON.stringify(corruptionReports));
}

// @ts-ignore
export async function legislationStatusPage(req: Request, res: Response) {
    const statusReports = await LegislationStatusReports.findAll({
        order: [
            ["year", "DESC"]
        ]
    });

    res.send(JSON.stringify(statusReports));
}

// @ts-ignore
export async function publicationsPage(req: Request, res: Response) {
    const publications = await Publications.findAll({
            order: [
                ["year", "DESC"]
            ]
        });

    res.send(JSON.stringify(publications));
}

export async function legislationReviewsPage(req: Request, res: Response) {
    const offset = 6;

    const reviews = await LegislationReviews.findAll({
        order: [
            ["year", "DESC"]
        ],
        limit: 6,
        offset: parseInt(req.params.pageNumber) * offset
    });

    res.send(JSON.stringify(reviews));
}

export async function legislationReviewsPageYears(_req: Request, res: Response) {
    const years = await LegislationReviews.sequelize?.query("SELECT DISTINCT year FROM legislationreviews ORDER BY year DESC", {type: QueryTypes.SELECT});

    res.send(JSON.stringify(years));
}

// @ts-ignore
export async function legislationReviewsPageReviewsCount(req: Request, res: Response) {
    const reviewsCount = await LegislationReviews.count();

    res.send(JSON.stringify(reviewsCount));
}

export async function legislationReviewsPageByYear(req: Request, res: Response) {
    const year = parseInt(req.params.year);
    const offset = 6;

    const reviews = await LegislationReviews.findAll({
        where: {
            year: year
        },
        limit: 6,
        offset: parseInt(req.params.pageNumber) * offset
    });

    res.send(JSON.stringify(reviews));
}

export async function legislationReviewsPageCountByYear(req: Request, res: Response) {
    const year = parseInt(req.params.year);

    const reviewsCount = await LegislationReviews.count({
        where: {
            year: year
        }
    });

    res.send(JSON.stringify(reviewsCount));
}

// @ts-ignore
export async function federalLegislationMonitoringPageLast(req: Request, res: Response) {
    const report = await FederalLegislationMonitoring.findOne({
        order: [
            ["year", "DESC"],
            ["month", "DESC"]
        ]
    });

    res.send(JSON.stringify(report));
}

export async function federalLegislationYears(_req: Request, res: Response) {
    const years = await FederalLegislationMonitoring.sequelize?.query("SELECT DISTINCT year FROM federallegislationmonitoring ORDER BY year DESC", {type: QueryTypes.SELECT});

    res.send(JSON.stringify(years));
}

export async function federalLegislationMonitoringPageByYear(req: Request, res: Response) {
    const year = parseInt(req.params.year);

    const report = await FederalLegislationMonitoring.findOne({
        where: {
            year: year
        },
        order: [
            ["month", "DESC"]
        ]
    });

    res.send(JSON.stringify(report));
}

export async function federalLegislationMonitoringPageByMonth(req: Request, res: Response) {
    const year = parseInt(req.params.year);
    const month = req.params.month;

    const report = await FederalLegislationMonitoring.findOne({
        where: {
            year: year,
            month: month
        }
    });

    res.send(JSON.stringify(report));
}

// @ts-ignore
export async function expertCouncilPageProfiles(req: Request, res: Response) {
    const profileCards = await Structure.findAll({
        attributes: ["id", "sector", "full_name", "full_midname", "full_surname", "position", "pic", "bio", "phone", "email", "office", "degree", "npp"],
        where: {
            sector: 2
        }
    });

    res.send(JSON.stringify(profileCards));
}

// @ts-ignore
export async function expertsCouncilPageLastMeetings(req: Request, res: Response) {
    const lastMeetings = await InstNews.findAll({
        attributes: ["id", "pic", "text", "anons", "name", "date"],
        where: {
            [Op.or]: [
                {nesovet: 0},
                {nesovet: null}
            ]
        },
        order: [
            ["date", "DESC"]
        ],
        limit: 3
    });

    res.send(JSON.stringify(lastMeetings));
}

export async function expertsCouncilPastMeetingsPage(req: Request, res: Response) {
    const offset = 6;

    const instNews = await InstNews.findAll({
        attributes: ["id", "pic", "text", "anons", "name", "date"],
        where: {
            [Op.or]: [
                {nesovet: 0},
                {nesovet: null}
            ]
        },
        order: [
            ["date", "DESC"]
        ],
        limit: 6,
        offset: parseInt(req.params.pageNumber) * offset
    });

    res.send(JSON.stringify(instNews));
}

export async function expertsCouncilPastMeetingsYears(_req: Request, res: Response) {
    const years = await InstNews.sequelize?.query("SELECT DISTINCT to_char(date, 'YYYY') as year from newsinst WHERE nesovet=0 OR nesovet IS NULL ORDER BY year DESC", {type: QueryTypes.SELECT});

    res.send(JSON.stringify(years));
}

// @ts-ignore
export async function expertsCouncilPastMeetingsPageCount(req: Request, res: Response) {
    const newsCount = await InstNews.count({
        where: {
            [Op.or]: [
                {nesovet: 0},
                {nesovet: null}
            ]
        }
    });

    res.send(JSON.stringify(newsCount));
}

export async function expertsCouncilPastMeetingsPageByYear(req: Request, res: Response) {
    const year = req.params.year;
    const offset = 6;
    const instNewsByYear = await InstNews.findAll({
        attributes: ["id", "pic", "text", "anons", "name", "date"],
        where: {
            [Op.or]: [
                {nesovet: 0},
                {nesovet: null}
            ],
            date: {
                [Op.between]: [`${year}-01-01`, `${year}-12-31`]
            }
        },
        order: [
            ["date", "DESC"]
        ],
        limit: 6,
        offset: parseInt(req.params.pageNumber) * offset
    });

    res.send(JSON.stringify(instNewsByYear));
}

export async function expertsCouncilPastMeetingsPageCountByYear(req: Request, res: Response) {
    const year = req.params.year;

    const newsCount = await InstNews.count({
        where: {
            [Op.or]: [
                {nesovet: 0},
                {nesovet: null}
            ],
            date: {
                [Op.between]: [`${year}-01-01`, `${year}-12-31`]
            }
        }
    });

    res.send(JSON.stringify(newsCount));
}

// @ts-ignore
export async function expertsCouncilPageLastWorkingGroups(req: Request, res: Response) {
    const lastGroups = await WorkingGroup.findAll({
        order: [
            ["date", "DESC"]
        ],
        limit: 3
    });

    res.send(JSON.stringify(lastGroups));
}

export async function expertsCouncilWorkingGroupYears(_req: Request, res: Response) {
    const years = await WorkingGroup.sequelize?.query("SELECT DISTINCT to_char(date, 'YYYY') as year from workinggroup ORDER BY year DESC", {type: QueryTypes.SELECT});

    res.send(JSON.stringify(years));
}

export async function expertsCouncilWorkingGroupPage(req: Request, res: Response) {
    const offset = 6;

    const news = await WorkingGroup.findAll({
        order: [
            ["date", "DESC"]
        ],
        limit: 6,
        offset: parseInt(req.params.pageNumber) * offset
    });

    res.send(JSON.stringify(news));
}

// @ts-ignore
export async function expertsCouncilWorkingGroupPageCount(req: Request, res: Response) {
    const newsCount = await WorkingGroup.count();

    res.send(JSON.stringify(newsCount));
}

export async function expertsCouncilWorkingGroupPageByYear(req: Request, res: Response) {
    const year = req.params.year;
    const offset = 6;
    const newsByYear = await WorkingGroup.findAll({
        where: {
            date: {
                [Op.between]: [`${year}-01-01`, `${year}-12-31`]
            }
        },
        order: [
            ["date", "DESC"]
        ],
        limit: 6,
        offset: parseInt(req.params.pageNumber) * offset
    });

    res.send(JSON.stringify(newsByYear));
}

export async function expertsCouncilWorkingGroupPageByYearCount(req: Request, res: Response) {
    const year = req.params.year;

    const newsCount = await WorkingGroup.count({
        where: {
            date: {
                [Op.between]: [`${year}-01-01`, `${year}-12-31`]
            }
        }
    });

    res.send(JSON.stringify(newsCount));
}

export async function regionalLegislationPageGeneralDocumentsLast(_req: Request, res: Response) {
    const report = await RegionalLegislationMonitoring.findOne({
        where: {
            type: "general_docs"
        },
        order: [
            ["year", "DESC"],
            ["month", "DESC"]
        ]
    });

    res.send(JSON.stringify(report));
}

export async function regionalLegislationGeneralDocumentsYears(_req: Request, res: Response) {
    const years = await RegionalLegislationMonitoring.sequelize?.query("SELECT DISTINCT year FROM regionallegislationmonitoring WHERE type='general_docs' ORDER BY year DESC", {type: QueryTypes.SELECT});

    res.send(JSON.stringify(years));
}

export async function regionalLegislationPageGeneralDocumentsByYear(req: Request, res: Response) {
    const year = parseInt(req.params.year);

    const report = await RegionalLegislationMonitoring.findOne({
        where: {
            year: year,
            type: "general_docs"
        },
        order: [
            ["month", "DESC"]
        ]
    });

    res.send(JSON.stringify(report));
}

export async function regionalLegislationPageGovernmentDecreesLast(_req: Request, res: Response) {
    const report = await RegionalLegislationMonitoring.findOne({
        where: {
            type: "government_decrees"
        },
        order: [
            ["year", "DESC"],
            ["month", "DESC"]
        ]
    });

    res.send(JSON.stringify(report));
}

export async function regionalLegislationGovernmentDecreesYears(_req: Request, res: Response) {
    const years = await RegionalLegislationMonitoring.sequelize?.query("SELECT DISTINCT year FROM regionallegislationmonitoring WHERE type='government_decrees' ORDER BY year DESC", {type: QueryTypes.SELECT});

    console.log(years);
    res.send(JSON.stringify(years));
}

export async function regionalLegislationPageGovernmentDecreesByYear(req: Request, res: Response) {
    const year = parseInt(req.params.year);

    const report = await RegionalLegislationMonitoring.findOne({
        where: {
            year: year,
            type: "government_decrees"
        },
        order: [
            ["month", "DESC"]
        ]
    });

    res.send(JSON.stringify(report));
}

export async function regionalLegislationPageGovernmentDecreesByMonth(req: Request, res: Response) {
    const year = parseInt(req.params.year);
    const month = parseInt(req.params.month);

    const report = await RegionalLegislationMonitoring.findOne({
        where: {
            year: year,
            month: month,
            type: "government_decrees"
        },
        order: [
            ["month", "DESC"]
        ]
    });

    res.send(JSON.stringify(report));
}

export async function regionalLegislationPageGovernorDecreesLast(_req: Request, res: Response) {
    const report = await RegionalLegislationMonitoring.findOne({
        where: {
            type: "governor_decrees"
        },
        order: [
            ["year", "DESC"],
            ["month", "DESC"]
        ]
    });

    res.send(JSON.stringify(report));
}

export async function regionalLegislationGovernorDecreesYears(_req: Request, res: Response) {
    const years = await RegionalLegislationMonitoring.sequelize?.query("SELECT DISTINCT year FROM regionallegislationmonitoring WHERE type='governor_decrees' ORDER BY year DESC", {type: QueryTypes.SELECT});

    res.send(JSON.stringify(years));
}

export async function regionalLegislationPageGovernorDecreesByYear(req: Request, res: Response) {
    const year = parseInt(req.params.year);

    const report = await RegionalLegislationMonitoring.findOne({
        where: {
            year: year,
            type: "governor_decrees"
        },
        order: [
            ["month", "DESC"]
        ]
    });

    res.send(JSON.stringify(report));
}

export async function regionalLegislationPageGovernorDecreesByMonth(req: Request, res: Response) {
    const year = parseInt(req.params.year);
    const month = parseInt(req.params.month);

    const report = await RegionalLegislationMonitoring.findOne({
        where: {
            year: year,
            month: month,
            type: "governor_decrees"
        },
        order: [
            ["month", "DESC"]
        ]
    });

    res.send(JSON.stringify(report));
}

export async function regionalLegislationPageRegionLawLast(_req: Request, res: Response) {
    const report = await RegionalLegislationMonitoring.findOne({
        where: {
            type: "regional_law"
        },
        order: [
            ["year", "DESC"],
            ["month", "DESC"]
        ]
    });

    res.send(JSON.stringify(report));
}

export async function regionalMonitoringRegionLawYears(_req: Request, res: Response) {
    const years = await RegionalLegislationMonitoring.sequelize?.query("SELECT DISTINCT year FROM regionallegislationmonitoring WHERE type='regional_law' ORDER BY year DESC", {type: QueryTypes.SELECT});

    res.send(JSON.stringify(years));
}

export async function regionalLegislationPageRegionLawByYear(req: Request, res: Response) {
    const year = parseInt(req.params.year);

    const report = await RegionalLegislationMonitoring.findOne({
        where: {
            year: year,
            type: "regional_law"
        },
        order: [
            ["month", "DESC"]
        ]
    });

    res.send(JSON.stringify(report));
}

export async function regionalLegislationPageRegionLawByMonth(req: Request, res: Response) {
    const year = parseInt(req.params.year);
    const month = parseInt(req.params.month);

    const report = await RegionalLegislationMonitoring.findOne({
        where: {
            year: year,
            month: month,
            type: "regional_law"
        },
        order: [
            ["month", "DESC"]
        ]
    });

    res.send(JSON.stringify(report));
}

export async function actsDevPageLastReport(_req: Request, res: Response) {
    const report = await ActsDevelopment.findOne({
        order: [
            ["year", "DESC"]
        ]
    });

    res.send(JSON.stringify(report));
}

export async function actsDevYears(_req: Request, res:Response) {
    const years = await ActsDevelopment.sequelize?.query("SELECT DISTINCT year from actsdevelopment ORDER BY year DESC", {type: QueryTypes.SELECT});

    res.send(JSON.stringify(years));
}

export async function actsDevPageReportByYear(req: Request, res: Response) {
    const year = parseInt(req.params.year);

    const report = await ActsDevelopment.findOne({
        where: {
            year: year
        }
    });

    res.send(JSON.stringify(report));
}

export async function legalExpertisePageLastReport(_req: Request, res: Response) {
    const report = await LegalExpertise.findOne({
        order: [
            ["year", "DESC"]
        ]
    });

    res.send(JSON.stringify(report));
}

export async function legalExpertiseYears(_req: Request, res: Response) {
    const years = await LegalExpertise.sequelize?.query("SELECT DISTINCT year FROM legalexpertise ORDER BY year DESC", {type: QueryTypes.SELECT});

    res.send(JSON.stringify(years));
}

export async function legalExpertisePageReportByYear(req: Request, res: Response) {
    const year = parseInt(req.params.year);

    const report = await LegalExpertise.findOne({
        where: {
            year: year
        }
    });

    res.send(JSON.stringify(report));
}

export async function legislationAnalysisPageLastReport(_req: Request, res: Response) {
    const report = await LegislationAnalysis.findOne({
        order: [
            ["year", "DESC"]
        ]
    });

    res.send(JSON.stringify(report));
}

export async function legislationAnalysisYears(_req: Request, res: Response) {
    const years = await LegislationAnalysis.sequelize?.query("SELECT DISTINCT year FROM legislationanalysis ORDER BY year DESC", {type: QueryTypes.SELECT});

    res.send(JSON.stringify(years));
}

export async function legislationAnalysisPageReportByYear(req: Request, res: Response) {
    const year = parseInt(req.params.year);

    const report = await LegislationAnalysis.findOne({
        where: {
            year: year
        }
    });

    res.send(JSON.stringify(report));
}

export async function eventsParticipationPageLastReport(_req: Request, res: Response) {
    const report = await EventsParticipation.findOne({
        order: [
            ["year", "DESC"]
        ]
    });

    res.send(JSON.stringify(report));
}

export async function eventsParticipationYears(_req: Request, res: Response) {
    const years = await EventsParticipation.sequelize?.query("SELECT DISTINCT year FROM eventsparticipation ORDER BY year DESC", {type: QueryTypes.SELECT});

    res.send(JSON.stringify(years));
}

export async function eventsParticipationReportByYear(req:Request, res: Response) {
    const year = parseInt(req.params.year);

    const report = await EventsParticipation.findOne({
        where: {
            year: year
        }
    });

    res.send(JSON.stringify(report));
}
