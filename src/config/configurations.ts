import { DatabaseConfig, JWTConfig } from 'src/common/utils';

export interface Configurations {
  port: number;
  database: DatabaseConfig;
  jwt: JWTConfig;
}

export const configurations = (): Configurations => ({
  port: parseInt(process.env.PORT, 10) ?? 3000,
  database: {
    host: process.env.DATABASE_HOST ?? 'localhost',
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
    user: process.env.DATABASE_USER ?? 'postgres',
    password: process.env.DATABASE_PASSWORD ?? 'postgres',
    database: process.env.DATABASE_DB ?? 'postgres',
  },
  jwt: {
    jwtSecretKey: process.env.JWT_SECRET_KEY,
  },
});
