'use strict';
var accounts = new PouchDB('accounts');
// Create a bulkDoc for bulk input into the database.
accounts.bulkDocs([
    {
        "_id": 1000234095,
        "acct_name": 'Albert Nebanat Suku'
    },
    {
        "_id": 2222949636,
        "acct_name": 'Balat Bala Alheri'
    },
    {
      "_id": 7007007291,
      "acct_name": 'Ladi Abba Kalat'
    },
    {
      "_id": 4356362215,
      "acct_name": 'Joseph Bonet'
    },
    {
      "_id": 2500257274,
      "acct_name": "Gambo Salama Gandu"
    },
    {
      "_id": 6022244726,
      "acct_name": "Salama Ochepa"
    }
]);
