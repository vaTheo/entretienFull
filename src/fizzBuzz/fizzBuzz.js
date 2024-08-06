//Return true if num is divided by isDividedBy
const isDividedBy = (num, isDividedBy) => {
  return num % isDividedBy === 0;
};

/**
 *
 * @param n Will display from 0 to n included
 */
const displayFizzBuzzNumber = (n) => {
  for (let i = 0; i <= n; i++) {
    let output = '';

    if (isDividedBy(i, 3)) {
      output += 'Fizz';
    }
    if (isDividedBy(i, 5)) {
      output += 'Buzz';
    }

    if (output === '') {
      output = i.toString();
    }

    console.log(output);
  }
};

displayFizzBuzzNumber(1000);
