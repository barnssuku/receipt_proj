'use strict';
(
    // Database to use in storing the values 
    var db = PouchDB('receipt');
    ///////////////////////////////////////
    function generateDateTime() {
        var date = new Date();
        return date.toUTCString();
    }

    function generateTransID() {
        var id = Math.floor(Math.random() * 1000000000);
        return id;
    }

    function generateSolID() {
        var id = Math.floor(Math.random() * 10000);
        return id;
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

    function checkEntry() {})();