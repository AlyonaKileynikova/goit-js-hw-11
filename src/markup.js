// Функція розмітки для 1 ДОМ-маніпуляціі

export default function markupPrepare(response) {
    return response.data.hits.map(object => {
        return `<a class="photo-card" href="${object.largeImageURL}">
    <img src="${object.webformatURL}" alt="${object.tags}" loading="lazy"/>
  <div class="info">
    <p class="info-item">
      <b>Likes</b> ${object.likes}
    </p>
    <p class="info-item">
      <b>Views</b> ${object.views}
    </p>
    <p class="info-item">
      <b>Comments</b> ${object.comments}
    </p>
    <p class="info-item">
      <b>Downloads</b> ${object.downloads}
    </p>
  </div>
</div>
</a>`;
    });
}

export function createMarkup(markup, element) {
    element.insertAdjacentHTML('beforeend', markup.join(''));
}
