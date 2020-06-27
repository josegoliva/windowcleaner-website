import List from 'list.js';
import {gra, gri} from './util.js';

window.addEventListener('DOMContentLoaded', () => {
    const referenceList = document.querySelector(".references-container")
    const logo = document.querySelector(".site-logo")
    logo.style.left = `${gri(0, 50)}%`
    logo.style.top = `${gri(0, 80)}%`
    const options = {

        valueNames: [
            'reference-title',
            'reference-date',
            'reference-location',
            'reference-name',
            'tags-hidden'
        ]
    };
    let sortableList = new List(referenceList, options);
})