import { DatabaseConfig, JWTConfig } from 'src/common/utils';

const databaseConfig: DatabaseConfig = {
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_DB,
};

const jwtConfig: JWTConfig = {
  jwtSecretKey: process.env.JWT_SECRET_KEY,
};

export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: databaseConfig,
  JWT: jwtConfig,
});
