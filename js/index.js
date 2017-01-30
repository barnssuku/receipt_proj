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

function saveRecord(_id, solID, transID, transDateTime, acctNum, acctName, transDesc, depositor, amountWords, total) {
    var record = {
        "_id": _id
        , "solID": solID
        , "transID": transID
        , "transDateTime": transDateTime
        , "acctNum": acctNum
        , "acctName": acctName
        , "transDesc": transDesc
        , "depositor": depositor
        , "amountWords": amountWords
        , "total": total
    };
    // Insert record into the database.
    db.put(record);
}
function checkEntry() {}

function getAccountName(){
  var accountNumString = accountNum.value;
  if (accountNumString == ''){
    // This is for debug purposes
    alert('Sorry: Please enter an account number');
    return;
  }
  var digitSize = accountNumString.length;
  if (digitSize != 10){
    // This is for debug purposes.
    alert('Sorry: Account digits not complete.');
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
      // This is for debug purposes.
      alert('Sorry: Account number not correct. Only digits allowed.');
      return;
    }
  }
  // Access the database
  var accounts = new PouchDB('accounts');
  // get the particular account record using the account number
  //var accountRecord = accounts.get(accountNumString);
  //console.log(accountRecord);
  accounts.get(accountNumString).then(function (doc) {
    console.log(doc);
  });
}

// Get a handle of all the on form elements using their id's
var solID = document.getElementById('sol-id');
var transID = document.getElementById('trans-id');
var transDate = document.getElementById('trans-date');
var accountNum = document.getElementById('acct-num');
var accountName = document.getElementById('acct-name');
var descOfTrans = document.getElementById('desc-of-trans');
var nameOfDepos = document.getElementById('depos-name');
var amountInWords = document.getElementById('amount-in-words');
var total = document.getElementsByClassName('total');

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
