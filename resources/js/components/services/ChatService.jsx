import axios from 'axios';

export const GetChatRecord = async (data) => {
    return await axios.post('/chat/get', data)
        .then(response => {
            console.log('get chat info', response);
            return response.data;
        })
        .catch(error => {
            console.log('getting chat info',error);
        })
}

export const SendMessage = async (data) => {
    return await axios.post('/chat/save', data)
        .then(response => {
            console.log('save chat info', response);
            return response.data;
        })
        .catch(error => {
            console.log('saving chat info',error);
        })
}

export const UpdateUnread = async (data) => {
    return await axios.post('/chat/update', data)
        .then(response => {
            console.log(response);
            return response.data;
        })
        .catch(error => {
            console.log('saving chat info',error);
        })
}

