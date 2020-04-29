const convertStringToNumber = (string, x = 10) => {
    const chars = string.split('');
    let number = 0;
  
    let i = 0;
    while (i < chars.length && chars[i] !== '.') {
      number = number * x;
      number += chars[i].codePointAt(0) - '0'.codePointAt(0);
      i++;
    }
  
    if (chars[i] === '.') {
      i++;
    }
  
    let fraction = 1;
    while (i < chars.length) {
      fraction = fraction / x;
      number += (chars[i].codePointAt(0) - '0'.codePointAt(0)) * fraction;
      i++;
    }
  
    return number;
  }
  
  const convertNumberToString = (number, x = 10) => {
    let integer = Math.floor(number);
    let fraction = number - integer;
    let string = '';
  
    while (integer > 0) {
      string = integer % x + string;
      integer = Math.floor(integer / x);
    }
  
    if (fraction > 0) {
      string += '.';
    }
  
  
    while (fraction > 0) {
      let integer = Math.floor(fraction * x);
      string += integer;
      fraction = fraction * x - integer;
    }
  
    return string;
  }