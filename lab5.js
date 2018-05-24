const { readDataFileAsync } = require('./util/file');

const ARRAY_LENGTH = 128;

function hash1(str) {
  return (str.charCodeAt(0) + str.charCodeAt(1)) % ARRAY_LENGTH;
}

function hash2(str) {
  return (
    (str.charCodeAt(str.length - 1) + str.charCodeAt(str.length - 2)) %
    ARRAY_LENGTH
  );
}

function hash3(str) {
  return (str.charCodeAt(0) + str.charCodeAt(str.length - 1)) % ARRAY_LENGTH;
}

function hash4(str) {
  return (
    (str.charCodeAt(0) +
      str.charCodeAt(Math.round(str.length / 2)) +
      str.charCodeAt(str.length - 1)) %
    ARRAY_LENGTH
  );
}

function rehesh(hashValue) {
  return (5 * hashValue + 1 + (hashValue >> hashValue)) % ARRAY_LENGTH;
}

function setValue(array, value, hashValue, collisions) {
  do {
    if (array[hashValue] == null) {
      array[hashValue] = value;

      return collisions;
    }

    collisions += 1;
    hashValue = rehesh(hashValue);
  } while (true);
}

function fill(array, hashFunction, values) {
  const newArray = array.slice();
  const comparisons = [];
  let collisions = 0;

  for (const value of values) {
    const hashValue = hashFunction(value, ARRAY_LENGTH);
    const resultCollisions = setValue(newArray, value, hashValue, 0);
    collisions += resultCollisions;
    comparisons.push(resultCollisions);
  }

  return [newArray, collisions, comparisons];
}

function testHashFunction(hashFunction, file1, file2) {
  const startArray = new Array(ARRAY_LENGTH);

  const [array] = fill(startArray, hashFunction, file1.split('\n'));
  const [, collisions, comparisons] = fill(
    array,
    hashFunction,
    file2.split('\n'),
  );

  const averageComparisons = comparisons.reduce((acc, x) => acc + x, 0) / comparisons.length

  console.log(`Hash function: ${hashFunction.name}`);
  console.log(`Collisions: ${collisions}`);
  console.log(`Average comparisons: ${averageComparisons}`);
  console.log('\n');
}

async function main() {
  const fileName1 = process.argv[2] || 'lab5_1.txt';
  const file1 = await readDataFileAsync(fileName1);

  const fileName2 = process.argv[3] || 'lab5_2.txt';
  const file2 = await readDataFileAsync(fileName2);

  testHashFunction(hash1, file1, file2);
  testHashFunction(hash2, file1, file2);
  testHashFunction(hash3, file1, file2);
  testHashFunction(hash4, file1, file2);
}

main();
