/************ import ************/
import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import {
  showLoader,
  hideLoader,
  hideSelect,
  showSelect,
  showError,
} from './show-and-hide.js';
import SlimSelect from 'slim-select';
import 'slim-select/styles';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
//---------------------------------------------

const refs = {
  select: document.querySelector('.breed-select'),
  section: document.querySelector('.cat-info'),
};

showLoader();
hideSelect();

fetchBreeds()
  .then(res => {
    const markup = createMarkupSelect(res);
    refs.select.innerHTML = markup;

    new SlimSelect({
      select: 'select.breed-select',
    });
    hideLoader();
    showSelect();
  })
  .catch(error =>
    iziToast.error({
      title: 'Oops!',
      message: 'Something went wrong! Try reloading the page!',
      position: 'topRight',
    })
  );

//---------------------------------------------
/**
 * Markup generation options
 * @param {*} arr
 * @returns
 */
function createMarkupSelect(arr) {
  return arr
    .map(
      ({ id, name }) =>
        `<option value="${id}" class="single-option">${name}</option>`
    )
    .join('');
}

/**
 * Markup generation kard
 * @param {*} data
 * @returns
 */
function createMarkup(data) {
  const {
    url,
    breeds: [{ name, description, temperament }],
  } = data[0];
  return `<img class="js-image" src="${url}" alt="${name}"/>
  <ul class="js-list">
    <li class="js-item">
      <h1 class="js-title">${name}</h1>
      <p class="js-description">${description}</p>
      <p class="js-temperament"><span class="temp">Temperament:</span> ${temperament}</p>
    </li>
  </ul>`;
}

//---------------------------------------------
refs.select.addEventListener('change', handlerChange);
function handlerChange(evt) {
  refs.section.innerHTML = '';
  showLoader();
  const id = evt.target.value;
  fetchCatByBreed(id)
    .then(resolve => {
      refs.section.insertAdjacentHTML('afterbegin', createMarkup(resolve));
    })
    .catch(error =>
      iziToast.error({
        title: 'Oops!',
        message: 'Something went wrong! Try reloading the page!',
        position: 'topRight',
      })
    )
    .finally(() => {
      hideLoader();
    });
}
