

/**
 * App ID for the skill
 */
var APP_ID =undefined; //OPTIONAL: replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";

//Constants representing spaces in the array.
var ENTERDOOR = 0;
var HALLWAY = 1;
var ROOM = 2;


/**
 * Array containing Dungeon.
 */
var DUNGEON = [
   [HALLWAY, HALLWAY, HALLWAY, HALLWAY, HALLWAY, HALLWAY, ROOM],
   [HALLWAY, HALLWAY, HALLWAY,HALLWAY, ROOM, HALLWAY, HALLWAY],
   [ROOM, HALLWAY, HALLWAY, HALLWAY, HALLWAY, HALLWAY, HALLWAY],
   [ROOM, HALLWAY, HALLWAY, ENTERDOOR, HALLWAY, HALLWAY, HALLWAY]
 ];

var X = 3;
var Y = 3;
var currentPos = DUNGEON[X][Y];

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

    "GetRightIntent": function (intent, session, response) {
        move(response, "right");
    },

    "GetLeftIntent": function (intent, session, response) {
        move(response, "left");
    },

    "GetForwardIntent": function (intent, session, response) {
        move(response, "forward");
    },

    "GetDownIntent": function (intent, session, response) {
        move(response, "down");
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

function move(response, wayToGo) {
  var speechOutput = ""
  switch (wayToGo) {
    case "left":
      if(Y === 0) {
        var something = "";
        response.ask("Sorry you can't go left, but you can go forward or right, would you like to do either of those?");
      }
      else {
        Y -= 1;
        currentPos = DUNGEON[X][Y];
        response.ask("You are in a, " + getNameFromPosition() + " " + Y);
      }
      break;
    case "right":
      if(Y === 6) {
        response.ask("Sorry you can't go right, but you can go forward or left, would you like to do either of those?");
      }
      else {
        Y += 1;
        currentPos = DUNGEON[X][Y];
        response.ask("You are in a, " + getNameFromPosition() + " " + Y);
      }
      break;
    case "forward":
      if(X === 3) {
        var something = "";
        response.ask("Sorry you can't go forward, but you can go right or left, would you like to do either of those?");
      }
      else {
        X += 1;
        currentPos = DUNGEON[X][Y];
        response.ask("You are in a, " + getNameFromPosition() + " " + X);
      }
      break;
    case "down":
      if(X === 0) {
        var something = "";
        response.ask("Sorry you can't go down, but you can go forward, right or left, which way would you like to go?");
      }
      else {
        X -= 1;
        currentPos = DUNGEON[X][Y];
        response.ask("You are in a, " + getNameFromPosition() + " " + X);
      }
      break;
    default:
      "We can't get here";

  }
}


function getNameFromPosition() {
  var name = ""
  switch (currentPos) {
    case 0:
      name = "Door"
      break;
    case 1:
      name = "Hallway"
      break;
    case 2:
      name = "Room"
    default:
      position
  }
  return name;
}

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
