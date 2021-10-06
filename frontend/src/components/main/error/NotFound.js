import { Container,Paper,Typography } from "@material-ui/core";

const NotFound = () => {

    return ( 
        <Container maxWidth="xl">
            <Paper raised elevation={6}>
                <Typography variant="h3">
                    Error, page not found!
                </Typography>
            </Paper>
            <Typography>
                Fix css mate and add back to home/forum or something
            </Typography>
        </Container>
     );
}
 
export default NotFound;