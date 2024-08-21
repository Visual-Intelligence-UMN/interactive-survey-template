import React, { useState } from "react";

const COLORS = ["#569c8e", "#dbb651", "#6abae6", "#c9a3cc", "#e8e4b5"]
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

import { useStyles } from "./style";

import { ChartModal } from '../ChartModal'
import { List } from "echarts";
import { basePath } from "..";

export const getAvatar = (s: string) => {
    const pieces = s.split(" ");
    if (pieces.length == 2) {
        return `${pieces[0][0].toUpperCase()}${pieces[1][0].toUpperCase()}`;
    } else if (pieces.length > 2 && pieces[1] == 'and') {
        return `${pieces[0][0].toUpperCase()}${pieces[2][0].toUpperCase()}`;
    } else if (pieces.length > 2 && pieces[2] == 'and') {
        return `${pieces[0][0].toUpperCase()}${pieces[1][0].toUpperCase()}`;
    } else if (pieces.length == 0) {
        return '-'
    }
    return `${pieces[0][0].toUpperCase()}`;
};


interface Props {
    paperNumber: number;
    version: string;
    colors: string[];
    tags: Record<string, Record<string, boolean>>;
    tagFilters: Record<string, Record<string, boolean>>;
    paperYear: Record<string, number>;
    paperArea: Record<string, number>;
    tagCounts: Record<string, number>;
    mobileOpen: boolean;
    handleDrawerToggle: () => void;
    onClickFilter: (tag: string, type: string) => void;
    onSetSearchKey: (key: string) => void;
    onSetVersion: (version: string) => void;
}

export function SideBar(props: Props) {
    const { paperNumber, colors, tags, tagFilters, onClickFilter, onSetSearchKey, onSetVersion, paperArea, paperYear, tagCounts, mobileOpen, handleDrawerToggle } = props;
    const [anchorEl, setAnchorEl] = React.useState(null);
    // console.log("colors: ", colors)

    const classes = useStyles();
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };



    const getBgColor = (tag: string) => {
        const index = Object.keys(props.tags).indexOf(tag)
        if (colors) {
            return colors[index]
        }
        return COLORS[index]
    }



    const AvatarComponent = ({ tag, bgcolor, typeName }) => {
        const avatarSrc = `${basePath}/assets/avatars/${typeName}_${tag}.png`;
        // console.log("getAvatar(tag): ", getAvatar(tag))    
        return (
            <Avatar alt={getAvatar(tag)} src={avatarSrc} style={{ width: 24, height: 24, marginLeft: 6, backgroundColor: bgcolor, color: "white", border: "1px solid white" }}><b style={{ fontSize: '0.75rem' }}>{getAvatar(tag)}</b></Avatar>
        );
    };


    const renderFilters = (typeName: string) => {
        const tagsCollection = props.tagFilters[typeName];
        return (
            <div key={typeName}>
                <Typography variant="subtitle2" className={classes.filterTitle}>
                    {typeName} : <Button variant="outlined" size="small" onClick={() => onClickFilter("all", typeName)}>{Object.values(tagsCollection).every(d => d) ? 'Unselect All' : 'Select All'}</Button>
                </Typography>
                <div className={classes.filters}>
                    {Object.entries(tagsCollection).map(([tag, checked]) => (
                        <Chip
                            key={tag}
                            avatar={<AvatarComponent tag={tag} typeName={typeName} bgcolor={getBgColor(typeName)} />}
                            label={tag}
                            clickable
                            variant={checked ? "default" : "outlined"}
                            style={{
                                backgroundColor: checked ? getBgColor(typeName) : 'transparent',
                                color: checked ? 'white' : getBgColor(typeName),
                            }}
                            onClick={() => onClickFilter(tag, typeName)}
                        />
                    ))}
                </div>
                <Divider />
            </div>
        );
    };

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
            tagCounts={tagCounts}
        />
        <Divider />
        {Object.keys(tagFilters).map((typeName) => renderFilters(typeName))}

        <Divider />

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
