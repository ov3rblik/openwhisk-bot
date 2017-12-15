var Cloudant = require('cloudant');

/**
 * Gets a context document from a Cloudant database
 *
 * @param   {String} username
 * @param   {String} password
 * @param   {String} host
 * @param   {String} database
 * @param   {String} doc_id
 *
 * @returns {Object} Promise
 */

function main(params) {

  var url = 'https://' + params.username + ':' + params.password + '@' + params.host;
  var cloudant = new Cloudant(url);
  var contextDb = cloudant.db.use(params.database);

  return new Promise(function(resolve, reject) {
    contextDb.get(params.doc_id, function(err, response) {
      if (err) {
        if (err.statusCode == 404 && err.reason == 'missing') {
          resolve({ _id: params.doc_id, context: {} });
        } else {
          console.error(err);
          reject(err);
        }
      } else {
        resolve({ _id: response._id, _rev: response._rev, context: response.context });
      }
    });
  });
}
