import { AbstractMigration, ClientMySQL } from 'nessie'

export const TABLE_NAME = 'users'

export default class extends AbstractMigration<ClientMySQL>
{
    async up(): Promise<void>
    {
        await this.client.query(`
            CREATE TABLE ${ TABLE_NAME } (
                id BIGINT(20) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                fullname VARCHAR(128) NOT NULL,
                created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                blocked_at DATETIME NULL,
                blocked_reason TEXT NULL,
                deleted_at DATETIME NULL
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
        `)
    }

    async down(): Promise<void>
    {
        await this.client.query(`DROP TABLE ${ TABLE_NAME };`)
    }
}
