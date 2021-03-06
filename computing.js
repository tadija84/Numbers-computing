document.getElementById("inComputing").addEventListener("click", checkNums);

function checkNums() {
  var inputingValues = document.getElementById("inputedNums").value;
  var inputNums = /^((\s?)+?[+-]?(\[|\{|\(?)+?(\d+?){1,}(\.?|\,?\d+)?(\]|\}|\)?)+?(\s?)+?[+*\/-](\s?)+?(\[|\{|\(?)+?(\d+?){1,}(\.?|\,?\d+)?(\]|\}|\)?)+?(\s?)+?(([+*\/-](\s?)+?(\[|\{|\(?)+?(\d+?){1,})?(\.?|\,?\d+)?(\]|\}|\)?)+?(\s?)+?)+?)$/;
  var x = inputNums.test(inputingValues);
  if (x == false) {
    alert("Please enter the regular math operation.");
    return;
  }
  var strimedString = inputingValues.replace(/\s/g, "");
  var preparedString = strimedString.replace(",", ".");
  var noStr = bigBracketsFirst(preparedString);
  dispRes(noStr);
}

function bigBracketsFirst(procNum){
  return bracketsMath(procNum,"{","}",midBrackets)
}
function midBrackets(procNum){
  return bracketsMath(procNum,"[","]",regBrackets);
}
function regBrackets(procNum){
  return bracketsMath(procNum,"(",")",computeNumsPlus);

}
function bracketsMath(procNum,openBracket,closeBracket,funcToCall) {
  var targetedStr=procNum;
  if (procNum.includes(openBracket)) {
    if (procNum.split(openBracket).length !== procNum.split(closeBracket).length) {
      alert("Please check number of brackets you entered.");
      return "Please check number of brackets you entered.";
    } else {
      while(targetedStr.includes(openBracket)){
        var n1 = targetedStr.lastIndexOf(openBracket);
        var tempStr1 = targetedStr.substring(n1 + 1, targetedStr.length);
        var n2 = tempStr1.indexOf(closeBracket);
        var n3 = n1 + n2;
        var tempStr2 = targetedStr.substring(n3 + 2, targetedStr.length);
        var newString = funcToCall(targetedStr.substring(n1 + 1, n3 + 1));
        targetedStr = targetedStr.substring(0, n1) + newString + tempStr2;
      }targetedStr = funcToCall(targetedStr);
    }
  } else {
    targetedStr = funcToCall(procNum);
  }
  return targetedStr;
}
function computeNumsPlus(procNum) {
  return variusMath(procNum, "+", computeNumsMin);
}
function computeNumsMin(procNum) {
  return variusMath(procNum, "-", computeNumsDiv);
}
function computeNumsDiv(procNum) {
  return variusMath(procNum, "/", computeNumsMult);
}
function variusMath(procNum, opString, funcToCall) {
  if (procNum.includes(opString)) {
    var teempArr = procNum.split(opString);
    var teempVal = parseFloat(funcToCall(teempArr[0]));
    for (var i = 1; i < teempArr.length; i++) {
      if (opString == "+") {
        teempVal += parseFloat(funcToCall(teempArr[i]));
      }
      if (opString == "-") {
        teempVal -= parseFloat(funcToCall(teempArr[i]));
      }
      if (opString == "/") {
        teempVal /= parseFloat(funcToCall(teempArr[i]));
      }
    }
    return teempVal;
  } else {
    var temp2 = funcToCall(procNum);
    return temp2;
  }
}

function computeNumsMult(procNum) {
  if (procNum.includes("*")) {
    var temp7 = procNum.split("*");
    var temp8 = parseFloat(temp7[0]);
    for (var j = 1; j < temp7.length; j++) {
      temp8 *= parseFloat(temp7[j]);
    }
    return temp8;
  } else {
    return procNum;
  }
}

function dispRes(resVal) {
  document.getElementById("result").innerHTML = resVal;
}