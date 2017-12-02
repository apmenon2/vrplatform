import fire from './fire.js';

let database = fire.database();


// Read Functions

export const readPublisher = (pubId) => {
	return database.ref('publishers/' + pubId);
}

readPublisher('-KzPrfNnnR9OWIp57JE3');

export const readCommentsListener = (pubId) => {
	return database.ref('publishers/' + pubId + '/comments');
}

export const readVideosListener = (pubId) => {
	return database.ref('publishers/' + pubId + '/videos');
}


// Write Functions 

export const writePublisher = (uploadState) => {
	database.ref('publishers').push({
		userName: uploadState.userName,
		name: uploadState.name,
		category: uploadState.pubCategory,
		isPublisher: true,
		plan: uploadState.packageType,
		videos: [],
		avatar: uploadState.avatarURL,
		avatarDescription: uploadState.avatarDescription,
		facebookImage: uploadState.facebookURL,
		facebookLink: uploadState.facebookLink,
		facebookDescription: uploadState.facebookDescription,
		youtubeImage: uploadState.youtubeURL,
		youtubeLink: uploadState.youtubeLink,
		youtubeDescription: uploadState.youtubeDescription,
		instagramImage: uploadState.instagramURL,
		instagramLink: uploadState.instagramLink,
		instagramDescription: uploadState.instagramDescription,
	}).then((snapshot) => {
		let pubId = snapshot.key;
		return pubId;
	})
}

export const writeVideo = (pubId, videoName, videoDescription, videoLink) => {
	database.ref('publishers/' + pubId + '/videos').push({
		pubId: pubId,
		name: videoName, 
		link: videoLink,
	})
}

export const writeComment = (pubId, commenterId, commenterName, commentBody) => {
	database.ref('publishers/' + pubId + '/comments').push({
		commenterId: commenterId, 
		commenterName: commenterName,
		text: commentBody
	})
}


// Update Functions