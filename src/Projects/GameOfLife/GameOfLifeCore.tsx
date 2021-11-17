import React, { Component } from 'react';
import { Button, Grid } from 'semantic-ui-react';

import Entity from './GoLEntity';

class GameOfLife extends Component {
    
    

    

    populateRow( columns: number ) {
        let returnFragment = [];

        for( let i = 0; i < columns; i++ ) {
            returnFragment.push(
                <Grid.Column width={1} >
                    <Entity />
                </Grid.Column>
            )
        }


        console.log(returnFragment);
        return ( returnFragment )
    }

    populateGrid( rows: number, columns: number ) {
        let returnFragment = [];

        for( let i = 0; i < rows; i++ ) {
            returnFragment.push(
                <Grid.Column width={1} >
                    {this.populateRow(columns)}
                </Grid.Column>
            )
        }

        console.log(returnFragment)
        return ( returnFragment )
    }

    componentDidMount() {
        this.populateGrid(10, 10)
    }

    render() {
        return (
            <React.Fragment>
                <Grid columns={10} >
                    {this.populateGrid(10, 10)}
                </Grid>
                <Button onClick={() => this.setState(this.state)} />
            </React.Fragment>
        )
    }
}

export default GameOfLife;