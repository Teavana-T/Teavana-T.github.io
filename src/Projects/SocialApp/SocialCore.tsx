import { Component } from "react";
import { Container, Header, Icon, Segment } from "semantic-ui-react";



class SocialApp extends Component {


    render() {
        return (
            <Container>
                <Segment>
                    <Header>Hello World!</Header>
                </Segment>
            </Container>
        );
    }

    static preview = <span>
        <Icon name='bell' /> A simple display page to aggregate my social media
    </span>
}

export default SocialApp;