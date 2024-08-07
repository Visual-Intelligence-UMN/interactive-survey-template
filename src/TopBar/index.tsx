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
    Home
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
    const { title, preprint, github, topTheme, onProfileMenuOpen, handleDrawerToggle } = props;

    return (
        <AppBar position="fixed" className={classes.appBar} style={{ backgroundColor: topTheme }}>
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
                        onClick={() => window.open(preprint)}
                        color="inherit"
                        disabled={!preprint}
                    >
                        <Description /> <span style={{ fontSize: '12px' }} className={classes.iconName}>{' '}Preprint </span>
                    </IconButton>
                    <IconButton
                        edge="end"
                        aria-label="link to github homepage"
                        aria-haspopup="true"
                        onClick={() => window.open(github)}
                        color="inherit"
                        disabled={!github}
                    >
                        <Home /> <span style={{ fontSize: '12px' }} className={classes.iconName}>{' '}Homepage </span>
                    </IconButton>

                </div>
            </Toolbar>
        </AppBar>
    );
}
