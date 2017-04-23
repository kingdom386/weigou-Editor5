/**
 * Created by xiezhonghai on 2017/1/10 0010.
 */
var Myscroll='';
function publicScroll(){
    //页面元素加载完后，最新IOS上下滑动包裹层
    Myscroll = new IScroll('#scroll-wrapper', {
        click:true,
        touchend:true,
        preventDefaultException: { tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT|A|SPAN)$/ },
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
        //滑屏结束执行图片懒加载
        ImgLazyLoad();
    });

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






