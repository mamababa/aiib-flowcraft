import * as React from 'react';
import { AkMetadataSelect, AkSelect, MetadataAPI, FormHelper, AkMetadataLabel, AkColProps } from 'akmii-yeeoffice-common';
import { AIIBWorkflowHelper } from '../../../page/aiib/index';
import { AkRow, AkForm } from 'akmii-yeeoffice-common/lib';
import { AiibCommonFun } from '../index';
import { AIIBFormMeta } from '../control/aiib-form-meta';
import { AkSelectValue } from 'akmii-yeeoffice-common/lib/components/controls/ak-select';
export interface AiibFormSectorState {
    subSectorOptions?: any;
    sector?: string;
}

export interface AiibFormSectorProps {
    disabled?: boolean;
    sector?: string;
    form?: any;
    subSector?: string[] | string;
    labelLayout?: AkColProps;
    controlLayout?: AkColProps;
    isSearch?: boolean;
}
@AkForm.create()
export class AiibFormSector extends React.Component<AiibFormSectorProps, AiibFormSectorState>{

    static defaultProps: AiibFormSectorProps = {
        labelLayout: FormHelper.colLabelLayout,
        controlLayout: FormHelper.colControlLayout,
        isSearch: false
    }

    constructor(props, context) {
        super(props, context);
        this.state = {
            subSectorOptions: [],
            sector: props.sector,
        };
    }

    componentWillReceiveProps(nextProps: AiibFormSectorProps) {

        if ("sector" in nextProps && nextProps.sector !== this.props.sector) {
            this.setState({ sector: nextProps.sector });
        }
        if ("disabled" in nextProps && nextProps.disabled !== this.props.disabled) {
            this.loadSubSector(nextProps.sector);
            setTimeout(() => {
                this.props.form.setFieldsValue({
                    Sector: nextProps.sector,
                    Subsector: nextProps.subSector
                });
            });
        }
    }

    componentDidMount() {
        if (this.state.sector) {
            this.loadSubSector(this.state.sector);
        }
    }

    loadSubSector(id) {
        if (!id) return;
        const sectorInfo = AiibCommonFun.getlocalStorageSectorCategory();
        // const allSubSector =  MetadataAPI.get({ categoryID: sectorInfo.CategoryID, parentID: id });
        MetadataAPI.get({ categoryID: sectorInfo.CategoryID, parentID: id }).then((d) => {
            this.setState({ subSectorOptions: d.Data }, () => {
                let SubsectorVal = this.props.form.getFieldValue("Subsector");
                if (SubsectorVal === null) {   // id闪现
                    let arr;
                    if (typeof this.props.subSector === "string") {
                        if (this.props.subSector.startsWith("[")) {
                            arr = JSON.parse(this.props.subSector);
                        } else {
                            arr = [];
                        }

                    } else {
                        arr = this.props.subSector;
                    }
                    this.props.form.setFieldsValue({ Subsector: arr });
                } else if (JSON.stringify(SubsectorVal) === "[]") {
                    this.props.form.setFieldsValue({ Subsector: [] });
                }
            });
        })

    }

    onSectorChange(id: string, Subsector?: string) {
        const { sector } = this.state;
        const { subSector } = this.props;
        let arr;
        if (subSector && typeof subSector === "string") {
            arr = JSON.parse(subSector);
        } else {
            arr = subSector;
        }
        if (id !== "") {
            if (sector && id === sector) {
                // this.props.form.setFieldsValue({
                //     Subsector: []
                // });
            } else {
                this.props.form.setFieldsValue({
                    Subsector: []
                });
            }
            this.loadSubSector(id);
        }

    }
    render() {
        const { props, props: { disabled, subSector, isSearch }, state: { subSectorOptions, sector } } = this;
        const subSectorOption =
            subSectorOptions &&
            subSectorOptions.map((item) => {
                return (
                    <AkSelect.Option value={item.ID} key={item.ID}>
                        {item.Name}
                    </AkSelect.Option>
                );
            });
        let subSectorID;
        if (disabled && sector && typeof (subSector) !== "string") {
            subSectorID = subSector.map((item, index) => {
                return <div style={{ display: "inline-block", marginRight: "5px" }} key={index}><AkMetadataLabel parentID={sector} categoryID="983283246664392704" optionID={item} /></div>;
            });
        }
        return <AkRow  {...FormHelper.rowLayout}>
            {disabled && sector ? AIIBWorkflowHelper.renderApprovalItem(props, "Sector", <AkMetadataLabel parentCode="Sector" categoryCode="Sector" optionID={sector} />) : AIIBWorkflowHelper.renderFormItem(
                props,
                'Sector',
                'Sector',
                <AkMetadataSelect
                    disabled={disabled}
                    parentCode="Sector"
                    categoryCode="Sector"
                    onChange={(id, code, name, metadata) => {
                        this.onSectorChange(id);
                    }}
                />,
                isSearch ? false : true,
                null,
                this.props.labelLayout,
                this.props.controlLayout,
            )}

            {disabled && subSector ? AIIBWorkflowHelper.renderApprovalItem(props, "Subsector", subSectorID) : AIIBWorkflowHelper.renderFormItem(
                props,
                'Subsector',
                'Subsector',
                <AIIBFormMeta
                    allowClear={true}
                    mode={"multiple"}
                    className="aiib-form-data1"
                // defaultValue={[this.props.form.getFieldValue("Subsector")]}
                // value={[this.props.form.getFieldValue("Subsector")]}
                >
                    {subSectorOption}
                </AIIBFormMeta>,
                false,
                null,
                this.props.labelLayout,
                this.props.controlLayout,
            )}
        </AkRow>;

    }
}
