/* eslint-disable no-unused-vars */
const data = require('../../src/data/db.json');

exports.handler = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify(data.footballers),
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
    },
  };
};
