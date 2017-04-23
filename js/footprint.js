/**
 * Created by xiezhonghai on 2017/2/20.
 *
 * 我的足迹 脚本
 */

var Myscroll = '', flag = true,delFlag=false;
function footerprint() {
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
    //绑定上下滑动事件
    Myscroll.on('scrollEnd', function () {
        //上拉加载请求加载更多的后台数据 视情况需要添加
        //批量删除收藏纪录
        //TODO
        Myscroll.refresh();
        //滑屏结束执行图片懒加载
        ImgLazyLoad();
    });

    /*-----------------------万能分割线--------------------------*/

    $(".coll-state-edit").on('touchend', function () {
        if ($(this).hasClass("off")) {
            $(this).removeClass("off").html("完成");
            editState();
        } else {
            $(this).addClass("off").html("编辑");
            noeditState();
            //初始化所有样式
            initAll();
        }
    });

    function editState() {
        $(".ani-pane").addClass("active-coll-items");
        $(".coll-items-pro").addClass("active-coll-items");
    }

    function noeditState() {
        $(".ani-pane").removeClass("active-coll-items");
        $(".coll-items-pro").removeClass("active-coll-items");
    }

    /*对应的部分全选*/
    $(".main-radio").on('touchend', function () {
        if (!$(this).hasClass('radio-checked')) {
            $(this).addClass("radio-checked");
            $(".footerprint-items-box .coll-items-pro .items-radio", $(this).parents(".footprint-items-list")).addClass("radio-checked");
            //修改选中状态的值
            $(".footerprint-items-box .coll-items-pro .items-radio input[type^='radio']", $(this).parents(".footprint-items-list")).attr('checked', 'checked');
            flag = true;
        } else {
            $(this).removeClass("radio-checked");
            $(".footerprint-items-box .coll-items-pro .items-radio", $(this).parents(".footprint-items-list")).removeClass("radio-checked");
            //修改选中状态的值
            $(".footerprint-items-box .coll-items-pro .items-radio input[type^='radio']", $(this).parents(".footprint-items-list")).removeAttr('checked');
            flag = false;
        }

        FooterState();
    });

    /*判断某个模块 是否是全选状态*/
    $(".items-radio").on('touchend', function () {
        /*判断当前时候是选中状态*/
        if ($(this).hasClass("radio-checked")) {
            $(this).removeClass("radio-checked");
            //修改选中状态的值
            $("input[type^='radio']", this).removeAttr('checked');
            flag = false;
            FooterState();

        } else {
            $(this).addClass("radio-checked");
            //修改选中状态的值
            $("input[type^='radio']", this).attr('checked', 'checked');
            flag = true;
            FooterState();
        }

        //遍历该模块的相同标签
        $('.items-radio', $(this).parents(".footerprint-items-box")).each(function (i, t) {
            if ($(t).hasClass("radio-checked") && flag) {
                $(".main-radio", $(this).parents(".footprint-items-list")).addClass("radio-checked");
            } else {
                $(".main-radio", $(this).parents(".footprint-items-list")).removeClass("radio-checked");
                flag = false;
            }
        });


    });


    function FooterState(){
        $("input[type^='radio']").each(function(i,t){
            if($(t).is(':checked')){
                flag=true;
                //获取选中状态的值
                $(t).val();
            }
        });

        if(flag){
            $(".public-footer").css('display','block');
            $(".footer-btn-label").addClass("active-btn-label");
        }else{
            $(".public-footer").css('display','none');
            $(".footer-btn-label").removeClass("active-btn-label");
        }
    }

    function initAll() {
        $(".public-footer").css('display', 'none');
        $(".footer-btn-label").removeClass("active-btn-label");
        $(".main-radio").removeClass("radio-checked");
        $(".items-radio").removeClass("radio-checked");
        $(".items-radio input[type^='radio']").removeAttr('checked', 'checked');
    }

    /*-----------------------万能分割线  结束--------------------------*/
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