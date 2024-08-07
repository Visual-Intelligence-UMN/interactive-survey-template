import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Flare } from '@material-ui/icons';

const titleLineHeight = 1.4
const titleMaxLines = 3

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            padding: theme.spacing(3),
            height: '100%',
        },
        grow: {
            flexGrow: 1,
        },
        control: {
            padding: theme.spacing(2),
        },
        card: {
            width: 300,
            height: 250,
            // minHeight: 180,
            // maxHeight: 400,
        },
        media: {
            height: 100,
        },
        cardContent: {
            display: 'flex',
            flexDirection: 'column',
            height: '100%'
        },
        title: {
            position: 'relative',
            lineHeight: `${titleLineHeight}rem`,
            maxHeight: `${titleMaxLines * titleLineHeight}rem`,
            fontWeight: 500,
            overflow: 'hidden',
            // paddingRight: '1rem' /* space for ellipsis */,

            '&::before': {
                position: 'absolute',
                content: '"..."',
                insetBlockEnd: 0, /* "bottom" */
                insetInlineEnd: 0/* "right" */
            },
            '&::after': {
                content: '""',
                position: 'absolute',
                insetInlineEnd: 0,/* "right" */
                width: `1rem`,
                height: `1rem`,
                background: `#fff`
            }
        },
        tags: {
            marginTop: 8,
            display: 'flex',
            '& > *': {
                margin: theme.spacing(0.5),
                fontSize: 14,
            },
        },
        pos: {
            marginBottom: -5,
        },
        avatarGroup: {
            // margin: "0px 6px"
        }
    })
);