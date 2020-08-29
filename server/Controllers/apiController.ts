import {Request, Response} from "express";

import {Structure} from "../Models/Structure";
import {LawNews} from "../Models/LawNews";
import {InstNews} from "../Models/InstituteNews";
import {ConstituentDocs} from "../Models/ConstituentDocs";
import {CorruptionDocs} from "../Models/CorruptionDocs";
import {LegislationStatusReports} from "../Models/LegislationStatusReports";
import {Publications} from "../Models/Publications";

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
