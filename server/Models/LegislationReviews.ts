import {AllowNull, Column, DataType, Length, Model, PrimaryKey, Table} from "sequelize-typescript";


@Table({tableName: "legislationreviews"})
export class LegislationReviews extends Model<LegislationReviews> {
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

    @AllowNull(false)
    @Length({max: 70})
    @Column(DataType.STRING)
    doc_path: string;

    @AllowNull(false)
    @Column(DataType.INTEGER)
    year: number;
}
