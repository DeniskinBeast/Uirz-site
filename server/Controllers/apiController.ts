import {Request, Response} from "express";

import {Structure} from "../Models/Structure";
import {LawNews} from "../Models/LawNews";
import {InstNews} from "../Models/InstituteNews";

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
