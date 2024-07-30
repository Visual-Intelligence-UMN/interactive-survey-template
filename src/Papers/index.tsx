import React from "react";
import {
  Grid,
  Paper,
  Card,
  Button,
  CardActions,
  Avatar,
  Chip,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core";
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import { Paper as TPaper, getAvatar } from "../index";
import { useStyles } from "./style";
import { getAllTags } from '../index';


const COLORS =['#9d7af0', '#f2eaa0', '#6e40db', '#edde51', "#450ad1", "#cfbb02"]

interface Props {
  papers: TPaper[];
  colors: string[];
  tags: Record<string, Record<string, boolean>>;
}


export function Papers(props: Props) {
  const { papers, colors, tags } = props;
  

  const classes = useStyles();
  const onClickPaper = (paper: TPaper)=>{
    window.open(
      paper.url||`https://www.google.com/search?q=${paper.name.replace(' ', '+')}`, 
      "_blank")
  }
  console.log("colors: ", colors)
  
  console.log("papers: ", papers)
  const allTags = getAllTags();
  console.log("allTags: ", allTags)

  // const getBgColor = (tag: string)=> {
  //   console.log("tag here is: ", tag)
  //   const index = Object.keys(props.tags).indexOf(tag)
  //   if (colors){
  //     return colors[index]
  //   }
  //   return COLORS[index]
  // }

  const getBgColor = (tag) => {
    // console.log('props.tags:', props.tags);
    console.log("allTags: ", allTags)
    console.log("tag here is: ", tag)

    // if (!allTags || !Object.keys(allTags).length) {
    //   console.warn('Tags are undefined or empty.');
    //   return 'defaultColor'; 
    // }
  
    // const index = Object.keys(allTags).indexOf(tag);
    // console.log("index: ", index)
    // if (index === -1) {
    //   console.warn('Tag not found:', tag);
    //   return 'defaultColor'; 
    // }
  
    // return colors && colors.length > index ? colors[index] : COLORS[index];
    const index = Object.keys(allTags).indexOf(tag)
    console.log("index here: ", index)
    if (colors){
      return colors[index]
    }
    return COLORS[index]
  }
  

  const AvatarComponent = ({ tag, bgcolor }) => {
    const avatarSrc = `assets/avatars/${tag.replace(' ', '_')}_w.png`;
    return (
      <Avatar alt={getAvatar(tag)} src={avatarSrc} style={{ width: 24, height: 24, backgroundColor: bgcolor, color: "white" }}></Avatar>
    );
  };

  
  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={2}>
          {papers.map((paper, i) => (
            <Grid key={i} item>
              <Card className={classes.card}>
                <CardContent className={classes.cardContent} onClick={()=> onClickPaper(paper)}>
                  <CardMedia
                    component="img"
                    alt="Figure 1"
                    height="60%"
                    width="100%"
                    image={paper.imagePath}
                  />
                  {/* <Typography
                    className={classes.title}
                    color="textSecondary"
                    gutterBottom
                  >
                    {paper.venue} {paper.year}
                  </Typography> */}
                  <Typography
                    variant="subtitle1"
                    component="p"
                    className={classes.title}
                  >
                    {paper.name}
                  </Typography>
                  <Typography className={classes.pos} color="textSecondary">
                    {paper.venue} {paper.year}
                  </Typography>
                  {/* <Typography variant="body2" component="p">
                    Author1, Author2, Author3, and Author4
                  </Typography> */}

                  {/* <div className={classes.grow}></div>
                  <div className={classes.tags}>
                  <AvatarGroup className={classes.avatarGroup}>
                    {paper.VIS.map((v) => (
                      // <Avatar key={v} className={classes.VISTag}>
                      //   {getAvatar(v)}
                      // </Avatar>
                      <Avatar key={v} className={classes.VISTag} src={`assets/avatars/${v.replace(' ', '_')}_w.png`} />
                    ))}
                  </AvatarGroup>
                  <AvatarGroup className={classes.avatarGroup}>
                    {paper.ML.map((m) => (
                      <Avatar key={m} className={classes.MLTag}>
                        <b>{getAvatar(m)}</b>
                      </Avatar>
                    ))}
                  </AvatarGroup>
                  </div> */}
                  <div className={classes.grow}></div>
                  <div className={classes.tags}>
                    {Object.entries(allTags).map(([k, value]) => (
                      <AvatarGroup key={k} className={classes.avatarGroup}>
                        {paper[k]?.map((v) => (
                          <Avatar key={v} style={{backgroundColor: getBgColor(k), 
                                                  width: 32,
                                                  height: 32,
                                                  fontSize: "14px",
                                                  marginLeft: "-4px"}}>
                            <AvatarComponent tag={v} bgcolor={getBgColor(k)}/>
                            {/* <b>{getAvatar(v)}</b> */}
                          </Avatar>
                        ))}
                      </AvatarGroup>
                    ))}
                  
                  </div>


                </CardContent>
                {/* <CardActions>
                  <Button size="small">Learn More</Button>
                </CardActions> */}
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}
