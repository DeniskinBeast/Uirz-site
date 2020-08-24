import {Sequelize} from "sequelize-typescript";

import {Structure} from "../Models/Structure";
import {InstNews} from "../Models/InstituteNews";
import {LawNews} from "../Models/LawNews";

export function initializeModels(database: Sequelize): void {
    database.addModels([Structure, InstNews, LawNews])
}
//
