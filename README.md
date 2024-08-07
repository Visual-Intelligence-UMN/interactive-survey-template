# An Interactive Web-Based Browser for Paper Surveys (and Other Awesome Lists!)

## Overview

This codebase was originally developed to host [our ML4VIS Survey](https://ml4vis.github.io). 
We later received several requests about using the code base for hosting their own surveys, and thus modified it and created this repository. 
Now, you can host customized surveys by simply modifying a JSON file (`assets/papers.json`).

This repo is developed and tested using `node.js@16.10.0`

## How to host it on github page
### 1. Fork the Repository

Fork this repository to your GitHub account by clicking the "Fork" button at the top right corner of the repository page.

### 2. Enable GitHub Actions

Go to your forked repository, navigate to the "Actions" tab, and enable GitHub Actions by clicking the "Enable Actions" button.

### 3. Enable GitHub Pages

1. Go to the "Settings" tab of your forked repository.
2. Scroll down to the "Pages" section in the left sidebar.
3. Under "Source," select "Deploy from a branch."
4. Choose the `gh-pages` branch and click "Save."

### 4. Update `papers.json`

Update the `papers.json` file to include your own list of papers. Add icon figures and paper figures as needed:

- Store paper images in the `assets/paperImages/` directory.
- Store icon images in the `assets/avatars` directory, named as `{dimension name}_{tag name}.png`. If an icon image is not specified, the first character of the tag name will be used as the icon by default.

Detailed instructions on modifying the `papers.json` file can be found below.

### 5. Update `package.json`

Update the `homepage` field in `package.json` to match your GitHub account:

```json
"homepage": "https://{your-github-username}.github.io/interactive-survey-template/"
```
Replace {your-github-username} with your actual GitHub username.

### 6. Push Changes and Deploy
After making the necessary updates, commit your changes and push the changes to the main branch of your repository.
GitHub Actions will automatically start the deployment process once changes are pushed.
Once successfully deployed, your survey will be avaiable at `https://{your-github-username}.github.io/interactive-survey-template/`


If you needed to change the repository name ([how to rename a repo](https://docs.github.com/en/repositories/creating-and-managing-repositories/renaming-a-repository#)), please also update the homepage field in package.json accordingly to `https://{your-github-username}.github.io/{new-repo-name}/`

Push the changes, and the survey website will now be available at the new url.

## How to modify the JSON file

You can see a detailed example in `assets/papers.json`.
Below is an explanation of the JSON format.

```javascript
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
