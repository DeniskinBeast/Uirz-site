import {AllowNull, Column, DataType, Length, Model, PrimaryKey, Table} from "sequelize-typescript";


@Table({tableName: "constituentdocs"})
export class ConstituentDocs extends Model<ConstituentDocs> {
    @PrimaryKey
    @Column(DataType.INTEGER)
    id: number;

    @AllowNull(false)
    @Column(DataType.TEXT)
    doc_name: string;

    @AllowNull(false)
    @Length({max: 70})
    @Column(DataType.STRING)
    img_path: string;

    @AllowNull(true)
    @Length({max: 70})
    @Column(DataType.STRING)
    doc_path: string;
}
