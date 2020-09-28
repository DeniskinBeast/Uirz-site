import {AllowNull, Column, DataType, Model, PrimaryKey, Table} from "sequelize-typescript";

@Table({tableName: "eventsparticipation"})
export class EventsParticipation extends Model<EventsParticipation> {
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
