import axios from 'axios';

async function getBooks() {

    const result = await axios.get('/getbooks')
        .then(response => {
            console.log('getbooks', response);
            return response.data;
        })
        .catch(err => {
            console.log(err);
        });
    return result;
}

async function getStatus() {

    const result = await axios.get('/getStatus')
        .then(response => {
            console.log('getStatus', response);
            return response.data;
        })
        .catch(err => {
            console.log(err);
        });
    return result;
}

async function updateUnreadBooking(id) {
    const result = await axios.post('/updateunreadbooking', id)
        .then(response => {
            return response.data;
        })
        .catch(err => {
            console.log(err);
        });
    return result;
}

function acceptBooking(id) {
    axios.post('/acceptBooking', id);
}

function rejectBooking(id) {
    axios.post('/rejectBooking', id);
}

function cancelBooking(id) {
    axios.post('/cancelBooking', id);
}
export default {
    getBooks,
    getStatus,
    updateUnreadBooking,
    acceptBooking,
    rejectBooking,
    cancelBooking
}