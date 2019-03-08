import * as React from "react";
import { Component } from 'react';
import WaitintTask from './waitingtask';
import { MyDelegatesPage } from './mydelegates';
import { withRouter } from 'react-router';
import { RouterProps } from 'akmii-yeeoffice-common';
import { PathConfig } from '../config/pathconfig';
import FinishTask from './finishtask';
interface TodoTaskPageProps extends RouterProps { }
interface TodoTaskPageStatus {
    type?: PageType;
}

@withRouter
export default class TodoTaskPage extends Component<TodoTaskPageProps, TodoTaskPageStatus>{
    constructor(props, context) {
        super(props, context);
        this.state = {
            type: this.getType(this.props.location.pathname),
        };
    }
    componentWillMount() {
        const { type } = this.props.location.query;

        if (type) {
            this.setState({ type: parseInt(type) });
        }
    }
    componentWillReceiveProps(nextProps: TodoTaskPageProps) {
        if (nextProps.location.pathname !== this.props.location.pathname) {
            this.setState({ type: this.getType(nextProps.location.pathname) });
        }
    }
    getType(path) {
        if (path === PathConfig.WaitingTask) {
            return PageType.waittingTask;
        } else if (path === PathConfig.FinishTask) {
            return PageType.finishTask;
        }
        return PageType.waittingTask;
    }
    onChangePage(type: PageType) {
        this.setState({ type });
        if (type === PageType.waittingTask || type === PageType.waittingDelegates) {
            this.props.router.push({ pathname: PathConfig.WaitingTask, query: { type } });
        } else {
            this.props.router.push({ pathname: PathConfig.FinishTask, query: { type } });
        }

    }
    render() {
        let page;
        switch (this.state.type) {
            case PageType.waittingTask:
                page = <WaitintTask onChangePage={this.onChangePage.bind(this)} type={this.state.type} />;
                break;
            case PageType.waittingDelegates:
                page = <MyDelegatesPage isCompleted={false} onChange={this.onChangePage.bind(this)} />;
                break;
            case PageType.finishTask:
                page = <FinishTask onChangePage={this.onChangePage.bind(this)} />;
                break;
            case PageType.finishDelegates:
                page = <MyDelegatesPage isCompleted={true} onChange={this.onChangePage.bind(this)} />;
                break;
            default:
                page = <WaitintTask onChangePage={this.onChangePage.bind(this)} />;
                break;
        }
        return page;
    }
}
