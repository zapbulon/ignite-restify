import { Entity, BaseEntity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('games')
export class Game extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    public id: number;

    @Column()
    public name: string;
}
