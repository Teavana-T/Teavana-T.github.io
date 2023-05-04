import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Icon, Transition, Dropdown } from 'semantic-ui-react';

class NavBar extends Component<{ page: string }, { isActive: string, visible: boolean }> {
    constructor(props: any) {
        super(props);

        this.state = {
            isActive: this.props.page,
            visible: false
        }
    }

    componentDidMount () {
        
    }

    render() {
        if ( this.props.page !== this.state.isActive ) {
            this.setState({'isActive': this.props.page});
        }

        const { isActive } = this.state;

        return (
            <span>
                
                    <Menu fixed='top' inverted >
                        
                        <Menu.Item as={Link} active={isActive === 'home'} to='/' onClick={() => this.setState({visible: false})} >
                            <Icon name='home' />
                            Home
                        </Menu.Item>
                        <Menu.Item as={Link} active={isActive === 'aApp'} to='/armour-app' onClick={() => this.setState({visible: false})} >
                            Armour App
                        </Menu.Item>
                        <Menu.Item as={Link} active={isActive === 'sApp'} to='/socials' onClick={() => this.setState({visible: false})} >
                            Social page
                        </Menu.Item>
                        <Menu.Item as={Dropdown} item text='Stardew Valley'>
                            <Dropdown.Menu>
                                <Dropdown.Item as={Link} to='/bundles' content='Bundles' />
                            </Dropdown.Menu>
                        </Menu.Item>
                        <Menu.Item as='a' href='https://discord.gg/Mh8Q3tCYC6'  position='right'>
                            Discord
                        </Menu.Item>
                        {/* <Menu.Item>
                        <iframe src="https://discord.com/widget?id=644919621878546432&theme=dark" width="175" height="500" allowTransparency={true} frameBorder="0" sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"></iframe>
                        </Menu.Item> */}
                    </Menu>
                
            </span>
        );
    }
}


export default NavBar;