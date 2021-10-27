import axios from 'axios';

export const GetInbox = async () => {
    return await axios.get('/inbox/get')
        .then(response => {
            console.log('get inbox info', response);
            return response.data;
        })
        .catch(error => {
            console.log('getting inbox info',error);
        })
}