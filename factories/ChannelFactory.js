app.factory('channels', function($http,$q, firebaseUrl){
const addChannel = function(data){
	return $q(function(resolve, reject){
		$http.post(`${firebaseUrl}/channels.json`, data)
		.success(function(channel){
			resolve(channel)
		})
		.error(function(error){
			reject(error)
		})
	})
}

const getChannels = function(){
	return $q(function(resolve, reject){
		$http.get(`${firebaseUrl}/channels.json`)
		.success(function(channels){
			resolve(channels)
		})
		.error(function(error){
			reject(error)
		})
	});
};

const patchChannel = function(channel, data){
		return $q(function(resolve, reject){
		$http.patch(`${firebaseUrl}/channels/${channel}.json`, data)
		.success(function(newChannel){
			resolve(newChannel)
		})
		.error(function(error){
			reject(error)
		})
	});
}
return {addChannel, getChannels, patchChannel}
})