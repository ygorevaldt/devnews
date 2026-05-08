import { Client } from "pg";

export const database = {
  query: async <T>(query: string, values: any[] = []): Promise<T[]> => {
    let client: Client | undefined;

    try {
      client = await getNewClient();
      const result = await client.query(query, values);
      return result.rows;
    } catch (error) {
      throw error;
    } finally {
      if (client) {
        await client.end();
      }
    }
  },
};

export async function getNewClient() {
  const {
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    POSTGRES_HOST,
    POSTGRES_PORT,
    POSTGRES_DB,
  } = process.env;

  const client = new Client({
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    host: POSTGRES_HOST,
    port: Number(POSTGRES_PORT),
    database: POSTGRES_DB,
    ssl: getSSLValues(),
  });

  await client.connect();

  return client;
}

function getSSLValues() {
  if (process.env.POSTGRES_CA) {
    return {
      ca: process.env.POSTGRES_CA,
    };
  }

  return process.env.NODE_ENV === "production" ? true : false;
}
