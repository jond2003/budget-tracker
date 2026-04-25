import dotenv from 'dotenv';

dotenv.config();

interface Config {
  port: number;
  nodeEnv: string;
  db_username: string;
  db_password: string;
  secret_key: string;
}

const config: Config = {
  port: Number(process.env.PORT) || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  db_username: process.env.DB_USERNAME || '<insert_username>',
  db_password: process.env.DB_PASSWORD || '<insert_password>',
  secret_key: process.env.SECRET_KEY || '<secret key array>',
};

export default config;
