# `openwhisk-bot`
This describes a serverless Slack bot implementation using IBM Cloud Functions and Watson.

We're using the Slack Events API to trigger OpenWhisk actions which call the Watson Conversation service and handle the context in Cloudant.

## Before you get started
You'll need a Bluemix account, the IBM Cloud Functions plugin for Bluemix, and a Slack account with the appropriate permissions to create a Slack app.

In Bluemix, you should create a Cloudant service with a database for storing the context objects and an instance of the Watson Conversation service with a workspace for your bot. If you'd like a sample workspace, you can import the `workspace.json` file (it's not amazing, just a starting point).

Finally, for the Slack app, you'll need to set up a bot user, subscribe to the `message.im` event, and put the API endpoint for the `orchestrator` web action from OpenWhisk in the request URL for the Slack event subscription. It will look like the URL below, and will actually need to be done at the end, after you've deployed the OpenWhisk actions.

```
https://openwhisk.ng.bluemix.net/api/v1/web/YOURORG_YOURSPACE/openwhisk-bot/orchestrator.json
```

## Instructions

### Create a `.env` file
Create a `.env` file like the one below with your various service credentials.

```
# CLOUDANT
CLOUDANT_USERNAME=your_value_goes_here
CLOUDANT_PASSWORD=your_value_goes_here
CLOUDANT_HOST=your_value_goes_here
CLOUDANT_DATABASE=your_value_goes_here

# CONVERSATION
CONVERSATION_USERNAME=your_value_goes_here
CONVERSATION_PASSWORD=your_value_goes_here
CONVERSATION_WORKSPACE_ID=your_value_goes_here

# SLACK
SLACK_TOKEN=your_value_goes_here
```

### Login to Bluemix
Make sure you are logged in to the right Bluemix account and are targeting the right org and space.

```
bx login -a api.ng.bluemix.net -o your_org_goes_here -s your_space_goes_here
```

### Deploy the OpenWhisk actions
**NOTE:** This step will create or update an OpenWhisk package called `openwhisk-bot`. If by any chance you already have a package with this name, stuff may get overwritten.

Open a terminal and run `./deploy.sh` or `bash ./deploy.sh` if you get a permissions error.
