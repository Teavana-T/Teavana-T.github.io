import React, { Component } from "react";
import { Container, Grid, Header, Label, Icon, Progress } from "semantic-ui-react";
import { SemanticCOLORS } from "semantic-ui-react/dist/commonjs/generic";

import { LogoNoBG, TeavanaTitleSVG } from "../Images/index";

import './cv.css';

interface Info {
    name: string,
    mobileNumber: string,
    contactEmail: string,
    website: string,
    workHistory: {
        name: string,
        time: string,
        title: string,
        desc: string
    }[]
}

interface skillType {
    name: string,
    value: number,
    color: string
}

class Skill extends Component<skillType, any> {
    constructor(props: skillType) {
        super(props);

        this.state = {}
    }


    render() {
        return (
            <div>
                <Header dividing content={this.props.name} size='tiny' style={{ marginTop: 5, marginBottom: 2 }} />
                <Progress value={this.props.value} total='10' progress='ratio' style={{ marginBottom: 8 }} />
            </div>
        )
    }
}

class CV extends Component<any, any> {

    getInfo() {

        const info: Info = {
            name: 'Theo Templeton', mobileNumber: '7484789276', contactEmail: 'theotempleton@gmail.com', website: 'teavana-t.github.io',
            workHistory: [{
                name: '1st Handforth Scouts',
                time: '03/2021 - 05/2021',
                title: 'Freelance web Developer',
                desc: `Developed landing pages, dashboards and online applications using WordPress and Server-side scripting to create a customised Template and a smooth customer experience throughout.`
            },
            {
                name: 'Pet Sitter Dashboard',
                time: '',
                title: 'Freelance Web Developer',
                desc: `During my time at Pet Sitter Dashboard I worked on the automatic E-Mail system as a sole Developer and making sure to account for differences in Browsers and their localised support for render functions. Established presentation consistency across Chrome, Safari, Firefox and other common browser interfaces. Drafted customized layout and wireframes based on predetermined parameters and expectations`
            },
            {
                name: '',
                time: '',
                title: '',
                desc: ``
            },
            {
                name: '',
                time: '',
                title: '',
                desc: ``
            }, 
            {
                name: '',
                time: '',
                title: '',
                desc: ``
            },
            {
                name: '',
                time: '',
                title: '',
                desc: ``
            },
            ]
        }

        return (info)
    }

    formatInfo(info: Info) {
        /* Format string into segments with a function */
        function fNum(x: any, y: any, z: any) { return x.slice(y, z).join('') }

        let tNum: any[] = info.mobileNumber.split('');
        info.mobileNumber = `+44 ${fNum(tNum, 0, 4)} ${fNum(tNum, 4, 7)} ${fNum(tNum, 7, 10)}`;

        return (info)
    }



    render() {
        let columnStyle = { backgroundColor: '#abacad66', padding: '1.5rem', paddingTop: '0', paddingBottom: '0' }

        let aboutMe = `I enjoy problem solving and working in a team to solve a complex problem ensuring the best technical approach, minimising tech debt, and ensuring quality is baked in from the start. Following a fantastic opportunity to work at Booking.com as a junior developer for my work experience I discovered a love of software development and have been studying towards a future in software development in a collaborative fast paced environment. I have undertaken several personal projects alongside my studies to practice coding and broaden my learning wherever possible.`

        return (
            <div style={{ backgroundColor: 'white' }}>
                <Container>
                    <Grid centered>
                        <Grid.Row style={{ padding: 0 }} >
                            <Grid.Column style={{ backgroundColor: '#abacad66' }} width={6} textAlign='center' >
                                <img src={LogoNoBG} height='200rem' />
                            </Grid.Column>
                            <Grid.Column width={10} textAlign='center' verticalAlign='middle' >
                                <Header style={{ fontSize: '75px' }} size='huge' textAlign='left'>
                                    {this.formatInfo(this.getInfo()).name}
                                    <Header.Subheader style={{ fontSize: '40px' }}>
                                        Junior Software Developer
                                    </Header.Subheader>
                                </Header>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row style={{ padding: 0 }} >
                            <Grid.Column style={columnStyle} width={6} >
                                <Header dividing >
                                    <Header.Content>Contact me</Header.Content>
                                    <Icon name='phone' style={{ float: 'right' }} />
                                </Header>
                            </Grid.Column>
                            <Grid.Column width={10} >
                                <Header dividing >
                                    <Header.Content>About me</Header.Content>
                                    <Icon name='list ul' style={{ float: 'right' }} />
                                </Header>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row style={{ padding: 0 }} >
                            <Grid.Column style={columnStyle} width={6} > {/* #847A9F #A178A4 #B172A5 */}

                                <Label style={{ width: '100%', margin: '5px', marginTop: '1.5rem', backgroundColor: '#847a9f' }} size='large'>
                                    Mobile Number:
                                    <Label.Detail style={{ float: 'right' }} >
                                        {this.formatInfo(this.getInfo()).mobileNumber}
                                    </Label.Detail>
                                </Label>
                                <Label style={{ width: '100%', margin: '5px', backgroundColor: '#a178a4' }} size='large'>
                                    Work Email:
                                    <Label.Detail style={{ float: 'right' }} >
                                        {this.formatInfo(this.getInfo()).contactEmail}
                                    </Label.Detail>
                                </Label>
                                <Label style={{ width: '100%', margin: '5px', backgroundColor: '#B172a5' }} size='large'>
                                    Website:
                                    <Label.Detail style={{ float: 'right' }} >
                                        {this.formatInfo(this.getInfo()).website}
                                    </Label.Detail>
                                </Label>
                            </Grid.Column>
                            <Grid.Column width={10} style={{ paddingTop: '1rem' }} >
                                {aboutMe}
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row style={{ padding: 0 }} >
                            <Grid.Column style={columnStyle} width={6}>
                                <Header dividing style={{ paddingTop: '1rem' }} >
                                    <Header.Content>My Skills</Header.Content>
                                    <Icon name='star outline' style={{ float: 'right' }} />
                                </Header>
                            </Grid.Column>
                            <Grid.Column width={10}>
                                <Header dividing style={{ paddingTop: '1rem' }} >
                                    <Header.Content>Current Activity</Header.Content>
                                    <Icon name='clipboard outline' style={{ float: 'right' }} />
                                </Header>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row style={{ padding: 0 }} >
                            <Grid.Column style={columnStyle} width={6}>
                                <Skill name="Javascript" value={8} color='#a178a4' />
                                <Skill name="Python" value={6} color='#a178a4' />
                                <Skill name="Programatic thinking" value={6} color='#a178a4' />
                                <Skill name="C#" value={2} color='#a178a4' />

                            </Grid.Column>
                            <Grid.Column width={10}>
                                <Grid style={{ margin: 0, padding: 0 }}>
                                    <Grid.Column width={2} style={{ padding: 0, paddingTop: 10, textAlign: 'center' }}>
                                        <Icon name='dot circle outline' size='big' style={{ margin: 0 }} />
                                        <div style={{ display: 'block', backgroundColor: 'black', height: '79%', width: '5px', margin: 'auto' }} />
                                    </Grid.Column>
                                    <Grid.Column width={14} style={{ padding: 0, paddingTop: 10 }}>
                                        <Header style={{}} size='small' textAlign='left'>
                                            {this.formatInfo(this.getInfo()).workHistory[0].name}
                                            <Header.Subheader style={{}}>
                                                {this.formatInfo(this.getInfo()).workHistory[0].title}
                                            </Header.Subheader>
                                        </Header>
                                        {this.formatInfo(this.getInfo()).workHistory[0].desc}
                                    </Grid.Column>
                                    <Grid.Column width={2} style={{ padding: 0, paddingTop: 10, textAlign: 'center' }}>
                                        <Icon name='dot circle outline' size='big' style={{ margin: 0 }} />
                                        <div style={{ display: 'block', backgroundColor: 'black', height: '70%', width: '5px', margin: 'auto' }} />
                                    </Grid.Column>
                                    <Grid.Column width={14} style={{ padding: 0, paddingTop: 10 }}>
                                        <Header style={{}} size='small' textAlign='left'>
                                            {this.formatInfo(this.getInfo()).workHistory[1].name}
                                            <Header.Subheader style={{}}>
                                                {this.formatInfo(this.getInfo()).workHistory[1].title}
                                            </Header.Subheader>
                                        </Header>
                                        {this.formatInfo(this.getInfo()).workHistory[1].desc}
                                    </Grid.Column>
                                </Grid>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row style={{ padding: 0 }} >
                            <Grid.Column style={columnStyle} width={6}>

                            </Grid.Column>
                            <Grid.Column width={10}>

                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            </div>
        );
    }
}

export default CV;