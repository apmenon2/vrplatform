This VR Platform (Dragonfly) is one of the main projects for CS468. The goal is to create a platform that allows users (primarily institutions and tourism organizations) to publish curated VR and 360 content for marketing purposes. A lot of the platform is still theoretical and still being tweaked and changed in future semesters. 

## Table of Contents

- [Updating to New Releases](#updating-to-new-releases)
- [Sending Feedback](#sending-feedback)


## Stack 

- ** Backend ** : [Google Firebase](https://firebase.google.com/) 
- ** Frontend ** : [React](https://reactjs.org/)
- ** UI Kit ** : [Semantic](https://react.semantic-ui.com/)

## Firebase 

Firebase is used for 3 things on Dragonfly 

- **Database**: The current schema for Dragonfly only consists of a publishers and video details. Future version should support graphics and marketing content as well as differentiating between publishers and explorers (general users) in more indexed fashion. 
- **Authentication**: Dragonly currently uses a email/password combination for authentication. This may be expanded in the future to support various login methods (Google Plus, Facebook, etc..)
- **File Storage**: The only use for file storage currently is to save user's graphics and avatars. We want to potentially explore the use of storage to save videos for the platform (this comes with the added complexity of file sizes)

### Use 

To set up use of firebase. First install the firebase cli by running:
```
  npm install -g firebase-tools
````
Once firebase is installed, login with the credentials provided with the Dragonfly documentation. Please use this account and credentials for further development of Dragonly fly. This ensures that consistency is kept and that all changes are carried over to the next semester's students. 

The repository should be automatically initiated to the proper firebase account, but if not run:
```
firebase init
```

To deploy new code to the project run:
```
yarn run build
firebase deploy
```
Make sure you build the project before a deployment to ensure all new code is deployed. 

### Files 
There are a few firebase related files to keep in mind. `fire.js` contains the config details for the firebase project. The file is not saved on the github repo for security purposes but it should be modeled as such 

```
import firebase from 'firebase';

let config = {
  apiKey: "<your config details>",
  authDomain: "<your config details>",
  databaseURL: "<your config details>",
  projectId: "<your config details>",
  storageBucket: "<your config details>",
  messagingSenderId: "<your config details>"
};

export const fire = firebase.initializeApp(config);
export const firebaseAuth = firebase.auth;
```

`auth.js` contains the helper methods for authentication related things. Further methods can be added here.
`dbHandler.js` contains all the helper methods for general interaction with the firebase database. 

## React

All React components live in the `src/Components` folder. Larger pages and general components should get their own new folders. More information about React can be obtained from the official documentation. Due to time limitations, Proptypes were not added to the project and should be a priority for future groups. 

