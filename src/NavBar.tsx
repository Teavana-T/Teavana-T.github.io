import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Image, Dropdown, Input, Icon, Transition } from 'semantic-ui-react';

import { LogoCircle, ArmourIcon } from './Images';

class NavBar extends Component<{ page: string }, { isActive: string, visible: boolean }> {
    constructor(props: any) {
        super(props);

        this.state = {
            isActive: this.props.page,
            visible: false
        }
    }

    render() {
        const { isActive } = this.state;
        console.log(this.props.page);

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
                        <Menu.Item as={Link} to='/' onClick={() => this.setState({visible: false})} >
                            <Icon name='home' />
                            Home
                        </Menu.Item>
                        <Menu.Item as={Link} to='/armour-app' onClick={() => this.setState({visible: false})} >
                            Armour App
                        </Menu.Item>
                        <Menu.Item as={Link} to='/socials' onClick={() => this.setState({visible: false})} >
                            Social page
                        </Menu.Item>
                    </Menu>
                </Transition>
            </span>
        );
    }
}


export default NavBar;