'use strict';
// Database to use in storing the values
var db = new PouchDB('receipt');
///////////////////////////////////////

function generateDateTime() {
    var date = new Date();
    // we add the date of transaction onto our page
    transDate.innerHTML = date.toUTCString();
    //return date.toUTCString();
}

function generateTransID() {
    var id = Math.floor(Math.random() * 1000000000);
    transID.innerHTML = id;
    //return id;
}

function generateSolID() {
    var id = Math.floor(Math.random() * 10000);
    solID.innerHTML = id;
    //return id;
}

function saveRecord() {
  // write the code to check for empty fields bellow this line


    var record = {
        "_id": accountNum.value
        , "solID": solID.innerHTML
        , "transID": transID.innerHTML
        , "transDateTime": transDate.innerHTML
        , "acctNum": accountNum.value
        , "acctName": accountName.innerHTML
        , "transDesc": descOfTrans.value
        , "depositor": nameOfDepos.value
        , "amountWords": amountInWords.value
        , "total": total.value
    };
    // Insert record into the database.
    db.put(record);

    // If we are sure our data is stored onto the database
    // we go ahead and clear out the fields for next entry.
    console.log(record);
}

function checkEntry() {

}

function clearEntry(){
  // We set the value of the fields to blank
  // in anticipation for our next transaction.
  // But new id's and transaction dates will be
  // recalculated.
  var solID = generateSolID();
  solID.innerHTML = solID;
  var transID = generateTransID();
  transID.innerHTML = transID;
  var transDate = generateDateTime();
  transDate.innerHTML = transDate;
  var clearValue = '';
  accountNum.value = clearValue;
  accountName.innerHTML = clearValue;
  descOfTrans.value = clearValue;
  nameOfDepos.value = clearValue;
  amountInWords.value = clearValue;
  total.value = clearValue;
}

function getAccountName(){
  var accountNumString = accountNum.value;
  if (accountNumString == ''){
    // Clear any initial error message or
    // account name assignment
    errorDisplay.innerHTML = '';
    accountName.innerHTML = '';
    // Now do the error assigment.
    errorDisplay.innerHTML = 'Sorry: Please enter an account number';
    return;
  }
  var digitSize = accountNumString.length;
  if (digitSize != 10){
    // Clear any initial error message or
    // account name assignment
    errorDisplay.innerHTML = '';
    accountName.innerHTML = '';
    // Now do the error assigment.
    errorDisplay.innerHTML = 'Sorry: Account digits not complete.';
    return;
  }

  // Split the string in to array to prepare it for
  // checking each digit.
  // It is important to do it this way to avoid any
  // form of errors or unexpected results.
  var accountDigitsArray = accountNumString.split('');
  var digit
  // We make comparisons making sure our digits
  // only mathch 0 - 9 and not letters of alpahnumerics.
  for (var i = 0; i < accountDigitsArray.length; i = i + 1){
    digit = parseInt(i);
    if(digit == NaN){
      // Clear any initial error message or
      // account name assignment
      errorDisplay.innerHTML = '';
      accountName.innerHTML = '';
      // Now do the error assigment.
      errorDisplay.innerHTML = 'Sorry: Account number not correct. Only digits allowed.';
      return;
    }
  }
  // Access the database
  var accounts = new PouchDB('accounts');
  // get the particular account record using the account number
  //var accountRecord = accounts.get(accountNumString);
  //console.log(accountRecord);
  accounts.get(accountNumString).then(function (doc) {
    // Need to find a way to take care of situation
    // were a wrong account number was entered.

    // Clear any initial error message or
    // account name assignment
    errorDisplay.innerHTML = '';
    accountName.innerHTML = '';
    // Now do the assigment.
    accountName.innerHTML = doc.acct_name;
  });
}

// Get a handle of all the on form elements using their id's
var solID = document.getElementById('sol-id');
var transID = document.getElementById('trans-id');
var transDate = document.getElementById('trans-date');
var accountNum = document.getElementById('acct-num');
var accountName = document.getElementById('acct-name');
var descOfTrans = document.getElementById('transaction');
var nameOfDepos = document.getElementById('depos-name');
var amountInWords = document.getElementById('amount-in-words');
var total = document.getElementById('total');
var errorDisplay = document.getElementById('error-display');
// handlers for the buttons
var saveBt = document.getElementById('save-bt');
var clearBt = document.getElementById('clear-bt');

// Once application starts we will need part of our information
// entered
generateSolID();
generateTransID();
generateDateTime();
// activating the method is only through an event.
// we also have to handle this event for all stanaard
// browsers.
if (accountNum.addEventListener){ // for all major browsers.
  accountNum.addEventListener("blur", getAccountName, false);
} else if (accountNum.attachEvent){ // for IE 8 and earlier versions
  accountNum.attachEvent("onblur", getAccountName);
}

// addEventListeners to the buttons
if (clearBt.addEventListener){
  clearBt.addEventListener('click', clearEntry, false);
} else if (clearBt.attachEvent){
  clearBt.attachEvent('onclick', clearEntry);
}

if (saveBt.addEventListener){
  saveBt.addEventListener('click', saveRecord, false);
} else if (saveBt.attachEvent){
  saveBt.attachEvent('onclick', saveRecord);
}
