import axios from 'axios';

export const UpgradeMembership = async () => {
    return await axios.get('/role/update')
        .then(response => {
                console.log('updated membership',response);
                return response.data;
        })
        .catch(err => {
            console.log('error with upgrading',err);
        });
}
export const CheckMembership = async () => {
    return await axios.get('/role/check')
        .then(response => {
                console.log('checking membership',response);
                return response.data;
        })
        .catch(err => {
            console.log('error with checking membership',err);
        });
}