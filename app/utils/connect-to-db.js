'use strict';

const { Pool } = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgresql://root@localhost:5432/coming_soon';
const pool = new Pool({ connectionString: connectionString });

module.exports = async (sql, opts) => {
  if (opts && opts.showQuery) {console.log(sql);}

  let res;
  try {
    res = await pool.query(sql, opts);
  } catch (e) {
    console.log(e);
  }
  return res;
};
