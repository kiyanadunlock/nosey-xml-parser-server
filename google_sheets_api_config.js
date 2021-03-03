const {google} = require('googleapis');
const keys = require('./google_keys.json');

//https://nodejs.org/en/
//https://code.visualstudio.com/
//https://developers.google.com/sheets/api/quickstart/nodejs
//https://console.developers.google.com
//https://developers.google.com/identity/protocols/oauth2/scopes

const client = new google.auth.JWT(
    keys.client_email,
    null,
    keys.private_key,
    ['https://www.googleapis.com/auth/spreadsheets']
);

client.authorize(function(err,tokens){
    if(err){
        console.log(err);
        return;
    }
        else {
            console.log('connected');
            gsrun(client);
        }
});

async function gsrun(cl){
    const gsapi = google.sheets({version: 'v4',  auth: cl});
    const opt  = {
        spreadsheetId: '1k4VuPPgQZntI3E2Kwx14b4A3aWG4HgZC1gFGaZj6NsQ',
        range: 'A1:D7'
    };

    let data = await gsapi.spreadsheets.values.get(opt);

    let dataArray = data.data.values;
    dataArray = dataArray.map( d => {
        while(d.length < 2) {
            d.push(' ');
        }
        return d;
    })

    let newData = dataArray.map( d => {
        d.push(d[0] + '-' + d[1]); 
        return d;
    })


    console.log(newData);


    const updateOptions  = {
        spreadsheetId: '1k4VuPPgQZntI3E2Kwx14b4A3aWG4HgZC1gFGaZj6NsQ',
        range: 'E2',
        valueInputOption: 'USER_ENTERED',
        resource: { values: newData }
    };

    let updateRes = await gsapi.spreadsheets.values.update(updateOptions);
    console.log(updateRes);
}