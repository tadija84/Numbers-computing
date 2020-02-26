document.getElementById("inComputing").addEventListener("click", checkNums);

function checkNums() {
  var inputingValues = document.getElementById("inputedNums").value;
  var inputNums = /^((\s?)+?(\d+?){1,}(\s?)+?[+*\/-](\s?)+?(\d+?){1,}(\s?)+?(([+*\/-](\s?)+?(\d+?){1,})?(\s?)+?)+?)$/;
  var x = inputNums.test(inputingValues);
  if (x == false) {
    alert("Please enter the regular math operation.");
  }
  var strimedString = inputingValues.replace(/\s/g, "");
  var resulting = computeNumsPlus(strimedString);
  dispRes(resulting);
}

function computeNumsPlus(procNum) {
  if (procNum.includes("+")) {
    var teempArr = procNum.split("+");  
    var teempVal = parseInt(computeNumsMin(teempArr[0]));
    for (var i = 1; i < teempArr.length; i++) {
      teempVal += parseInt(computeNumsMin(teempArr[i]));   
    }
    return teempVal;
  } else {
    var temp2 = computeNumsMin(procNum);
    return temp2;
  }
}


function computeNumsMin(procNum) {
  if (procNum.includes("-")) {
    var teempArr = procNum.split("-");  
    var teempVal = parseInt(computeNumsDiv(teempArr[0]));
    for (var i = 1; i < teempArr.length; i++) {
      teempVal -= parseInt(computeNumsMin(teempArr[i]));   
    }
    return teempVal;
  } else {
    var passed = computeNumsDiv(procNum);
    return passed;
  }
}


function computeNumsDiv(procNum) {
  if (procNum.includes("/")) {
    var teempArr = procNum.split("/");  
    var teempVal = parseInt(computeNumsMult(teempArr[0]));
    for (var i = 1; i < teempArr.length; i++) {
      teempVal /= parseInt(computeNumsMult(teempArr[i]));   
    }
    return teempVal;
  } else {
    var passed = computeNumsMult(procNum);
    return passed;
  }
}

function computeNumsMult(procNum) {
  if (procNum.includes("*")) {
    var temp7 = procNum.split("*");
    var temp8 = parseInt(temp7[0]);
    for (var j = 1; j < temp7.length; j++) {
      temp8 *= parseInt(temp7[j]);
    }
    return temp8;
  } else {
    return procNum;
  }
}

function dispRes(resVal) {
  document.getElementById("result").innerHTML = resVal;
}
