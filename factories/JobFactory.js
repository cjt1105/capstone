app.factory('jobs', function(firebaseUrl,$q, $http){

	let postJob = function(data){
		return $q(function(resolve,reject){
			$http.post(`${firebaseUrl}/jobs.json`, data)
			.success(function(jobs){
				resolve(jobs);
			})
		})
	};

	let fetchJobs = function(){
		return $q(function(resolve, reject){
			$http.get(`${firebaseUrl}/jobs.json`)
			.success(function(jobs){
				resolve(jobs);
			})
		})
	}
	return {postJob, fetchJobs}
})