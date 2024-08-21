import React from "react";
import {
    Grid,
    Card,
    Avatar,
    CardContent,
    CardMedia,
    Typography,
} from "@material-ui/core";
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import { Paper as TPaper, basePath } from "../index";
import { getAvatar } from "../SideBar";
import { useStyles } from "./style";
import { getAllTags } from '../index';


const COLORS = ['#9d7af0', '#f2eaa0', '#6e40db', '#edde51', "#450ad1", "#cfbb02"]

interface Props {
    papers: TPaper[];
    colors: string[];
    tags: Record<string, Record<string, boolean>>;
}


export function Papers(props: Props) {
    const { papers, colors, tags } = props;

    const classes = useStyles();
    const onClickPaper = (paper: TPaper) => {
        window.open(
            paper.url || `https://www.google.com/search?q=${paper.name.replace(' ', '+')}`,
            "_blank")
    }

    const allTags = getAllTags();


    const getBgColor = (tag) => {
        const index = Object.keys(allTags).indexOf(tag)
        if (colors) {
            return colors[index]
        }
        return COLORS[index]
    }


    const AvatarComponent = ({ group, tag, bgcolor }) => {
        const avatarSrc = `${basePath}/assets/avatars/${group}_${tag}.png`;
        return (
            <Avatar alt={getAvatar(tag)} src={avatarSrc} style={{ width: 24, height: 24, backgroundColor: bgcolor, color: "white" }}><b style={{ fontSize: '0.75rem' }}>{getAvatar(tag)}</b></Avatar>
        );
    };



    return (
        <Grid container className={classes.root} spacing={2}>
            <Grid item xs={12}>
                <Grid container justify="center" spacing={2}>
                    {papers.map((paper, i) => (
                        <Grid key={i} item>
                            <Card className={classes.card}>
                                <CardContent className={classes.cardContent} onClick={() => onClickPaper(paper)}>

                                    <Typography variant="subtitle1" component="p" className={classes.title}>
                                        {paper.name}
                                    </Typography>
                                    <Typography className={classes.pos} color="textSecondary">
                                        {paper.venue} {paper.year}
                                    </Typography>
                                    {paper.others && Object.keys(paper.others).map((key, index) => (
                                        <Typography key={index} className={classes.pos} color="textSecondary">
                                            {key}: {paper.others[key]}
                                        </Typography>
                                    ))}

                                    {paper.imagePath && paper.imagePath !== '' &&
                                        <CardMedia
                                            component="img"
                                            alt="Figure 1"
                                            className={classes.media}
                                            image={paper.imagePath}
                                        />}

                                    <div className={classes.grow}> </div>
                                    <div className={classes.tags}>
                                        {Object.entries(allTags).map(([group, value]) => (
                                            <AvatarGroup key={group} className={classes.avatarGroup}>
                                                {paper[group]?.map((v) => (
                                                    <Avatar key={v} style={{
                                                        backgroundColor: getBgColor(group),
                                                        width: 32,
                                                        height: 32,
                                                        fontSize: "14px",
                                                        marginLeft: "-4px"
                                                    }}>
                                                        <AvatarComponent group={group} tag={v} bgcolor={getBgColor(group)} />
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
