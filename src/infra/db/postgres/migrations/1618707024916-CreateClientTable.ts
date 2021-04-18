import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class CreateClientTable1618707024916 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("CREATE TYPE sexEnum AS ENUM ('M', 'F');");
    await queryRunner.createTable(
      new Table({
        name: 'clients',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'sex',
            type: 'sexEnum',
          },
          {
            name: 'age',
            type: 'integer',
          },
          {
            name: 'city_id',
            type: 'uuid',
          },
          {
            name: 'birthDate',
            type: 'timestamp',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            name: 'clientCity',
            referencedTableName: 'cities',
            referencedColumnNames: ['id'],
            columnNames: ['city_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('clients');
  }
}
