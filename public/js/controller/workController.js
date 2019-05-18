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
						expireWorks.push(self.works[i]);
					}
				}
			}
		});

	},

	watch : {

		deadlineCheck : function(newValue, oldValue){
			var self = this;

			console.log(newValue);

			if(!newValue){
				self.deadlineToggle = false;
				self.newWork.deadline = undefined;
			}
			else{
				self.deadlineToggle = true;
			}
		}

	},

	methods: {

		insertWork(){

			var self = this;
			
			addWork(self.newWork).then(function(rtn){
				if(rtn.success){
					alert("입력되었습니다");

					getWorks().then(function(rtn){
						self.works = rtn;
					});
				}
			});
		},

		removeWork(id){

			var self = this;

			deleteWork(id).then(function(rtn){
				if(rtn.success){
					alert("삭제되었습니다");

					getWorks().then(function(rtn){
						self.works = rtn;
					});
				}
			});
		},

		modifyToggle(work, index){

			var self = this;

			self.modifyIndex = index;
			self.modifyWork = work;
		},

		updateWork(){

			var self = this;

			updateWork(self.modifyWork.id, self.modifyWork).then(function(rtn){
				if(rtn.success){
					self.modifyIndex = -1;
					self.modifyWork = "";
					alert("수정되었습니다");

					getWorks().then(function(rtn){
						self.works = rtn;
					});
				}
			});
		},

		completeWork(work){

			var self = this;

			work.completed = true;

			updateWork(work.id, work).then(function(rtn){
				if(rtn.success){
					alert("완료되었습니다");

					getWorks().then(function(rtn){
						self.works = rtn;
					});
				}
			});	
		}


	},


});