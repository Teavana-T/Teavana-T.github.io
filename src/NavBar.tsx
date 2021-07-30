import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Image, Dropdown, Input } from 'semantic-ui-react';

import { LogoCircle, ArmourIcon } from './Images';

class NavBar extends Component<{ page: string }, { isActive: string }> {
    constructor(props: any) {
        super(props);

        this.state = {
            isActive: this.props.page
        }
    }

    render() {
        const { isActive } = this.state;
        console.log(this.props.page);

        return (
            <Menu attached inverted>
                <Menu.Item style={{ padding: 5 }} >
                    <Image src={LogoCircle} size='mini' spaced='right' />
                </Menu.Item>
                <Menu.Item header>
                    Teavana Solutions
                </Menu.Item>
                <Menu.Item fitted >
                    <Input
                        list='projects'
                        placeholder='Search...'
                        icon='search'
                    />
                    <datalist id='projects'>
                        <option value='Armour Calculator'>Armour Calculator</option>
                        <option value='Home'>Home</option>
                    </datalist>
                </Menu.Item>
                <Menu.Menu position='right'>
                    <Menu.Item
                        as={Link}
                        to='/minecraft-armour'
                        content="Armour Calculator"

                    >
                        <Image src={ArmourIcon}  />
                        Armour Calculator
                    </Menu.Item>
                    <Menu.Item
                        as={Link}
                        content='Home'
                        to='/'
                    />
                </Menu.Menu>
            </Menu>
        );
    }
}


export default NavBar;