const fs = require('fs')
const fetch = require('node-fetch');
const parse = require('csv-parse')
const sheetURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vR9sTN1fH-bYTSRvbJkLgxrsneP4ZpNlwuk59x_OoDJI6NU_R_vl5GnTpMIfMrBr0zyjx_4u4h_HFvn/pub?gid=0&single=true&output=csv"

fetch(sheetURL)
    .then(res => res.text())
    .then(body => {
        parse(body, { columns: true }, function (err, data) {
            console.log(`${data.length} references found.`)
            data.forEach(row => {
                row.tags = row.tags.split(" ")
            })
            fs.writeFileSync('./_data/references.json', JSON.stringify(data, null, '  '))
        })
    });