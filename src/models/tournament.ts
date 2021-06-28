import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { Game } from '@models/game';

@Entity('tournaments')
export class Tournament extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    public id: number;

    @Column()
    public name: string;

    @OneToOne(() => Game, (game: Game) => game.id)
    public game: Game;
}
