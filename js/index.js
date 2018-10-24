// 这里放置一些公用的方法
$('.j-tab li').click(function(){
	$(this).addClass('active').siblings().removeClass('active');
	$('.j-item .list').eq($(this).index()).show().siblings().hide();
})