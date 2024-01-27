const API_KEY =
  'live_aLXJAm9hp9NZ1c9OwWR66Hw3VSH9ecgndIbTnT3SC8CgHMrvia7gIY31FZbfVDqM';

/**
 *Request for a list of breeds
 * @returns promise
 */
function fetchBreeds() {
  const BASE_URL = 'https://api.thecatapi.com/v1/breeds';

  const params = new URLSearchParams({
    api_key: API_KEY,
  });

  return fetch(`${BASE_URL}?${params}`).then(resp => {
    if (!resp.ok) {
      throw new Error(resp.status);
    }
    return resp.json();
  });
}

//---------------------------------------------
/**
 * Request for information about a cat
 * @param {id of select} breedId
 * @returns promise
 */
function fetchCatByBreed(breedId) {
  const BASE_URL = 'https://api.thecatapi.com/v1/images/search';

  const params = new URLSearchParams({
    breed_ids: breedId,
    api_key: API_KEY,
  });
  return fetch(`${BASE_URL}?${params}`).then(resp => {
    if (!resp.ok) {
      throw new Error(resp.status);
    }
    return resp.json();
  });
}

//---------------------------------------------

export { fetchBreeds, fetchCatByBreed };
