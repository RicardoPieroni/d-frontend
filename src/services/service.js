import Promise from 'bluebird';
import ingredientList from './services-mock/data/ingredient-list.json';
import foodList from './services-mock/data/food-list.json';
import moment from 'moment';
import Chance from 'chance';
import axios from 'axios';

const chanceInstance = new Chance();

class Service {

    constructor(){
        this.backendUrl = process.env.REACT_APP_D_BACKEND_URL;
    }

    retrieveAllIngredients() {
        return axios.get(`${this.backendUrl}/ingredients/retrieveAll`)
        .then((res) => {
            const { data } = res;
            return data;
        });
    }

    retrieveAllFood() {
        return axios.get(`${this.backendUrl}/food/retrieveAll`)
        .then((res) => {
            const { data } = res;
            return data;
        });
    }

    retrieveFoodRequestDetails() {
        return new Promise((resolve) => {
            resolve({
                ingredientList,
                foodList
            });
        });
    }

    /**
     * 
     * @param {*} requestList 
     */
    calculateRequest(requestListTO) {
       
        const postData = JSON.stringify(requestListTO);
        const formData = new FormData();
        formData.append("requestList",postData );

        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: formData,
            url: `${this.backendUrl}/request/calculateRequest`,
        }
        return axios(options)
        .then((res) => {
            const request = res.data;
            return request;
        });
    }

    updateIngredientsInToRequest(ingredients, food, request) {
        const dataTO = {
            ingredients,
            food,
            request
        }
        const postData = JSON.stringify(dataTO);
        const formData = new FormData();
        formData.append('dataTO',postData );

        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: formData,
            url: `${this.backendUrl}/request/updateIngredientsInToRequest`,
        }
        return axios(options)
        .then((res) => {
            const request = res.data;
            return request;
        });
    }

    retrieveAllRequests() {
        return axios.get(`${this.backendUrl}/request/retrieveAll`)
        .then((res) => {
            const { data } = res;
            return data;
        });
    }

    updateStatusOfRequest(requestTO) {
         return axios.post(`${this.backendUrl}/request/updateStatus/${requestTO._id}`)
        .then(() => this.retrieveAllRequests());
    }

    createRequest(requestTO) {
        const postData = JSON.stringify(requestTO);
        const formData = new FormData();
        formData.append('dataTO',postData );

        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: formData,
            url: `${this.backendUrl}/request/create`,
        }
        return axios(options)
        .then(() => {
            return Promise.resolve();
        });
    }
}

export default new Service();