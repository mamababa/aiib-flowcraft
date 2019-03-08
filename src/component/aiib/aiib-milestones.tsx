import * as React from 'react';
import * as classNames from 'classnames';
import { AkRow } from 'akmii-yeeoffice-common';
interface AiibMilestonesProps {
    stepType: 'proposal' | 'sovereign' | 'nonSovereign';
    stepKey: string;
    stepState: AiibMilestoesType;
}
interface AiibMilestonesStatus { }
export class AiibMilestones extends React.Component<AiibMilestonesProps, AiibMilestonesStatus> {
    proposalMilestoes: AiibMilestoesModel[] = [{
        name: 'Proposal documents complete',
        state: AiibMilestoesType.stateless,
        mainName: ''
    }, {
        name: 'Recommended by ScrCom',
        state: AiibMilestoesType.stateless,
        mainName: ''
    }, {
        name: 'Approved by ExCom',
        state: AiibMilestoesType.stateless,
        mainName: ''
    }];
    sovereignMilestoes: AiibMilestoesModel[] = [{
        name: 'Concept PD Complete',
        state: AiibMilestoesType.stateless,
        mainName: ''
    }, {
        name: 'Concept Review by IC',
        state: AiibMilestoesType.stateless,
        mainName: ''
    }, {
        name: 'PSI (Concept) Complete',
        state: AiibMilestoesType.stateless,
        mainName: 'Concept'
    }, {
        name: 'Appraisal PD Complete',
        state: AiibMilestoesType.stateless,
        mainName: ''
    }, {
        name: 'Appraisal Decison by IC',
        state: AiibMilestoesType.stateless,
        mainName: ''
    }, {
        name: 'PSI (Appraisal) Complete',
        state: AiibMilestoesType.stateless,
        mainName: ''
    }, {
        name: 'Appraisal Completion Note Cleared',
        state: AiibMilestoesType.stateless,
        mainName: 'Appraisal'
    }, {
        name: 'Draft LDs Complete',
        state: AiibMilestoesType.stateless,
        mainName: ''
    }, {
        name: 'Draft LDs Clearance',
        state: AiibMilestoesType.stateless,
        mainName: ''
    }, {
        name: 'Negotiations Complete',
        state: AiibMilestoesType.stateless,
        mainName: 'Negotiation'
    }, {
        name: 'Board Package Complete',
        state: AiibMilestoesType.stateless,
        mainName: ''
    }, {
        name: 'VP of Policy & Strategy assurances',
        state: AiibMilestoesType.stateless,
        mainName: ''
    }, {
        name: 'Board Approved',
        state: AiibMilestoesType.stateless,
        mainName: ''
    }, {
        name: 'PSI (Board Approval) Complete',
        state: AiibMilestoesType.stateless,
        mainName: 'Board Approval'
    }];
    nonSovereignMilestoes: AiibMilestoesModel[] = [{
        name: 'Concept PD Complete',
        state: AiibMilestoesType.stateless,
        mainName: ''
    }, {
        name: 'Concept Review by IC',
        state: AiibMilestoesType.stateless,
        mainName: 'Concept'
    }, {
        name: 'Interim/Final Review PD Complete',
        state: AiibMilestoesType.stateless,
        mainName: ''
    }, {
        name: 'Interim/Final Decison by IC',
        state: AiibMilestoesType.stateless,
        mainName: ''
    }, {
        name: 'PSI (Interim/Final) Complete',
        state: AiibMilestoesType.stateless,
        mainName: 'Interim/Final'
    }, {
        name: 'Board Package Complete',
        state: AiibMilestoesType.stateless,
        mainName: ''
    }, {
        name: 'VP of Policy & Strategy assurances',
        state: AiibMilestoesType.stateless,
        mainName: ''
    }, {
        name: 'Board Approved',
        state: AiibMilestoesType.stateless,
        mainName: ''
    }, {
        name: 'PSI (Board Approval) Complete',
        state: AiibMilestoesType.stateless,
        mainName: 'Board Approval'
    }];
    constructor(props, context) {
        super(props, context);
    }

    render() {
        const { stepType, stepKey, stepState } = this.props;
        let list: AiibMilestoesModel[] = [];

        switch (stepType) {
            case 'proposal':
                list = this.proposalMilestoes;
                break;
            case 'sovereign':
                list = this.sovereignMilestoes;
                break;
            case 'nonSovereign':
                list = this.nonSovereignMilestoes;
                break;
        }
        const listLength = list.length;
        for (let i = 0; i < listLength; i++) {
            let currentItem = list[i];
            if (i === 0 && (!stepKey || stepKey === "Approved by ExCom")) {
                if (stepState === AiibMilestoesType.cancel) {
                    currentItem.state = AiibMilestoesType.cancel;
                } else {
                    currentItem.state = AiibMilestoesType.runing;
                }
            }
            if (currentItem.name === stepKey) {
                currentItem.state = stepState;
                for (let j = 0; j < i; j++) {
                    const element = list[j];
                    element.state = AiibMilestoesType.pass;
                }
                if (stepState !== AiibMilestoesType.cancel) {
                    let nextItem = list[i + 1];
                    if (nextItem) {
                        nextItem.state = AiibMilestoesType.runing;
                    }
                }
            }
        }
        return (
            <AkRow className="aiib-milestones">
                <ul className='clearfix' style={{ width: 125 * listLength }}>
                    {list.map((i, index) => {
                        return aiibMilestonesPoint(i, index, listLength);
                    })}
                </ul>
            </AkRow>
        );
    }
}
export enum AiibMilestoesType {
    runing, //运行中
    pass, //通过
    stateless, //无状态
    cancel //取消
}
export interface AiibMilestoesModel {
    name?: string;
    state?: AiibMilestoesType;
    mainName?: string;
}
const aiibMilestonesPoint = (item: AiibMilestoesModel, index: number, len: number) => {
    const className = classNames('aiib-milestones-li', {
        large: item.mainName ? true : false
    }, {
            runing: item.state === AiibMilestoesType.runing
        }, {
            pass: item.state === AiibMilestoesType.pass
        }, {
            stateless: item.state === AiibMilestoesType.stateless
        }, {
            cancel: item.state === AiibMilestoesType.cancel
        }, {
            last: len === index + 1
        });
    const isUp = (index) % 2 === 0;
    const isDown = (index) % 2 !== 0;
    const classWord = classNames('aiib-milestones-word', { up: isUp }, { down: isDown });
    return (
        <li className={className} key={index}>
            {
                item.mainName
                    ?
                    <div className='aiib-milestones-mainname'>
                        {item.mainName}
                    </div>
                    :
                    null
            }
            <div className={classWord}>{item.name}</div>
        </li>
    );
};
