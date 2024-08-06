# A web-based interactive browser inspired by ML4VIS

**Overview**

This github repo hosts a web-based interactive browser that has inspired new developments that now allow users to upload any work with any tags. This enhancement facilitates broader participation and the sharing of a wide range of contributions, fostering a more inclusive and comprehensive usage of ML4VIS applications.

ML4VIS
Browser: https://ml4vis.github.io
Preprint: https://arxiv.org/abs/2012.00467

**Usage**
This browser takes a json file to load, the suggested format of the json file is as follows:
{
  "title": "",
  "colors": ["#000", "orange"],     
  "github": "",                
  "preprint": " ",      
  "topTheme": "#b31b1b",        
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
    "tag2": [""],
  }
}

-Explanantion of each category:
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
"papers"-"tags": tag1/tag2/tag3...      # You can include any tags here, for example: "Major": ["CS", "MATH", "STAT], "CS_BRANCH": ["Artificial Intelligence", "Machine Learning"]...

All categories are optional, we included an example json file 'arxiv_new.json' to demostrate (Replace the file name with your json file: const defaultVersion = "arxiv_new")

For avatar: the default setting is the acronym of the tag, you can replace it with an white icon image (for example: assets/avatars/Artificial_Intelligence_w.png)


### Run the code in your local machine
make sure you have node.js installed in your computer.

Install dependencies (only needed the first time)
```npm install```

Run the code
```npm run dev```
