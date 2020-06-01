const pluginSass = require("eleventy-plugin-sass");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const markdownIt = require("markdown-it");
const md = new markdownIt();

module.exports = function (eleventyConfig) {


    eleventyConfig.addShortcode("fig", function (url, caption) {
        return (
            `<figure>
                <img loading="lazy" src='${url}'/>
                <figcaption>${md.render(caption)}</figcaption>
            </figure>
            `
        );
    });

    eleventyConfig.addShortcode("fn", function (content) {
        return (`<span class="fn" data-content="${content}"></span>`
        );
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
                    fnItem.innerHTML = md.render(fn.getAttribute('data-content'))
                    footnoteList.appendChild(fnItem)
                })
                footnoteContainer.appendChild(footnoteList)
                transformed = dom.serialize();
                return transformed;
            }
        }
        return content;
    });

    eleventyConfig.addPassthroughCopy("./dist");
    eleventyConfig.addPassthroughCopy("assets");
    eleventyConfig.addPassthroughCopy("/*.png");
    eleventyConfig.addPassthroughCopy("/*.png");
    eleventyConfig.addPassthroughCopy("/*.xml");
    eleventyConfig.addPassthroughCopy("favicon.ico");
    
    eleventyConfig.addWatchTarget("./dist/");

    eleventyConfig.addPlugin(pluginSass, {});
};