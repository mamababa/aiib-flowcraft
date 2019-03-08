import * as React from "react";
import { render } from "react-dom";
import { AppBase, AppKeys} from "akmii-yeeoffice-common";
import { craftSaga } from "akmii-yeeoffice-crafts";
import { router } from "./config/router";
import { reducers } from "./reducers/index";
import rootSaga from "./sagas/index";
// import { FlowChartPage } from "./page/index";

// require.ensure([], () => {
require("./themes/flowcraft.less");
require("./themes/aiib-workflow.less");
// }, "default.css");
// AkFormHistoryLog.loadflowchart = (instID, defResID) => <FlowChartPage instID={instID} defResID={defResID} />;

// fix firefox drag will open a tab in background bug
document.body.ondrop = function (event) {
    event.preventDefault();
    event.stopPropagation();
};

//do not load masterpage in local
render(
    <AppBase reducers={reducers}
        onSagaInit={saga => {
            saga.run(rootSaga);
            saga.run(craftSaga);
        }}
        appKey={AppKeys.Flowcraft}
        cdnUrl={`${process.env.CDN}`}
        requireMasterpage={!process.env.RemoveMasterPage}
        onLoaded={(appLocale, theme) => {
            return new Promise((resolve, reject) => {
                switch (appLocale.locale) {
                    case "zh":
                        require.ensure([], () => {
                            resolve(Object.assign({},
                                require("akmii-yeeoffice-crafts/lib/locales/zh.json"),
                                require("./locales/zh.json")
                            ));
                        }, "zh.json");
                        break;
                    default:
                        require.ensure([], () => {
                            resolve(Object.assign({},
                                require("akmii-yeeoffice-crafts/lib/locales/en.json"),
                                require("./locales/en.json")
                            ));
                        }, "en.json");
                        break;
                }
            });
        }}>{router}</AppBase>, document.getElementById("app_content"));
