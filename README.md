# An Interactive Web-Based Browser for Paper Surveys (and Other Awesome Lists!)

## Overview

This codebase was originally developed to host [our ML4VIS Survey](https://ml4vis.github.io). 
We later received several requests about using the code base for hosting their own surveys, and thus modified it and created this repository. 
Now, you can host customized surveys by simply modifying a JSON file (`assets/papers.json`).

Developed and tested using node.js@16.10.0

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
      "imagePath": "assets/paperImages/default.png", // optional field, if provided, show the image inside the paper card
      "url": "", // a new tab of this url will be open when click the paper card
      // optional field, if provided, key-value pair will display at the bottom of the paper card
      "others": {
        "authors": "",
        "doi": "xxx"
      },
      "dimension_one": [""],
      "dimension_two": [""]
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

`title`: 

`colors`: You can define any color here, we suggest 'num of colors' = 'num of unique dimensions'; Otherwise the browser will use the default color palatte

`homepage`: You can put the github link related to your work here

`preprint`: You can put the preprint link related to your work here

`topTheme`: You can define the theme color of the top bar here

`papers`: a list of papers. for each paper:
   
`name`: The name of the paper

    `name`: The venue of the work

"papers"-"year": The year of the work

"papers"-"imagePath": You can include an image associated with your work, you can put the path of your image here, the default path of images is as shown

"papers"- "url": You can include a direct url link associated with your work here

"papers"- "others": You can include any other information you want the browser include here

"papers"-"tags": tag1/tag2/tag3... # You can include any tags here, for example: "Major": ["CS", "MATH", "STAT], "CS_BRANCH": ["Artificial Intelligence", "Machine Learning"]...

-All categories are optional. We included an example JSON file arxiv_new.json to demonstrate (replace the file name with your JSON file: const defaultVersion = "arxiv_new").

Avatar: 
The default setting is the acronym of the tag. You can replace it with a white icon image (for example: assets/avatars/Artificial_Intelligence_w.png).


### Run the code in your local machine


Install dependencies (only needed the first time)
```npm install```

Run the code
```npm run dev```
