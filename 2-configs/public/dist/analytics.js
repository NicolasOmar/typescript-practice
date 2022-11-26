"use strict";
let logged;
const sendAnalytics = (data) => {
    console.log(data);
    logged = true;
};
sendAnalytics('Sending to the server...');
