import List from 'list.js';

window.addEventListener('DOMContentLoaded', () => {
    const referenceList = document.querySelector(".references-container")
    const options = {
        valueNames: [
            'reference-title',
            'reference-date',
            'reference-location',
            'reference-name'
        ]
    };
    let sortableList = new List(referenceList, options);
})