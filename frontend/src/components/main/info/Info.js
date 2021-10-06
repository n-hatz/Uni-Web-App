import { Container,Paper,Typography,Link } from "@material-ui/core";

const Info = () => {

    return ( 
        <Container maxWidth="xl">
            <Paper style={{ padding: '20px', borderRadius: '15px' }} raised elevation={6}>
                <Typography variant="h6">
                    Welcome to Uni-Web-App project.
                </Typography>
                <Link href="https://github.com/n-hatz/Uni-Web-App">Github</Link>
            </Paper>
            <Typography>
                Fix css mate
            </Typography>
        </Container>
     );
}
 
export default Info;