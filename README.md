## Online Multiplayer Chess

Currently hosted on [chess.brandonnolin.ca](https://chess.brandonnolin.ca).

This project was heavily inspired by websites like [chess.com](https://www.chess.com/), [lichess.org](https://lichess.org/), and other online chess platforms. Currently, many important features are not yet implemented and are displayed as non-functional UI components. Only the barebones functionality to play the game exists with users being able to play against eachother using the "Play a Friend" feature. Users can also chat with eachother using the chat window.

The entire backend of the application is done through AWS. The hosting is handled through S3 and CloudFront, and the user connections are handled using API Gateway websocket, Lambda, and DynamoDB.

### Planned Features:
Some of the features that are currently missing but are planned to be implemented are: 

  - Time Control
  - Move History (Displayed in box above chat window)
  - Offering Draws
  - Offering Rematches
  - List of taken pieces
  - Ability to find a game against another random player

### Running the App Locally:
Though this app is hosted on [chess.brandonnolin.ca](https://chess.brandonnolin.ca), you can also run it locally. To do so, follow these steps:

  1. Download the repo.
  2. Navigate to the repo in the command line.
  3. Run the command "npm install".
  4. Once all the packages have been downloaded, the app can be run using "npm start".
