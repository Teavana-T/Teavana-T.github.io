import { Component } from "react";
import { Card, Container, Divider, Grid, Header, Icon, Image } from "semantic-ui-react";
import { DiscordLogo, EmailIcon, SnapchatLogo, SpotifyLogo, SteamLogo, TwitterLogo, InstagramLogo } from "../../Images";

class SocialCard extends Component<{ content: any }, {}> {
    render() {
        let { content } = this.props

        return (
            <Card href={this.props.content.link} basic onClick={() => content.header === 'E-Mail' ? navigator.clipboard.writeText(content.user) : undefined}  >
                <Card.Content>
                    <Image floated='right' style={{ width: '20%' }} src={content.image} />
                    <Card.Header content={content.header} />
                    <Card.Meta content={content.desc} />
                    <Card.Description content={content.user} />
                </Card.Content>
            </Card>
        )
    }
}

class SocialApp extends Component {

    socials = [
        {
            header: 'Snapchat',
            user: 'Teavana-T',
            desc: 'A messaging service where messages and images are limited-time only',
            image: SnapchatLogo
        },
        {
            header: 'Discord',
            user: 'Teavana#0001',
            desc: 'A messaging and VoIP platform with many additional features',
            image: DiscordLogo,
            link: 'https://discordapp.com/users/152413452525240320/'
        },
        {
            header: 'Steam',
            user: 'Teavana',
            desc: 'A platform to buy, play and install games from. Includes VoIP and text chat',
            image: SteamLogo,
            link: 'https://steamcommunity.com/id/TeavanaT/'
        },
        {
            header: 'Twitter',
            user: 'TeavanaST',
            desc: 'Twitter is a microblogging and social networking service',
            image: TwitterLogo,
            link: 'https://twitter.com/TeavanaST'
        },
        {
            header: 'Instagram',
            user: 'teavana.t',
            desc: 'Instagram is an image-forward sharing platform sharing many common features',
            image: InstagramLogo,
            link: 'https://www.instagram.com/teavana.t/'
        }
    ]

    platforms = [
        {
            header: 'Spotify',
            user: 'teavanat',
            desc: 'A music streaming and download service allowing users to create custom playlists',
            image: SpotifyLogo,
            link: 'https://open.spotify.com/user/teavanat'
        },
        {
            header: 'E-Mail',
            user: 'iamteavana@gmail.com',
            desc: 'Send me an E-Mail to get in contact with me!',
            image: EmailIcon
        },
        {
            header: 'Github',
            user: 'Teavana-T',
            desc: 'View my Projects and commits'
        }
    ]

    render() {

        const socials = this.socials;
        const platforms = this.platforms;

        return (
            <Container>
                <Header content='Social Media' dividing textAlign='center' />
                <Grid columns={12} >
                    <Grid.Row>
                        <Grid.Column width={ 16 } >
                            <Card.Group centered >
                                {socials.map(content => <SocialCard content={content} />)}
                            </Card.Group>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={16} >
                            <Header content='Contact & Platforms' dividing textAlign='center' />
                            <Card.Group centered >
                                {platforms.map(content => <SocialCard content={content} />)}
                            </Card.Group>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        );
    }

    static preview = <span>
        <Icon name='bell' /> A simple display page to aggregate my social media
    </span>
}

export default SocialApp;