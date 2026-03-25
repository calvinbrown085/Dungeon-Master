# Overview

This project is an Alexa Skill that implements a simple text-based dungeon exploration game. Users interact with the skill using voice commands to navigate a predefined dungeon map, moving left, right, forward, or down, and discovering different areas like hallways and rooms.

# Architecture

The Dungeon Master Alexa Skill is built as an AWS Lambda function. Its architecture is composed of:

*   **`src/AlexaSkill.js` (Base Skill Class):** This file provides a reusable, generic framework for building Alexa skills. It defines how incoming Alexa requests (LaunchRequest, IntentRequest, SessionEndedRequest) are routed to specific event handlers (`onLaunch`, `onIntent`, `onSessionEnded`) and offers utility methods for constructing various Alexa responses (`tell`, `ask`, `tellWithCard`, `askWithCard`). It enforces application ID validation for security.
*   **`src/index.js` (Game Logic and Skill Implementation):** This is the core application logic. It extends the `AlexaSkill` base class, implementing the specific behavior for the "Dungeon Master" game. It defines the dungeon map as a 2D array, tracks the player's current position, and contains the logic for movement commands and initial game setup. It also registers custom intent handlers (e.g., `GetNewDungeonIntent`, `GetRightIntent`) that define how the skill responds to user commands.
*   **`speechAssets/` (Alexa Interaction Model):** This directory contains the definitions for Alexa's natural language understanding.
    *   `IntentSchema.json` specifies the custom intents (e.g., `GetNewDungeonIntent`, `GetLeftIntent`) and any associated slots that the skill recognizes.
    *   `SampleUtterances.txt` provides example phrases users might say to invoke these intents, used by Amazon to train the skill's voice model.

# Key Files

*   **`src/index.js`**:
    *   The primary entry point (`exports.handler`) for the AWS Lambda function.
    *   Defines the `Dungeon` skill class, extending `AlexaSkill`.
    *   Contains the game's state, including the `DUNGEON` map (a 2D array representing locations) and the player's `X` and `Y` coordinates.
    *   Implements `onLaunch` to start a new game and `intentHandlers` for movement (`GetRightIntent`, `GetLeftIntent`, `GetForwardIntent`, `GetDownIntent`) and game control (`GetNewDungeonIntent`, `AMAZON.HelpIntent`, `AMAZON.StopIntent`, `AMAZON.CancelIntent`).
    *   Includes helper functions like `move` for updating player position and `getNameFromPosition` for describing the current location.
*   **`src/AlexaSkill.js`**:
    *   Provides the foundational `AlexaSkill` class, abstracting common Alexa skill operations.
    *   Manages the lifecycle of an Alexa request, routing it to appropriate handlers (`onSessionStarted`, `onLaunch`, `onIntent`, `onSessionEnded`).
    *   Offers a `Response` object with methods (`tell`, `ask`, `tellWithCard`, `askWithCard`) to easily construct and send Alexa-compatible speech and card responses.
    *   Includes logic for validating the incoming request's `applicationId` against a configured `APP_ID`.
*   **`speechAssets/IntentSchema.json`**:
    *   Defines the JSON structure for the interaction model, listing all custom intents and built-in intents the skill uses. For this project, it would include intents like `GetNewDungeonIntent`, `GetRightIntent`, `GetLeftIntent`, `GetForwardIntent`, `GetDownIntent`, and standard `AMAZON.*Intent`s.
*   **`speechAssets/SampleUtterances.txt`**:
    *   Contains a list of example phrases for each defined intent. This file is crucial for teaching Alexa how to map user speech to the correct intents in your skill.

# How to Run

To deploy and run this Alexa Skill:

1.  **Create an Alexa Skill**: Go to the [Amazon Developer Console](https://developer.amazon.com/alexa/console/skills) and create a new custom Alexa Skill.
2.  **Configure Interaction Model**:
    *   In the Alexa Skill console, navigate to the "Interaction Model" section.
    *   Copy the content of `speechAssets/IntentSchema.json` into the "JSON Editor".
    *   Copy the content of `speechAssets/SampleUtterances.txt` into the "Sample Utterances" text area.
    *   Build the model.
3.  **Create an AWS Lambda Function**:
    *   Go to the [AWS Lambda Console](https://console.aws.amazon.com/lambda/home).
    *   Create a new Node.js Lambda function.
    *   **Set Trigger**: Configure an "Alexa Skills Kit" trigger for your Lambda function.
    *   **Upload Code**: Zip the `src/AlexaSkill.js` and `src/index.js` files together. Upload this zip file as the Lambda function's code. Ensure the handler is set to `index.handler`.
4.  **Configure APP_ID**:
    *   Find your Alexa Skill ID (starting with `amzn1.ask.skill...`) from the Alexa Developer Console.
    *   In `src/index.js`, replace `undefined` with your actual Alexa Skill ID:
        ```javascript
        var APP_ID ="amzn1.ask.skill.[your-unique-value-here]"; // Replace with your skill ID
        ```
    *   Re-zip and re-upload the updated code to Lambda.
5.  **Connect Skill to Lambda**:
    *   In the Alexa Developer Console for your skill, navigate to the "Endpoint" section.
    *   Select "AWS Lambda ARN" and paste the ARN of your newly created Lambda function.
    *   Save Endpoints.

Your skill is now deployed and ready for testing.

# Environment Variables

This project does not use traditional environment variables for configuration. Instead, it relies on an in-code constant:

*   **`APP_ID` (in `src/index.js`)**: This variable must be set to your unique Alexa Skill ID (e.g., `amzn1.echo-sdk-ams.app.[your-unique-value-here]`). It is crucial for verifying that incoming requests to your Lambda function originate from your specific Alexa skill, preventing unauthorized access.

# How to Test

Once the skill is deployed and linked to your Lambda function:

1.  **Alexa Developer Console Simulator**:
    *   Navigate to the "Test" tab in your Alexa Skill's developer console.
    *   Use the "Alexa Simulator" to type or speak commands to your skill (e.g., "Start Dungeon Master", "go right").
    *   Observe the Lambda response and Alexa's spoken output.
2.  **Physical Alexa Device**:
    *   Ensure your Alexa device is registered to the same Amazon account used for the developer console.
    *   Invoke your skill by saying its invocation name (e.g., "Alexa, open Dungeon Master") and then interact with it using the defined utterances.