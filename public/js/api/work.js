var baseWork = "/api/work";

var getWorks = function(data){
	return new Promise(function(resolve, reject){
		$.ajax({
			url: baseWork,
			method: 'GET',
			data: data,
			success: function(rtnData){
				resolve(rtnData);
			},
			fail: function(rtnData){
				reject(rtnData);
			},
		});
	});
};

var getWork = function(id){
	return new Promise(function(resolve, reject){
		$.ajax({
			url: baseWork + '/' + id,
			method: 'GET',
			success: function(rtnData){
				resolve(rtnData);
			},
			fail: function(rtnData){
				reject(rtnData);
			},
		});
	});
};

var addWork = function(data){
	return new Promise(function(resolve, reject){
		$.ajax({
			url: baseWork,
			method: 'POST',
			data: data,
			success: function(rtnData){
				resolve(rtnData);
			},
			fail: function(rtnData){
				reject(rtnData);
			},
		});
	});
};

var deleteWork = function(id){
	return new Promise(function(resolve, reject){
		$.ajax({
			url: baseWork + '/' + id,
			method: 'DELETE',
			success: function(rtnData){
				resolve(rtnData);
			},
			fail: function(rtnData){
				reject(rtnData);
			},
		});
	});
};

var updateWork = function(id, data){
	return new Promise(function(resolve, reject){
		$.ajax({
			url: baseWork + '/' + id,
			method: 'PUT',
			data: data,
			success: function(rtnData){
				resolve(rtnData);
			},
			fail: function(rtnData){
				reject(rtnData);
			},
		});
	});
};

