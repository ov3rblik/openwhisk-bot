var ConversationV1 = require('watson-developer-cloud/conversation/v1');

/**
 * Sends a message to a Watson Conversation service
 *
 * @param   {String} username
 * @param   {String} password
 * @param   {String} [text]
 * @param   {Object} [context]
 * @param   {String} workspace_id
 *
 * @returns {Object} Promise
 */

function main(params) {

  var conversation = new ConversationV1({
    username: params.username,
    password: params.password,
    version_date: '2017-05-26'
  });

  return new Promise(function(resolve, reject) {
    conversation.message({
      input: { text: params.text },
      context: params.context,
      workspace_id: params.workspace_id
    }, function(err, response) {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        resolve(response);
      }
    });
  });
}
