import config from '@/common/Config';
import knex from 'knex';

const {host, port, user, password, database, charset, timeout} = config.database.credentials;

const db = knex({
  client: 'mysql2',
  connection: {
    host,
    port,
    user,
    password,
    database,
    charset,
    connectionTimeout: timeout,
  },
});

export default db;
