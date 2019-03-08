import {TaskOutcomeEnum} from '../../task';
/** Identity related request */
interface IdentityRequest extends AkRequest {
    /** Identity ID */
    ID : string;
    /** Identity Type */
    Type : any;
}
