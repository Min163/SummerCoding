var app = new Vue({

	el: "#work_app",

	data: {

		works : [],
		expiredWorks : [],

		newWork : {
			workTitle : "",
			contents : "",
			deadline : undefined,
			priority : "",
		},
		deadlineCheck : false,
		deadlineToggle : false,

		modifyWork : "",
		modifyIndex : -1,
		modifyDeadlineCheck : false,
		modifyDeadlineToggle : false, 

		viewExpired : false,

	},

	mounted: function(){
		
		var self = this;

		getWorks().then(function(rtn){
			self.works = rtn;

			//오늘 날짜와 비교하여 마감기한이 지난 work 따로 정리하기
			var today = new Date();
			for(var i = 0; i < self.works.length; i++){
				if(self.works[i].deadline){
					var compare = new Date(self.works[i].deadline);
					if(compare <= today){
						self.expiredWorks.push(self.works[i]);
					}
				}
			}
		});

	},

	watch : {

		deadlineCheck : function(newValue, oldValue){
			var self = this;

			// console.log(newValue);

			if(!newValue){
				self.deadlineToggle = false;
				self.newWork.deadline = undefined;
			}
			else{
				self.deadlineToggle = true;
			}
		},

		modifyDeadlineCheck : function(newValue, oldValue){
			var self = this;

			console.log(newValue);

			if(!newValue){
				self.modifyDeadlineToggle = false;
				self.modifyWork.deadline = undefined;
			}
			else{
				self.modifyDeadlineToggle = true;
			}
		},


	},

	methods: {

		insertWork(){

			var self = this;
			
			//제목, 내용, 우선순위는 무조건 작성하도록
			if(self.newWork.workTitle != "" && self.newWork.contents != "" && self.newWork.priority != ""){
				addWork(self.newWork).then(function(rtn){
					if(rtn.success){
						self.deadlineCheck = false;
						self.deadlineToggle = false;
						self.newWork = {
							workTitle : "",
							contents : "",
							deadline : undefined,
							priority : "",
						};

						alert("입력되었습니다");

						getWorks().then(function(rtn){
							self.works = rtn;

							//오늘 날짜와 비교하여 마감기한이 지난 work 따로 정리하기
							self.expiredWorks = [];

							var today = new Date();
							for(var i = 0; i < self.works.length; i++){
								if(self.works[i].deadline){
									var compare = new Date(self.works[i].deadline);
									if(compare <= today){
										self.expiredWorks.push(self.works[i]);
									}
								}
							}
						});
					}
				});
			}
			else{
				alert("제목과 상세내용, 우선순위는 필수입니다");
			}
			
		},

		removeWork(id){

			var self = this;

			deleteWork(id).then(function(rtn){
				if(rtn.success){
					alert("삭제되었습니다");

					getWorks().then(function(rtn){
						self.works = rtn;

						//오늘 날짜와 비교하여 마감기한이 지난 work 따로 정리하기
						self.expiredWorks = [];

						var today = new Date();
						for(var i = 0; i < self.works.length; i++){
							if(self.works[i].deadline){
								var compare = new Date(self.works[i].deadline);
								if(compare <= today){
									self.expiredWorks.push(self.works[i]);
								}
							}
						}
					});
				}
			});
		},

		modifyToggle(work, index){

			var self = this;

			self.modifyIndex = index;
			self.modifyWork = work;

			if(work.deadline != undefined){
				self.modifyDeadlineCheck = true;
			}
		},

		updateWork(){

			var self = this;

			updateWork(self.modifyWork.id, self.modifyWork).then(function(rtn){
				if(rtn.success){
					self.modifyIndex = -1;
					self.modifyWork = "";
					self.modifyDeadlineCheck = false;
					self.modifyDeadlineToggle = false;

					alert("수정되었습니다");

					getWorks().then(function(rtn){
						self.works = rtn;

						//오늘 날짜와 비교하여 마감기한이 지난 work 따로 정리하기
						self.expiredWorks = [];

						var today = new Date();
						for(var i = 0; i < self.works.length; i++){
							if(self.works[i].deadline){
								var compare = new Date(self.works[i].deadline);
								if(compare <= today){
									self.expiredWorks.push(self.works[i]);
								}
							}
						}
					});
				}
			});
		},

		completeWork(work){

			var self = this;

			work.completed = true;

			updateWork(work.id, work).then(function(rtn){
				if(rtn.success){
					// alert("완료되었습니다");

					getWorks().then(function(rtn){
						self.works = rtn;

						//오늘 날짜와 비교하여 마감기한이 지난 work 따로 정리하기
						self.expiredWorks = [];
						
						var today = new Date();
						for(var i = 0; i < self.works.length; i++){
							if(self.works[i].deadline){
								var compare = new Date(self.works[i].deadline);
								if(compare <= today){
									self.expiredWorks.push(self.works[i]);
								}
							}
						}
					});
				}
			});	
		},

		viewExpiredWork(){

			var self = this;

			if(!self.viewExpired){
				self.viewExpired = true;
			} 
			else{
				self.viewExpired = false;
			}
		},


	},


});