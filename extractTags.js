const fs = require('fs');

const refs = JSON.parse(fs.readFileSync('./_data/references.json'))
let tags = [];

refs.forEach(r => {
    r.tags.forEach(t => {
        if (!tags.includes(t) && t !== "") {
            tags.push(t)
        }
    })
})

console.log(`Found ${tags.length} unique tags in /_data/references.json`);
fs.writeFileSync('./_data/referenceTags.json', JSON.stringify(tags))
console.log(`Wrote ${tags.length} tags to /_data/referenceTags.json`);