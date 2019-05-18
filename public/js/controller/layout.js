Vue.filter('moment', function (date) {

    return moment(date).format('MM월 DD일');

});
