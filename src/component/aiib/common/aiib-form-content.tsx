import * as React from "react";
import { AkIcon } from 'akmii-yeeoffice-common';

export interface AiibFormContentProps {
    title?: string | React.ReactNode;
    contentClassName?: string;
}

export interface AiibFormContentState {
    showContent?: boolean;
}

export class AiibFormContent extends React.Component<AiibFormContentProps, AiibFormContentState>{
    constructor(props, context) {
        super(props, context);
        this.state = {
            showContent: true
        }
    }

    onChangeShowContent(boolean) {
        this.setState({ showContent: boolean });
    }

    render() {
        const { showContent } = this.state;
        return <div>
            <div className='aiib-contact-header' onClick={() => this.onChangeShowContent(!showContent)}>
                <span className='aiib-contact-left'></span>
                <span className='aiib-contact-word'>{this.props.title}</span>
                <span className='aiib-contact-right'>
                    {
                        showContent
                            ?
                            <AkIcon type='up' />
                            :
                            <AkIcon type='down' />
                    }

                </span>
            </div>
            <div className={'aiib-contact-form ' + this.props.contentClassName} style={{ display: showContent ? 'block' : 'none' }}>
                {this.props.children}
            </div>
        </div>;
    }

}
