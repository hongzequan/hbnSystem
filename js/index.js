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
function openModal() {
    var mondal = $('.modal');
    var mask = $('.modal-backdrop')
    mondal.show().addClass('fade in');
    mask.show().addClass('fade in');
}

function closeModal() {
    var mondal = $('.modal');
    var mask = $('.modal-backdrop')
    mondal.hide().removeClass('fade in');
    mask.hide().removeClass('fade in');
}
// 注册加盟表单，点击清空数据
function clearVal(obj) {
    $(obj).siblings('input').val('');
}
// 查看密码
function showPassword(obj) {
    var input = $(obj).siblings('input')
    if (input.attr("type") == "password") {
        input[0].type = "text"
    } else {
        input[0].type = "password";
    }
}

// 抄以前的js
// 展开清单
function showAddgoods() {
    var obj = $('#g-bottom-toggle'),
        view = $('#view');
    if (obj.hasClass('active')) {
        obj.removeClass('active');
        obj.fadeOut(300, function() {
            view.css({ 'bottom': '-100%' })
        });
    } else {
        obj.addClass('active');
        obj.fadeIn(150, function() {
            view.css({ 'bottom': 0 })
        });
    }
}
// 清空
function removeProductList() {
    $('#product-list').remove();
    showAddgoods();
}
// 减少数量
function lessNum(obj) {
    var input = $(obj).siblings('input');
    var value = $(obj).siblings('input').val();
    value = parseInt(value) - 1;
    if (value == 0) {
        $(obj).closest('.g-row').fadeOut(function() {
            $(this).remove();
        });
    }
    input.val(value);
}
// 添加数量
function addNum(obj) {
    var input = $(obj).siblings('input');
    var value = $(obj).siblings('input').val();
    value = parseInt(value) + 1;
    input.val(value);
}

// 监听键盘弹出收起事件
var clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
$(window).on('resize', function (e) {
    var nowClientHeight = document.documentElement.clientHeight || document.body.clientHeight;
    if (clientHeight > nowClientHeight) {
        //键盘弹出的事件处理
        $('.login .bottom-img-box').hide();
    }
    else {
        //键盘收起的事件处理
        $('.login .bottom-img-box').show();
    } 
});