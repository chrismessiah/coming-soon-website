'use strict';

module.exports = async (req, res) => {
  if (!req.body.email) throw 'incorrect query';
  if (req.body.email.indexOf("@") === -1) throw 'not a valid email';

  let email = req.body.email.toLowerCase().trim();

  let dbRes = await req.sql('INSERT INTO subscribers (email) VALUES ($1)', [email]);
  if (!dbRes) return res.error();
  return res.success();
};
