// dom loaded 或者 是 用户执行检测

class CssMonitor {
    constructor(select, type, defLeft, defTop, defAreaLeft, defAreaTop) {
        console.log(10)
        this.count = 7;
        this.getEle(select, type);
        this.defLeft = defLeft;
        this.defTop = defTop;
        this.defAreaLeft = defAreaLeft;
        this.defAreaTop = defAreaTop;
    }

    getEle(select, type) {
        this.select = select;
        this.selectType = type;
        if(type == 'id') {
            this.ele = document.getElementById(select);
        } else if(type == 'class') {
            this.ele = document.getElementsByClassName(select)[0];
        }

    }

    setBusinessInfo() {
        var _this = this;
        if(!window.xlog) return;

        try {
            if(!xlog.businessInfo) {
                xlog.setBusinessInfo({
                    channel: "promotion",
                    pageType: "promotion_secondgiftbag_java",
                    cardno: TJObject && TJObject.ecrd || '',
                    aid: _this.paramsUrls(location.href).activityid,
                    aname: document.title
                });
            }
        }
        catch(e){
            console.log(e)
        }

    }

    startMonitor() {
        var _this = this;
        if(this.byLiveEle()) {
            console.log('通过元素存在检测， 开始下一个检测。。。')
        } else {
            this.startLunXun(function () {


                xlog.sendDiy('css', {
                    'type': 'error',
                    'info': '关键元素不存在'
                });
            });

            console.log(this.select + '的元素不存在' +  this.selectType);
            return;
        }

        if(this.byLiveStyle()) {
            console.log('样式检测存在通过。。。')
        } else {
            console.log('样式检测存不同通过， 可能引入样式表失败');
            this.startLunXun(function () {

                xlog.sendDiy('css', {
                    'type': 'error',
                    'info': '没有引入样式表'
                });
            });
            return;
        }

        if(this.byFeature()) {
            console.log('具体特征检测通过。。。 样式检测完成')
        } else {
            this.startLunXun(function () {
                xlog.sendDiy('css', {
                    'type': 'error',
                    'info': '特征检测失败...'
                });
            });

            console.log('特征检测失败...');
        }

    }

    startLunXun(fn) {
        this.count--;
        var _this = this;
        if(!this.count) return;
        if(window.xlog) {
            fn();
            return;
        } else {
            setTimeout(function () {
                _this.startLunXun(fn);
            }, 1000)
        }
    }

    byLiveEle() {
        if(this.ele && this.ele.offsetHeight) return true;
    }

    byLiveStyle () {
        // 通用特征检测
        var colect = getComputedStyle(document.body);
        if(colect.left == '0px' && colect.top == '0px' &&  colect.right == '0px' && colect.bottom == '0px' && colect.position == 'absolute') {
            return true;
        }
    };

    byFeature() {
        var left = this.getElementLeft(this.ele);
        var top = this.getElementTop(this.ele);
        var vW = this.getViewport();
        var w = this.ele.offsetWidth;
        var msg = '';

        if(Math.abs(this.defLeft - left) < this.defAreaLeft) {
            console.log('左侧值小于误差值');

            if(Math.abs(this.defTop - top) < this.defAreaTop) {
                console.log('顶部值小于误差');
                return true;
            } else {
                console.log('顶部值不小于误差');
            }
        } else {
            console.log('左侧值不小于误差值');
        }
    };

    getViewport(){
        if (document.compatMode == "BackCompat"){
            return {
                width: document.body.clientWidth,
                height: document.body.clientHeight
            }
        } else {
            return {
                width: document.documentElement.clientWidth,
                height: document.documentElement.clientHeight
            }
        }
    }

    getPagearea(){
        if (document.compatMode == "BackCompat"){
            return {
                width: document.body.scrollWidth,
                height: document.body.scrollHeight
            }
        } else {
            return {
                width: document.documentElement.scrollWidth,
                height: document.documentElement.scrollHeight
            }
        }
    }

    getElementLeft(element){
        var actualLeft = element.offsetLeft;
        var current = element.offsetParent;

        while (current !== null){
            actualLeft += current.offsetLeft;
            current = current.offsetParent;
        }

        return actualLeft;
    }

    getElementTop(element){
        var actualTop = element.offsetTop;
        var current = element.offsetParent;

        while (current !== null){
            actualTop += current.offsetTop;
            current = current.offsetParent;
        }

        return actualTop;
    }

    paramsUrls(url){
        var obj={},arr;
        var url=(url.toLowerCase()).split('?')[1];

        if(url){
            arr=url.split('&');
            for(var i = 0,len = arr.length; i<len;i++){
                var objarr = arr[i].split('=');
                obj[objarr[0]] = decodeURIComponent(objarr[1]);

            }
            return obj;
        }else{
            return false
        }
    }
}

window.CssMonitor = CssMonitor;

$('#app').text('hello ');

$.ajax({
    url: 'c.json',
    type: 'get',
    dataType: 'json',
    data: {},
    success() {},
    error(){
        console.log(1)
        console.log(1)
    },
    complete() {}
});

/*
window.addEventListener("load", function () {
    window.cssMonitory = new CssMonitor('topone', 'class', 38, 158, 10, 50);
    cssMonitory.startMonitor();


    try {
        if(slark) {
            slark.get('index').on('beforehide', function () {
                setTimeout(function () {
                    if(slark.getActiveId() == 'list') {
                        window.cssMonitory = new CssMonitor('toUse', 'id', 27, 415, 6, 57);
                        cssMonitory.startMonitor();
                    }
                }, 3000)
            });
        }
    } catch (e) {

    }


}, false);*/
