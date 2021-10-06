import { Container,Paper,Typography } from "@material-ui/core";

const AccessDenied = () => {

    return ( 
        <Container maxWidth="xl">
            <Paper raised elevation={6}>
                <Typography variant="h3">
                    This page is for admins only!
                </Typography>
            </Paper>
            <Typography>
                Fix css mate and add back to home/forum or something and maybe move this to admin components
            </Typography>
        </Container>
     );
}
 
export default AccessDenied;