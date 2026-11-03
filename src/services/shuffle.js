function shuffle(array) {
  const shuffled = [...array];

  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const randomIndex = Math.floor(Math.random() * (i + 1));

    [shuffled[i], shuffled[randomIndex]] = [
      shuffled[randomIndex],
      shuffled[i],
    ];
  }

  return shuffled;
}

function shuffleWithoutSameFirstItem(array, previousItem) {
  if (!array || array.length <= 1) return [...array];

  let shuffled = shuffle(array);
  let attempts = 0;

  while (
    shuffled[0]?.name === previousItem?.name &&
    attempts < 10
  ) {
    shuffled = shuffle(array);
    attempts += 1;
  }

  return shuffled;
}

module.exports = {
  shuffle,
  shuffleWithoutSameFirstItem,
};