Vue.filter('moment', function (date) {

    return moment(date).format('MM월 DD일');

});

Vue.filter('priority', function (str) {

	if(str === "FIRST") return "매우 중요";
	else if(str === "SECOND") return "중요";
	else if(str === "THIRD") return "보통";
	else return "중요하지 않음"
});