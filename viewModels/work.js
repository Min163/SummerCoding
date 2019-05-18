module.exports = function(work){
	if(!work){
		return {
			success: false,
			message: 'No Data',
		};
	}
	return {

		success : true,
		id : work._id,
		workTitle : work.workTitle,
		contents : work.contents,
		updated_at : work.updated_at,
		completed : work.completed,
		deadline : work.deadline,
		priority : work.priority,
	};
};
