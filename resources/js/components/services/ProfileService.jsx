import axios from 'axios';

export const GetProfile = async (data) => {
    return await axios.post('/profile/get', data)
        .then(response => {
                // console.log('get profile',response);
                return response.data;
        })
        .catch(err => {
            console.log('error with getting profile',err);
        });
}

export const UpdateProfile = async (profile) => {
    return await axios.post('/profile/update', profile)
        .then(response => {
            // console.log('updated profile', response)
            return response.data;
            }

        )
        .catch(err => {
            console.log(err);
        });
}
export const GetProfileImages = async (data) => {
    return await axios.post('/profile/images/get', data)
        .then(response => {
            // console.log('images', response)
            return response.data;
            }

        )
        .catch(err => {
            console.log(err);
        });
}
export const GetPortfolio = async (data) => {
    return await axios.post('/profile/portfolio/get', data)
        .then(response => {
            // console.log('portfolio', response)
            return response.data;
            }

        )
        .catch(err => {
            console.log(err);
        });
}
export const UploadMedia = async (data) => {
    return await axios.post('/profile/upload', data)
        .then(response => {
            // console.log('uploaded media', response)
            return response.data;
            }

        )
        .catch(err => {
            console.log(err);
        });
}
export const DeleteMedia = async (data) => {
    return await axios.post('/profile/portfolio/delete', data)
        .then(response => {
            // console.log('deleted media', response)
            return response.data;
            }

        )
        .catch(err => {
            console.log(err);
        });
}

