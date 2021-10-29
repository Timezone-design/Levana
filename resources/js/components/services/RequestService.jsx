import axios from 'axios';

export const GetRequest = async () => {
    return await axios.get('/request/get')
        .then(response => {
            console.log('get request info', response);
            return response.data;
        })
        .catch(error => {
            console.log('getting request info',error);
        })
}
