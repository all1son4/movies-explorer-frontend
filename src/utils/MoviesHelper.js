export const keyWordFilterCallback = (movies, searchValue) => {
  const regular = new RegExp(searchValue, 'i');
  return movies.filter(movie => {
    const { nameRU, nameEN } = movie;
    return regular.test(nameRU) || regular.test(nameEN);
  });
};

export const durationFilterCallback = (movies, checked) => {
  if (!checked) return movies
  return movies.filter(movie => {
    return movie.duration <= 40;
  });
};