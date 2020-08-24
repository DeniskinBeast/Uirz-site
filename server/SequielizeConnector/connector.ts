import {Sequelize, SequelizeOptions} from "sequelize-typescript";
import * as config from "../../configs.json";

export function makeConnector(): Sequelize {
    const sequelizeOptions: SequelizeOptions = {
        host: config.host,
        port: config.port,
        username: config.username,
        password: config.password,
        database: config.database,
        dialect: "postgres",
        define: {
            timestamps: false
        }
    };

    const sequelize = new Sequelize(sequelizeOptions);

    return sequelize;
}
