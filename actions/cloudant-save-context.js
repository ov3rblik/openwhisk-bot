var Cloudant = require('cloudant');

/**
 * Saves a context document to a Cloudant database
 *
 * @param   {String} username
 * @param   {String} password
 * @param   {String} host
 * @param   {String} database
 * @param   {Object} doc
 *
 * @returns {Object} Promise
 */

function main(params) {

  var url = 'https://' + params.username + ':' + params.password + '@' + params.host;
  var cloudant = new Cloudant(url);
  var contextDb = cloudant.db.use(params.database);

  return new Promise(function(resolve, reject) {
    contextDb.insert(params.doc, function(err, response) {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        resolve(response);
      }
    });
  });
}
