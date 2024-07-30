import { createStyles, Theme, makeStyles, createMuiTheme } from "@material-ui/core/styles";
import { blue, orange, teal, amber, blueGrey, purple } from "@material-ui/core/colors";

// declare module '@material-ui/core/styles/createPalette' {
//     interface PaletteOptions {
//       tertiary?: PaletteColorOptions;
//       quaternary?: PaletteColorOptions;
//     }
//     interface Palette {
//       tertiary: PaletteColor;
//       quaternary: PaletteColor;
//     }
// }

// declare module '@material-ui/core/styles/createMuiTheme' {
//     interface Theme {
//         palette: Palette;
//     }
//     interface ThemeOptions {
//         palette?: PaletteOptions;
//     }
// }

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({

        root: {
            display: "flex",
        },
    })
);

export const theme = createMuiTheme({
    palette: {
        primary: blue,
        secondary: orange,
        error: teal,
        warning: amber,
        info: blueGrey,
        success: purple,
        // tertiary: lime,
        // quaternary: yellow,
        // primary: {
        //     light: '#757ce8',
        //     main: '#3f50b5',
        //     dark: 'orange',
        //     contrastText: '#fff',
        // },
        // secondary: {
        //     light: '#ff7961',
        //     main: '#f44336',
        //     dark: '#ba000d',
        //     contrastText: '#000',
        // },
    },
    overrides: {
        MuiChip: {
            colorSecondary: {
                color: "white"
            }
        }
    }
});