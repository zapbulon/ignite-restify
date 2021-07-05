import {MigrationInterface, QueryRunner} from "typeorm";

export class wallets1625201346192 implements MigrationInterface {
    // I can imagine using some mechanism of this sort for withdrawals:
    // https://developer.paysafe.com/en/rest-apis/paysafe-payments-api/paysafe-checkout/processing-withdrawal/

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "payment_providers" (
            id              UUID NOT NULL PRIMARY KEY,
            name            TEXT NOT NULL,
            active          BOOLEAN NOT NULL DEFAULT TRUE
        )`);

        // Yeah, payment gateways, maybe a separate table will not be needed
        await queryRunner.query(`INSERT INTO payment_providers VALUES (
            uuid_generate_v4(),
            'Paysafe',
            TRUE
        )`);

        // Theoretically such a table may be used
        // await queryRunner.query(`CREATE TABLE "payment_methods" ()`);

        // Not sure if we need this one as well. If it is used the transactions below should also
        // have a reference to the payment method user.
        /* await queryRunner.query(`CREATE TABLE "user_payment_methods" (
            id              UUID NOT NULL PRIMARY KEY,
            user_id         UUID REFERENCES users (id) MATCH SIMPLE
                                    ON UPDATE CASCADE
                                    ON DELETE SET NULL,
            provider_id     UUID REFERENCES payment_providers (id) MATCH SIMPLE
                                    ON UPDATE CASCADE
                                    ON DELETE SET NULL,
            external_id     TEXT NOT NULL,
            method          TEXT NOT NULL
        )`);*/

        // Columns comments:
        // external_id:
        //  - ID of the transaction in the gateway system (null when it is an internal transaction)
        // tournament_id:
        //  - I think we can link stakes and payouts to tournaments this way
        // type:
        //  - deposit, withdrawal, stake, payout, etc.
        // currency:
        //  - maybe a separate table is gonna be needed, but let's start with the currency code
        // amount:
        //  - Kraken uses 10 digits precision after decimal for BTC, so I guess it may suffice
        // fee:
        //  - TBD whether it's needed. Could be one of 2 things:
        //      - IgniteTorunaments fee on (payout or stake?)
        //      - Payment gateway fee: you deposit 100 USD, the processor takes 2.8%
        await queryRunner.query(`CREATE TABLE "transactions" (
            id              UUID NOT NULL PRIMARY KEY,
            user_id         UUID REFERENCES users (id) MATCH SIMPLE
                                    ON UPDATE CASCADE
                                    ON DELETE SET NULL,
            tournament_id   UUID REFERENCES tournaments (id) MATCH SIMPLE
                                    ON UPDATE CASCADE
                                    ON DELETE SET NULL,
            provider_id     UUID REFERENCES payment_providers (id) MATCH SIMPLE
                                    ON UPDATE CASCADE
                                    ON DELETE SET NULL,
            external_id     TEXT,
            type            TEXT NOT NULL,
            currency        TEXT NOT NULL,
            amount          DECIMAL(22, 10),
            fee             DECIMAL(16, 10),
            status          TEXT NOT NULL,
            created_at      DATETIME NOT NULL,
            notes           JSON
        )`);

        // This is the table containing currency balances
        await queryRunner.query(`CREATE TABLE "balances" (
            id              UUID NOT NULL PRIMARY KEY,
            user_id         UUID REFERENCES users (id) MATCH SIMPLE
                                    ON UPDATE CASCADE
                                    ON DELETE SET NULL,
            currency        TEXT NOT NULL,
            amount          DECIMAL(22, 10)
        )`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
