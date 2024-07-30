const fs = require('fs')

const data = JSON.parse(fs.readFileSync('./new_data.json'))
const output = []

const CATEGORYMAPs = {}

// Find all unique categories and its tags(the unique values)
for (const item of data) {
    for (const key in item) {
        console.log('key:', key)
        if (Array.isArray(item[key]) && key !== 'paper name' && key !== 'venue' && key !== 'year') {
        if (!CATEGORYMAPs[key]) {
            CATEGORYMAPs[key] = {}
        }
        // console.log('CATEGORYMAPs keys:', CATEGORYMAPs[key])
        item[key].forEach(value => {
            console.log('value:', value)
            if (!CATEGORYMAPs[key][value]) {
            CATEGORYMAPs[key][value] = value
            }
        })
        }
    }
}
const formattedOutput = {};
for (const key in CATEGORYMAPs) {
    formattedOutput[key] = Object.keys(CATEGORYMAPs[key]);
}

console.log(formattedOutput);

for (const item of data) {
    const processedItem = {
        name: item['paper name'],
        venue: item.venue,
        year: item.year
    }

    for (const category in CATEGORYMAPs) {
        if (item[category]) {
        processedItem[category] = item[category].filter(value => CATEGORYMAPs[category][value])
        }
    }

    output.push(processedItem)
}

// fs.writeFileSync('papers.json', JSON.stringify(output), { encoding: 'utf-8' })

console.log('CATEGORYMAPs:', JSON.stringify(CATEGORYMAPs, null, 2))
// console.log('Output:', JSON.stringify(output, null, 2))