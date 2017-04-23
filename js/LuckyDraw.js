/**
 * Created by xiezhonghai on 2017/1/11 0011.
 */
//执行跑马灯效果抽奖
//自定义中间概率参数接口
var gl1 = gl2 = gl3 = gl4 = gl5 = gl6 = gl7 = gl8 = 0;
//获取奖池的个数
var drawLen = $('.lucky-draw').length;
//奖品数组 存储奖品信息
var ary = new Array(drawLen);
ary = ['苹果7P', '宝马轿车', '抵用券', '黑枸杞', '猕猴桃', '柿饼', '土鸡蛋', '谢谢参与'];
//定义跑马灯的最小圈数和最大圈数 dIndx 奖品索引
var Dtimers = '', minCircle = maxCircle = speed = dIndx = 0;
var temp = (Math.random() * 100).toFixed(2);
//随便产品一个奖品索引
var drawIndx = 0,flags=true;
$(".lucky-btn").on('touchend', function () {

    if(flags){
        flags=false;
        minCircle = 1;
        maxCircle = 7;
        speed = 700;
        dIndx = 0;
        //drawIndx = Math.floor(Math.random()*8);
        //模拟奖品 苹果7P  宝马轿车  抵用券 黑枸杞   猕猴桃    柿饼     土鸡蛋  谢谢参与
        gl1 = 0.1;
        gl2 = 0.01;
        gl3 = 13.39;
        gl4 = 8.5;
        gl5 = 7;
        gl6 = 12;
        gl7 = 24;
        gl8 = 33;

        temp = (Math.random() * 100).toFixed(2);
        //检测设置的概率时候有问题 若总和为100 表示概率设置正确
        //console.log(temp + ",");
        //微币相关判断

        getDrawIndex();
        run();
    }
});

function getDrawIndex(){
    //产生中奖概率区域
    if (temp >= 0 && temp <= gl1) {
        //奖品在抽奖面板中的区域[0-7] 例如在面板中的第一个 drawIndx=0
        drawIndx = 0;

    }
    if (temp > gl1 && temp <= (gl1 + gl2)) {
        //奖品在抽奖面板中的区域
        drawIndx = 1;
    }

    if (temp <= (gl1 + gl2 + gl3) && temp > (gl1 + gl2)) {
        //奖品在抽奖面板中的区域
        drawIndx = 2;
    }

    if (temp > (gl1 + gl2 + gl3) && temp <= (gl1 + gl2 + gl3 + gl4)) {
        //奖品在抽奖面板中的区域
        drawIndx = 3;
    }

    if (temp <= (gl1 + gl2 + gl3 + gl4 + gl5) && temp > (gl1 + gl2 + gl3 + gl4)) {
        //奖品在抽奖面板中的区域
        drawIndx = 4;
    }

    if (temp > (gl1 + gl2 + gl3 + gl4 + gl5) && temp <= (gl1 + gl2 + gl3 + gl4 + gl5 + gl6)) {
        //奖品在抽奖面板中的区域
        drawIndx = 5;
    }

    if (temp <= (gl1 + gl2 + gl3 + gl4 + gl5 + gl6 + gl7) && temp > (gl1 + gl2 + gl3 + gl4 + gl5 + gl6)) {
        //奖品在抽奖面板中的区域
        drawIndx = 6;
    }

    if (temp > (gl1 + gl2 + gl3 + gl4 + gl5 + gl6 + gl7) && temp > (gl1 + gl2 + gl3 + gl4 + gl5 + gl6 + gl7 + gl8)) {
        //奖品在抽奖面板中的区域
        drawIndx = 7;
    }
}

function run() {

    if (minCircle == maxCircle) {
        window.clearInterval(Dtimers);
        speed += 100;
        Dtimers = setInterval(run, speed);
    }

    if (minCircle == 1) {
        window.clearInterval(Dtimers);
        speed -= 80;
        Dtimers = setInterval(run, speed);
    }

    if ((dIndx + 1) % 8 == 0) {
        minCircle++;
    }

    if (dIndx > drawLen - 1) {
        dIndx = 0;
    }

    $(".lucky-draw").removeClass("hover");
    $(".lucky-draw").eq(dIndx).addClass('hover');

    dIndx++;
    if ((minCircle == maxCircle) && ((dIndx - 1) % 8) == drawIndx) {
        ///清除setInterval
        setTimeout(function(){ flags=true;},1000);
        window.clearInterval(Dtimers);
        //遮罩层 显示抽中的奖品
    }

}
