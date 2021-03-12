import List from 'list.js';
import dayjs from 'dayjs'
import { gra, gri } from './util.js';
import textBalancer from 'text-balancer';

window.addEventListener('DOMContentLoaded', () => {
    textBalancer.balanceText('.post-card-title');
    const homeEventContainer = document.querySelector(".home-events")
    const referenceList = document.querySelector(".references-container")
    const logo = document.querySelector(".site-logo")
    logo.style.left = `${gri(0, 30)}%`
    logo.style.top = `${gri(25, 50)}%`
    logo.setAttribute('src', `/assets/logo-${gri(0, 3)}.png`)
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

    const events = document.querySelectorAll('.event, .event-card')

    events.forEach(event => {
        const now = dayjs();
        const startDate = dayjs(event.getAttribute('data-start'));
        const endDate = dayjs(event.getAttribute('data-end'));
        if (startDate.isAfter(now)) {
            event.setAttribute('data-status', 'upcoming')
        } else if (startDate.isBefore(now) && endDate.isAfter(now)) {
            event.setAttribute('data-status', 'ongoing')
        } else {
            event.setAttribute('data-status', 'past')
        }
    })

    const footnotes = document.querySelectorAll(".fn")
    const fnModal = document.querySelector(".fn-modal")

    if (fnModal) {

        footnotes.forEach(fn => {
            fn.addEventListener('mouseover', () => {
                const box = fn.getBoundingClientRect();
                fnModal.innerHTML = fn.getAttribute('data-content')
                fnModal.classList.add('active')
                fnModal.style.left = `${box.left}px`;
                fnModal.style.top = `${box.top}px`;
            })
        })

        fnModal.addEventListener('mouseleave', () => {
            fnModal.classList.remove('active')
        })
    }

    const inlineImages = document.querySelectorAll(".inline-image")
    const imageModal = document.querySelector(".image-modal")
    if (imageModal) {

        inlineImages.forEach(img => {
            img.addEventListener('mouseover', () => {
                imageModal.classList.add('active')
                const imgEl = imageModal.querySelector('img')
                const imgCaption = imageModal.querySelector('figcaption')
                imgEl.setAttribute('src', img.getAttribute('src'))
                imgCaption.innerHTML = img.getAttribute('data-caption')
            })
        })

        imageModal.addEventListener('click', () => {
            imageModal.classList.remove('active')
        })

    }
    if (homeEventContainer) {
        allEvents.forEach(e => {
            const start = dayjs(e.start);
            const end = dayjs(e.end);
            const now = dayjs()
            console.log(end)
            if (start.isAfter(now)) {
                let el = document.createElement('article')
                el.classList.add("post-card")
                el.classList.add("event-card")

                let h2 = document.createElement('h2')
                h2.classList.add("post-card-title")

                let a = document.createElement('a')
                a.setAttribute('href', e.url);
                a.textContent = e.title;

                let status = document.createElement('span')
                status.classList.add("status")
                status.textContent = "Upcoming Event";

                let date = document.createElement('span')
                date.classList.add("date")
                date.textContent = start.format("MMMM DD, YYYY");

                h2.appendChild(a)
                el.appendChild(status)
                el.appendChild(h2)
                el.appendChild(date)
                homeEventContainer.appendChild(el)
            } else if (start.isBefore(now) && end.isAfter(now)){
                console.log("ongoing")
                let el = document.createElement('article')
                el.classList.add("post-card")
                el.classList.add("event-card")

                let h2 = document.createElement('h2')
                h2.classList.add("post-card-title")

                let a = document.createElement('a')
                a.setAttribute('href', e.url);
                a.textContent = e.title;

                let status = document.createElement('span')
                status.classList.add("status")
                status.textContent = "Ongoing Event";

                let date = document.createElement('span')
                date.classList.add("date")
                date.textContent = "Ends " + end.format("MMMM DD, YYYY");

                h2.appendChild(a)
                el.appendChild(status)
                el.appendChild(h2)
                el.appendChild(date)
                homeEventContainer.appendChild(el)
            }
        })
    }

})