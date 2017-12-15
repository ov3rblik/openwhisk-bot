var openwhisk = require('openwhisk');

function getContext(doc_id) {

  var ow = openwhisk();

  return ow.actions.invoke({
    name: 'openwhisk-bot/cloudant-get-context',
    blocking: true,
    result: true,
    params: {
      doc_id: doc_id
    }
  });
}

function askWatson(text, context) {

  var ow = openwhisk();

  return ow.actions.invoke({
    name: 'openwhisk-bot/watson-conversation',
    blocking: true,
    result: true,
    params: {
      text: text,
      context: context
    }
  });
}

function postMessage(channel, text) {

  var ow = openwhisk();

  return ow.actions.invoke({
    name: 'openwhisk-bot/post-message',
    blocking: true,
    result: true,
    params: {
      channel: channel,
      text: text
    }
  });
}

function saveContext(doc, newContext) {

  var ow = openwhisk();

  // Update the context object based on Watson's response
  doc.context = newContext;

  return ow.actions.invoke({
    name: 'openwhisk-bot/cloudant-save-context',
    blocking: true,
    result: true,
    params: {
      doc: doc
    }
  });
}

function main(params) {

  // Slack URL verification
  if (params.challenge) {
    return { challenge: params.challenge };
  }

  // Avoid infinite loop if it's a bot message
  if (params.event.subtype == 'bot_message') {
    return { message: 'The bot responded!' };
  }

  // Avoid the bot responding if you edit a message
  if (params.event.hidden) {
    return { message: 'You edited something!' };
  }

  // Otherwise, let the magic happen...
  return getContext(params.event.user).then(context => {
    return askWatson(params.event.text, context.context).then(conversation => {
      return postMessage(params.event.channel, conversation.output.text[0]).then(message => {
        return saveContext(context, conversation.context);
      });
    });
  });
}
