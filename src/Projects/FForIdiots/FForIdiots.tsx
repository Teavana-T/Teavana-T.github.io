import { Component, Fragment } from "react";
import { Breadcrumb, Button, Card, Container, Divider, Grid, Header, Icon, Image, Input, Label, Message, Placeholder, Segment } from "semantic-ui-react";

import './FForIdiots.css';
import { Link, useParams } from "react-router-dom";
// interface devicesTypes {

// }

interface BasketItem {
    name: string,
    amount: number
}

interface BasketTyping extends Array<BasketItem> { }

interface PackageState {
    basket: BasketTyping,
    devices: any,
    care: any,
    loading: boolean,
    [name: string]: any
}

class PackageBuilder extends Component<any, PackageState> {
    constructor(props: any) {
        super(props);

        this.state = {
            basket: [],
            devices: {},
            care: {},
            loading: true
        }

        this.updateBasket = this.updateBasket.bind(this);
        this.printBasket = this.printBasket.bind(this);

        this.handleChange = this.handleChange.bind(this);
    }

    updateBasket(newItem: any) {
        let basket: BasketTyping = this.state.basket;

        basket.push(newItem);

        this.setState({ basket: basket });
    }

    printBasket() {
        let basket = this.state.basket.map(item => <Label>{item.name}: {item.amount}</Label>)

        return (basket);
    }

    componentDidMount(): void {
        fetch('https://scissaria.com/vigilant-guacamole/devices.json')
            .then(response => response.json())
            .then(data => this.setState({ devices: data }))
            .then(
                () => fetch('https://scissaria.com/vigilant-guacamole/samsungcareplus.json')
                    .then(response => response.json())
                    .then(data => this.setState({ care: data }))
            ).then(() => this.setState({ loading: false }))
    }

    handleChange = (event: any) => {
        let { name, value, min, max } = event.target;
        value = Math.max(Number(min), Math.min(Number(max), Number(value)));

        return new Promise((resolve: any) => this.setState({ [name]: value }, resolve));
    };

    render() {
        return (
            <Container>
                {this.props.params.device ?
                    this.state.loading ? <Placeholder /> : <FForIdiots
                        params={this.props.params}
                        basket={this.state.basket}
                        updateBasket={this.updateBasket}
                        printBasket={this.printBasket}
                        devices={this.state.devices}
                        care={this.state.care}
                        loading={this.state.loading}
                        handleChange={this.handleChange}
                        deposit={this.state.deposit}
                    /> : this.state.loading ? <Placeholder /> : <DeviceList devices={this.state.devices} loading={this.state.loading} />
                }
            </Container>
        );
    }
}

class FinanceDisplay extends Component<{ total: number, handleChange: any, deposit: number }, any> {

    constructor(props: any) {
        super(props);

        this.state = {
            collapsed: true,

            period: 12,
            tempdeposit: 0
        }
    }

    handleChange = (event: any) => {
        let { name, value, min, max } = event.target;
        value = Math.max(Number(min), Math.min(Number(max), Number(value)));

        return new Promise((resolve: any) => this.setState({ [name]: value }, resolve));
    };

    render() {

        let total = this.props.total;

        return (
            <Segment>
                <Header onClick={() => { this.setState({ collapsed: !this.state.collapsed, tempdeposit: this.props.total * 0.1 }); this.props.handleChange({ target: { name: 'deposit', value: total * 0.1, min: total * 0.1, max: total * 0.5 } }) }}>Finance <Icon style={{ float: 'right' }} name={this.state.collapsed ? 'chevron down' : 'chevron up'} ></Icon></Header>
                {this.state.collapsed ? '' :
                    <Fragment>
                        <Grid style={{ width: '100%' }}>
                            <Grid.Row>
                                <Grid.Column width={4}>
                                    <Label style={{ width: '100%', textAlign: 'right' }}>Period:</Label>
                                </Grid.Column>
                                <Grid.Column width={12}>
                                    <Input
                                        style={{ width: '100%' }}
                                        min={12}
                                        max={36}
                                        name='period'
                                        onChange={this.handleChange}
                                        step={12}
                                        type='range'
                                        value={this.state.period}
                                    >
                                        <input className="slider" />
                                    </Input>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column width={4}>
                                    <Label content='Deposit: ' style={{ width: '100%', textAlign: 'right' }} />
                                </Grid.Column>
                                <Grid.Column width={12}>
                                    <Input
                                        style={{ width: '100%' }}
                                        min={total * 0.1}
                                        max={total * 0.5}
                                        name='deposit'
                                        onChange={(e) => { this.props.handleChange(e); this.setState({ tempdeposit: e.target.value }) }}
                                        step={total / 100}
                                        type='range'
                                        value={this.props.deposit}
                                    >
                                        <input className="slider" />
                                    </Input>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column width={12}>
                                    <Input
                                        style={{ width: '100%' }}
                                        name='tempdeposit'
                                        onChange={(e) => this.setState({ tempdeposit: e.target.value })}
                                        value={this.state.tempdeposit}
                                    />

                                </Grid.Column>
                                <Grid.Column width={4}>
                                    <Button
                                        onClick={() => {
                                            let e = {
                                                target: {
                                                    name: 'deposit',
                                                    value: this.state.tempdeposit,
                                                    min: total * 0.1,
                                                    max: total * 0.5
                                                }
                                            };
                                            this.props.handleChange(e).then(
                                                () => this.setState({ tempdeposit: this.props.deposit })
                                            );

                                        }
                                        }

                                        icon='check'
                                    />
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                        <br />


                        Total: £{total} <br />
                        Period: {this.state.period} months <br />
                        Deposit: £{((this.props.deposit * 100) / 100).toFixed(2)} <br />
                        Monthly: £{((total - this.props.deposit) / this.state.period).toFixed(2)}
                    </Fragment>
                }

            </Segment>
        )
    }
}

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
                    {this.getList(this.props.devices)}
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
            careCost: 0,

            basket: {},

            slideIndex: 0,

            tradein: false,

            deposit: 0,
            period: 12,
            tempdeposit: 0
        };

        this.componentDidUpdate = this.componentDidUpdate.bind(this);
    }

    getDevice(devCode: any) {

        let device: any = this.props.devices[devCode as keyof typeof this.props.devices]

        let newState: any = {};
        newState.device = devCode;
        newState.name = device.name;


        this.setState(newState);
    }

    getSizes() {
        let device: any = this.props.devices[this.state.device as keyof typeof this.props.devices];

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
        let device: any = this.props.devices[this.state.device as keyof typeof this.props.devices];

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
        let scpGroup: any = this.props.devices[this.state.device as keyof typeof this.props.devices].scpGroup
        let options: any = this.props.care[scpGroup as keyof typeof this.props.care].map(
            (care: any) => <Grid.Column>
                <Button
                    onClick={() => {
                        let basket = this.state.basket;
                        basket.care = { name: care.name, amount: care.price };
                        this.setState({ basket: basket, careCost: care.price })
                    }}
                >{care.name}</Button>
            </Grid.Column>
        )

        let careButtons = <Grid columns={options.length}>
            <Grid.Row><Grid.Column width={16}><Button style={{ width: '100%', textAlign: 'center' }} onClick={() => { let basket = this.state.basket; basket.care = null; this.setState({ basket: basket }); this.setState({ care: 0 }) }}>None</Button></Grid.Column></Grid.Row>
            {options}
        </Grid>;

        return careButtons;
    }



    updateDevice(devCode: string) {
        let device: any = this.props.devices[devCode as keyof typeof this.props.devices];

        this.setState({
            device: devCode,
            name: device.name,
            deposit: device.sizes[0].price / 10,
            tempdeposit: device.sizes[0].price / 10,
            tradeinVal: device.tradein
        });

        this.updateSize(this.props.devices[devCode as keyof typeof this.props.devices].sizes[0]);
        this.updateColour(this.props.devices[devCode as keyof typeof this.props.devices].colours[0]);

    }

    updateSize(size: any) {
        let newState: any = {};

        newState.size = size.name;
        newState.price = size.price;
        newState.rrp = size.rrp;
        newState.ram = size.ram;

        let basket = this.state.basket;

        basket.device = { name: size.name, amount: size.price };

        this.setState(newState);
        this.setState({ basket: basket });
    }

    updateColour(colour: any) {
        let newState: any = {};

        newState.colour = colour.name;
        newState.img = colour.img;

        this.setState(newState);
    }






    componentDidMount(): void {
        this.updateDevice(this.props.params.device);
    }

    componentDidUpdate(prevProps: any) {
        // If url (/ffi/xyz) updates re-render component with new parameter (xyz)
        if (this.props.params.device !== prevProps.params.device) {
            this.updateDevice(this.props.params.device);
        }

        // if (!this.props.loading) {
        //     if (this.state.careCost + this.state.price - this.state.tradeinVal !== prevProps.state.careCost + prevProps.state.price - prevProps.state.tradeinVal) {
        //         this.setState({ deposit: (this.state.careCost + this.state.price - this.state.tradeinVal) * 0.1 })
        //     }
        // }
    }

    render() {

        let total = this.state.price;

        total = this.state.tradein ? total - this.state.tradeinVal : total;

        total = total + this.state.careCost;


        return (
            <Container>
                <br />
                <Breadcrumb size='massive'>
                    <Breadcrumb.Section link><Link to='/ffi' >Devices</Link></Breadcrumb.Section>
                    <Breadcrumb.Divider />
                    <Breadcrumb.Section active>{this.state.name}</Breadcrumb.Section>
                </Breadcrumb>

                <Card style={{ width: '95vw' }}>
                    <div className="slideshow" onClick={() => this.setState({ slideIndex: (this.state.slideIndex === 0 ? 1 : 0) })}>
                        <div className="slideshowSlider" style={{ transform: `translate3d(${-this.state.slideIndex * 100}%, 0, 0)` }} >
                            <Image className="slide" src={this.state.img} />
                            <div className="slide">
                                <Label>{this.state.name}</Label>
                            </div>
                        </div>
                    </div>

                    <Card.Content>
                        <Card.Header>{this.state.name}  </Card.Header>

                        £{this.state.price === this.state.rrp ? this.state.price : <Fragment><s>{this.state.rrp}</s> £{this.state.price}</Fragment>} <Label >{this.state.size} | {this.state.ram} </Label>
                    </Card.Content>

                    <Card.Content>
                        {this.props.loading ? <Placeholder /> : this.getColours()}
                    </Card.Content>

                    <Card.Content >
                        {this.props.loading ? <Placeholder /> : this.getSizes()}
                    </Card.Content>
                </Card>

                <Segment>
                    <Header>Care</Header>

                    {this.props.loading ? <Placeholder /> : this.getCare()}
                </Segment>
                {
                    this.state.tradeinVal != 0 ?
                        <Button as={Segment} style={{ textAlign: 'center', width: '100%' }} color={this.state.tradein ? 'green' : 'grey'} value={this.state.tradein} onClick={(e: any, d: any) => this.setState({ tradein: !d.value })}>
                            Trade in <Icon name={this.state.tradein ? 'check' : 'x'} />
                        </Button> : ''
                }

                <Button as={Segment} style={{ textAlign: 'center', width: '100%' }} color='green' onClick={() => { this.props.updateBasket(this.state.basket.device); this.state.basket.care ? this.props.updateBasket(this.state.basket.care) : console.log('xd') }}>
                    Add to basket <Icon name='add' />
                </Button>

                <Divider />

                <Message negative>
                    This is not an official offer nor is it a final offer. These are subject to change, confirm your finance package with a salesperson at the tills.
                </Message>


                <FinanceDisplay total={total} handleChange={this.props.handleChange} deposit={this.props.deposit} />
                <br />
            </Container >
        );
    }
}

export { DeviceList };

export default (props: any) => (
    <PackageBuilder
        {...props}
        params={useParams()}
    />
)