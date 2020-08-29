import {Request, Response} from "express";
import path from "path";

export function sendDocs(req: Request, res: Response) {
    const docDir = req.params.docs_dir;
    const docsPath = path.join(__dirname, `../Docs/${docDir}`);
    const doc = req.params.doc;

    res.sendFile(docsPath + `/${doc}`);
}
