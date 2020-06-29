# Windowcleaner Website

The website is built with a static site generator, which means that all the pages and content exist as text documents which get processed into HTML pages by a command line program.

This can happen in two ways:

- You do it locally on your own machine
- You push to the github repository, and netlify will notice, run the build for you and publish the new version of the site.
- You manually trigger a build from the netlify admin

In practice, you would probably do both — you use your local version as a preview, and when everything is good to go you push to the repository.


## Development Setup

Install git, node, and a code editor like Visual Studio Code. [Here are some nice instructions on how to do that.](https://awesomephant.github.io/untitled-coding-workshop/chapters/tools/)

When you’ve done that, you can clone (meaning *make a local copy of*) the site repository by running:


    git clone https://github.com/awesomephant/windowcleaner-website

Then, run  `cd windowcleaner-website`  to enter the folder you’ve just created, and `npm install` to install the necessary dependencies (this may take a few minutes). Finally, you can run:


    npm run start

This will build the site and start a preview server on your machine. It will also watch the sourcecode and rebuild the site automatically whenever you make a change.

Open your browser, and navigate to  `http://localhost:8080` to see the preview.

## Adding/Editing Articles

Articles live in the `/articles` folder. Each article is a text file that looks like something like this:


    ---
    layout: post
    author: jose-olivia
    tags:
        - articles
        - labour
        - performance
    title: Latinos are Very Serviceable, and People Here Like That.
    date: 2020-03-01
    ---
    
    *To give a bit of context*: My name is Jose Garcia Olivia, and I was born in Caracas, Venezuela. When I came to the RCA, what I realised is that the first contact I had with people from South America in London were the cleaners working at the College (Julian, Jorge and Diego from Colombia – and Javier from Bolivia)...

Everything between the dashes at the top of the file is meta-information. Note that you have to set `layout: post` for the article to render correctly, and add the special tag `articles` so it shows up in the right places.

The main text of the article lives under the meta-information. Here, you can use markdown to apply basic formatting. See [this guide for the syntax](https://guides.github.com/features/mastering-markdown/).

Beyond standard markdown, a couple of special syntax elements are available.

**Footnotes**

    Here is a sentence with a footnote {% footnote "This text will go into the footnote"%} in the middle of it.

Markdown formatting is supported inside the footnote text.

**Big Images**

    {% bigImage "/assets/myImage.jpg" "Caption goes here"%}

Markdown formatting is supported in the caption

**Inline Images**

    Here is a sentence with a tiny image {% inlineImage "Caption goes here" %} in the middle of it.

Markdown formatting is supported in the caption

Once you’ve finished making changes, push them to the repository by running


    git add .
    git commit -m "A short summary of what you did"
    git push


## Adding/Editing Events

Events live in the `/events` folder. Formatting works the same as [articles](https://paper.dropbox.com/doc/Windowcleaner-Website-Manual--A2xIm2f_cuOhZvj2wfoLz_bcAg-sb2JNa0FQg87qLx1jcqM5#:uid=887227699861325353249355&h2=Adding/Editing-Articles). 


## Adding/Editing Authors

We keep information about authors inside `/data/authors.json` , so the information stays consistent everywhere on the site. The file looks like this:


    [
        {
            "name": "Jose Garcia Olivia",
            "id": "jose-olivia",
            "bio": "Bio goes here" 
        }
    ]


## Adding/Edting References

The collaborative reference list lives in [this spreadsheet](https://docs.google.com/spreadsheets/d/1-QQNlh1FwsTEmwdYni0hfT4HMzutPspM9pTVR4VDZlE/edit?usp=sharing). The build process downloads it and turns it into HTML pages.

This will happen automatically everytime you push, or you can get the data manually by running `npm run build`. Note that `npm run watch` **does not** pull the spreadsheet data for performance reasons (we don’t want to download the spreadsheet every time you hit save).

Note that it can take a few minutes for changes to the spreadsheet to become available to our build process.

