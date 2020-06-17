import { UserService } from './user';

export class AdminService {
    
    constructor() {

        const api = {
            key: 'a-mbrym4-xgmqqzruab',
            token: '&EI(1hsJwjeHnh@haa'
        };

        this.service = new UserService(
            null,
            api
        );
    }

    initClients(board) {
        this.service.initClients(board);
    }

    subscribePostalCode() {
        
        this.service.subscribeItem(false, null, ['postalCode']);
    }
}
//export default new AdminService();
