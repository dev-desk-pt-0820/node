const request = require('supertest');
const { clean } = require('knex-cleaner');
const server = require('../api/server.js');
const db = require('../database/dbConfig.js');

beforeAll(() =>
  clean(db, {
    mode: 'truncate',
    restartIdentity: true,
    ignoreTables: ['knex_migrations', 'knex_migrations_lock'],
  })
);

describe('POST /api/auth/register', () => {
    it('Creates a new user in the database', () => {
      return request(server)
        .post('/api/auth/register')
        .send({
          name: 'Guiy',
          username: 'RamSamSam',
          password: 'passyPass',
          roles: ['HELPER'],
        })
        .then(async (res) => {
          const [user] = await db('users').select('*').where({ id: res.body.id });
          expect(res.status).toBe(201);
          expect(user.username).toBe('RamSamSam');
        });
    });
});