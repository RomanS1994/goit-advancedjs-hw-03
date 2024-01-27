const refs = {
  select: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
};

function showLoader() {
  refs.loader.classList.remove('is-hidden');
}
function hideLoader() {
  refs.loader.classList.add('is-hidden');
}

//---------------------------------------------

function hideSelect() {
  refs.select.classList.add('is-hidden');
}
function showSelect() {
  refs.select.classList.remove('is-hidden');
}
//---------------------------------------------
function showError() {
  refs.error.classList.remove('is-hidden');
}
export { showLoader, hideLoader, hideSelect, showSelect, showError };
