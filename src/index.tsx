import React, { useState, useEffect, createContext } from "react";
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

import { useStyles, theme } from "./style";

export const basePath = process.env.NODE_ENV === 'development' ? '' : '/interactive-survey-template/';

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



export default function App() {
    const classes = useStyles();
    const defaultVersion = "papers"


    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [title, setTitle] = useState<string>('');
    const [colors, setColors] = useState([]);
    const [preprint, setPreprint] = useState<string>('');
    const [github, setGithub] = useState<string>('');
    const [papers, setPapers] = useState<Paper[]>([]);
    const [topTheme, setTopTheme] = useState<string>('');
    const [tags, setTags] = useState({});
    const [tagFilters, setTagFilters] = useState({});
    const [searchKey, setSearchKey] = useState('');
    const [version, setVersion] = useState(defaultVersion);

    const [mobileOpen, setMobileOpen] = React.useState(false);
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const [paperYear, setPaperYears] = useState<{ [k: string]: number }>({});
    const [paperArea, setPaperAreas] = useState<{ [k: string]: number }>({});
    const [tagCounts, setTagCounts] = useState<{ [k: string]: number }>({});

    const isMenuOpen = Boolean(anchorEl);
    // const menuId = "primary-search-account-menu";

    const fetchData = async (version: string) => {
        const response = await fetch(`${basePath}/assets/${version}.json`);
        const res = await response.json();
        const { papers, title, colors, preprint, homepage, topTheme } = res;

        // sort papers by year
        papers.sort((a, b) => a.year - b.year);


        setTopTheme(topTheme);
        setTitle(title);
        setPapers(papers);
        setColors(colors);
        setPreprint(preprint);
        setGithub(homepage);


        const initialTags = {};
        const initialTagFilters = {};

        papers.forEach(paper => {
            Object.keys(paper).forEach(key => {
                if (!['name', 'venue', 'year', 'url', 'imagePath', 'others'].includes(key)) {
                    if (!initialTags[key]) {
                        initialTags[key] = new Set();
                    }
                    paper[key].forEach(value => initialTags[key].add(value));
                }
            });
        });


        Object.keys(initialTags).forEach(key => {
            initialTags[key] = Array.from(initialTags[key]);
            initialTagFilters[key] = initialTags[key].reduce((acc, tag) => {
                acc[tag] = true;
                return acc;
            }, {});
        });

        const initialPaperYear = papers.reduce((o, d) => {
            if (!(d.year in o)) {
                o[d.year] = 1
            } else {
                o[d.year] += 1
            }
            return o
        }, {})

        const initialPaperArea = papers.reduce((o, d) => {
            if (!(d.venue in o)) {
                o[d.venue] = 1
            } else {
                o[d.venue] += 1
            }
            return o
        }, {})

        const countUniqueTags = (papers) => {
            const ignoreKeys = ['name', 'venue', 'year', 'url', 'imagePath', 'others'];
            return papers.reduce((tagCounts, paper) => {
                Object.keys(paper).forEach(key => {
                    if (!ignoreKeys.includes(key)) {
                        paper[key].forEach(tag => {
                            if (!(tag in tagCounts)) {
                                tagCounts[tag] = 1;
                            } else {
                                tagCounts[tag] += 1;
                            }
                        });
                    }
                });
                return tagCounts;
            }, {});
        };

        const uniqueTagsCount = countUniqueTags(papers);

        setPaperAreas(initialPaperArea)
        setPaperYears(initialPaperYear)
        setTagCounts(uniqueTagsCount)
        setTags(initialTags);
        setAllTags(initialTags);
        setTagFilters(initialTagFilters);
    };

    useEffect(() => {
        fetchData(defaultVersion);
    }, [version]);

    const onProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const onClickFilter = (tag, typeName) => {
        if (tag === "all") {
            const allSelected = Object.values(tagFilters[typeName]).every(d => d);

            const newTags = Object.keys(tagFilters[typeName]).reduce((acc, key) => {
                acc[key] = !allSelected;
                return acc;
            }, {});

            const newTagFilters = {
                ...tagFilters,
                [typeName]: newTags
            };
            setTagFilters(newTagFilters);
        } else {
            const newTagFilters = {
                ...tagFilters,
                [typeName]: {
                    ...tagFilters[typeName],
                    [tag]: !tagFilters[typeName][tag]
                }
            };
            setTagFilters(newTagFilters);
        }
    };




    const onSetSearchKey = (searchKey: string) => {
        setSearchKey(searchKey.toLowerCase())
    }

    const onSetVersion = (version: string) => {
        setVersion(version)
        fetchData(version)
    }

    const papersAfterFilter = papers.filter((p) => {
        // Check if every category present in the paper has all tags set to true in tagFilters
        const allTagsTrue = Object.keys(tagFilters).every(type =>
            p[type] ? p[type].every(tag => tagFilters[type][tag]) : true
        );

        return allTagsTrue && p['name'].toLowerCase().includes(searchKey);
    });


    return (
        <ThemeProvider theme={theme}>
            <div className={classes.root}>
                <CssBaseline />
                <TopBar title={title} preprint={preprint} github={github} topTheme={topTheme} onProfileMenuOpen={onProfileMenuOpen} handleDrawerToggle={handleDrawerToggle} />
                {tagFilters && Object.keys(tagFilters).length > 0 && (
                    <SideBar
                        paperNumber={papersAfterFilter.length}
                        tags={tags}
                        tagFilters={tagFilters}
                        colors={colors}
                        version={version}
                        onClickFilter={onClickFilter}
                        onSetSearchKey={onSetSearchKey}
                        onSetVersion={onSetVersion}
                        paperYear={paperYear}
                        paperArea={paperArea}
                        tagCounts={tagCounts}
                        mobileOpen={mobileOpen}
                        handleDrawerToggle={handleDrawerToggle}
                    />
                )}
                <Papers papers={papersAfterFilter} colors={colors} tags={tags} />
            </div>
        </ThemeProvider>
    );

}

ReactDOM.render(<App />, document.getElementById("root"));
