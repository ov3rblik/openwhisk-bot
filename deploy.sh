#!/bin/bash

source .env

echo "Creating package..."
bx wsk package update openwhisk-bot

echo "Creating actions..."
bx wsk action update openwhisk-bot/cloudant-get-context \
  actions/cloudant-get-context.js \
  --param username $CLOUDANT_USERNAME \
  --param password $CLOUDANT_PASSWORD \
  --param host $CLOUDANT_HOST \
  --param database $CLOUDANT_DATABASE

bx wsk action update openwhisk-bot/watson-conversation \
  actions/watson-conversation.js \
  --param username $CONVERSATION_USERNAME \
  --param password $CONVERSATION_PASSWORD \
  --param workspace_id $CONVERSATION_WORKSPACE_ID

bx wsk action update openwhisk-bot/post-message \
  actions/post-message.js \
  --param token $SLACK_TOKEN

bx wsk action update openwhisk-bot/cloudant-save-context \
  actions/cloudant-save-context.js \
  --param username $CLOUDANT_USERNAME \
  --param password $CLOUDANT_PASSWORD \
  --param host $CLOUDANT_HOST \
  --param database $CLOUDANT_DATABASE

bx wsk action update openwhisk-bot/orchestrator \
  actions/orchestrator.js \
  --web true
