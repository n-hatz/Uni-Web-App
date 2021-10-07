import { AppBar, Container, Link, Toolbar, Typography } from "@material-ui/core";

import useStyles from './styles';

const Footer = () => {

    const classes = useStyles();

    return ( 
        
            
                <Toolbar position="abosolute" bottom="0">
                <Typography variant="body1" color="inherit">
                    - 2021 <Link href="https://github.com/n-hatz">n-hatz</Link> -
                </Typography>
                </Toolbar>
            
        
     );
}
 
export default Footer;