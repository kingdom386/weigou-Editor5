/**
 * Created by xiezhonghai on 2017/1/7 0007.
 * author xiezhonghai
 * date:20170107
 * 活动面的倒计时
 */

/*活动倒计时*/
var timer = '', MobileSet = "", startTime = endTime = nowTime = 0,
    TimeBetween =3600000,//1*60*60*1000 设定时间间隔1小时
    YearDateMonth = (new Date()).getFullYear() + "-" + ((new Date()).getMonth() + 1) + "-" + (new Date()).getDate() + " ",
    startTimeZS = YearDateMonth + '10:00:00.000',
    endTimeZS = YearDateMonth + "12:00:00.000",
    startTimeJJ = YearDateMonth + '14:00:00.000',
    endTimeJJ = YearDateMonth + "16:00:00.000";

//解决IOS 存在Date的兼容性问题
$(document).ready(function (e) {
    //判断当枪浏览器是否是IOS手机
    var u = navigator.userAgent;
    // MobileSet = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    MobileSet = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    if (!MobileSet) {
        //Android版本时间处理
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
    //时间片段逻辑
    timer = setInterval(function(){getTimeJudge();},1000);
});

function getTimeJudge(){
    //判断当前时间距离开始时间时候与设定时间间隔的关系
    nowTime = (new Date()).getTime();
    if((nowTime-startTimeZS)<=TimeBetween&&((nowTime-startTimeZS)>0)||(startTimeJJ-nowTime)<=TimeBetween&&((startTimeJJ-nowTime)>0)){
        var tmp = 0;
        //距离开始1小时开始倒计时
        $(".enter-btn").hide();
        $(".time-hour").show();
        $(".time-minute").show();
        $(".time-seconds").show();
        if((nowTime-startTimeZS)<=TimeBetween&&(nowTime-startTimeZS)>0){
            tmp = nowTime-startTimeZS
            getCountDown(tmp);
        }else if((startTimeJJ-nowTime)<=TimeBetween && (startTimeJJ-nowTime)>0){
            tmp =startTimeJJ-nowTime;
            getCountDown(tmp);
        }
    }else{
        //活动已经开始或是结束
        $(".enter-btn").show();
        $(".time-hour").hide();
        $(".time-minute").hide();
        $(".time-seconds").hide();
    }
}

//初始化显示屏数字
function getInit() {
    //初始化显示的数字
    $(".time-hour").html("01");
    $(".time-minute").html("00");
    $(".time-seconds").html("00");
}

//IOS版本 时间格式处理
function IOSFactory(FormatTime) {
    //2016-12-23 9:00:00.000 转换目标 2016,12,23,9,00,00.000
    var ary = FormatTime.split(" ");
    return (new Date(ary[0].split("-")[0], ary[0].split("-")[1] - 1, ary[0].split("-")[2], ary[1].split(":")[0], ary[1].split(":")[1], ary[1].split(":")[2])).getTime();
}

function getCountDown(tm){
    $(".time-hour").html((tm/1000/60/60)>=1?Math.floor((tm/1000/60/60)):'00' );
    $(".time-minute").html((tm/1000/60%60)>=10?Math.floor((tm/1000/60%60)):'0'+Math.floor((tm/1000/60%60)) );
    $(".time-seconds").html( (tm/1000%60%60)>10?Math.floor((tm/1000%60%60)):'0'+Math.floor(tm/1000%60%60) );
}