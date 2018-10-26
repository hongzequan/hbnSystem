// 这里放置一些公用的方法
$('.j-tab li').click(function() {
    $(this).addClass('active').siblings().removeClass('active');
    $('.j-item .list').eq($(this).index()).show().siblings().hide();
})

// 点击拷贝文字
function setCopyText(obj) {
    var id = '#' + $(obj).attr('id');
    var clipboard = new Clipboard(id);
    clipboard.on('success', function(e) {
        alert("复制成功", 1500);
        e.clearSelection();
        clipboard.destroy();
    });
    clipboard.on('error', function(e) {
        alert("当前浏览器不支持此功能，请手动复制。")
    });
}

// 打开弹窗
function openModal(){
    var mondal=$('.modal');
    var mask=$('.modal-backdrop')
    mondal.show().addClass('fade in');
    mask.show().addClass('fade in');
}
function closeModal(){
    var mondal=$('.modal');
    var mask=$('.modal-backdrop')
    mondal.hide().removeClass('fade in');
    mask.hide().removeClass('fade in');
}