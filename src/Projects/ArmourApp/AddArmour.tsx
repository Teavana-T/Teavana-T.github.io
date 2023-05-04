import { Component } from "react";
import update from "immutability-helper";
import { Button, Dropdown, Grid, Input, SemanticCOLORS, Image, Header } from "semantic-ui-react";

import InputBox from './ValueInput';

// Importing all the images used
import { ArmourIcon, ToughnessIcon, ProtIcon } from '../../Images/index';
import { Leather, Iron, Gold, Diamond, Netherite } from '../../Images/index';

// Taken from Stack Overflow to manage
function getProperty<T, K extends keyof T>(o: T, propertyName: K): T[K] {
    return o[propertyName]; // o[propertyName] is of type T[K]
}

const inputBoxes: { icon: any, name: 'armourValue' | 'toughValue' | 'protValue', content: string, placeholder: string, hint: string }[] = [
    {
        icon: ArmourIcon,
        name: 'armourValue',
        content: 'Armour',
        placeholder: '0-20',
        hint: 'This is the white armour value, the main source of high scaling damage reduction'
    },
    {
        icon: ToughnessIcon,
        name: 'toughValue',
        content: 'Toughness',
        placeholder: '0-12',
        hint: 'This is the blue armour value, toughness increases the value of each Armour point to a certain degree'
    },
    {
        icon: ProtIcon,
        name: 'protValue',
        content: 'Protection',
        placeholder: '0-20',
        hint: 'Protection is an enchant, enter your total protection ie. (3x Prot 2 pieces = Prot 6)'
    }
]

const vanillaButtons: { value: string, color: SemanticCOLORS | undefined, image: any }[] = [
    {
        value: 'leather',
        color: 'brown',
        image: Leather
    },
    {
        value: 'iron',
        color: undefined,
        image: Iron
    },
    {
        value: 'gold',
        color: 'yellow',
        image: Gold
    },
    {
        value: 'diamond',
        color: 'teal',
        image: Diamond
    },
    {
        value: 'netherite',
        color: 'black',
        image: Netherite
    }
]

// Typing componenet props lazily
interface AddArmourProps {
    onValueSubmit: any,
    selectVanillaSet: any,
    createLineData: any,
    spliceLineData: any,
    handleChangeSet: any,
    lineData: any,
    coreState: any
};

interface AddArmourState {
    optionSets: any[]
}

class AddArmour extends Component<AddArmourProps, AddArmourState> {
    constructor(props: AddArmourProps) {
        super(props)

        this.state = {
            optionSets: []
        }

        this.onTrash = this.onTrash.bind(this);
    }

    createColorDropSet(): { key: string, text: string, value: string, label: { color: string, empty: boolean, circular: boolean } }[] {
        let colors: string[] = [
            'red',
            'orange',
            'yellow',
            'olive',
            'green',
            'teal',
            'blue',
            'violet',
            'purple',
            'pink',
            'brown',
            'grey',
            'black',
        ];

        let colorDropSet: { key: string, text: string, value: string, label: { color: string, empty: boolean, circular: boolean } }[] = []

        for (let i = 0; i < colors.length; i++) {
            colorDropSet.push({
                key: colors[i],
                text: colors[i][0].toUpperCase() + colors[i].slice(1, colors[i].length),
                value: colors[i],
                label: { color: colors[i], empty: true, circular: true }
            })
        }
        return colorDropSet;
    }

    optionSet(): { key: string, text: string, value: string | number, label: any }[] {
        let lineMap: any[] = this.props.lineData.map((lineInfo: any) => (
            {
                key: lineInfo.index,
                text: lineInfo.name,
                value: lineInfo.index,
                label: { color: lineInfo.color, empty: true, circular: true }
            }
        ));

        return lineMap;
    }

    onTrash(){
        this.props.spliceLineData(this.props.coreState.activeDataSet)
    }

    render() {
        return (
            <Grid columns={16} style={{ paddingLeft: '14px' }}>
                <Grid.Column width='6'>
                    {/* Map the 3 value boxes because I'm lazy */}
                    {inputBoxes.map((input: any) => <InputBox value={getProperty(this.props.coreState, input.name)} labelImage={input.icon} name={input.name} labelText={input.content} placeholder={input.placeholder} hintText={input.hint} onValueSubmit={this.props.onValueSubmit} />)}

                    {/* Line colour and name selection */}
                    <span >
                        <Dropdown
                            placeholder='Pick a color'
                            value={this.props.coreState.color}
                            onChange={(e, d) => this.props.onValueSubmit('color', d.value)}
                            options={this.createColorDropSet()}
                            style={{ marginTop: '10px', width: '40%' }}
                        />
                        <Input
                            basic
                            inverted
                            value={this.props.coreState.lineName}
                            onChange={(e, d) => this.props.onValueSubmit('lineName', d.value)}
                            placeholder='Enter name'
                            style={{ width: '60%', float: 'right' }}
                        />
                    </span>
                </Grid.Column>
                <Grid.Column style={{ width: '90px' }}>
                    <Button.Group vertical>
                        {vanillaButtons.map(button => <Button basic inverted onClick={() => this.props.selectVanillaSet(button.value)} color={button.color} content={<Image src={button.image} />} />)}
                    </Button.Group>
                </Grid.Column>
                <Grid.Column width='8' inverted>
                    <Header as='h2' content='Add and Delete sets/plotted lines' inverted dividing />
                    Enter your Armour information in the respective fields on the left, several vanilla presets have been provided

                    
                    {/* Manage current lines and add additional lines */}
                    <span style={{ position: 'absolute', bottom: '14px', left: '14px' }}>
                        <Button color='green' inverted icon='plus' onClick={this.props.createLineData} />
                        <Dropdown
                            onOpen={() => this.setState(update(this.state, { optionSets: { $set: this.optionSet() } }))}
                            value={this.props.coreState.activeDataSet}
                            onChange={this.props.handleChangeSet}
                            options={this.state.optionSets}
                            placeholder='Select a line'
                            style={{ paddingLeft: '10px', width: '140px' }}
                        />
                        <Button
                            onClick={this.onTrash}
                            style={{ height: '38px', width: '38px', marginTop: '0px' }}
                            color='red'
                            icon='trash'
                            inverted
                        />
                    </span>

                    {/* Manage graph range */}
                    <span style={{ position: 'absolute', bottom: '14px', float: 'right' }}>
                        <Header as='h4' content='Graph range' inverted style={{ marginLeft: '125px' }} />
                        <Input value={this.props.coreState.rangeMin} onChange={(e, d) => (this.props.onValueSubmit('rangeMin', d.value))} label='Min' style={{ width: '18%', paddingLeft: '0px' }} />
                        <Input value={this.props.coreState.rangeMax} onChange={(e, d) => (this.props.onValueSubmit('rangeMax', d.value))} label='Max' style={{ width: '18%', paddingLeft: '0px' ,marginLeft: '55px' }} />
                    </span>
                </Grid.Column>
            </Grid>
        );
    }
}

export default AddArmour