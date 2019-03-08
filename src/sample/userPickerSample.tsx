import * as React from "react";
import { Component } from "react";
import { AkIdentityPicker, AkForm, AkFormComponentProps, AkInput, AkUtil, AkRow, AkCol } from 'akmii-yeeoffice-common';
// import {AkEditor} from "akmii-yeeoffice-common";
import { AkFormulaExecutor, } from 'akmii-yeeoffice-crafts';
import { Form, Input, Col, Row} from "antd";


function mapPropsToFields(props) {
    let rs = AkUtil.mapPropsToFields(props.changedData);
    console.log("fields:", rs);
    return rs;
}

function onValuesChange(props, values) {
    props.onChange && props.onChange(values);
}

interface FormSampleProps extends AkFormComponentProps {
    changedData?: any;
    onChange?: (values: any) => void;
}
interface FormSampleStates {
}


export class FormSample extends Component<FormSampleProps, FormSampleStates> {

    constructor(props, context) {
        super(props, context);
        this.state = {}
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        console.log("refresh form");
        // return <div>test123</div>
        return <AkForm>
            <AkRow gutter={6}><AkCol span={5}>Test Change input1</AkCol><AkCol span={16}></AkCol></AkRow>
            <AkForm.Item label="User" labelCol={{ span: 5 }}
                wrapperCol={{ span: 16 }}>
                {getFieldDecorator(
                    'uids', {
                        initialValue: [{ ID: "865507330777862144", Name: "test1", Type: 1 }, {
                            ID: "841574715293306880",
                            Name: "test2",
                            Type: 1
                        }]
                    }
                )(<AkIdentityPicker multiple />)}
            </AkForm.Item>
            <AkForm.Item label="Input1" labelCol={{ span: 5 }}
                wrapperCol={{ span: 16 }}>
                {getFieldDecorator(
                    'input1', {
                        initialValue: "test"
                    }
                )(<AkInput />)}
            </AkForm.Item>
            <AkForm.Item label="Input2" labelCol={{ span: 5 }}
                wrapperCol={{ span: 16 }}>
                {getFieldDecorator(
                    'input2', {}
                )(<AkInput />)}
            </AkForm.Item>
        </AkForm>;
    }
}

const FormSampleForm = AkForm.create({ mapPropsToFields: mapPropsToFields, onValuesChange: onValuesChange })(FormSample);


interface UserPickerSampleProps {
    sliderValue: number;
}
interface UserPickerSampleStates {
    changedData?: any;
    formulas?: any;
    calculateResult?: any;
}


@Form.create()
export class FormSample2 extends Component<any, any> {

  constructor(props, context) {
    super(props, context);
    this.state = {}
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    // return <div>test123</div>
    return <Form>
      <Row gutter={6}><Col span={5}>Test Change input1</Col><Col span={16}></Col></Row>
      <Form.Item label="User" labelCol={{ span: 5 }}
        wrapperCol={{ span: 16 }}>
        {getFieldDecorator(
          'uids', {
            initialValue: "abc"
          }
        )(<Input />)}
      </Form.Item>
      <Form.Item label="Input1" labelCol={{ span: 5 }}
        wrapperCol={{ span: 16 }}>
        {getFieldDecorator(
          'input1', {
            initialValue: "test"
          }
        )(<Input />)}
      </Form.Item>
      <Form.Item label="Input2" labelCol={{ span: 5 }}
        wrapperCol={{ span: 16 }}>
        {getFieldDecorator(
          'input2', {}
        )(<Input />)}
      </Form.Item>
    </Form>;
  }
}


export class UserPickerSample extends Component<UserPickerSampleProps, UserPickerSampleStates> {
    constructor(props, context) {
        super(props, context);
        this.state = {}
    }

    onChange(values) {
        // console.log("value update:", values);
        // Object.keys(values).forEach(v => {
        //     values[v] = values[v] + ":test";
        // });
        // this.setState({ changedData: values });
    }

    onCalculate() {
        let rs = AkFormulaExecutor.execute(this.state.formulas, {});
        this.setState({ calculateResult: rs });
    }

    render() {
        const { changedData } = this.state;
        //952063554998112256  925188747677536257 925188747811753985
        //918007350433026048 920840907706732544
        //selectionRange={['952063554998112256', '925188744531808257', { ID: '918007350433026048', Type: 2 }, { ID: '920840907706732544', Type: 2 }]} 
        // return <div>
            
        //     <AkIdentityPicker maxSelection={2} multiple={true} identityTypes={[AkIdentityType.User, AkIdentityType.Organization]}/>

        // </div>
        // return <div>test</div>
        // return <FormSampleForm changedData={changedData} onChange={this.onChange.bind(this)}/>
        return <FormSample2 />
    }
} class UserPickerSampleStyle { }
