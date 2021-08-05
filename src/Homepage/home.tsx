import { homedir } from "os";
import { Component } from "react";
import { Link } from "react-router-dom";
import { Card, Container, Header, Icon, Image, Label, Popup, Segment, Grid, Tab, Menu, Button } from "semantic-ui-react";

import { badDiscord, badImage, Logo } from "../Images/index";

class Home extends Component<{ projects: any[] }, { activeIndex: string }> {
    constructor(props: any){
        super(props);

        this.state = {
            activeIndex: 'armour-app'
        }
    }

    getProjectPanes() {
        let projects: any[] = [];
        this.props.projects.forEach(project => (
            projects.push({
                menuItem: { key: project.key, content: project.name },
                render: () => <Tab.Pane color='black' inverted >{project.preview}</Tab.Pane>
            })
        ));

        return (projects)
    }

    handleTabChange(e: any, d: any) {
        console.log(d);
        this.setState({activeIndex: d.panes[d.activeIndex].menuItem.key});
    }

    static headerPopup = 'Currently each project is within the single repository, this will be changed at a later date and repo links will be provided';

    render() {
        return (
            <Container>
                <Grid>
                    <Grid.Row>
                        <Grid.Column floated='left' width={7} >
                            <Card as={Link} to='/socials/' >
                                <Image src={Logo} />
                                <Card.Content>

                                    <Card.Header content='Teavana' />
                                    <Card.Meta content='View my socials' />
                                </Card.Content>
                            </Card>
                        </Grid.Column>
                        <Grid.Column floated='right' width={9} >

                            <Header size='large'><span>My Projects <Popup content={Home.headerPopup} trigger={<Icon style={{ float: 'right' }} name='question circle outline' />} /></span> </Header>

                            <Tab onTabChange={(e, d) => this.handleTabChange(e, d)} menu={<Menu  fluid secondary vertical pointing />} menuPosition='left' panes={this.getProjectPanes()} />
                            <br />
                            <Button as={Link} to={`/${this.state.activeIndex}`} color='green' floated='right'  >
                                Go
                                <Icon name='arrow right' />
                            </Button>

                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        );
    }
}

export default Home;