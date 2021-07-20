import { FlexibleWidthXYPlot, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, LineSeries } from 'react-vis';
import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';

import '../../node_modules/react-vis/dist/style.css';

class ArmourChart extends Component<{
    armour: number,
    tough: number,
    prot: number,
    lineData: {
        color: string,
        name: string,
        dataSet: { a: number, t: number, p: number },
        index: number
    }[],
    rangeMin: number,
    rangeMax: number
}, { one: number }> {
    constructor(props: any) {
        super(props);
        this.state = {
            one: 1
        };
    }

    makeDataSet(armour: number, toughness: number, prot: number) {
        const series = [];
        for (let j = this.props.rangeMin; j < this.props.rangeMax; j++) {
            series.push({
                x: j, y: (j * (
                    1 - (
                        Math.min(
                            20, Math.max(armour / 5, armour - (
                                4 * j / (toughness + 8)
                            ))
                        ) / 25))) * (1 - prot * 0.04)
            });

        };
        return (series);
    }

    render() {
        return (
            <Container>
                <FlexibleWidthXYPlot height={300}>
                    <VerticalGridLines />
                    <HorizontalGridLines />
                    {
                        this.props.lineData.map(lineInfo => (
                            <LineSeries data={this.makeDataSet(lineInfo.dataSet.a, lineInfo.dataSet.t, lineInfo.dataSet.p)} color={lineInfo.color} key={lineInfo.name} />
                        ))
                    }
                    <XAxis title="Raw Damage" />
                    <YAxis title="Damage Taken" />
                </FlexibleWidthXYPlot>
            </Container>
        );
    }
}

export default ArmourChart;