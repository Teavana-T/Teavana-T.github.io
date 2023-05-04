import { Component, Fragment } from "react";
import { Card, Container, Segment, Grid } from "semantic-ui-react";

class Luccus extends Component {

    render() {
        return (
            <Fragment>
                <Container>
                    <Segment>
                        <Grid style={{ backgroundColor: '#DDDDDD' }} >
                            <Grid.Column width={5} style={{ padding: 0 }}>
                                <Card style={{ height: '100%' }}>
                                    <Card.Content>
                                        <Card.Header >Luccus</Card.Header>
                                        <Card.Meta>Luccus Wildus</Card.Meta>
                                    </Card.Content>
                                    <Card.Content>
                                        The Luccus Wildus is a mysterious beast from the <code>REDACTED</code> region
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                            <Grid.Column width={7}>
                                Luccus speaks in incantations so you have to learn the language <br />
                                Luccus is a shapeshifter who occasionally changes from a goat-like form to a humanoid form <br />
                                According to the mythos Luccus shit his pants at some point in his lifetime <br />
                                An average person would describe Luccus as scary <br />
                                Would suck COCK!! for cold sprite
                            </Grid.Column>
                            <Grid.Column width={4}>

                            </Grid.Column>
                        </Grid>
                    </Segment>

                </Container>
            </Fragment>
        )
    }
}

export default Luccus;