const { readDataFileAsync } = require('./util/file');
const { times, sample, sum, mean } = require('lodash');

function benchmark(name, func) {
  const timeStart = Date.now();
  console.log(`${name} start: ${timeStart}`);

  const comparisons = func();

  const timeEnd = Date.now();
  console.log(`${name} end: ${timeEnd}`);
  console.log(`Time spent in milliseconds: ${timeEnd - timeStart}`);

  if (Array.isArray(comparisons)) {
    console.log(`Total comparisons: ${sum(comparisons)}`);
    console.log(`Average comparisons: ${mean(comparisons)}`);
  } else {
    console.log(`Comparisons: ${comparisons}`);
  }

  console.log('\n');
}

function linearSearch(list, word) {
  let comparisons = 0;

  for (let i = 0; i < list.length; i++) {
    comparisons++;

    if (list[i] === word) {
      return comparisons;
    }
  }

  return comparisons;
}

function bubbleSort(list) {
  let comparisons = 0;
  let sorted = false;

  while (!sorted) {
    sorted = true;

    for (let i = 0; i < list.length; i++) {
      comparisons++;

      if (list[i] > list[i + 1]) {
        sorted = false;

        const tmp = list[i];
        list[i] = list[i + 1];
        list[i + 1] = tmp;
      }
    }
  }

  return comparisons;
}

function binarySearch(
  list,
  word,
  left = 0,
  right = list.length,
  comparisons = 0,
) {
  const middle = Math.floor((left + right) / 2);

  comparisons++;

  if (left > right) {
    return comparisons;
  }

  comparisons++;

  if (list[middle] === word) {
    return comparisons;
  }

  comparisons++;

  if (list[middle] > word) {
    return binarySearch(list, word, left, middle - 1, comparisons);
  }

  comparisons++;

  if (list[middle] < word) {
    return binarySearch(list, word, middle + 1, right, comparisons);
  }

  return comparisons;
}

function insertSorted(list, word) {
  let comparisons = 0;

  for (let i = 0; i < list.length; i++) {
    comparisons++;

    if (word > list[i]) {
      list.splice(i, 0, word);

      return comparisons;
    }
  }

  return comparisons;
}

async function main() {
  const fileName = process.argv[2] || 'lab2.txt';
  const file = await readDataFileAsync(fileName);

  const words = file.split('\n');
  const wordsToSearch = times(20, () => sample(words));

  benchmark('Search', () => {
    const comparisons = [];

    for (const wordToSearch of wordsToSearch) {
      comparisons.push(linearSearch(words, wordToSearch));
    }

    return comparisons;
  });

  benchmark('Sort', () => bubbleSort(words));

  benchmark('Binary search', () => {
    const comparisons = [];

    for (const wordToSearch of wordsToSearch) {
      comparisons.push(binarySearch(words, wordToSearch));
    }

    return comparisons;
  });

  const wordsToInsert = times(10, () => sample(words));

  benchmark('Insert', () => {
    const comparisons = [];

    for (const wordToInsert of wordsToInsert) {
      comparisons.push(insertSorted(words, wordToInsert));
    }

    return comparisons;
  });
}

main();
