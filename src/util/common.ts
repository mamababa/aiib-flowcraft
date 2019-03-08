export class FlowcraftCommon {
    /**隐藏顶部工具栏 */
    static hiddenTB() {
        let top = document.getElementById("masterPageTop");
        let bottom = document.getElementsByClassName("placeholder-bottom")[1];
        if (top) {
            top.classList.add("hidden");
            document.getElementsByTagName("body")[0].setAttribute("style", "");
        }
        if (bottom) {
            bottom.classList.add("hidden");
        }
    }

    static hiddenAutoflex() {
        let content = document.getElementById("content");
        if (content) {
            content.classList.remove("content");
            content.classList.remove("container-fluid");
        }
    }

    static goBack() {
        if (!document.referrer) {
            window.location.href = window.location.pathname;
            return;
        }
        if (document.referrer.indexOf("_hash_=/todo/transfer") > 0) {
            window.location.href = window.location.pathname + "#/todo";
            return;
        }
        (window.history && window.history.length && window.history.length > 1) ? window.history.back() : window.location.href = window.location.pathname;
    }
    /**返回流程中心 首页 */
    static goWorkFlowIndex(){
        let rootPaht="/Home/workflow";
        let path=window.location.pathname;
        path=path.includes(rootPaht)?path:(path+rootPaht);
        window.location.href= path;
    }

    static newGuid() {
        var guid = "";
        for (var i = 1; i <= 32; i++) {
            var n = Math.floor(Math.random() * 16.0).toString(16);
            guid += n;
            if ((i === 8) || (i === 12) || (i === 16) || (i === 20))
                guid += "-";
        }
        return guid;
    }

    static xs = 480;
    static sm = 768;
    static md = 992;
    static lg = 1200;
    static xl = 1600;
    static minXS = window.innerWidth < 480;
    static minSM = window.innerWidth < 768;
    static minMD = window.innerWidth < 992;
    static minLG = window.innerWidth < 1200;
    static minXL = window.innerWidth < 1600;

    static getSiderWidth() {
        let width = window.innerWidth;
        if (width < this.sm) {
            return document.body.clientWidth - 2;
        } else {
            return 250;
        }
    }

    static noContentIcon = "data:image/png;base64,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"
}
