import React, { Component } from "react";
import { Container, Card, Image, Placeholder } from "semantic-ui-react";

import { yoimiya } from "../../Images";

class NepetaPage extends Component {


    render(){
        return(
            <Container style={{marginTop:'14px'}} textAlign='center' >
                <Card centered >
                    <Image src={yoimiya} />
                    <Card.Content>
                        <Card.Header>Nepeta</Card.Header>
                        <Card.Meta>Yoimiya Haver</Card.Meta>
                        <Card.Description>My name is Nepeta and I'm kinda cringe, also I enslave my friends</Card.Description>
                        
                        <Card.Content>
                            <Placeholder>
                                <Placeholder.Image />
                                <Placeholder.Image />
                                <Placeholder.Image />
                            </Placeholder>
                        </Card.Content>
                    </Card.Content>
                </Card>
            </Container>
        )
    }
}

export default NepetaPage;