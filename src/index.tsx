import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import {
  Typography,
  CssBaseline,
  Paper,
  ThemeProvider,
} from "@material-ui/core";

import { TopBar } from "./TopBar";
import { Papers } from "./Papers";
import { SideBar } from "./SideBar";
import { TPaperMatrix } from './ChartModal'

import { useStyles, theme } from "./style";
import { use } from "echarts";

//Use tags dynamically
let allTags = {};
export const getAllTags = () => allTags;
export const setAllTags = (newTags) => {
  allTags = newTags;
};


export interface Paper {
  name: string;
  venue: string;
  year: number;
  [key: string]: any;
  url?: string;
}

// const getAvatarPath = (tag) => {
//   return `assets/avatars/${tag.replace(/\s+/g, '_')}_w.png`;
// };

export const getAvatar = (s: string) => {
  const pieces = s.split(" ");
  if (pieces.length > 1) {
    return `${pieces[0][0].toUpperCase()}${pieces[1][0].toUpperCase()}`;
  } else if(s === 'Clustering') {
      return 'CLT'
  } else if(s === 'Classification') {
      return 'CLS'
  } else if (s === 'Regression') {
      return 'RE'
  } else if (s === 'Reinforcement') {
      return 'RF'
  } else if(pieces.length == 0) {
      return '-'
  }
  return `${pieces[0][0].toUpperCase()}`;
};


export default function App() {
  const classes = useStyles();
  // const defaultVersion = "latest"
  const defaultVersion = "tags"
  // const defaultVersion = "papers"
  // const defaultVersion = "CHI2024"

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [papers, setPapers] = useState<Paper[]>([]);
  const [title, setTitle] = useState<string>('');
  // const [VISTags, setVISTags] = useState({});
  // const [MLTags, setMLTags] = useState({});
  const [tags, setTags] = useState({});
  const [tagFilters, setTagFilters] = useState({});
  const [searchKey, setSearchKey] = useState('');
  const [version, setVersion] = useState(defaultVersion);

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const [paperYear, setPaperYears] = useState<{[k:string]:number}>({});
  const [paperArea, setPaperAreas] = useState<{[k:string]:number}>({});
  const [paperMatrix, setPaperMatrix] = useState<TPaperMatrix>({VISData:[], VISTags:[], MLTags:[], MLData:[], matrix: []});

  const isMenuOpen = Boolean(anchorEl);
  // const menuId = "primary-search-account-menu";


  // const fetchData = async (version) => {
  //   const papers = await fetch(`/assets/${version}.json`).then((res) =>
  //     res.json()
  //   );
  //   setPapers(papers);

  //   const TAGCOLLECTOR = {}
  //   for (const paper of papers) {
  //     for (const key in paper) {
  //       if (Array.isArray(paper[key]) && key !== 'paper name' && key !== 'venue' && key !== 'year') {
  //         if (!TAGCOLLECTOR[key]) {
  //           TAGCOLLECTOR[key] = {};
  //         }
  //         paper[key].forEach(value => {
  //             if (!TAGCOLLECTOR[key][value]) {
  //               TAGCOLLECTOR[key][value] = true;
  //             }
  //         })
  //       }
  //     }
  //   }
  //   console.log("TAGCOLLECTOR: ", TAGCOLLECTOR)
    
  //   const collectedTags = {};
  //   for (const key in TAGCOLLECTOR) {
  //     // const [VISTags, setVISTags] = useState({});
  //     // const [MLTags, setMLTags] = useState({});
  //     // console.log("key: ", key);
  //     // const obj = {
  //     //   [key + "Tags"]: Object.keys(TAGCOLLECTOR[key])
  //     // };
  //     // console.log("obj: ", obj);
  //     // const {[key + "Tags"]: obj} = obj;
  //     collectedTags[key] = Object.keys(TAGCOLLECTOR[key]);
  //     // console.log("tags[key]: ", tags[key]);
  //   }
    
  //   console.log("collectedTags: ", collectedTags)

  //   // const tags = {
  //   //   ML: Array.from(collectedTags.ML),
  //   //   VIS: Array.from(collectedTags.VIS)
  //   // };

  //   // setTags(tags);

  //   const MLTags = collectedTags["ML"]
  //   const VISTags = collectedTags["VIS"]
    
  //   // const tags = [
  //   //   {groupName: 'ML', tags: ['clustring', ...]},
  //   //   {groupName: 'Fruit', tags: []}

  //   // ]

  //   // const initialVISTag = papers.reduce((o, d) => {
  //   //   d.VIS.forEach((v) => {
  //   //     if (!(v in o)) {
  //   //       o[v] = true;
  //   //     }
  //   //   });
  //   //   return o;
  //   // }, {})
  
  //   // const initialMLTag = papers.reduce((o, d) => {
  //   //   d.ML.forEach((v) => {
  //   //     if (!(v in o)) {
  //   //       o[v] = true;
  //   //     }
  //   //   });
  //   //   return o;
  //   // }, {})
  //   // console.log("initialMLTag", initialMLTag)

    // const initialPaperYear = papers.reduce((o, d) => {
    //   if (! (d.year in o)){
    //     o[d.year] = 1
    //   } else {
    //     o[d.year] +=1
    //   }
    //   return o
    // }, {})
    // console.log("initialPaperYear", initialPaperYear)
    
    

    // const initialPaperArea = papers.reduce((o, d) => {
    //   if (! (d.venue in o)){
    //     o[d.venue] = 1
    //   } else {
    //     o[d.venue] +=1
    //   }
    //   return o
    // }, {})

    
    
  //   // const MLTags = Object.keys(initialMLTag)
  //   // const VISTags = Object.keys(initialVISTag)
  //   console.log("MLTags", MLTags)
  //   console.log("VISTags", VISTags)

    // let initialMatrix = VISTags.map(_ =>MLTags.map( _ =>0))
    // console.log("initialMatrix", initialMatrix)

    // papers.forEach(p=>{
    //   VISTags.forEach((vis, i)=>{
    //     MLTags.forEach((ml, j)=>{
    //       if (p['ML'].includes(ml) && p['VIS'].includes(vis)) initialMatrix[i][j]+=1 
    //     })
    //   })
    // })

    // const matrix = initialMatrix.map((row, i)=>{
    //   return row.map((cell, j)=>{
    //     return [j, i, cell>0? cell : undefined] as [number, number, number|undefined]
    //   })
    // }).flat()

    // const MLData = MLTags.map(ml=>{
    //   return papers.filter(p=>p['ML'].includes(ml)).length
    // })

    // const VISData = VISTags.map(vis=>{
    //   return papers.filter(p=>p['VIS'].includes(vis)).length
    // })

  //   setPaperMatrix({MLTags, VISTags, MLData, VISData, matrix})
  //   setPaperAreas(initialPaperArea)
  //   setPaperYears(initialPaperYear)
  //   setVISTags(TAGCOLLECTOR["VIS"]);
  //   setMLTags(TAGCOLLECTOR["ML"]);

  // };

  const fetchData = async (version: string) => {
    const response = await fetch(`/assets/${version}.json`);
    const res = await response.json();
    const {papers, title} = res;
    console.log("Complete response:", res);
    console.log("Fetched papers:", papers); 
    
    setTitle(title);
    setPapers(papers);
    // if (papers) {
    //   console.log("papers exist")
    //   setPapers(papers);
    // } else {
    //     console.error("Papers data is undefined.");
    // }
    
  // const fetchData = async (version) => {
  //   const {papers, title} = await fetch(`/assets/${version}.json`).then((res) =>
  //     res.json()
  //   );
  //   // setTitle(title);
  //   setPapers(papers);

    const initialTags = {};
    const initialTagFilters = {};

    papers.forEach(paper => {
      Object.keys(paper).forEach(key => {
        // console.log("key: ", key)
        if (!['name', 'venue', 'year', 'url'].includes(key)) {
          // console.log("iniitialTags[key]: ", iniitialTags[key])
          if (!initialTags[key]) {
            // console.log("iniitialTags[key]: ", iniitialTags[key])
            initialTags[key] = new Set();
          }
          // console.log("paper[key]:", paper[key]);
          paper[key].forEach(value => initialTags[key].add(value));
        }
      });
    });
    // console.log("iniitialTags:", iniitialTags);


    Object.keys(initialTags).forEach(key => {
      initialTags[key] = Array.from(initialTags[key]);
      initialTagFilters[key] = initialTags[key].reduce((acc, tag) => {
        // console.log("acc: ", acc)
        // console.log("tag: ", tag)
        acc[tag] = true; 
        return acc;
      }, {});
    });
    console.log("initialTags:", initialTags);
    console.log("initialTagFilters:", initialTagFilters);

    // Object.keys(initialTagFilters).forEach(key => {
    //   console.log("key: ", key)
    //   console.log("initialTagFilters.key: ", initialTagFilters[key])
    // });

    // const initialPaperYear = papers.reduce((o, d) => {
    //   if (! (d.year in o)){
    //     o[d.year] = 1
    //   } else {
    //     o[d.year] +=1
    //   }
    //   return o
    // }, {})
    // console.log("initialPaperYear", initialPaperYear)

    // const initialPaperArea = papers.reduce((o, d) => {
    //   if (! (d.venue in o)){
    //     o[d.venue] = 1
    //   } else {
    //     o[d.venue] +=1
    //   }
    //   return o
    // }, {})

    //TODO:  For matrix part, idea is create a mrtrix to represent the interactions between any two tags?

    // setVISTags(initialTagFilters["VIS"]);
    // setMLTags(initialTagFilters["ML"]);

    setTags(initialTags);
    setAllTags(initialTags);
    setTagFilters(initialTagFilters);
  };

  // useEffect(() => {
  //   fetchData(defaultVersion);
  // }, []);

  useEffect(() => {
    fetchData(defaultVersion);
  }, [version]);

  const onProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  // const onClickFilter = (tag: string, type: "VIS" | "ML") => {
  //   if (type === "VIS") {
  //     if (tag !== 'all') {
  //       const newVISTag = {
  //         ...VISTags,
  //         [tag]: !VISTags[tag],
  //       }
  //       setVISTags(newVISTag);
  //     } else {
  //       const flag = Object.values(VISTags).every(d => d)
  //       const newVISTag = Object.keys(VISTags).reduce((o, d) => { 
  //         if (!(d in o)) {
  //           o[d] = !flag
  //         }
  //         return o
  //       }, {})
  //       setVISTags(newVISTag);
  //     }
      

  //   } else if (type === "ML") {
  //     if (tag != 'all') {
  //       const newMLTags = {
  //         ...MLTags,
  //         [tag]: !MLTags[tag],
  //       }
  //       setMLTags(newMLTags);
  //     } else {
  //       const flag = Object.values(MLTags).every(d => d)
  //       const newMLTags = Object.keys(MLTags).reduce((o, d) => { 
  //         if (!(d in o)) {
  //           o[d] = !flag
  //         }
  //         return o
  //       }, {})
  //       setMLTags(newMLTags);
  //     }
      
  //   }
    
  // };

  // const onClickFilter = (tag: string, ttype: string) => {
  //   Object.keys(tagFilters).forEach(type =>
  //     {
  //       // console.log("tagFilters: ", tagFilters)
  //       // console.log("tag: ", tag)
  //       // console.log("tagFilters[type]: ", tagFilters[type])
  //       // console.log("tagFilters[type][tag]: ", tagFilters[type][tag])
  //       if (tag in tagFilters[type] || tag == 'all') {
  //         console.log("tag: ", tag)
  //         if (tag !== 'all') {

  //           // const newTagFilters = {
  //           //   ...tagFilters,
  //           //   [tag]: !tagFilters[type][tag],
  //           // }
  //           const newTagFilters = {
  //             ...tagFilters,
  //             [type]: {
  //               ...tagFilters[type],
  //               [tag]: !tagFilters[type][tag]
  //             }
  //           };

  //           console.log("newTagFilters: ", newTagFilters)
  //           setTagFilters(newTagFilters);
  //         } 
  //         else {
  //           const allEnabled  = Object.values(tagFilters[type]).every(d => d)
  //           // console.log("allEnabled : ", allEnabled )

  //           // const newTagFilters = Object.keys(tagFilters[type]).reduce((o, d) => { 
  //           //   console.log("d: ", d)
  //           //   console.log("o: ", o)
  //           //   if (!(d in o)) {
  //           //     o[d] = !allEnabled
  //           //   }
  //           //   return o
  //           // }, {})
  //           const newTagFilters = {
  //             ...tagFilters,
  //             [type]: Object.keys(tagFilters[type]).reduce((acc, key) => {
  //               acc[key] = !allEnabled ;
  //               return acc;
  //             }, {})
  //           };
  //           console.log("newTagFilters: ", newTagFilters)
  //           setTagFilters(newTagFilters);
  //         }
  //       }
  //     }
  //   )
  //   // setTagFilters({
  //   //   ...tagFilters,
  //   //   [type]: {
  //   //     ...tagFilters[type],
  //   //     [tag]: !tagFilters[type][tag]
  //   //   }
  //   // });
  // };
  const onClickFilter = (tag, typeName) => {
    if (tag === "all") {
      const allSelected = Object.values(tagFilters[typeName]).every(d => d);
      console.log("allSelected : ", allSelected )
      const newTags = Object.keys(tagFilters[typeName]).reduce((acc, key) => {
        acc[key] = !allSelected;
        return acc;
      }, {});
  
      const newTagFilters = {
        ...tagFilters,
        [typeName]: newTags
      };
      console.log("newTagFilters: ", newTagFilters)
      setTagFilters(newTagFilters);  
    } else {
      const newTagFilters = {
        ...tagFilters,
        [typeName]: {
          ...tagFilters[typeName],
          [tag]: !tagFilters[typeName][tag]
        }
      };
      console.log("newTagFilters: ", newTagFilters)
      setTagFilters(newTagFilters);
    }
  };
  


  
  const onSetSearchKey = (searchKey:string)=>{
    setSearchKey(searchKey.toLowerCase())
  }

  const onSetVersion = (version:string)=>{
    setVersion(version)
    fetchData(version)
  }

  
  // const papersAfterFilter = papers.filter(
  //   (p) => p.ML.some((m) => MLTags[m]) && p.VIS.some((v) => VISTags[v]) && p.name.toLowerCase().includes(searchKey)
  // );

  console.log("tagFilters: ", tagFilters)
  const papersAfterFilter = papers.filter((p) => {
    // Check if every category present in the paper has all tags set to true in tagFilters
    // (p) => Object.keys(tagFilters).every(type => p[type]?.some(tag => tagFilters[type][tag])) 
    //        && p['name'].toLowerCase().includes(searchKey)
    const allTagsTrue = Object.keys(tagFilters).every(type =>
      p[type] ? p[type].every(tag => tagFilters[type][tag]) : true
    );
  
    return allTagsTrue && p['name'].toLowerCase().includes(searchKey);
  });

  console.log("papersAfterFilter: ", papersAfterFilter)

  // return (
  //   <ThemeProvider theme={theme}>
  //     <div className={classes.root}>
  //       <CssBaseline />

  //       <TopBar menuId={menuId} onProfileMenuOpen={onProfileMenuOpen} handleDrawerToggle={handleDrawerToggle}/>

  //       <SideBar
  //         paperNumber={papersAfterFilter.length}
  //         VISTags={VISTags}
  //         MLTags={MLTags}
  //         version={version}
  //         onClickFilter={onClickFilter}
  //         onSetSearchKey={onSetSearchKey}
  //         onSetVersion = {onSetVersion}
  //         paperYear = {paperYear}
  //         paperArea={paperArea}
  //         paperMatrix={paperMatrix}
  //         mobileOpen={mobileOpen}
  //         handleDrawerToggle={handleDrawerToggle}
  //       />

  //       <Papers papers={papersAfterFilter} />
  //     </div>
  //   </ThemeProvider>
  // );

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <CssBaseline />
        <TopBar title={title} onProfileMenuOpen={onProfileMenuOpen} handleDrawerToggle={handleDrawerToggle}/>
        {tagFilters && Object.keys(tagFilters).length > 0 && (
          <SideBar
            paperNumber={papersAfterFilter.length}
            tags={tags}
            tagFilters={tagFilters}
            version={version}
            onClickFilter={onClickFilter}
            onSetSearchKey={onSetSearchKey}
            onSetVersion={onSetVersion}
            paperYear = {paperYear}
            paperArea={paperArea}
            paperMatrix={paperMatrix}
            mobileOpen={mobileOpen}
            handleDrawerToggle={handleDrawerToggle}
          />
        )}
        <Papers papers={papersAfterFilter} />
      </div>
    </ThemeProvider>
  );

}

ReactDOM.render(<App />, document.getElementById("root"));
