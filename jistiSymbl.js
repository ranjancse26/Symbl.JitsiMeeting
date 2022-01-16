const {sdk, SpeakerEvent} = require("@symblai/symbl-js");
const appId = ""; // Please make use of your AppId obtained from https://platform.symbl.ai/
const appSecret = ""; // Please make use of your AppSecret obtained from https://platform.symbl.ai/
const phoneNumber = "+15126471431"; // US Zoom Numbers are "+16465588656", or "+14086380968".
const meetingName = "SymblRealtime"; // Please make sure to have the right meeting name
const emailAddress = "ranjancse@gmail.com"; // Replace with your emailAddress

const JISTI_MEETING_PASSCODE = "1788324033"; // Replace with the meeting passcode

let dtmfSequence = ``;

if (JISTI_MEETING_PASSCODE) {
  dtmfSequence += `${JISTI_MEETING_PASSCODE}#`;
}

console.log(dtmfSequence);

sdk.init({
  appId: appId,
  appSecret: appSecret,
  basePath: "https://api.symbl.ai",
}).then(async() => {
  console.log('SDK initialized.');
  try {

    sdk.startEndpoint({
      endpoint: {
        type: "pstn",
        phoneNumber: phoneNumber,
        dtmf: dtmfSequence,
      },
      actions: [
        {
          invokeOn: "stop",
          name: "sendSummaryEmail",
          parameters: {
            emails: [
              "ranjancse@gmail.com"
            ],
          },
        },
      ],
      data: {
        session: {
          name: meetingName,
        },
      },
    }).then((connection) => {
      const connectionId = connection.connectionId;
      console.log("Successfully connected.", connectionId);
      console.log('Conversation ID', connection.conversationId);
      console.log('Full Conection Object', connection);
      console.log("Calling into Jitsi now, please wait about 30-60 seconds.");
    })
    .catch((err) => {
       console.error("Error while starting the connection", err);
    });
  } catch (e) {
    console.error(e);
  }
}).catch(err => console.error('Error in SDK initialization.', err));