/**
 * Created by xiezhonghai on 2016/12/17.
 */

/*活动倒计时*/
var timer = '', MobileSet = "", startTime = endTime = nowTime = 0,
    YearDateMonth = (new Date()).getFullYear() + "-" + ((new Date()).getMonth() + 1) + "-" + (new Date()).getDate() + " ",
    startTimeZS = YearDateMonth + '10:02:00.000',
    endTimeZS = YearDateMonth + "11:06:00.000",
    startTimeJJ = YearDateMonth + '14:00:00.000',
    endTimeJJ = YearDateMonth + "16:00:00.000";

//解决IOS 存在Date的兼容性问题
$(document).ready(function (e) {
    //判断当枪浏览器是否是IOS手机
    var u = navigator.userAgent;
    // MobileSet = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    MobileSet = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    if (!MobileSet) {
        startTimeZS = (new Date(startTimeZS)).getTime();
        endTimeZS = (new Date(endTimeZS)).getTime();
        startTimeJJ = (new Date(startTimeJJ)).getTime();
        endTimeJJ = (new Date(endTimeJJ)).getTime();
    } else {
        startTimeZS = IOSFactory(startTimeZS);
        endTimeZS = IOSFactory(endTimeZS);
        startTimeJJ = IOSFactory(startTimeJJ);
        endTimeJJ = IOSFactory(endTimeJJ);
    }
    getInit();
    //活动开始时间
    getStart();

});
//初始化显示屏数字
function getInit() {
    //初始化显示的数字
    $("#h01").html(0);
    $("#h02").html(0);
    $("#m01").html(0);
    $("#m02").html(0);
    $("#s01").html(0);
    $("#s02").html(0);
}
//IOS版本 时间格式处理
function IOSFactory(FormatTime) {
    //2016-12-23 9:00:00.000 转换目标 2016,12,23,9,00,00.000
    var ary = FormatTime.split(" ");
    return (new Date(ary[0].split("-")[0], ary[0].split("-")[1] - 1, ary[0].split("-")[2], ary[1].split(":")[0], ary[1].split(":")[1], ary[1].split(":")[2])).getTime();
}

//计算距离开始倒计时
function getStart() {
    getTypeTime();
    loadContent();
    timer = setInterval(function () {
        //判断当前离活动开始倒计时
        rushState(startTime, endTime);
    }, 500);
}

function getTypeTime(){
    if (loadingCotentPane == 'readySale') {
        startTime = startTimeZS;
        endTime = endTimeZS;
    } else {
        startTime = startTimeJJ;
        endTime = endTimeJJ;
    }
}


//提取时间
function disPlayTime(TT) {
    var wH = TT / 60 / 60 % 24, wM = TT / 60 % 60, wS = TT % 60;
    if (wH >= 10) {
        $("#h01").html(Math.floor(wH / 10));
        $("#h02").html(Math.floor(wH % 10));
    } else {
        $("#h01").html(0);
        $("#h02").html(Math.floor(wH));
    }

    if (wM >= 10) {
        $("#m01").html(Math.floor(wM / 10));
        $("#m02").html(Math.floor(wM % 10));
    } else {
        $("#m01").html(0);
        $("#m02").html(Math.floor(wM));
    }

    if (wS >= 10) {
        $("#s01").html(Math.floor(wS / 10));
        $("#s02").html(Math.floor(wS % 10));
    } else {
        $("#s01").html(0);
        $("#s02").html(Math.floor(wS));
    }
}

//抢购状态  未开始:1  已开始:2 已结束:3
function rushState() {
    nowTime = (new Date()).getTime();
    var stt = "."+loadingCotentPane;
    //限时抢未开始 1
    if (nowTime < startTime) {
        //清除样式 控制按钮显示
        $(".jjkq").css('display','block');
        $(".msq").hide();
        $(".yjs").hide();
        $(".jjtime").show();
        $('.jstime').hide();
        disPlayTime(Math.floor((startTime - nowTime) / 1000));
    }

    //限时抢已开始 2
    if (nowTime >= startTime && nowTime <= endTime) {
        //清除样式 控制按钮显示
        $(".jjkq").hide();
        $(".msq").css('display','block');
        $(".yjs").hide();
        $(".jjtime").hide();
        $('.jstime').show();
        disPlayTime(Math.floor((endTime - nowTime) / 1000));
    }

    //活动已结束 3
    if (nowTime > endTime) {
        //清除样式 控制按钮显示
        $(".jjkq").hide();
        $(".msq").hide();
        $(".yjs").css('display','block');

        $(".jjtime").hide();
        $('.jstime').show();

        //初始化显示屏
        getInit();
        clearInterval(timer);
    }
}

//============================================================             万能分割线             ==================================================================================\\

//后期封装必须的初始化变量
var wrapperNode = $(".wg-wrapper-withNav"), contentNode = $(".wg-content-boxWithNav"), listBox = $("#readySale"), willListBox = $("#willSale"), loadingCotentPane = "readySale", timersOut = timers = "", flag = true, st = ed = idx = scrollLen = 0;
//临时数组存储数据
var ary = [
    ['', ''],
    ['', '']
];

/*选项卡时间 临时结构 后期不封装 代码后期需要优化*/
$(".wg-sub-nav a").on('touchend', function () {
    $(this).addClass("active").siblings().removeClass("active");
    switch ($(this).index()) {
        case 0 :
        {
            listBox.empty();
            loadingCotentPane = 'readySale';
            listBox.show();
            willListBox.hide();
            if (ary[0][0].length == 0) {
                getStart();
            } else {
                listBox.html(ary[0][0]);
                window.scrollTo(0, ary[0][1]);
                getInit();
                getTypeTime();
                clearInterval(timer);
                timer = setInterval(function () {
                    //判断当前离活动开始倒计时
                    rushState(startTime, endTime);
                }, 500);
                setTimeout(function () {
                    lazyLoadImg(ary[0][1])
                }, 400);
            }
            break;
        }
        case 1 :
        {
            willListBox.empty();
            loadingCotentPane = 'willSale';
            listBox.hide();
            willListBox.show();
            if (ary[1][0].length == 0) {
                getStart();
            } else {
                willListBox.html(ary[1][0]);
                window.scrollTo(0, ary[1][1]);
                getInit();
                getTypeTime();
                clearInterval(timer);
                timer = setInterval(function () {
                    //判断当前离活动开始倒计时
                    rushState(startTime, endTime);
                }, 500);
                setTimeout(function () {
                    lazyLoadImg(ary[1][1])
                }, 400);
            }
            break;
        }
    }
});


function loadContent() {
    if (Math.ceil(contentNode.height() <= $(window).height())) {
        //请求后台加载列表数据
        loadItem(loadingCotentPane);
    }
}

//异步请求后台数据
function loadItem(contentType) {
    var str = "";
    //准时开抢
    $.ajax({
        type: "post",
        url: "",
        async: "true",
        success: function (data) {
            /*便利返回的数据*/
            $(data).each(function (it, id) {

            });
            /*添加节点临时数据*/
            for (var jj = 0; jj < 30; jj++) {
                str += "<div class='wg-sale-items " + contentType + "'>" +
                    "<span class='wg-sale-item-img'><img src='img/222x222.jpg' lazyImg='img/0022.png' class='wg-img-responsive' /></span>" +
                    "<div class='wg-sale-item-info'>" +
                    "<p class='info-name'>包邮小米静音空气净化器2家用卧室智能杀菌除甲醛雾霾粉尘PM2.5包邮小米静音空气净化器2家用卧室智能杀菌</p>" +
                    " <p class='info-price'>" +
                    "<span class='info-p-now p-left'><em>¥</em>4566.55</span>" +
                    "<span class='info-p-orign p-left'><em>¥</em>4566.55</span>" +
                    "<span class='item-btn'>"
                if (contentType == "readySale") {
                    str += btnstate();
                } else {
                    str += btnstate();
                }
            }
            if (contentType == "readySale") {
                ary[0][0] = str;
                listBox.append(str);
            } else {
                ary[1][0] = str;
                willListBox.append(str);
            }

            rushState();

            setTimeout(function () {
                lazyLoadImg()
            }, 400);
            flag = true;
        },
        error: function (msg) {
            /*返回错误信息*/
            return false;
        }
    });

}

function btnstate() {
    var strs = '';
    //分别添加三种状态按钮
    strs +="<a href='' class='wg-btn-default msq'>马上抢</a>" +
        "<a href='javascript:void(0);' class='wg-btn-default jjkq'>即将开抢</a>" +
        "<a href='javascript:void(0);' class='wg-btn-default jjkq yjs'>已结束</a>" +
        "</span></p></div></div>"
    return strs;
}


//图片懒加载处理
function lazyLoadImg(stp) {
    //遍历节点 获取每个节点距离浏览器顶部的高度
    var nodeStr = '.' + loadingCotentPane, nodeLen = $(nodeStr).length, tmp = 0;
    $(nodeStr).each(function (i, t) {
        if (typeof (stp) === "undefined") {
            tmp = 0;
        } else {
            tmp = stp;
        }

        //根据滚动条位置显示对应的产品图片
        if ($(this).offset().top <= ($(window).height() + tmp)) {
            if (i != idx || i == 0) {
                //已经加载的图片就不再加载
                $('.wg-sale-item-img img', this).attr('src', $('.wg-sale-item-img img', this).attr("lazyImg"));
            }
        }

    });
}

//监听滚动条
wrapperNode.on('touchstart', touchST);
wrapperNode.on('touchend', touchED);

function touchST(ev) {
    st = ev.changedTouches[0].clientY;
    scrollLen = $(window).height() - wrapperNode.height();
    /*计算滚动条长度*/
}
//触屏结束 出发事件
function touchED(ef) {
    //初始化定时器防止多个线程并发
    clearTimeout(timersOut);
    //清除定时器
    clearInterval(timers);
    //控制图片懒加载显示
    timers = setInterval(function () {
        var lz = scrollTops();
        lazyLoadImg(lz);
        /*记录滚动条位置*/
        if (loadingCotentPane == "readySale") {
            ary[0][1] = lz;
        } else {
            ary[1][1] = lz;
        }
    }, 300);
    //内存回收 防止消耗过度性能
    setTimeout(function () {
        clearInterval(timers);
    }, 4000);
    timersOut = setTimeout(function () {
        lazyLoadImg(scrollTops());
        //加载内容
        if (scrollTops() >= -scrollLen - 150 && flag) {
            //上拉加载
            var bl = loadItem(loadingCotentPane);
            //记载状态栏
            $(".loadingState").html('<div><i class="icon-spinner icon-spin"></i></div>');
            //加载不成功过给出提示
            if (!bl) {
                $(".loadingState").html('<div>加载君已经很努力了，似乎网络出了点问题 ！</div>');
            }
            //防止重复加载
            flag = false;
        }
    }, 500);
    //清零
    ed = 0;
}

//返回滚动条高度
function scrollTops() {
    //返回当前滚动条位置
    return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
}

