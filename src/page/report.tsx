import * as React from "react";
import { Component } from "react";
import { withRouter, Link } from "react-router";
import { MainContent } from "./components/maincontent";
import {
    IntlProps,
    RouterProps,
    AkRow,
    AkCol,
    AkNotification,
    AkGlobal,
    AkSpin,
    AkNoContent
} from "akmii-yeeoffice-common";
import { injectIntl } from "react-intl";
import { ReportPageLocale, CommonLocationLocale } from "../locales/localeid";
import { ReportAPI } from "../api/report";
import { PathConfig } from "../config/pathconfig";
import { AkTooltip } from "akmii-yeeoffice-common/lib/components/controls/ak-tooltip";

interface ReportPageProps extends RouterProps,
    IntlProps { }
interface ReportPageStates {
    loading?: boolean;
    datalist?: ReportConfigModel[];
}
/** 普通用户流程报表 */
class ReportPage extends Component<ReportPageProps,
    ReportPageStates> {

    constructor(props, context) {
        super(props, context);
        this.state = {
            datalist: []
        }
    }

    componentDidMount() {
        this.load();
    }

    load() {
        const { formatMessage } = AkGlobal.intl;
        this.setState({ loading: true });
        ReportAPI
            .getAllReport({})
            .then(data => {
                if (data.Status === 0) {
                    this.setState({ loading: false, datalist: data.Data });
                } else {
                    AkNotification.warning({
                        message: formatMessage({ id: CommonLocationLocale.Tip }),
                        description: data.Message // formatMessage({ id: CommonLocationLocale.GetInfoError })
                    });
                    this.setState({ loading: false });
                }
            })
    }

    render() {
        const { datalist } = this.state;
        let content = <AkRow
            align="middle"
            type="flex"
            justify="start"
            style={{
                marginTop: 15
            }}>
            {datalist.map((entry, index) => {
                return <AkCol xs={24} sm={12} lg={6} key={index} className="ak-zwk-report-div-block">
                    <Link to={{
                        pathname: PathConfig.GeneralReportPage,
                        query: {
                            reportID: entry.ReportID,
                            defKey: entry.ProcDefKey,
                            title: (entry.Name)
                        }
                    }}>
                        <div className="ak-zwk-report-divblock">
                            <div className="img-box">
                                <img
                                    className="default-report-Icon"
                                    src={entry.IconUrl.startsWith("data")
                                        ? entry.IconUrl
                                        : `${process.env.IconOSS}${entry.IconUrl}`} /></div>
                            <AkTooltip title={entry.Name} overlay={entry.Name + ""}>
                                <h4 className="title">{entry.Name}</h4>
                            </AkTooltip>
                            <AkTooltip title={entry.Description} overlay={entry.Description + ""}>
                                <p className="text">
                                    {entry.Description}
                                </p>
                            </AkTooltip>
                        </div>
                    </Link>
                </AkCol>
            })}
        </AkRow>
        return <MainContent Header={ReportPageLocale.HomeTitle}>
            <AkSpin spinning={this.state.loading}>
                {datalist.length > 0 ? content : <AkNoContent loading={this.state.loading}></AkNoContent>}
            </AkSpin>
        </MainContent>
    }
}
class ReportPageStyle { }

export default injectIntl(withRouter(ReportPage))
