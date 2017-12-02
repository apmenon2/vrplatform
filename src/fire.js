import firebase from 'firebase';

let config = {
	apiKey: "AIzaSyA08IV5Woj1jeeBOqASleDmeHsIe_ZtTT0",
	authDomain: "vrproject-6e296.firebaseapp.com",
	databaseURL: "https://vrproject-6e296.firebaseio.com",
	projectId: "vrproject-6e296",
	storageBucket: "vrproject-6e296.appspot.com",
	messagingSenderId: "979966610248"
};

let fire = firebase.initializeApp(config);

export default fire;
export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();