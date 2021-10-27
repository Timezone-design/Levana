import axios from 'axios';

export const GetUserInfo = async () => {
    return await axios.get('/account/get')
        .then(response => {
            console.log('get userinfo', response);
            return response.data;
        })
        .catch(error => {
            console.log('getting user info',error);
        })
}

export const UpdateAccountInfo = async (data) => {
    return await axios.post('/account/update')
        .then(response => {
            console.log('updated userinfo', response);
            return response.data;
        })
        .catch(error => {
            console.log('updating user info',error);
        })
}

export const DeleteAccount = async (data) => {
    return await axios.get('/account/delete')
        .then(response => {
            console.log('deleted account', response);
            return response.data;
        })
        .catch(error => {
            console.log('deleting account',error);
        })
}

export const GetUnRead = async () => {
    return await axios.get('/account/unread')
        .then(response => {
            console.log('unread', response);
            return response.data;
        })
        .catch(error => {
            console.log('unread',error);
        })
}


async function getUserInfo() {
    const result = await axios.get('/getUserInfo')
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.log(error);
        })
    return result;
}

async function getMessgeCount(users) {
    const result = await axios.post('/getMessgeCount', users)
        .then(response => {
            console.log('response', response);
            return response.data;
        })
        .catch(error => {
            console.log(error);
        })
    return result;
}
