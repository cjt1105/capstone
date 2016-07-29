app.controller("JobCtrl", function(jobs, $scope){
	$scope.jobs;

	jobs.fetchJobs()
	.then(function(jobs){
		$scope.jobs = jobs
	})

	$scope.postJob = function(){
		let newJob = {
			title: $scope.jobTitle,
			company: $scope.companyName,
			stack: $scope.stack
		};
		jobs.postJob(newJob)
		.then(function(job){
			$scope.jobTitle = "";
			$scope.companyName = "";
			$scope.stack = "";
			$scope.jobs = null;
			jobs.fetchJobs()
			.then(function(jobs){
				$scope.jobs = jobs;
			})
		})
	};

})