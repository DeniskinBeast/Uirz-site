import {Table, Model, PrimaryKey, AutoIncrement, DataType, Column, AllowNull, Length} from "sequelize-typescript";


@Table({tableName: "structure"})
export class Structure extends Model<Structure> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id: number;

    @AllowNull(false)
    @Length({max: 5})
    @Column(DataType.INTEGER)
    sector: number;

    @AllowNull(false)
    @Length({max: 150})
    @Column(DataType.STRING)
    fio: string;

    @AllowNull(false)
    @Length({max: 50})
    @Column(DataType.STRING)
    full_name: string;

    @AllowNull(false)
    @Length({max: 50})
    @Column(DataType.STRING)
    full_midname: string;

    @AllowNull(false)
    @Length({max: 50})
    @Column(DataType.STRING)
    full_surname: string;

    @AllowNull(false)
    @Length({max: 150})
    @Column(DataType.STRING)
    position: string;

    @AllowNull(false)
    @Length({max: 30})
    @Column(DataType.STRING)
    pic: string;

    @AllowNull(false)
    @Column(DataType.TEXT)
    bio: string;

    @AllowNull(false)
    @Length({max: 20})
    @Column(DataType.STRING)
    phone: string;

    @AllowNull(false)
    @Length({max: 20})
    @Column(DataType.STRING)
    vtel: string;

    @AllowNull(false)
    @Length({max: 100})
    @Column(DataType.STRING)
    email: string;

    @AllowNull(false)
    @Length({max: 10})
    @Column(DataType.STRING)
    office: string;

    @AllowNull(false)
    @Length({max: 5})
    @Column(DataType.STRING)
    hicom: string;

    @AllowNull(false)
    @Column(DataType.INTEGER)
    npp: number;

    @AllowNull(false)
    @Column(DataType.TEXT)
    degree: string;
}
