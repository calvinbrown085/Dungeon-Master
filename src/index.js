

/**
 * App ID for the skill
 */
var APP_ID =undefined; //OPTIONAL: replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";

//Constants representing spaces in the array.
var HALLWAY = 0;
var ROOM = 1;

/**
 * Array containing Dungeon.
 */
var DUNGEON = [
   [HALLWAY, HALLWAY, HALLWAY, HALLWAY, HALLWAY, ROOM],
   [HALLWAY, HALLWAY, HALLWAY, ROOM, HALLWAY, HALLWAY],
   [ROOM, HALLWAY, HALLWAY, HALLWAY, HALLWAY, HALLWAY],
   [ROOM, HALLWAY, HALLWAY, HALLWAY, HALLWAY, HALLWAY],
 ];

var AlexaSkill = require('./AlexaSkill');


var Dungeon = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
Dungeon.prototype = Object.create(AlexaSkill.prototype);
Dungeon.prototype.constructor = Dungeon;

Dungeon.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {

};

Dungeon.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    handleNewDungeonRequest(response);
};

/**
 * Overridden to show that a subclass can override this function to teardown session state.
 */
Dungeon.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {

};

Dungeon.prototype.intentHandlers = {
    "GetNewDungeonIntent": function (intent, session, response) {
        handleNewDungeonRequest(response);
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
        response.ask("You can say Start the quest, or you can say exit.", "What can I help you with?");
    },

    "AMAZON.StopIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    },

    "AMAZON.CancelIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    }
};

function handleNewDungeonRequest(response) {
  var speechOutput = "Hello, welcome to Dungeon Master, I will be your guide today, lets go!" + ", We have arrived at the dungeon, lets enter it!, You open the door and step inside, it's dark but you can still see. Which way shall we go?"
  var cardTitle = "Which Way?"
  response.askWithCard(speechOutput, cardTitle, speechOutput);
}
// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {

    var dungeon = new Dungeon();
    dungeon.execute(event, context);
};
