import {AllowNull, Column, DataType, Model, PrimaryKey, Table} from "sequelize-typescript";

@Table({tableName: "regionallegislationmonitoring"})
export class RegionalLegislationMonitoring extends Model<RegionalLegislationMonitoring> {
    @PrimaryKey
    @Column(DataType.INTEGER)
    id:  number;

    @AllowNull(false)
    @Column(DataType.TEXT)
    text: string;

    @AllowNull(false)
    @Column(DataType.INTEGER)
    year: number;

    @AllowNull(false)
    @Column(DataType.INTEGER)
    month: number;

    @AllowNull(false)
    @Column(DataType.STRING)
    type: string;
}
