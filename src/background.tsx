import { Component } from "react";
import { Grid } from "semantic-ui-react";
import { SemanticWIDTHS } from "semantic-ui-react/dist/commonjs/generic";
import './background.css';


class Background extends Component<{height: number, width: number, colour: number[]}, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            squareSet: []
        }
    }

    static defaultProps = {
        height: 16,
        width: 8,
        colour: [152, 252, 152]
    }

    generateSquares(width: number, colour: number[], colourOffset: number) {

        let squareArray: any[] = [];

        for (let i=0; i < width; i++) {
            squareArray.push(<Grid.Column key={i} style={{padding:0}} width={Math.max(16/width) as SemanticWIDTHS}><div key={i} className='square' style={{backgroundColor:`rgb(${colour[0]+(colourOffset*i+1)},${colour[1]-(colourOffset*i+1)},${colour[2]})`}} /></Grid.Column>)
        }

        return(squareArray);
    }

    generateSquareSet(height: number, width: number, colour: number[]) {

        let squareArray: any[] = [];

        let colourOffset = ((57/width)/height)*2;

        for (let i=0; i < height; i++) {
            squareArray.push(<Grid.Row key={i} style={{padding:0}}>{this.generateSquares(width, colour, colourOffset)}</Grid.Row>)
            colour = [colour[0]+colourOffset*(i+1), colour[1]-colourOffset*(i+1), colour[2]]
        }

        return(squareArray);
    }

    componentDidMount() {
        this.setState({squareSet: this.generateSquareSet(this.props.height, this.props.width, this.props.colour)})
    }

    render() {
        return(
            <Grid style={{position:'fixed', left:'0', top:'0', zIndex:'-1', width: '100%', height:'100vh', overflowY:'hidden', margin:'0'}}>
                {this.state.squareSet}
            </Grid>
        )
    }
}

export default Background;