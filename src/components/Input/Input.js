import React, {useState } from 'react';
import './App.css';

function App() {
  const [currency, setState] = useState('')
  
  function extractNumber(e, decimalPlaces, allowNegative)
{   

    var temp = e.target.value;

    // avoid changing things if already formatted correctly
    var reg0Str = '[0-9]*';
    if (decimalPlaces > 0) {
        reg0Str += '\[\,\.]?[0-9]{0,' + decimalPlaces + '}';
    } else if (decimalPlaces < 0) {
        reg0Str += '\[\,\.]?[0-9]*';
    }
    reg0Str = allowNegative ? '^-?' + reg0Str : '^' + reg0Str;
    reg0Str = reg0Str + '$';
    var reg0 = new RegExp(reg0Str);
    if (reg0.test(temp)) return true;

    // first replace all non numbers
    var reg1Str = '[^0-9' + (decimalPlaces !== 0 ? '.' : '') + (decimalPlaces !== 0 ? ',' : '') + (allowNegative ? '-' : '') + ']';
    var reg1 = new RegExp(reg1Str, 'g');
    temp = temp.replace(reg1, '');

    if (allowNegative) {
        // replace extra negative
        var hasNegative = temp.length > 0 && temp.charAt(0) === '-';
        var reg2 = /-/g;
        temp = temp.replace(reg2, '');
        if (hasNegative) temp = '-' + temp;
    }

    if (decimalPlaces !== 0) {
        var reg3 = /[\,\.]/g;
        var reg3Array = reg3.exec(temp);
        if (reg3Array !== null) {
            // keep only first occurrence of .
            //  and the number of places specified by decimalPlaces or the entire string if decimalPlaces < 0
            var reg3Right = temp.substring(reg3Array.index + reg3Array[0].length);
            reg3Right = reg3Right.replace(reg3, '');
            reg3Right = decimalPlaces > 0 ? reg3Right.substring(0, decimalPlaces) : reg3Right;
            temp = temp.substring(0,reg3Array.index) + '.' + reg3Right;
        }
    }

    setState(temp)
  }
  function blockNonNumbers(e, allowDecimal, allowNegative)
  {
      var key;
      var isCtrl = false;
      var keychar;
      var reg;
      var obj = e.target;
      if(window.event) {
          key = e.keyCode;
          isCtrl = window.event.ctrlKey
      }
      else if(e.which) {
          key = e.which;
          isCtrl = e.ctrlKey;
      }

      if (isNaN(key)) return true;

      keychar = String.fromCharCode(key);

      // check for backspace or delete, or if Ctrl was pressed
      if (key === 8 || isCtrl)
      {
          return true;
      }

      reg = /\d/;
      var isFirstN = allowNegative ? keychar === '-' && obj.value.indexOf('-') === -1 : false;
      var isFirstD = allowDecimal ? keychar === '.' && obj.value.indexOf('.') === -1 : false;
      var isFirstC = allowDecimal ? keychar === ',' && obj.value.indexOf(',') === -1 : false;
      return isFirstN || isFirstD || isFirstC || reg.test(keychar);
  }
  function blockInvalid(e)
  {
      var temp=e.target.value;
      if(temp === "-")
      {
          temp="";
      }

      if (temp.indexOf(".") === temp.length-1 && temp.indexOf(".") !== -1)
      {
          temp=temp+"00";
      }
      if (temp.indexOf(".") === 0)
      {
          temp= "0"+temp;
      }
      if (temp.indexOf(".") === 1 && temp.indexOf("-") === 0)
      {
          temp=temp.replace("-","-0") ;
      }
      if (temp.indexOf(",") === temp.length-1 && temp.indexOf(",") !== -1)
      {
          temp=temp+"00";
      }
      if (temp.indexOf(",") === 0)
      {
          temp="0"+temp;
      }
      if (temp.indexOf(",") === 1 && temp.indexOf("-") === 0)
      {
          temp=temp.replace("-","-0") ;
      }
      temp=temp.replace(",",".") ;

      setState(temp)
  }
  function onchange(e){
    setState(e.target.value)
  }

function onBlur(e, decimalPlaces, allowNegative){
  extractNumber(e, decimalPlaces, allowNegative);
  blockInvalid(e)
}
  return (
    <div className="App">
      <input style={{ height: '20px', width: '150px'}} onChange={onchange} type="text" id="id" value={currency} onBlur={(e) => onBlur(e, 2, true)} onKeyUp={(e) => extractNumber(e, 2, true)} onKeyPress={(e) => blockNonNumbers(e, true, true)} />
    </div>
  );
}

export default App;
