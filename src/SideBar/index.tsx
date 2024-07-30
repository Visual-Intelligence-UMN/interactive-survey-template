import React, { useState } from "react";

const COLORS =['#9d7af0', '#f2eaa0', '#6e40db', '#edde51', "#450ad1", "#cfbb02"]
import {
  Drawer,
  Divider,
  Toolbar,
  Chip,
  Typography,
  InputBase,
  Avatar,
  Tooltip,
  Menu,
  MenuItem,
  Button,
  Hidden,
} from "@material-ui/core";
import { Search as SearchIcon, LaunchOutlined as LaunchIcon } from "@material-ui/icons";
import Select from '@material-ui/core/Select';
import { getAvatar } from '../index'
import { useStyles } from "./style";
// import { blue, orange, lime, yellow, purple, grey } from "@material-ui/core/colors";
// import { useTheme } from '@material-ui/core/styles';

import { ChartModal, TPaperMatrix } from '../ChartModal'
import { List } from "echarts";

// const VISTagDetails = {
//   "Data Processing4VIS": "raw data is transformed into a format that better suits the following visualization processes.",
//   "Data-VIS Mapping": "the values of data fields are mapped into the visual channels of graphic marks.",
//   "Insight Communication": "insights are transformed into visualizations that can effectively communicate them.",
//   "Style Imitation": "the styles of given visualizations examples are applied to create new visualizations. ",
//   "VIS Reading": "users observe the appearance of a visualization, read the encoded data, and understand the underlying information. ML techniques try to automatically 'read' the visualizations like humans",
//   "User Profiling": "user actions with visualizations are logged and then analyzed in order to better understand users.",
//   "VIS Interaction": "users interact with the visualization and change its appearance.",
// }

interface Props {
  paperNumber: number;
  version: string;
  // VISTags: Record<string, boolean>;
  // MLTags: Record<string, boolean>;
  colors: string[];
  tags: Record<string, Record<string, boolean>>;
  tagFilters: Record<string, Record<string, boolean>>;
  paperYear: Record<string, number>;
  paperArea: Record<string, number>;
  paperMatrix: TPaperMatrix;
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
  // onClickFilter: (k: string, type: 'VIS' | 'ML') => void;
  onClickFilter: (tag: string, type: string) => void;
  onSetSearchKey: (key: string) => void;
  onSetVersion: (version: string) => void;
}

// function UserAvatar({ tag }) {
//   const [imageAvailable, setImageAvailable] = useState(true);
//   const avatarSrc = `assets/avatars/${tag.replace(' ', '_')}_w.png`;

//   return (
//     <div>
//       {imageAvailable ? (
//         <Avatar src={avatarSrc} onError={() => setImageAvailable(false)} />
//       ) : (
//         <Avatar>{getAvatar(tag)}</Avatar>
//       )}
//     </div>
//   );
// }

export function SideBar(props: Props) {
  // const { paperNumber, VISTags, MLTags, onClickFilter, onSetSearchKey, onSetVersion, paperArea, paperYear, paperMatrix, mobileOpen, handleDrawerToggle } = props;
  const { paperNumber, colors, tags, tagFilters, onClickFilter, onSetSearchKey, onSetVersion, paperArea, paperYear, paperMatrix, mobileOpen, handleDrawerToggle } = props;
  // const tagsCollection = props.tags;
  const [anchorEl, setAnchorEl] = React.useState(null);
  console.log("colors: ", colors)

  const classes = useStyles();
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // const getColorForType = (typeName: string) => {
  //   // const theme = useTheme();
  //   const typeColors = {
  //     // VIS_NEW : theme.palette.primary.light,
  //     // ML: theme.palette.primary.dark,
  //     // FRUIT: theme.palette.primary.main,
  //     // ANIMAL: theme.palette.primary.dark,
  //     VIS_NEW : 'primary',
  //     ML: 'secondary',
  //     FRUIT: 'info',
  //     ANIMAL: 'warning',
  //   };
  
  //   return typeColors[typeName] || 'primary';  
  // };

  const getBgColor = (tag: string)=> {
    console.log("check tag here: ", tag)
    console.log('props.tags:', props.tags);
    const index = Object.keys(props.tags).indexOf(tag)
    console.log("index here is: ", index)
    if (colors){
      return colors[index]
    }
    return COLORS[index]
  }

  // const AvatarComponent = ({ tag }) => {
  //   const avatarSrc = `assets/avatars/${tag.replace(' ', '_')}_w.png`;
  
  //   return (
  //     <Avatar
  //       src={avatarSrc}
  //       onError={(event: React.SyntheticEvent<HTMLImageElement, Event>) => {
  //         const target = event.currentTarget;
  //         target.onerror = null; // Prevents looping
  //         target.src = ''; // Removes src
  //         target.style.color = 'white'; // Style for the text
  //         // Need to manually adjust to add the innerText or use another method to display fallback text
  //       }}
  //       style={{ color: 'white' }} // default style
  //     >
  //       <b>{getAvatar(tag)}</b>
  //     </Avatar>
  //   );
  // };


  const AvatarComponent = ({ tag, bgcolor }) => {
    // const [imgError, setImgError] = React.useState(false);
    const avatarSrc = `assets/avatars/${tag.replace(' ', '_')}_w.png`;
  
    // if (!imgError) {
    //   return (
    //     <Avatar
    //       src={avatarSrc}
    //       onError={() => setImgError(true)}
    //       // style={{ color: 'white' }}
    //     />
    //   );
    // }
  
    
    return (
      <Avatar alt={getAvatar(tag)} src={avatarSrc} style={{ width: 24, height: 24, marginLeft: 6, backgroundColor: bgcolor, color: "white" }}></Avatar>
    );
  };
  

  const renderFilters = (typeName: string) => {
    const tagsCollection = props.tagFilters[typeName];
    // const color = getColorForType(typeName)
    console.info('tagsCollection', tagsCollection)
    // console.log("typeName: ", typeName)
    return (
      <>
        <Typography variant="subtitle2" className={classes.filterTitle}>
          {typeName} filter: <Button variant="outlined" size="small" onClick={() => onClickFilter("all", typeName)}>{Object.values(tagsCollection).every(d => d) ? 'Unselect All' : 'Select All'}</Button>
        </Typography>
        <div className={classes.filters}>
          {Object.entries(tagsCollection).map(([tag, checked]) => (
            <Chip
              key={tag}
              // avatar={<Avatar style={{ color: "white" }}><b>{getAvatar(tag)}</b></Avatar>}
              // avatar={<Avatar>{getAvatar(tag)}</Avatar>}
              // label={checked}
              // avatar={
              //   <Avatar src={`assets/avatars/${tag.replace(' ', '_')}_w.png`} />
              // }
              // avatar={UserAvatar({ tag })}
              avatar={<AvatarComponent tag={tag} bgcolor={getBgColor(typeName)}/> }
              label={tag}
              clickable
              variant={checked ? "default" : "outlined"}
              style={{ 
                backgroundColor: checked ? getBgColor(typeName) : 'transparent', 
                color: checked ? 'white' : getBgColor(typeName), 
                // border: checked ? 'none' : '1px solid ${getBgColor(typeName)}'
              }}
              // color={getBgColor(typename)}
              // color="primary"
              // color={getColorForType(typeName)}
              // color={color}  
              onClick={() => onClickFilter(tag, typeName)}
            />
          ))}
        </div>
        <Divider />
      </>
    );
  };

  // console.log("props", props);
  // console.log("paperNumber", paperNumber);

  const drawer = <div className={classes.drawerContainer}>
    <Toolbar />

    <Typography variant="h5" className={classes.paperNumber}>
      Papers: {paperNumber}
    </Typography>

    <Divider />

    <Typography variant="subtitle2" className={classes.filterTitle}>
      Keywords search:
    </Typography>
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        placeholder="Search…"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ "aria-label": "search" }}
        onChange={(event) => onSetSearchKey(event.target.value)}
      />
    </div>

    <Divider />
    < ChartModal
      paperYear={paperYear}
      paperArea={paperArea}
      paperMatrix={paperMatrix}
    />
    <Divider /> 
    {Object.keys(tagFilters).map((typeName) => renderFilters(typeName))}
    {/* {Object.keys(tagFilters).forEach((typeName) => renderFilters(typeName))} */}

    {/* <Typography variant="subtitle2" className={classes.filterTitle}>
      VIS process filter: <Button variant="outlined" size="small" onClick={() => onClickFilter("all", 'VIS')}> {Object.values(VISTags).every(d => d) ? 'Unselect All' : 'Select All'}</Button>
    </Typography>
    <div className={classes.filters}>
      {Object.entries(VISTags).map(([v, checked]) => (
        <Tooltip key={v} title={VISTagDetails[v]}>
          <Chip
            key={v}
            avatar={
              <Avatar src={`assets/avatars/${v.replace(' ', '_')}_w.png`} />
            }
            label={v}
            clickable
            variant={checked ? "default" : "outlined"}
            color="primary"

            onClick={() => onClickFilter(v, 'VIS')}
          />
        </Tooltip>
      ))}
    </div>

    <Divider />

    <Typography variant="subtitle2" className={classes.filterTitle}>
      ML tasks filter: <Button variant="outlined" size="small" onClick={() => onClickFilter("all", 'ML')}> {Object.values(MLTags).every(d => d) ? 'Unselect All' : 'Select All'}</Button>
    </Typography>
    <div className={classes.filters}>
      <div className={classes.filters}>
        {Object.entries(MLTags).map(([m, checked]) => (
          <Chip
            key={m}
            avatar={<Avatar style={{ color: "white" }} ><b>{getAvatar(m)}</b></Avatar>}
            label={`${m[0].toUpperCase()}${m.slice(1)}`}
            clickable
            variant={checked ? "default" : "outlined"}
            color="secondary"
            onClick={() => onClickFilter(m, 'ML')}
          />
        ))}
      </div>
    </div> */}

   


    <Divider />
    {/* <FormControl required className={classes.formControl}>
    <InputLabel>Version</InputLabel> */}
    <Typography variant="subtitle2" className={classes.filterTitle}>
      Select a version:

      <Select
        native
        value={props.version}
        onChange={(e: React.ChangeEvent<{ value: string }>) => props.onSetVersion(e.target.value)}
        style={{ marginLeft: '10px' }}
        name="version"
        inputProps={{
          id: 'version-required',
        }}
      >
        <option value={'survey'}> ML4VIS Survey 2020</option>
        <option value={'latest'}> Latest</option>
      </Select>
    </Typography>
    {/* </FormControl> */}

    <Divider />
    <Button onClick={handleClick}>
      <LaunchIcon/> <span>Other Related Surveys</span>
    </Button>
    <Menu
      open={Boolean(anchorEl)}
      aria-haspopup="true"
      keepMounted
      onClose={handleClose}
    >
      <MenuItem onClick={() => window.open("https://arxiv.org/pdf/2102.01330")}>Survey on Artificial Intelligence Approaches for Visualization Data</MenuItem>
      <MenuItem onClick={()=>window.open("https://arxiv.org/abs/2204.06504")}>DL4SciVis: A State-of-the-Art Survey on Deep Learning for Scientific Visualization</MenuItem>
      <MenuItem onClick={() => window.open("https://www.sciencedirect.com/science/article/pii/S2468502X20300292")}>A survey on automatic infographics and visualization recommendations</MenuItem>
    </Menu>
  </div>

  return (<>
      <Hidden smUp implementation="css">
        {/* this drawer is for the mobile mode */}
        <Drawer
          variant="temporary"
          anchor={'left'}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <Drawer
          className={classes.drawer}
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
          open
        >
          {drawer}
        </Drawer>
      </Hidden>
    </>
  );
}
