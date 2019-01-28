import serviceMock from './services-mock/service-mock';
import service from './service';

class ServiceHandle {
    constructor() {
        this.enableMockups = process.env.REACT_APP_ENABLE_MOCKUPS;
    }

    retrieveService() {
        if (this.enableMockups === 'true') {
            return serviceMock;
        }

        return service;

    }

}

export default new ServiceHandle();