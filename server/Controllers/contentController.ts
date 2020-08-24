import {Request, Response} from "express";
import path from "path";

export function sendConstituentDocs(req: Request, res: Response) {
    const constituentDocsPath = path.join(__dirname, "../Docs/ConstituentDocs");
    const doc = req.params.doc;

    res.sendFile(constituentDocsPath + `/${doc}`);
}
