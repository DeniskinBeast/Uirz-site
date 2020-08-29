import {Router} from "express";

import {sendDocs} from "../Controllers/contentController";

export const contentRouter = Router();

contentRouter.get("/:docs_dir/:doc", sendDocs);
