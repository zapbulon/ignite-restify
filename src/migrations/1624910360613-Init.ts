import {MigrationInterface, QueryRunner} from "typeorm";

export class Init1624910360613 implements MigrationInterface {
    // I love the fact I can just throw in some PostgreSQL code. I hate everyone
    // who decided ...
    //
    // - "You know what is a good idea?"
    // - "Nope. What? I'm sure you're gonna say something dumb ..."
    // - "People REALLY need a meta way to describe their DB tables!"
    // - "Like ... write SQL?"
    // - "NO! Not like that! We have to come up with an ultra innovative way so they can do a CONFIG or ... or ... call a chain of methods! To ... to ... tell us how to generate their SQL!"

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Sorry, my tables must be plural and I ain't taking no camelCase in my PSQL DB
        await queryRunner.query(`CREATE TABLE "users" (
            id              UUID NOT NULL PRIMARY KEY,
            username        TEXT NOT NULL,
            password        TEXT NOT NULL,
            first_name      TEXT NOT NULL,
            last_name       TEXT NOT NULL,
            email           TEXT NOT NULL,
            active          BOOLEAN NOT NULL DEFAULT TRUE
        )`);

        await queryRunner.query(`CREATE TABLE "games" (
            id              UUID NOT NULL PRIMARY KEY,
            name            TEXT NOT NULL
        )`);

        await queryRunner.query(`CREATE TABLE "tournaments" (
            id              UUID NOT NULL PRIMARY KEY,
            game_id         UUID REFERENCES games (id) MATCH SIMPLE
                                                ON UPDATE CASCADE
                                                ON DELETE SET NULL,
            name            TEXT NOT NULL
        )`);

        await queryRunner.query(`INSERT INTO users VALUES (
            '14100393-3e31-42f3-91a0-6b043a1682be',
            'admin',
            'some-hash-ya-know',
            'Admin',
            'Administrator',
            'admin@ignitetournaments.com',
            TRUE
        )`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "games" IF EXISTS`);
        await queryRunner.query(`DROP TABLE "tournaments" IF EXISTS`);
        await queryRunner.query(`DROP TABLE "users" IF EXISTS`);
    }

}
