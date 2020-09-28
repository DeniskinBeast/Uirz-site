import {AllowNull, Column, DataType, Model, PrimaryKey, Table} from "sequelize-typescript";

@Table({tableName: "actsdevelopment"})
export class ActsDevelopment extends Model<ActsDevelopment> {
    @PrimaryKey
    @Column(DataType.INTEGER)
    id:  number;

    @AllowNull(false)
    @Column(DataType.TEXT)
    text: string;

    @AllowNull(false)
    @Column(DataType.INTEGER)
    year: number;
}
