const fs = require('fs')
const pluginSass = require("eleventy-plugin-sass");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const markdownIt = require("markdown-it");
const md = new markdownIt();
const pluginRss = require("@11ty/eleventy-plugin-rss");
const referenceTags = JSON.parse(fs.readFileSync('./_data/referenceTags.json'))

module.exports = function (eleventyConfig) {
    eleventyConfig.addShortcode("bigImage", function (url, caption) {
        if (!caption) { caption = '' }
        return (
            `<figure class='bigImage'>
            <img loading="lazy" src='${url}'/>
            <figcaption>${md.render(caption)}</figcaption>
            </figure>
            `
        );
    });

    eleventyConfig.addFilter("renderMarkdown", function (value) {
        return md.render(value);
    });
    eleventyConfig.addFilter("slug", function (s) {
        return s.replace(/ /g, "-").replace("'", "").toLowerCase();
    });

    eleventyConfig.addShortcode("inlineImage", function (url, caption) {
        if (!caption) { caption = '' }
        return (
            `<img loading="lazy" data-caption='${md.render(caption)}' class='inline-image' src='${url}'/>`
        );
    });

    eleventyConfig.addShortcode("footnote", function (content) {
        return (`
            <span class="fn" data-content='${md.render(content)}'>
            </span>
        `);
    });

    eleventyConfig.addTransform("resolveFootnotes", function (content, outputPath) {
        if (outputPath.endsWith(".html")) {
            const dom = new JSDOM(content)
            let transformed = "";
            const footnotes = dom.window.document.querySelectorAll('.fn')
            const footnoteContainer = dom.window.document.querySelector('.post-footnotes')
            if (footnotes && footnoteContainer) {
                const footnoteList = dom.window.document.createElement('ol')
                footnotes.forEach((fn, i) => {
                    const fnItem = dom.window.document.createElement('li')
                    fn.textContent = i + 1
                    fnItem.innerHTML = fn.getAttribute('data-content')
                    footnoteList.appendChild(fnItem)
                })
                footnoteContainer.appendChild(footnoteList)
                transformed = dom.serialize();
                return transformed;
            }
        }
        return content;
    });

    eleventyConfig.addCollection("articles", function (collectionApi) {
        return collectionApi.getFilteredByGlob(["./articles/*.md"]).sort(function (a, b) {
            const da = new Date(a.data.date)
            const db = new Date(b.data.date)
            return db - da;
        });
    });

    eleventyConfig.addCollection("events", function (collectionApi) {
        return collectionApi.getFilteredByGlob(["./events/*.md"]).sort(function (a, b) {
            const da = new Date(a.data.event.start)
            const db = new Date(b.data.event.start)
            return db - da;
        });
    });

    referenceTags.forEach(t => {
        eleventyConfig.addCollection(t, function (collectionApi) {
            return true;
        });
    })


    eleventyConfig.addPassthroughCopy("./dist");
    eleventyConfig.addPassthroughCopy("assets");
    eleventyConfig.addPassthroughCopy("*.png");
    eleventyConfig.addPassthroughCopy("/*.xml");
    eleventyConfig.addPassthroughCopy("favicon.ico");

    eleventyConfig.addWatchTarget("./dist/main.js");

    eleventyConfig.addPlugin(pluginRss);
    eleventyConfig.addPlugin(pluginSass, {});
};