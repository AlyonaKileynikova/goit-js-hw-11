import { Notify } from 'notiflix/build/notiflix-notify-aio';
let RESPONSE_COUNTER = 1;

// функція перевірки відгуку на кількість запитів перед створенням розмітки
export default function onGetSuccess(response) {
    if (response.data.hits.length === 0 || response.status === 404) {
        return Notify.failure(
            'Sorry, there are no images matching your search query. Please try again.'
        );
    } else if (RESPONSE_COUNTER === 1) {
        Notify.success(`Hooray! We found ${response.data.totalHits} images.`);
    } else if (response.data.hits.length < 40) {
        return Notify.info(
            `We're sorry, but you've reached the end of search results.`
        );
    }
    
    RESPONSE_COUNTER += 1;
}



export const resetResponseCounter = () => {
    RESPONSE_COUNTER = 1;
}