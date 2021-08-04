import React, { Component, Fragment } from 'react';
import { Header, Button, Image, Divider, Dropdown } from 'semantic-ui-react';
import update from 'immutability-helper';

import { Leather, Iron, Gold, Diamond, Netherite } from '../../Images';

class AddArmourDisplay extends Component<{
    lineData: {
        color: string,
        name: string,
        dataSet: { a: number, t: number, p: number },
        index: number
    }[],
    createLineData: any,
    spliceLineData: any,
    customLineData: {
        color: string,
        name: string,
        dataSet: { a: number, t: number, p: number },
        index: number
    }
}, { activeVanilla: string, activeDataSet: string, activeAddChoice: string, optionSets: any[] }> {
    constructor(props: any) {
        super(props);
        this.state = {
            activeVanilla: 'Leather',
            activeDataSet: '',
            activeAddChoice: 'preset',
            optionSets: [{
                key: 'preset',
                text: 'Preset',
                value: 'preset'
            }, {
                key: 'custom',
                text: 'Custom',
                value: 'custom'
            }]
        }

        this.swapActive = this.swapActive.bind(this);
        this.selectDataSet = this.selectDataSet.bind(this);
        this.beamMeUp = this.beamMeUp.bind(this);
        this.optionSet = this.optionSet.bind(this);
        this.handleChangeSet = this.handleChangeSet.bind(this);
        this.handleChangeAdd = this.handleChangeAdd.bind(this);
    }

    getVanillaValues(set: string, index: number) {
        switch (set) {
            case 'Leather':
                return ({
                    color: 'brown',
                    name: 'Leather',
                    dataSet: { a: 7, t: 0, p: 0 },
                    index: index
                });
            case 'Iron':
                return ({
                    color: '',
                    name: 'Iron',
                    dataSet: { a: 15, t: 0, p: 0 },
                    index: index
                });
            case 'Gold':
                return ({
                    color: 'yellow',
                    name: 'Gold',
                    dataSet: { a: 11, t: 0, p: 0 },
                    index: index
                });
            case 'Diamond':
                return ({
                    color: 'teal',
                    name: 'Diamond',
                    dataSet: { a: 20, t: 8, p: 0 },
                    index: index
                });
            case 'Netherite':
                return ({
                    color: 'black',
                    name: 'Netherite',
                    dataSet: { a: 20, t: 12, p: 0 },
                    index: index
                });
            default:
                return (null);
        }
    }

    swapActive(event: any, data: any, active: string) {
        this.setState(
            update(this.state, { activeVanilla: { $set: active } }), () => (console.log(this.state))
        );
    }

    selectDataSet(event: any, data: any) {
        const newData = update(this.state, { activeDataSet: { $set: data.index } });

        this.setState(newData);

        console.log(event.target);
        console.log(this.state);
    }

    beamMeUp() {
        let flip: boolean | undefined = undefined
        for (let i = 0; i < this.props.lineData.length; i++) { this.props.lineData[i].name === this.state.activeVanilla ? flip = false : flip = true }
        if (flip) {
            let newData = this.props.lineData

            const vSet = this.getVanillaValues(this.state.activeVanilla, this.props.lineData.length + 1)

            if (vSet != null) {
                newData.push(vSet);

                this.props.createLineData(newData);
            }
        } else {

        }
    }

    optionSet(): { key: string, text: string, value: string | number, label: any }[] {
        let lineMap: any[] = this.props.lineData.map(lineInfo => (
            {
                key: lineInfo.index,
                text: lineInfo.name,
                value: lineInfo.index,
                label: { color: lineInfo.color, empty: true, circular: true }
            }
        ));

        return lineMap;
    }

    handleChangeSet(e: any, data: any) {
        let activeSet: string = data.value === undefined ? '' : data.value

        this.setState(update(this.state, { activeDataSet: { $set: activeSet } }))
    }

    handleChangeAdd(e: any, data: any) {
        let activeAddChoice: string = data.value === undefined ? '' : data.value

        this.setState(update(this.state, { activeAddChoice: { $set: activeAddChoice } }))
    }



    render() {
        return (
            <Fragment>

                <Header as='h2' content='Add sets' subheader='Use a preset or add your own stats' inverted dividing />
                <Button.Group>
                    <Button basic inverted onClick={(e, d) => this.swapActive(e, d, 'Leather')} active={this.state.activeVanilla === 'Leather' ? true : false} color='brown' content={<Image src={Leather} />} />
                    <Button basic inverted onClick={(e, d) => this.swapActive(e, d, 'Iron')} active={this.state.activeVanilla === 'Iron' ? true : false} color={undefined} content={<Image src={Iron} />} />
                    <Button basic inverted onClick={(e, d) => this.swapActive(e, d, 'Gold')} active={this.state.activeVanilla === 'Gold' ? true : false} color='yellow' content={<Image src={Gold} />} />
                    <Button basic inverted onClick={(e, d) => this.swapActive(e, d, 'Diamond')} active={this.state.activeVanilla === 'Diamond' ? true : false} color='teal' content={<Image src={Diamond} />} />
                    <Button basic inverted onClick={(e, d) => this.swapActive(e, d, 'Netherite')} active={this.state.activeVanilla === 'Netherite' ? true : false} color='black' content={<Image src={Netherite} />} />
                </Button.Group>

                <Divider />

                <Button.Group style={{width:'45%'}} >
                    <Dropdown
                        onOpen={() => this.setState(update(this.state, { optionSets: { $set: this.optionSet() } }))}
                        value={this.state.activeDataSet}
                        onChange={this.handleChangeSet}
                        options={this.state.optionSets}

                         style={{width: '100px'}}
                        button text=''
                    ></Dropdown>
                    <Button inverted style={{ height: '38px', width:'38px', marginTop: '0px' }} color='red' icon='trash' onClick={(e, d) => this.props.spliceLineData(this.state.activeDataSet)} />
                </Button.Group>
                <Button.Group color='green' style={{ paddingLeft:'10%', width:'45%'}} >
                    <Dropdown
                        value={this.state.activeAddChoice}
                        onChange={this.handleChangeAdd}
                        options={[{
                            key: 'preset',
                            text: 'Preset',
                            value: 'preset',
                        }, {
                            key: 'custom',
                            text: 'Custom',
                            value: 'custom'
                        }]}
                        labeled floating style={{width: '100px'}}
                    ></Dropdown>
                    <Button inverted style={{ height: '38px', width:'38px', marginTop: '0px' }} color='green' icon='add' onClick={this.state.activeAddChoice === 'custom' ? () => this.props.createLineData(this.props.customLineData) : () => this.props.createLineData(this.getVanillaValues(this.state.activeVanilla, this.props.lineData.length)) } />
                </Button.Group>
            </Fragment>
        );
    }
}

export default AddArmourDisplay;