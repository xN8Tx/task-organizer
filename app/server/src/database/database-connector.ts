import dotenv from 'dotenv';
import pg from 'pg';

dotenv.config();

const { Pool } = pg;

const databaseConnector = new Pool({
  ssl: false,
  connectionString: process.env.DATABASE_URL,
});

export default databaseConnector;
