import { Container,Paper,Typography,Link } from "@material-ui/core";

const Info = () => {

    return ( 
        <Container maxWidth="xl">
            <Paper style={{ padding: '20px', borderRadius: '15px' }} raised elevation={6}>
                <Typography variant="h6">
                    Uni-Web-App project.
                </Typography>
                <Link href="https://github.com/n-hatz/Uni-Web-App">Github</Link>
                <Typography vairant="body1">Features:</Typography>
                <ul>
                    <li>CRUD Forum</li>
                    <li>Authentication</li>
                    <li>Admin control panel</li>
                    <li>Non-existent/minimal styling</li>
                </ul>
            </Paper>
        </Container>
     );
}
 
export default Info;