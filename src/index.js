
import getUser, { resetPage } from './searchingFunction';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import onGetSuccess, { resetResponseCounter } from './response';
import markupPrepare, { createMarkup } from './markup';
import throttle from 'lodash.throttle';
// var throttle = require('lodash.throttle');

const { searchForm, gallery, loadMoreBTN } = {
  searchForm: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  loadMoreBTN: document.querySelector('.load-more'),
};

let searchText;
const infiniteThrottle = throttle(infiniteLogic, 500);

// SimpleLightbox
var lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    cationDelay: 250,
});

// addEventListener для сабміту

searchForm.addEventListener('submit', async evt => {
    evt.preventDefault();

    searchText = evt.target.elements.searchQuery.value.trim('');
    if (searchText) {
        clearGallery();
        resetPage();
        resetResponseCounter();
        await doMagic();
        lightboxRefresh();
        smoothScroll();
        infiniteScroll();
    }
});

// Функція для очищення галереї

function clearGallery() {
    gallery.innerHTML = '';
}

// Функція оновлення Лайтбокса
function lightboxRefresh() {
    lightbox.refresh();
};

// Функція doMagic - отриманная інфо про виборку, опрацювання відповідей та створення розмітки
async function doMagic() {
    try {
        const response = await getUser(searchText);

        if (response.data.hits.length < 40) {
            window.removeEventListener('scroll', infiniteThrottle);
        }

        const validation = onGetSuccess(response);
        const preparation = markupPrepare(response);
        const magic = createMarkup(preparation, gallery);
    }
    catch (error) {
        throw new Error(error);
    }
}

// Функція бесперервного скролу

function infiniteScroll() {
    setTimeout(infiniteListener, 1000);
}

function infiniteListener() {
    window.addEventListener('scroll', infiniteThrottle);
}

function infiniteLogic() {
    var scrollHeight = document.documentElement.scrollHeight;
    var scrollTop = document.documentElement.scrollTop;
    var clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight > scrollHeight - 500) {
        doMagic();
        lightboxRefresh();
    }
}

// Фунція плавного скролу
function smoothScroll() {
    const y = gallery.firstElementChild.getBoundingClientRect().y;
    window.scrollBy({
        top: y,
        behavior: 'smooth',
    }
    );
}

// // const refs = {
// //   searchForm: document.querySelector('form#search-form'),
// //   input: document.querySelector('input[name="searchQuery"]'),
// //   gallery: document.querySelector('.gallery'),
// //   loadMoreBtn: document.querySelector('.load-more'),
// // };
// // export {refs}
// // refs.loadMoreBtn.hidden = true;

// // refs.searchForm.addEventListener('submit', onSearch);

// // async function onSearch(event) {
// //   event.preventDefault();
// //   emptyMarkup();

// //   const searchName = refs.input.value.trim();

// //   try {
// //     const response = await getPictures(searchName);

// //     if (response.data.totalHits > 0) {
// //       // console.log('response:  ', response);
// //       //console.log('response.data.totalHits (after SUBMIT): ' , response.data.totalHits);

// //       Notiflix.Notify.success(
// //         `Hooray! We found ${response.data.totalHits} images.`
// //       );

// //       refs.gallery.insertAdjacentHTML('beforeend', renderMarkup(response));

// //       const lightbox = new SimpleLightbox('.gallery a', {
// //         showCounter: false,
// //       });

// //       refs.loadMoreBtn.hidden = false;

// //       localStorage.setItem('searchName', searchName);

// //       // console.log('searchName from localStorage : ', localStorage.getItem('searchName'));

// //       refs.input.value = '';

// //       refs.loadMoreBtn.addEventListener('click', onLoad);
// //       lightbox.refresh();
// //     } else {
// //       emptyMarkup();
// //       throw new Error();
// //     }
// //   } catch (error) {
// //     //console.log(error)
// //   }
// // }
