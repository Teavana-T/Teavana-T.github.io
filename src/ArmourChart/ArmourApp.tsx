import InputBox from './ValueInput';
import ArmourChart from './ArmourChart';
import AddArmourDisplay from './AddArmour';
import update from 'immutability-helper';
import { Segment, Form, Container, Grid, Divider, Button, Dropdown, Input } from 'semantic-ui-react';
import React, { Component } from 'react';

import { ArmourIcon, ToughnessIcon, ProtIcon } from '../Images';
import './ArmourApp.css';


class ArmourApp extends Component<{}, {
  armourValue: number,
  toughValue: number,
  protValue: number,
  color: string,
  lineName: string,
  lineData: {
    color: string,
    name: string,
    dataSet: { a: number, t: number, p: number },
    index: number
  }[]
}> {
  constructor(props: any) {
    super(props);
    this.state = {
      armourValue: 0,
      toughValue: 0,
      protValue: 0,
      color: '',
      lineName: '',
      lineData: [{
        color: 'red',
        name: 'Prot 6 Diamond',
        dataSet: { a: 20, t: 8, p: 6 },
        index: 0
      }, {
        color: 'grey',
        name: 'Prot 4 Iron',
        dataSet: { a: 15, t: 0, p: 4 },
        index: 1
      }
      ]
    };

    this.onValueSubmit = this.onValueSubmit.bind(this);
    this.createLineData = this.createLineData.bind(this);
    this.dropdownChange = this.dropdownChange.bind(this);
    this.spliceLineData = this.spliceLineData.bind(this);
    this.sortLineData = this.sortLineData.bind(this);
    this.nameChange = this.nameChange.bind(this);
  }

  onValueSubmit(key: string, value: string) {
    const newData = update(this.state, { [key]: { $set: value } });

    this.setState(newData);
  }

  dropdownChange(e: any, d: any) {
    this.onValueSubmit('color', d.value);
  }

  nameChange(e: any, d: any) {
    this.onValueSubmit('lineName', d.value);
  }

  sortLineData(lineData: any) {
    let lineArray: {color: string, name: string, dataSet: { a: number, t: number, p: number }, index: number}[] = [];

    for ( let i = 0; i < lineData.length; i++) {
        if (i >= lineData[i].index) {
            lineArray.push(lineData[i]);
        } else if (i < lineData[i].index) {
          lineArray.push(lineData[i]);
          lineArray[i].index = i;
        }
    }
    return lineArray;
  }

  createLineData(lineSet: {color: string, name: string, dataSet: { a: number, t: number, p: number }, index: number}) {
    let lineArray = this.sortLineData(this.state.lineData);
    lineArray.push(lineSet);
    let lineData = this.sortLineData(lineArray);

    const newData = update(this.state, { lineData: { $set: lineData } });

    this.setState(newData);
  }

  spliceLineData(index: number) {
    let lineArray = this.sortLineData(this.state.lineData);
    console.log(lineArray);
    lineArray.splice(index, 1);
    console.log(lineArray);
    let lineData = this.sortLineData(lineArray);

    const newData = update(this.state, { lineData: { $set: lineData } })
    this.setState(newData);
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
        text: colors[i],
        value: colors[i],
        label: { color: colors[i], empty: true, circular: true }
      })
    }
    return colorDropSet;
  }

  render() {
    return (
      <Container>
        <Segment inverted style={{ marginTop: '0px', paddingLeft: '0px' }} >
          <Grid columns={16} style={{ paddingLeft: '14px' }}>
            <Grid.Column width='6'>
              <Form>
                <InputBox labelImage={ArmourIcon} name="armourValue" labelText="Armour" placeholder='0-20' onValueSubmit={this.onValueSubmit} />
                <br />
                <InputBox labelImage={ToughnessIcon} name="toughValue" labelText="Toughness" placeholder='0-12' onValueSubmit={this.onValueSubmit} />
                <br />
                <InputBox labelImage={ProtIcon} name="protValue" labelText="Protection" placeholder='0-20' onValueSubmit={this.onValueSubmit} />
              </Form>
            </Grid.Column>
            <Grid.Column width='3'>
              <Dropdown fluid placeholder='Pick a color' value={this.state.color} onChange={this.dropdownChange} options={this.createColorDropSet()} style={{ marginTop: '10px' }} />
              <Input basic fluid inverted style={{ marginTop: '15px' }} value={this.state.lineName} onChange={this.nameChange} placeholder='Enter name' />
            </Grid.Column>
            <Grid.Column width='7' inverted>
              <AddArmourDisplay createLineData={this.createLineData} lineData={this.state.lineData} spliceLineData={this.spliceLineData}
                customLineData={{
                  color: this.state.color,
                  name: this.state.lineName,
                  dataSet: { a: this.state.armourValue, t: this.state.toughValue, p: this.state.protValue },
                  index: this.state.lineData.length}}
              />
            </Grid.Column>
          </Grid>
          <Divider style={{ marginLeft: '14px' }} inverted />
          <ArmourChart
            armour={this.state.armourValue}
            tough={this.state.toughValue}
            prot={this.state.protValue}
            lineData={this.state.lineData}
            rangeMin={1}
            rangeMax={50}
          />
          <Container style={{ paddingLeft: '14px' }}>
            <Button icon='refresh' color='green' inverted
              onClick={() => console.log(this.state)}
            />
          </Container>
        </Segment>
      </Container>
    );
  }
}


export default ArmourApp;
