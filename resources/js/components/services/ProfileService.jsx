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
            console.log('updated profile', response)
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
            console.log('images', response)
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
            console.log('portfolio', response)
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
            console.log('uploaded media', response)
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
            console.log('deleted media', response)
            return response.data;
            }

        )
        .catch(err => {
            console.log(err);
        });
}

async function uploadImage(Obj) {
    
    const result= await axios.post('/uploadimage', Obj)
                .then( response => {
                        if (response.data =="media upload success")
                        return "ok";
                    }
                )
                .catch(error => {
                    console.log("ERROR:: ",error.response.data);
                });

    return result;
}

async function uploadVideo(Obj) {
    
    const result= await axios.post('/uploadvideo', Obj)
                .then(
                    async function (response) {
                        if (response.data =="video upload success")
                        return "ok";
                        else return "fail";
                    }
                )
                .catch(error => {
                    console.log("ERROR:: ",error.response.data);
                });

    return result;
}

async function getImageUrl(imagesort) {

    console.log("sending request for images");
    const result= await axios.post('/getimageurl', imagesort)
        .then(
            response => {
                console.log('imageurl', response);
                return response.data;
            }
        )
        .catch(error => {
            console.log("ERROR:: ",error.response.data);

            });
    return result;
}

async function deleteMedia(url) {

    const result= await axios.post('/deletemedia', url)
        .then(
            async function (response) {

                if ( response.data == "success" ) {
                    return "success";
                }
            }
        )
        .catch(error => {
            console.log("ERROR:: ",error.response.data);
        });
    return result;
}

async function getreviews() {

    const result= await axios.get('/getreviews')
        .then(
            async function (response) {

                return JSON.parse(response.data);
            }
        )
        .catch(error => {
            console.log("ERROR:: ",error.response.data);
        });
    return result;
}
