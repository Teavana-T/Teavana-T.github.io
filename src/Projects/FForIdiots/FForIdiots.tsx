import { Component, Fragment } from "react";
import { Breadcrumb, Button, Card, Checkbox, Container, Form, Grid, Header, Icon, Image, Input, Label, Message, Segment } from "semantic-ui-react";

import devices from './devices.json';
import care from './samsungcareplus.json';

import './FForIdiots.css';
import { Link, useParams } from "react-router-dom";
// interface devicesTypes {

// }

class DeviceList extends Component<any, any> {

    getList(devices: any) {

        let list = Object.keys(devices).map((key: any) =>
            <Grid.Column width={8}>
                <Card as={Link} to={'/ffi/' + key} style={{ width: '95%' }}>
                    <Image src={devices[key].colours[0].img} />
                    <Card.Content>
                        <Header>{devices[key].name}</Header>
                    </Card.Content>
                </Card>
            </Grid.Column>
        )

        return list
    }

    render() {
        return (
            <Container>
                <br />
                <Grid >

                    {this.getList(devices)}

                </Grid>
            </Container>
        )
    }
}

class FForIdiots extends Component<any, any> {
    constructor(props: any) {
        super(props);

        this.state = {
            device: 's23u',
            name: '',
            img: '',
            colour: '',
            size: '',
            hex: '',
            ram: 0,

            tradeinVal: 0,
            rrp: 0,
            price: 0,
            care: 0,

            tradein: false,

            deposit: 0,
            period: 12,
            tempdeposit: 0
        };
    }

    getDevice(devCode: any) {

        let device: any = devices[devCode as keyof typeof devices]

        let newState: any = {};
        newState.device = devCode;
        newState.name = device.name;


        this.setState(newState);
    }

    getSizes() {
        let device: any = devices[this.state.device as keyof typeof devices];

        let buttons = device.sizes.map((size: any) =>
            <Grid.Column style={{ textAlign: 'center' }}>
                <Button
                    onClick={() => this.updateSize(size)}
                    active={this.state.size === size.name ? true : false}
                >
                    {size.name}
                </Button>
            </Grid.Column>
        );

        let buttonGrid = <Grid columns={buttons.length}>
            {buttons}
        </Grid>

        return buttonGrid;
    }

    getColours() {
        let device: any = devices[this.state.device as keyof typeof devices];

        let colours = device.colours.map((colour: any) =>
            <Grid.Column
                style={{
                    backgroundColor: colour.hex,
                    textAlign: 'center'
                }}
                onClick={() => this.updateColour(colour)}
            >
                {this.state.colour === colour.name ? <Icon name='circle outline' color="blue"></Icon> : ''}
            </Grid.Column>
        );

        let colourGrid = <Grid columns={colours.length} divided>
            {colours}
        </Grid>

        return colourGrid;
    }

    getCare() {
        let scpGroup: any = devices[this.state.device as keyof typeof devices].scpGroup
        let options: any = care[scpGroup as keyof typeof care].map((care) => <Grid.Column><Button onClick={() => this.setState({ care: care.price })}>{care.name}</Button></Grid.Column>)

        let careButtons = <Grid columns={options.length}>
            <Grid.Row><Grid.Column width={16}><Button style={{ width: '100%', textAlign: 'center' }} onClick={() => this.setState({ care: 0 })}>None</Button></Grid.Column></Grid.Row>
            {options}
        </Grid>;

        return careButtons;
    }

    updateDevice(devCode: string) {

        this.setState({ device: devCode });

        let device: any = devices[devCode as keyof typeof devices];

        this.updateSize(devices[devCode as keyof typeof devices].sizes[0])
        this.updateColour(devices[devCode as keyof typeof devices].colours[0])
        this.setState({
            name: device.name,
            deposit: device.sizes[0].price / 10,
            tempdeposit: device.sizes[0].price / 10,
            tradeinVal: device.tradein
        })
    }

    updateSize(size: any) {
        let newState: any = {};

        newState.size = size.name
        newState.price = size.price
        newState.rrp = size.rrp
        newState.ram = size.ram

        this.setState(newState);
    }

    updateColour(colour: any) {
        let newState: any = {};

        newState.colour = colour.name;
        newState.img = colour.img;

        this.setState(newState);
    }



    handleChange = (event: any) => {
        let { name, value, min, max } = event.target;
        value = Math.max(Number(min), Math.min(Number(max), Number(value)));

        this.setState({ [name]: value });
    };


    componentDidMount(): void {
        this.updateDevice(this.props.params.device);
    }

    componentDidUpdate(prevProps: any) {
        // If url (/ffi/xyz) updates re-render component with new parameter (xyz)
        if (this.props.params.device !== prevProps.params.device) {
            this.updateDevice(this.props.params.device);
        }

    }

    render() {

        let total = this.state.price;

        total = this.state.tradein ? total - this.state.tradeinVal : total;
        total = this.state.care + total;


        return (
            <Container>
                <br />
                <Breadcrumb size='massive'>
                    <Breadcrumb.Section link><Link to='/ffi' >Devices</Link></Breadcrumb.Section>
                    <Breadcrumb.Divider />
                    <Breadcrumb.Section active>{this.state.name}</Breadcrumb.Section>
                </Breadcrumb>

                <Card style={{ width: '95vw' }}>
                    <Image src={this.state.img} />
                    <Card.Content>
                        <Card.Header>{this.state.name}  </Card.Header>

                        £{this.state.price === this.state.rrp ? this.state.price : <Fragment><s>{this.state.rrp}</s> £{this.state.price}</Fragment>} <Label >{this.state.size} | {this.state.ram} </Label>
                    </Card.Content>

                    <Card.Content>
                        {this.getColours()}
                    </Card.Content>

                    <Card.Content >
                        {this.getSizes()}
                    </Card.Content>
                </Card>

                <Segment>
                    <Header>Care</Header>

                    {this.getCare()}
                </Segment>
                {
                    this.state.tradeinVal != 0 ?
                        <Button as={Segment} style={{ textAlign: 'center', width: '100%' }} color={this.state.tradein ? 'green' : 'grey'} value={this.state.tradein} onClick={(e: any, d: any) => this.setState({ tradein: !d.value })}>
                            Trade in <Icon name={this.state.tradein ? 'check' : 'x'} />
                        </Button> : ''
                }

                <Segment>
                    <Header>Finance</Header>

                    <Form>
                        <Input
                            min={12}
                            max={36}
                            name='period'
                            onChange={this.handleChange}
                            step={12}
                            type='range'
                            value={this.state.period}
                        >
                            <Label content='Period: ' />
                            <input className="slider" />
                        </Input>

                        <Input
                            min={total * 0.1}
                            max={total * 0.6}
                            name='deposit'
                            onChange={(e) => { this.handleChange(e); this.setState({ tempdeposit: e.target.value }) }}
                            step={10}
                            type='range'
                            value={this.state.deposit}
                        >
                            <Label content='Deposit: ' />
                            <input className="slider" />
                        </Input>
                        <Input
                            name='tempdeposit'
                            onChange={(e) => this.setState({ tempdeposit: e.target.value })}
                            value={this.state.tempdeposit}
                        >
                        </Input>
                        <Button onClick={(e) => this.setState({ deposit: this.state.tempdeposit })} icon='check' />
                    </Form>
                    <br />


                    Total: £{total} <br />
                    Period: {this.state.period} months <br />
                    Depost: £{((this.state.deposit * 100) / 100).toFixed(2)} <br />
                    Monthly: £{((total - this.state.deposit) / this.state.period).toFixed(2)}
                </Segment>
                <Message negative>
                    This is not an official offer nor is it a final offer. These are subject to change, confirm your finance package with a salesperson at the tills.
                </Message>
            </Container>
        );
    }
}

export { DeviceList };

export default (props: any) => (
    <FForIdiots
        {...props}
        params={useParams()}
    />
)