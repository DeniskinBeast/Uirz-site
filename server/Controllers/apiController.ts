import {Request, Response} from "express";

import {Structure} from "../Models/Structure";
import {LawNews} from "../Models/LawNews";
import {InstNews} from "../Models/InstituteNews";
import {ConstituentDocs} from "../Models/ConstituentDocs";
import {CorruptionDocs} from "../Models/CorruptionDocs";
import {LegislationStatusReports} from "../Models/LegislationStatusReports";
import {Publications} from "../Models/Publications";
import {Op} from "sequelize";
import {LegislationReviews} from "../Models/LegislationReviews";
import {FederalLegislationMonitoring} from "../Models/FederalLegislationMonitoring";

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
                report: false
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
                report: true
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
