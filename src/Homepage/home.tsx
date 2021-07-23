import { Component } from "react";
import { Card, Container, Image } from "semantic-ui-react";

import { Logo } from "../Images/index";

class Home extends Component {
    render() {
        return (
            <Container style={{marginTop:'14px'}} textAlign='center' >
                <Card centered >
                    <Image src={Logo} />
                </Card>
            </Container>
        );
    }
}

export default Home;