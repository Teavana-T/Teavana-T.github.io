import { Component } from "react";
import { Card, Container, Image } from "semantic-ui-react";

import { Logo } from "../Images/index";

class Home extends Component {
    render() {
        return (
            <Container style={{marginTop:'14px'}} textAlign='center' >
                <Card centered >
                    <Image src={Logo} />
                    <Card.Content>
                        <Card.Header>Teavana</Card.Header>
                        <Card.Description>This is my site, it's not very special and there's many like it but this one is mine and I like my site.</Card.Description>
                    </Card.Content>
                </Card>
            </Container>
        );
    }
}

export default Home;