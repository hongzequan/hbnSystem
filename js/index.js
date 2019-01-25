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
    ModalHelper.afterOpen();
}

function closeModal() {
    var mondal = $('.modal');
    var mask = $('.modal-backdrop')
    mondal.hide().removeClass('fade in');
    mask.hide().removeClass('fade in');
    $('body').removeClass('no-scroll');
    ModalHelper.beforeClose();
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
        onSlideChangeEnd: function(swiper) {
            swiper.update(); //swiper更新
        }
    })
    var index = $(this).index();
    var imgArr = $(this).parent().find('img');
    for (var i = 0; i < imgArr.length; i++) {
        bigBannerSwiper.appendSlide('<div class="swiper-slide"><img src=' + $(imgArr[i]).attr('src') + '></div>')
    };
    bigBannerSwiper.slideTo(index, 0, false);
    $('.bigGallery').show();
})
$('.bigGallery').click(function() {
    $('.bigGallery').hide();
    bigBannerSwiper.removeAllSlides();
})

// banner配置
var bannerSwiper;
var bannerDefaults = {
    loop: true,
    autoplay: 5000,
    autoplayDisableOnInteraction: false,
    spaceBetween: 10,
    autoHeight: true, //高度随内容变化
}

function initBannerSwiper(type, source, cover) {
    if (type && $('.videoPlay').length > 0) {
        return;
    }
    if (type) {
        bannerSwiper = new Swiper('.banner .swiper-container', bannerDefaults);
    } else {
        if ($('.videoPlay').length > 0) {
            var options = {
                loop: false,
                autoplay: 100000,
                autoplayDisableOnInteraction: true,
                autoHeight: false,
                onInit: function(swiper) {
                    if ($('#player-con').length > 0) {
                        var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
                        if (userAgent.indexOf('Android') > -1) {
                            console.log(cover, source)
                            var img = "<img src=" + cover + "></img>";
                            $('#player-con').append(img);
                            $('#player-con').addClass('play')
                            $('#player-con').on('click', function() {
                                var html = "<div class='AndroidVideo'>"
                                html += "<div class='prism-player' id='player-con2'></div>"
                                html+="<div class='mask' style='display:block'></div>"
                                html += "</div>"
                                $('body').append(html);
                                initAliVideo('Android','player-con2',source,cover,swiper);
                            })
                            $('body').on('click','.AndroidVideo .mask',function(){
                                $('.AndroidVideo').fadeOut('400', function() {
                                    $('.AndroidVideo').remove();
                                });
                            })
                        } else {
                            initAliVideo('Ios','player-con',source,cover,swiper);
                        }

                    }
                }
            }
            $.extend(bannerDefaults, options);
            bannerSwiper = new Swiper('.banner .swiper-container', bannerDefaults);
        }
    }
}
initBannerSwiper(true);

function initAliVideo(u,id,source,cover,swiper) {
    var player = new Aliplayer({
        "id": id,
        "source": source,
        "width": "100%",
        "height": u=='Android'?'50%':'auto',
        "autoplay": true,
        "isLive": false,
        "cover": cover,
        "rePlay": false,
        "playsinline": true,
        "preload": true,
        "controlBarVisibility": "hover",
        "useH5Prism": true,
        "skinLayout": [{
                "name": "bigPlayButton",
                "align": "blabs",
                "x": 30,
                "y": 80
            },
            {
                "name": "H5Loading",
                "align": "cc"
            },
            {
                "name": "errorDisplay",
                "align": "tlabs",
                "x": 0,
                "y": 0
            },
            {
                "name": "infoDisplay"
            },
            {
                "name": "tooltip",
                "align": "blabs",
                "x": 0,
                "y": 56
            },
            {
                "name": "thumbnail"
            },
            {
                "name": "controlBar",
                "align": "blabs",
                "x": 0,
                "y": 0,
                "children": [{
                        "name": "progress",
                        "align": "blabs",
                        "x": 0,
                        "y": 44
                    },
                    {
                        "name": "playButton",
                        "align": "tl",
                        "x": 15,
                        "y": 12
                    },
                    {
                        "name": "timeDisplay",
                        "align": "tl",
                        "x": 10,
                        "y": 7
                    },
                    {
                        "name": "fullScreenButton",
                        "align": "tr",
                        "x": 10,
                        "y": 12
                    }
                ]
            }
        ]
    }, function(player) {
        // 当swiper加载完毕时触发
        var video = $('.banner .swiper-slide video'); //视频数组
        if (video.length > 0) { //当视频数组存在时
            var h = swiper.height;
            if (h) {
                for (var i = 0; i < video.length; i++) {
                    $(video[i]).parent().height(h);
                }
            } else {
                for (var i = 0; i < video.length; i++) {
                    $(video[i]).parent().height(300);
                }
            }

        }
    });
}



// 创建账户js
var productSwiper;
productSwiper = new Swiper('.productSwiper .swiper-container', {
    loop: true,
    spaceBetween: 10,
    slidesPerView: 3,
    slidesPerGroup: 3,
    pagination: '.productSwiper .swiper-pagination',
})

// 根据select选中值去显示权益
$('#j-equity').change(function() {
    //获取当前选中项，然后获取data值，这个值为权益显示的index;
    var index = $(this).find('option:selected').attr('data-equity');
    $('#equity .item').eq(index).show().siblings().hide();
})

$('#j-imgShow .j-img').click(function(event) {
    /* Act on the event */
    var src = $(this).attr('data-imgSrc');
    var img = "<img src='" + src + "'>";
    $('#j-mask-img .img-box').append(img);
    $('#j-mask-img').fadeIn('400');
    ModalHelper.afterOpen();
});

function hideMaskImg(obj) {
    $(obj).fadeOut('400', function() {
        $(obj).find('img').remove();
    });
    ModalHelper.beforeClose();
}
/**
 * ModalHelper helpers resolve the modal scrolling issue on mobile devices
 * https://github.com/twbs/bootstrap/issues/15852
 * requires document.scrollingElement polyfill https://github.com/yangg/scrolling-element
 */
var ModalHelper = (function(bodyCls) {
    var scrollTop;
    return {
        afterOpen: function() {
            scrollTop = document.scrollingElement.scrollTop;
            document.body.classList.add(bodyCls);
            document.body.style.top = -scrollTop + 'px';
        },
        beforeClose: function() {
            document.body.classList.remove(bodyCls);
            // scrollTop lost after set position:fixed, restore it back.
            document.scrollingElement.scrollTop = scrollTop;
        }
    };
})('no-scroll');