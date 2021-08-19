import React, { Component } from "react";
import { Container, Grid, Header, List } from 'semantic-ui-react';

import { footerWaves } from './Images/index';

class Footer extends Component {


    render() {
        return (
            <React.Fragment>
            <span style={{ height: '20%', position: 'absolute', left: '0', bottom: '0', right: '0' }}>
                    <br />
                    <Container>
                        <Grid centered divided stackable>
                            <Grid.Row>
                                <Grid.Column width={3}>
                                    <Header as='h4' content='About' />
                                    <List link>
                                        <List.Item as='a'>Sitemap</List.Item>
                                        <List.Item as='a'>Contact Me</List.Item>
                                        <List.Item as='a'>Religious Ceremonies</List.Item>
                                        <List.Item as='a'>Gazebo Plans</List.Item>
                                    </List>
                                </Grid.Column>
                                <Grid.Column width={3}>
                                    <Header as='h4' content='Powered by' />
                                    <List link >
                                        <List.Item as='a' href='https://semantic-ui.com/' >Semantic UI</List.Item>
                                        <List.Item as='a' href='https://reactjs.org/' >React</List.Item>
                                        <List.Item as='a' href='https://pages.github.com/' >GH Pages</List.Item>
                                        <br />
                                        <List.Item as='a'>Teavana ;) </List.Item>
                                    </List>
                                </Grid.Column>
                                <Grid.Column width={6}>
                                    <Header as='h4' >
                                        FitnessGram™ Pacer Test
                                    </Header>
                                    <p>
                                    The FitnessGram™ Pacer Test is a multistage aerobic capacity test that progressively gets more difficult as it continues. The 20 meter pacer test will begin in 30 seconds.
                                    </p>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Container>

                </span>
                <img alt='' src={footerWaves} style={{ zIndex: -1, position: 'absolute', left: '0', bottom: '0', right: '0', width: '100%', height: '25%' }} />
                </React.Fragment>
        );
    }
}

export default Footer;