import React from "react";
import {
  Typography,
  Toolbar,
  IconButton,
  AppBar,
  Badge,
  InputBase,
} from "@material-ui/core";
import {
  // AccountCircle,
  // Notifications as NotificationsIcon,
  // Mail as MailIcon,
  Menu as MenuIcon,
  // Search as SearchIcon,
  CloudUpload,
  Description,
  GitHub
} from "@material-ui/icons";

import { useStyles } from "./style";

interface Props {
  title: string;
  preprint: string;
  github: string;
  topTheme: string;
  handleDrawerToggle: () => void;
  onProfileMenuOpen: (e: React.MouseEvent<HTMLElement>) => void;
}

export function TopBar(props: Props) {
  const classes = useStyles();
  const {title, preprint, github, topTheme, onProfileMenuOpen, handleDrawerToggle } = props;
  console.log("preprint here: ", preprint)

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          className={classes.menuButton}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap className={classes.title}>
          {title}
        </Typography>

        <div className={classes.sectionDesktop}>
          <IconButton
            edge="end"
            aria-label="link to arxiv paper"
            aria-haspopup="true"
            onClick={()=>window.open(preprint)}
            color="inherit"
            disabled={!preprint}
          >
            <Description /> <span style={{fontSize: '12px'}} className={classes.iconName}>{' '}Preprint </span>
          </IconButton>
          <IconButton
            edge="end"
            aria-label="link to github homepage"
            aria-haspopup="true"
            onClick={()=>window.open(github)}
            color="inherit"
            disabled={!github}
          >
            <GitHub /> <span style={{fontSize: '12px'}} className={classes.iconName}>{' '}Github </span>
          </IconButton>
          {/* <IconButton
            edge="end"
            aria-label="suggest new ML4VIS papers for this survey"
            aria-haspopup="true"
            onClick={()=>window.open("https://github.com/ML4VIS/ML4VIS.github.io/issues/new?assignees=&labels=enhancement&template=suggest-new-ml4vis-papers.md&title=Suggest+Paper%3A+%5Bpaper+title%5D")}
            color="inherit"
          >
            <CloudUpload />  <span style={{fontSize: '12px'}} className={classes.iconName}> {' '}Contribute </span>
          </IconButton> */}
        </div>
      </Toolbar>
    </AppBar>
  );
}
