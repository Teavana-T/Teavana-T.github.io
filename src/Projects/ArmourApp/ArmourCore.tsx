// import ArmourChart from './ArmourChart';
import AddArmour from './AddArmour';
// import update from 'immutability-helper';
import { Segment, Container, Divider, Button, Image } from 'semantic-ui-react';
import { Component } from 'react';

import './ArmourApp.css';
import { armourSVG } from '../../Images';

interface ArmourAppState {
  armourValue: number,
  toughValue: number,
  protValue: number,
  color: string,
  lineName: string,
  activeDataSet: string,
  rangeMin: number,
  rangeMax: number,
  lineData: {
    color: string,
    name: string,
    dataSet: { a: number, t: number, p: number },
    index: number
  }[]
}


class ArmourApp extends Component<{}, ArmourAppState> {
  constructor(props: any) {
    super(props);
    this.state = {
      armourValue: 0,
      toughValue: 0,
      protValue: 0,
      color: '',
      lineName: '',
      activeDataSet: '',
      rangeMin: 1,
      rangeMax: 50,
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

    // this.onValueSubmit = this.onValueSubmit.bind(this);
    this.createLineData = this.createLineData.bind(this);
    this.spliceLineData = this.spliceLineData.bind(this);
    this.handleChangeSet = this.handleChangeSet.bind(this);
    this.sortLineData = this.sortLineData.bind(this);
    this.selectVanillaSet = this.selectVanillaSet.bind(this);
  }

  static vanillaValues: any = {
    'leather': {
      color: 'brown',
      name: 'Leather',
      dataSet: { a: 7, t: 0, p: 0 },
    },
    'iron': {
      color: '',
      name: 'Iron',
      dataSet: { a: 15, t: 0, p: 0 },
    },
    'gold': {
      color: 'yellow',
      name: 'Gold',
      dataSet: { a: 11, t: 0, p: 0 },
    },
    'diamond': {
      color: 'teal',
      name: 'Diamond',
      dataSet: { a: 20, t: 8, p: 0 },
    },
    'netherite': {
      color: 'black',
      name: 'Netherite',
      dataSet: { a: 20, t: 12, p: 0 },
    }
  }


  // onValueSubmit(key: string, value: string) {
  //   const newData = update(this.state, { [key]: { $set: value } });

  //   this.setState(newData);
  // }

  handleChangeSet(e: any, data: any) {
    let activeSet: string = data.value === undefined ? '' : data.value

    // this.onValueSubmit('activeDataSet', activeSet);
}

  sortLineData(lineData: any) {
    let lineArray: { color: string, name: string, dataSet: { a: number, t: number, p: number }, index: number }[] = [];

    for (let i = 0; i < lineData.length; i++) {
      if (i >= lineData[i].index) {
        lineArray.push(lineData[i]);
      } else if (i < lineData[i].index) {
        lineArray.push(lineData[i]);
        lineArray[i].index = i;
      }
    }
    return lineArray;
  }

  createLineData() {
    let lineSet = {
      color: this.state.color,
      name: this.state.lineName,
      dataSet: {
        a: this.state.armourValue,
        t: this.state.toughValue,
        p: this.state.protValue
      },
      index: this.state.lineData.length
    }
    let lineArray = this.sortLineData(this.state.lineData);
    lineArray.push(lineSet);
    let lineData = this.sortLineData(lineArray);

    // const newData = update(this.state, { lineData: { $set: lineData } });

    // this.setState(newData);
  }

  spliceLineData(index: number) {
    let lineArray = this.sortLineData(this.state.lineData);
    console.log(lineArray);
    lineArray.splice(index, 1);
    console.log(lineArray);
    let lineData = this.sortLineData(lineArray);

    // const newData = update(this.state, { lineData: { $set: lineData } })
    // this.setState(newData);

    
  }

  selectVanillaSet(set: string) {
    let valueSet: any = ArmourApp.vanillaValues[set];

    // let newData = update(this.state, {
    //   armourValue: { $set: valueSet.dataSet.a },
    //   toughValue: { $set: valueSet.dataSet.t },
    //   protValue: { $set: valueSet.dataSet.p },
    //   color: { $set: valueSet.color },
    //   lineName: { $set: valueSet.name }
    // });

    // this.setState(newData);

  }

  render() {
    return (
      <Container>
        <Segment inverted style={{ marginTop: '0px', paddingLeft: '0px' }} >
          {/* <AddArmour
            createLineData={this.createLineData}
            onValueSubmit={this.onValueSubmit}
            selectVanillaSet={this.selectVanillaSet}
            spliceLineData={this.spliceLineData}
            handleChangeSet={this.handleChangeSet}
            lineData={this.state.lineData}
            coreState={this.state} 
          /> */}

          <Divider style={{ marginLeft: '14px' }} inverted />

          {/* <ArmourChart
            lineData={this.state.lineData}
            rangeMin={this.state.rangeMin}
            rangeMax={this.state.rangeMax}
            onValueSubmit={this.onValueSubmit}
          /> */}
          <Container style={{ paddingLeft: '14px' }}>
            <Button icon='refresh' color='green' inverted
              onClick={() => console.log(this.state)}
            />
          </Container>
        </Segment>
      </Container>
    );
  }

  static preview = <span>
    <Image src={armourSVG} floated='left' size='mini' />
    An app to calculate damage taken from raw damage values and equipped armour pieces
  </span>
}


export default ArmourApp;
