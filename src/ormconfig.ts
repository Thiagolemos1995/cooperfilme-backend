import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST || 'localhost',
  port: parseInt(process.env.DATABASE_PORT) || 5435,
  username: process.env.DATABASE_USER || 'cooperfilme',
  password: process.env.DATABASE_PASSWORD || 'cooperfilme',
  database: process.env.DATABASE_DB || 'cooperfilme_db',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/**/**/migrations/*.ts'],
  synchronize: false,
});
