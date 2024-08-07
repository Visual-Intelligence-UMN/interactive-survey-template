# An Interactive Web-Based Browser for Paper Surveys (and Other Awesome Lists!)

## Overview

This codebase was originally developed to host [our ML4VIS Survey](https://ml4vis.github.io). 
We later received several requests about using the code base for hosting their own surveys, and thus modified it and created this repository. 
Now, you can host customized surveys by simply modifying a JSON file (`assets/papers.json`).

Developed and tested using `node.js@16.10.0`

## How to host it on github page


## How to modify the JSON file

You can see a detailed example in `assets/papers.json`.
Below is an explanation of the JSON format.

```json
{
  "title": "", // The name of ypur survey, will show in the header
  "colors": ["#000", "orange"], // your homepage link
  "homepage": "",
  "preprint": " ", // preprint link
  "topTheme": "#333", // color of the top bar
  // below is a list of papers
  "papers": [
    {
      "name": "",
      "venue": "",
      "year": 2024,
      "imagePath": "assets/paperImages/paper1.png", // optional field, if provided, show the image inside the paper card
      "url": "", // optional, a new tab of this url will be open when click the paper card. Otherwise, the new tab will show google search results of the paper name
      
      "others": { // optional field, if provided, key-value pair will display at the bottom of the paper card
        "authors": "",
        "doi": "xxx"
      },
      "dimension_one": ["tag 1", "tag 2"], // encodings of the paper
      "dimension_two": ["tag 1"]
    },
    {
        // paper 2
    },
    // other papers
    //...
  ]
}
```

**Add Paper Figures and Tag Icons**
- You can store paper images in the `assets/paperImages/ directory` and specify the path name in the imagePath.
- Icons images of tags can be stored in `assets/avators`,  with filenames in the format `{dimension name}_{tag name}.png`. If an icon image is not specified, the first character of the tag name will be used as the icon by default.


### Run the code in your local machine


Install dependencies (only needed the first time)
```npm install```

Run the code
```npm run dev```

Open `http://localhost:21002/` in your web browser.
