import {fire} from './fire.js';

let database = fire.database();


// Read Functions

export const readPublisher = (pubId) => {
	return database.ref('publishers/' + pubId);
}

export const readCommentsListener = (pubId) => {
	return database.ref('publishers/' + pubId + '/comments');
}

export const readVideosListener = (pubId) => {
	return database.ref('publishers/' + pubId + '/videos');
}

export const readPublishersByCategory = (category) => {
	let ref = database.ref('publishers');
	return ref.orderByChild("info/category").equalTo(category);
}


// Write Functions 

export const initializePublisher = (pubId, name, type) => {
	let updates = {};
	updates[`publishers/${pubId}/info/name`] = name;
	updates[`publishers/${pubId}/info/userType`] = type;
	return database.ref().update(updates);
}

export const updatePubPackage = (pubId, packageType) => {
	let updates = {};
	updates[`publishers/${pubId}/info/packageType`] = packageType;
	return database.ref().update(updates);
}

export const updateProfileInfo = (pubId, uploadState) => {
	let updates = {};
	updates[`publishers/${pubId}/info/category`] = uploadState.pubCategory;
	updates[`publishers/${pubId}/info/description`] = uploadState.pubDescription;
	updates[`publishers/${pubId}/avatar`] = {
		avatar: uploadState.avatarURL,
		description: uploadState.avatarDescription
	};
	updates[`publishers/${pubId}/facebook`] = {
		image: uploadState.facebookURL,
		link: uploadState.facebookLink,
		description: uploadState.facebookDescription
	};
	updates[`publishers/${pubId}/youtube`] = {
		image: uploadState.youtubeURL,
		link: uploadState.youtubeLink,
		description: uploadState.youtubeDescription
	};
	updates[`publishers/${pubId}/instagram`] = {
		image: uploadState.instagramURL,
		link: uploadState.instagramLink,
		description: uploadState.instagramDescription
	};
	return database.ref().update(updates);
}

export const writeVideo = (pubId, videoName, videoDescription, videoLink, youtubeId) => {
	database.ref('publishers/' + pubId + '/videos').push({
		pubId: pubId,
		name: videoName, 
		link: videoLink,
		description: videoDescription,
		youtubeId: youtubeId,
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