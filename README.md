# A Web-Based Interactive Browser Inspired by ML4VIS

## Overview

This GitHub repository hosts a web-based interactive browser inspired by ML4VIS. It allows users to upload any work with any tags, facilitating broader participation and the sharing of diverse contributions. This enhancement fosters a more inclusive and comprehensive usage of ML4VIS applications.

- **ML4VIS Browser**: [https://ml4vis.github.io](https://ml4vis.github.io)
- **Preprint**: [https://arxiv.org/abs/2012.00467](https://arxiv.org/abs/2012.00467)

## Usage

This browser takes a JSON file to load. The suggested format of the JSON file is as follows:

```json
{
  "title": "",
  "colors": ["#000", "orange"],
  "github": "",
  "preprint": " ",
  "topTheme": "#b31b1b",
  "papers": [
    {
      "name": "",
      "venue": "",
      "year": 2024,
      "imagePath": "assets/paperImages/default.png",
      "url": "",
      "others": {
        "authors": "",
        "doi": "xxx"
      },
      "tag1": [""],
      "tag2": [""]
    }
  ]
}
```

## Explanation of Each Category
"title": The name of ypur survey/study/reserach

"colors": You can define any color here, we suggest 'num of colors' = 'num of unique tag'; Otherwise the browser will use the default color defined by us

"github": You can put the github link related to your work here

"preprint": You can put the preprint link related to your work here

"topTheme": You can define the theme color of the top bar here

"papers"-"name": The name of the work

"papers"-"venue": The venue of the work

"papers"-"year": The year of the work

"papers"-"imagePath": You can include an image associated with your work, you can put the path of your image here, the default path of images is as shown

"papers"- "url": You can include a direct url link associated with your work here

"papers"- "others": You can include any other information you want the browser include here

"papers"-"tags": tag1/tag2/tag3... # You can include any tags here, for example: "Major": ["CS", "MATH", "STAT], "CS_BRANCH": ["Artificial Intelligence", "Machine Learning"]...

-All categories are optional. We included an example JSON file arxiv_new.json to demonstrate (replace the file name with your JSON file: const defaultVersion = "arxiv_new").

Avatar: 
The default setting is the acronym of the tag. You can replace it with a white icon image (for example: assets/avatars/Artificial_Intelligence_w.png).


### Run the code in your local machine
make sure you have node.js installed in your computer.

Install dependencies (only needed the first time)
```npm install```

Run the code
```npm run dev```
