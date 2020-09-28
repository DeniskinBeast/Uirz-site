import {Sequelize, SequelizeOptions} from "sequelize-typescript";
import * as config from "../../configs.json";

export function makeConnector(): Sequelize {
    const sequelizeOptions: SequelizeOptions = {
        host: process.env.DBHOST || config.host,
        port: 5432 || config.port,
        username: process.env.DBUSER || config.username,
        password: process.env.DBPASS || config.password,
        database: process.env.DBNAME || config.database,
        dialect: "postgres",
        define: {
            timestamps: false
        }
    };

    const sequelize = new Sequelize(sequelizeOptions);

    return sequelize;
}
