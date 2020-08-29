import {Sequelize} from "sequelize-typescript";

import {Structure} from "../Models/Structure";
import {InstNews} from "../Models/InstituteNews";
import {LawNews} from "../Models/LawNews";
import {ConstituentDocs} from "../Models/ConstituentDocs";
import {CorruptionDocs} from "../Models/CorruptionDocs";
import {LegislationStatusReports} from "../Models/LegislationStatusReports";
import {Publications} from "../Models/Publications";

export function initializeModels(database: Sequelize): void {
    database.addModels([Structure, InstNews, LawNews, ConstituentDocs, CorruptionDocs, LegislationStatusReports, Publications])
}
