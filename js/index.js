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
    $('html,body').addClass('no-scroll')
}

function closeModal() {
    var mondal = $('.modal');
    var mask = $('.modal-backdrop')
    mondal.hide().removeClass('fade in');
    mask.hide().removeClass('fade in');
    $('html,body').removeClass('no-scroll')
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
        $(obj).closest('.x-row').fadeOut(function() {
            $(this).remove();
        });
    }
    input.val(value);
}

function lessNum2(obj) {
    var input = $(obj).siblings('input');
    var value = $(obj).siblings('input').val();
    if (value == 0) {
        $(obj).closest('.x-row').fadeOut(function() {
            $(this).remove();
        });
        return false;
    }
    value = parseInt(value) - 1;
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
$(window).on('resize', function(e) {
    var nowClientHeight = document.documentElement.clientHeight || document.body.clientHeight;
    if (clientHeight > nowClientHeight) {
        //键盘弹出的事件处理
        $('.login .bottom-img-box').hide();
        $('.joinRegister .submit-box').hide();
    } else {
        //键盘收起的事件处理
        $('.login .bottom-img-box').show();
        $('.joinRegister .submit-box').show();
    }
});


var bigBannerSwiper;
$('.sharePage .img-info img').click(function(e) {
    bigBannerSwiper = new Swiper('.big-banner-swiper', {
            spaceBetween: 15,
            observer: true,
            observerParents: true,
            pagination: '.bigGallery .swiper-pagination',
            paginationType: 'fraction',
            onSlideChangeEnd: function(swiper){ 
                swiper.update(); //swiper更新
            }  
        })
    var index = $(this).index();
    var imgArr=$(this).parent().find('img');
    for (var i=0;i<imgArr.length;i++) {
        bigBannerSwiper.appendSlide('<div class="swiper-slide"><img src='+$(imgArr[i]).attr('src')+'></div>')
    };
    bigBannerSwiper.slideTo(index, 0, false);
    $('.bigGallery').show();
})
$('.bigGallery').click(function() {
    $('.bigGallery').hide();
    bigBannerSwiper.removeAllSlides();
})

var bannerSwiper;
bannerSwiper = new Swiper('.banner .swiper-container', {
    loop:true,
    autoplay : 5000,
    autoplayDisableOnInteraction : false,
    spaceBetween: 10,
})


// 创建账户js
var productSwiper;
productSwiper = new Swiper('.productSwiper .swiper-container', {
    loop:true,
    spaceBetween: 10,
    slidesPerView : 3,
    slidesPerGroup : 3,
    pagination: '.productSwiper .swiper-pagination',
})

// 根据select选中值去显示权益
$('#j-equity').change(function(){
    //获取当前选中项，然后获取data值，这个值为权益显示的index;
    var index=$(this).find('option:selected').attr('data-equity');
    $('#equity .item').eq(index).show().siblings().hide();
})

$('#j-imgShow .j-img').click(function(event) {
    /* Act on the event */
    var src=$(this).attr('data-imgSrc');
    var img="<img src='"+src+"'>";
    $('#j-mask-img .img-box').append(img);
    $('#j-mask-img').fadeIn('400');
        $('html,body').addClass('no-scroll')
    
});

function hideMaskImg(obj){
    $(obj).fadeOut('400', function() {
        $(obj).find('img').remove();
    });
    $('html,body').removeClass('no-scroll')

}


