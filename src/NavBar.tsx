import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Icon, Transition } from 'semantic-ui-react';

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
                <Menu fixed='top' inverted>
                    <Menu.Item onClick={() => this.setState({visible: true})} >
                        <Icon name='bars' /> Menu

                    </Menu.Item>
                </Menu>
                <Transition visible={this.state.visible} animation='slide right'>
                    <Menu fixed='left' vertical inverted >
                        <Menu.Item onClick={() => this.setState({visible: false})} >
                            Close Menu 
                            <Icon name='close'/>
                        </Menu.Item>
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
                    </Menu>
                </Transition>
            </span>
        );
    }
}


export default NavBar;