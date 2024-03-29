
import UnitedStates from '../assets/images/united-states.svg';
import UnitedKingdom from '../assets/images/united-kingdom.svg';
import Europe from '../assets/images/european-union.svg';

export function formatMoney(number) {//string

    if(isNaN(number)) {return number};
    
    number = number.toString();
    let integerPart = false;
    let decimalPart = false;
    let integerFormatted = [];
  
    if(number.indexOf('.') >= 0){
      let pointLocation = number.indexOf('.');
      integerPart = number.slice(0, pointLocation);
      decimalPart = number.slice(pointLocation + 1);
    } else {
      integerPart = number;
    }
  
    while(integerPart.length > 0) {
      let digitCount = integerPart.length;
      if(digitCount >= 3) {
        integerFormatted.unshift(integerPart.slice(digitCount-3, digitCount) + ',');
        integerPart = integerPart.slice(0, digitCount-3)
      } else {
        integerFormatted.unshift(integerPart + ',');
        integerPart = '';
      }
    }
    integerPart = integerFormatted.join('');
    integerPart = integerPart.slice(0, integerPart.length - 1);
  
    if(decimalPart){
      if(decimalPart.length === 1){
        decimalPart += "0";
      }
  
      return integerPart + '.' + decimalPart;
    } else {
      return integerPart + '.00';
    }
  }

export const regexBase = {
    amountRegex: /^[0-9]+(\.[0-9]{1,2})?$/,
    emailRegex: /^.{1,}@.{1,}$/,
    wholeValueRegex:  /^[0-9]+$/,
}

export const sign = {
  EUR: '€',
  GBP: '£',
  USD: '$'
}

export const Icons = {
  'UnitedStates': UnitedStates,
  'UnitedKingdom': UnitedKingdom,
  'Europe': Europe
  
}