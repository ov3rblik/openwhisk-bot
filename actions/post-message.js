var request = require('request');

/**
 * Posts a message to a Slack channel
 *
 * @param   {String} token
 * @param   {String} channel
 * @param   {String} text
 *
 * @returns {Object} Promise
 */

function main(params) {
  return new Promise(function(resolve, reject) {
    request({
      url: 'https://slack.com/api/chat.postMessage',
      method: 'POST',
      form: {
        token: params.token,
        channel: params.channel,
        text: params.text
      }
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
