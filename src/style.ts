import { createStyles, Theme, makeStyles, createMuiTheme } from "@material-ui/core/styles";
import { orange, teal} from "@material-ui/core/colors";


export const useStyles = makeStyles((theme: Theme) =>
    createStyles({

        root: {
            display: "flex",
        },
    })
);

export const theme = createMuiTheme({
    palette: {
        primary: teal,
        secondary: orange,
    },
    overrides: {
        MuiChip: {
            colorSecondary: {
                color: "white"
            }
        }
    }
});