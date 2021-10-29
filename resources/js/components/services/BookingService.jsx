import axios from 'axios';

export const SendBookingRequest = async (data) => {
    return await axios.post('/booking/save', data)
        .then(response => {
                console.log('booking result',response);
                return response.data;
        })
        .catch(err => {
            console.log('error with saving book',err);
        });
}

export const getBooks = async () => {
    return await axios.get('/booking/get')
        .then(response => {
            console.log('get booking records', response);
            return response.data.books;
        })
        .catch(err => {
            console.log('error with getting books',err);
        });
}


export const UpdateBooking = async (data) => {
    return await axios.post('/booking/update', data)
        .then(response => {
            console.log('update booking info', response);
            return response.data;
        })
        .catch(error => {
            console.log('updating booking info',error);
        })
}

