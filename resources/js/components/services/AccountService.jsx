import axios from 'axios';

export const GetUserInfo = async () => {
    return await axios.get('/account/get')
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.log('getting user info',error);
        })
}

export const UpdateAccountInfo = async (data) => {
    return await axios.post('/account/update', data)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.log('updating user info',error);
        })
}

export const DeleteAccount = async (data) => {
    return await axios.get('/account/delete')
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.log('deleting account',error);
        })
}

export const GetUnRead = async () => {
    return await axios.get('/account/unread')
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.log('unread',error);
        })
}