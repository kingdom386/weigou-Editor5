/**
 * Created by xiezhonghai on 2017/1/7 0007.
 * author xiezhonghai
 *  IOS页面的上下滑动
 * 上拉加载更多内容
 * 上拉图片的懒加载
 */
var MySwiper = '';
function load() {
    MySwiper = new Swiper('.swiper-container', {
        autoplay: 4500,
        autoplayDisableOnInteraction: false,
        loop: true,
        pagination: '.swiper-pagination'
    });
    //执行公共方法
    publicScroll();
}

