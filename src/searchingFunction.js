import axios from "axios";



let PAGE_COUNTER = 1;

// Робота з арі
export default async function getUser(searching) {
    try {
        const BASE_URL = 'https://pixabay.com/api/';
        const searchParams = new URLSearchParams({
          key: '30991225-d0f50160f689eb7082679a7a8',
          q: searching,
          image_type: 'photo',
          orientation: 'horizontal',
          safesearch: true,
          page: PAGE_COUNTER,
          per_page: 40,
        });

        const response = await axios.get(
          `${BASE_URL}?${searchParams}`
        );

        PAGE_COUNTER += 1;

        return response;
    }
    catch (error) {
        throw new Error(error);
    }
}


export const resetPage = () => {
    PAGE_COUNTER = 1;
}


// import Notiflix from 'notiflix';
// const axios = require('axios').default;

// const URL = 'https://pixabay.com/api/';
// const KEY = '30943279-78d227be7adcee3f7dee47f41';
// const searchName = refs.input.value.trim();

// async function getPictures(searchName) {
//     if (searchName === '') {
//         Notiflix.Notify.info('Sorry, search query can not be empty. Please try again.', emptyMarkup());

//         refs.input.value = "";
//         localStorage.setItem('searchName', '');
//         refs.loadMoreBtn.hidden = true;
//         return
//     }


//     const response = await axios.get(`${URL}?key=${KEY}&q=${searchName}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=1`);
        
//     if (response.data.hits <= 0 || response.status === 404) {
//         Notiflix.Notify.failure(
//             'Sorry, there are no images matching your search query. Please try again.',
//             emptyMarkup()
//         );

//         refs.loadMoreBtn.hidden = true;
//         refs.input.value = '';
//         localStorage.setItem('searchName', '');

//         throw new Error();
//     }
        
    
//     return response;
// }
