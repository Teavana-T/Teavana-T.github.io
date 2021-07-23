import { Component } from "react";
import { Grid, GridColumn } from "semantic-ui-react";
import './background.css';



class Background extends Component<{height: number, width: number}, {}> {
    constructor(props: any) {
        super(props);
    }

    static defaultProps = {
        height: 8,
        width: 8
    }

    generateSquares(width: number, colour: number[], colourOffset: number) {

        let squareArray: any[] = [];

        for (let i=0; i < width; i++) {
            squareArray.push(<Grid.Column key={i} style={{padding:0}} width={2}><div key={i} className='square' style={{backgroundColor:`rgb(${colour[0]+(colourOffset*i+1)},${colour[1]-(colourOffset*i+1)},${colour[2]})`}} /></Grid.Column>)
        }

        return(squareArray);
    }

    generateSquareSet(height: number, width: number) {

        let squareArray: any[] = [];

        let colourOffset = ((57/width)/height)*2;

        let colour: number[] = [198, 255, 198];

        for (let i=0; i < height; i++) {
            squareArray.push(<Grid.Row key={i} style={{padding:0}}>{this.generateSquares(width, colour, colourOffset)}</Grid.Row>)
            colour = [colour[0]+colourOffset*(i+1), colour[1]-colourOffset*(i+1), colour[2]]
        }

        return(squareArray);
    }

    render() {
        return(
            <Grid style={{position:'absolute', left:'0px', top:'45px', zIndex:'-1', width: '100%', margin:'0'}}>
                {this.generateSquareSet(this.props.height, this.props.width)}
            </Grid>
        )
    }
}

export default Background;