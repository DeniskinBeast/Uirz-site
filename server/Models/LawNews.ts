import {AllowNull, AutoIncrement, Column, DataType, Length, Model, PrimaryKey, Table} from "sequelize-typescript";


@Table({tableName: "newslaw"})
export class LawNews extends Model<LawNews> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id: number;

    @AllowNull(false)
    @Length({max: 100})
    @Column(DataType.STRING)
    pic: string;

    @AllowNull(false)
    @Column(DataType.TEXT)
    text: string;

    @AllowNull(false)
    @Column(DataType.TEXT)
    anons: string;

    @AllowNull(false)
    @Column(DataType.DATE)
    date: string;

    @AllowNull(false)
    @Length({max: 150})
    @Column(DataType.STRING)
    name: string;

    @AllowNull(false)
    @Length({max: 100})
    @Column(DataType.STRING)
    big_pic: string;

    @AllowNull(false)
    @Length({max: 100})
    @Column(DataType.STRING)
    sign: string;

    @AllowNull(false)
    @Column(DataType.INTEGER)
    views: number;
}
