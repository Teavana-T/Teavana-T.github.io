import React, { Component } from 'react';
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

        return (
            <Menu attached inverted>
                <Menu.Item style={{ padding: 5 }} >
                    <Image src={LogoCircle} size='mini' spaced='right' />
                </Menu.Item>
                <Menu.Item header>
                    Teavana Solutions
                </Menu.Item>
                <Menu.Item fitted >
                    <Input list='projects' placeholder='Search...' icon='search' />
                    <datalist id='projects'>
                        <option value='Armour Calculator'>Armour Calculator</option>
                        <option value='Home'>Home</option>
                    </datalist>
                </Menu.Item>
                <Menu.Menu position='right'>
                    <Dropdown item text="Tools">
                        <Dropdown.Menu>
                            <Dropdown.Item content="Armour Calculator" href='/minecraft-damage/' active={isActive === 'aApp'} >
                                <Image src={ArmourIcon} />
                                Armour Calculator
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Menu.Item
                        active={isActive === 'home'}
                        content="Home"
                        href='/'
                    />
                </Menu.Menu>
            </Menu>
        );
    }
}


export default NavBar;