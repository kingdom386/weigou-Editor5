/**
 * Created by xiezhonghai on 2017/3/2.
 */
function DOMLoading(){

    if (window.document.readystate) {
        if (window.document.readystate == 'complete') {//IE
            //支持当前属性
            layerState();
        } else {
            layerState();
        }

    } else {
        document.addEventListener('DOMContentLoaded',layerState(),false);
    }
}

function layerState() {
    setTimeout(function () { $(".loading-msg").css('display', 'none'); }, 1000);
}

