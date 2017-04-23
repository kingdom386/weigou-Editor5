/**
 * Created by xiezhonghai on 2017/2/10.
 * 我的收藏--商品 店铺
 */
var Myscroll = '', tabType = 1;//tabType 类型说明 1 商品  2 商铺
function collLoad() {
    //页面元素加载完后，最新IOS上下滑动包裹层
    Myscroll = new IScroll('#scroll-wrapper', {
        click: true,
        touchend: true,
        preventDefaultException: {tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT|A|SPAN)$/},
        deceleration: 0.0006,
        bindToWrapper: true,
        scrollbars: true,
        fadeScrollbars: true,
        shrinkScrollbars: 'scale'
    });

    //执行图片懒加载
    ImgLazyLoad();

    /*---------------------------------逻辑代码区------------------------------------------------*/

    //选项卡状态
    $(".coll-tab-btn").on('touchend', function () {
        $(this).addClass("active").siblings().removeClass("active");
        AllInit();
        if ($(this).hasClass("coll-pro")) {
            //显示对应的商品选项卡
            //初始化相关变量数据
            tabType = 1;
            $(".coll-state-pro").show();
            $(".coll-state-shop").hide();
            $(".coll-edit-pro").show();
            $(".coll-edit-shop").hide();
            $("#coll-pro").show();
            $("#coll-store").hide();

        } else {
            //显示对应的店铺选项卡
            tabType = 2;
            $(".coll-state-shop").show();
            $(".coll-state-pro").hide();
            $(".coll-edit-pro").hide();
            $(".coll-edit-shop").show();
            $("#coll-pro").hide();
            $("#coll-store").show();
        }

        variableInit();

    });

    var ajaxUrl = '', tabNode = null, tabRadioNode = null;

    function variableInit() {
        if (tabType == 1) {
            tabNode = $(".coll-edit-pro");
            tabRadioNode = $(".edit-radio-pro");
            ajaxUrl = '';//商品请求的url
        } else {
            tabNode = $(".coll-edit-shop");
            tabRadioNode = $(".edit-radio");
            ajaxUrl = '';//商铺请求的url
        }
    }

    //收藏店铺 - 编辑按钮状态
    $(".coll-edit-pro").on('touchend', func);
    $(".coll-edit-shop").on('touchend', func);

    function func() {
        if ($(this).html() == '编辑') {
            $(this).html("完成");
            if (tabType == 1) {
                $(".coll-items-pro").addClass("active-coll-items");
            } else {
                $(".coll-items").addClass("active-coll-items");
            }
        } else {
            if (tabType == 1) {
                $(".coll-items-pro").removeClass("active-coll-items");
                $(".edit-radio-pro").removeClass("radio-checked");
                $(".public-footer").css('display', 'none');
            } else {
                $(".coll-items").removeClass("active-coll-items");
                $(".edit-radio").removeClass("radio-checked");
                $(".public-footer").css('display', 'none');
            }
            $(this).html("编辑");
        }
    }

    function AllInit(){
        $(".coll-edit-pro").html("编辑");
        $(".coll-edit-shop").html("编辑");
        $(".coll-items-pro").removeClass("active-coll-items");
        $(".edit-radio-pro").removeClass("radio-checked");
        $(".coll-items").removeClass("active-coll-items");
        $(".edit-radio").removeClass("radio-checked");
        $(".public-footer").css('display', 'none');
    }

    //设置勾选项

    $(".edit-radio-pro").on('touchend', function (){
        //遍历勾选项是否有选中项
        $(".edit-radio-pro").each(function (i, t) {
            if (!$(t).hasClass("radio-checked")) {
                $(".public-footer").css('display', 'none');
            }
        });

        if (!$(this).hasClass("radio-checked")) {
            $(this).addClass("radio-checked");
            $(".public-footer").css('display', 'block');
            $(".footer-btn-label").addClass("active-btn-label");
            $('input[type^=radio]', this).attr('checked', 'checked');
        } else {
            $(this).removeClass("radio-checked");
            $(".footer-btn-label").removeClass("active-btn-label");
            $('input[type^=radio]', this).removeAttr('checked', 'checked');
        }
    });

    $(".edit-radio").on('touchend', function (){
        //遍历勾选项是否有选中项
        $(".edit-radio").each(function (i, t) {
            if (!$(t).hasClass("radio-checked")) {
                $(".public-footer").css('display', 'none');
            }
        });

        if (!$(this).hasClass("radio-checked")) {
            $(this).addClass("radio-checked");
            $(".public-footer").css('display', 'block');
            $(".footer-btn-label").addClass("active-btn-label");
            $('input[type^=radio]', this).attr('checked', 'checked');
        } else {
            $(this).removeClass("radio-checked");
            $(".footer-btn-label").removeClass("active-btn-label");
            $('input[type^=radio]', this).removeAttr('checked', 'checked');
        }
    });

    //绑定上下滑动事件
    Myscroll.on('scrollEnd', function () {
        //上拉加载请求加载更多的后台数据 视情况需要添加
        //批量删除收藏纪录
        //TODO
        Myscroll.refresh();
        //滑屏结束执行图片懒加载
        ImgLazyLoad();
    });

    /*---------------------------------逻辑代码结束-----------------------------------------------*/

    //图片懒加载处理
    function ImgLazyLoad() {
        $("img").each(function (i, t) {
            //含有懒加载属性就执行懒加载
            if ($(t).attr('lazyImg')) {
                //标签含有需要懒加载的图片 执行图片懒加载
                if ($(t).offset().top <= (Myscroll.wrapperHeight - Myscroll.y)) {
                    $(t).attr('src', $(t).attr('lazyImg'));
                }
            }
        });
    }
}