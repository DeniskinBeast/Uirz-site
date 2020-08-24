import {Router} from "express";
import {sendConstituentDocs} from "../Controllers/contentController";

export const contentRouter = Router();

contentRouter.get("/constituent_docs/:doc", sendConstituentDocs);
