import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';

interface EntityState {
    live: boolean
}

interface EntityProps {

}

class Entity extends Component<EntityProps, EntityState> {
    constructor(props: any) {
        super(props)

        this.state = {
            live: true
        }
    }

    getAdjacent(coords: any): boolean[] {

        return ([
            false,
            false,
            true,
            true,
            true,
            true,
            false,
            false
        ])
    }

    doTick( coords: any, live: boolean ) {

        let adjacentTiles = this.getAdjacent(coords)

        if (live) {

            let count = 0;

            for (let i = 0; i === 8; i++) {
                adjacentTiles[i] ? count++ : count = count;
            }

            // Rule 1 | Any live cell with fewer than two live neighbours dies, as if by underpopulation.
            if (count < 2) {
                this.setState({ 'live': false })
            }
            // Rule 2 | Any live cell with two or three live neighbours lives on to the next generation.
            else if (count === 2 || count === 3) {
                this.setState({ 'live': true })
            }
            // Rule 3 | Any live cell with more than three live neighbours dies, as if by overpopulation.
            else if (count > 3) {
                this.setState({ 'live': false })
            }
            // Rule 4 | Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
            else if (count === 3) {
                this.setState({ 'live': true })
            }
        }
    }

    componentDidUpdate(){
        this.doTick([1,1], this.state.live)
    }

    render() {
        return (
            <React.Fragment>
                <Segment inverted color={this.state.live ? 'blue' : undefined} />
            </React.Fragment>
        )
    }
}

export default Entity;