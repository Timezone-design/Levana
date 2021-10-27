import axios from 'axios';

export const SearchByFilter = async (filter) => {
        console.log('filter',filter);
    return await axios.post('/search/filter', filter)
        .then(response => {
                console.log('search result',response);
                return response.data;
        })
        .catch(err => {
            console.log('error with searching',err);
        });
}