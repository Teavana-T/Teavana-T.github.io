import { Component, Fragment } from "react";
import { Breadcrumb, Button, Card, Container, Divider, Grid, Header, Icon, Image, Input, Label, Loader, Message, Placeholder, Segment } from "semantic-ui-react";

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
            loading: true,
            deposit: 100
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
                        devices={this.state.devices}
                        care={this.state.care}
                        deposit={this.state.deposit}
                        handleChange={this.handleChange}
                        updateBasket={this.updateBasket}
                        printBasket={this.printBasket}
                    /> : <Fragment> <DeviceList state={this.state} devices={this.state.devices} /> <Divider /> <BundleDisplay devices={this.state.devices} /> <br /> </Fragment>
                }
            </Container>
        );
    }
}

class BundleDisplay extends Component<any, any> {
    constructor(props: any) {
        super(props);

        this.state = {
            loading: true,
            bundles: {}
        }
    }


    fetchBundles() {
        let bundleURL = "https://scissaria.com/vigilant-guacamole/bundles.json"

        fetch(bundleURL).then(
            (response) => response.json().then(
                (bundles: any) => this.setState({ bundles: bundles.bundles, loading: false })
            )
        )
    }

    displayBundles() {
        let bundleDisplay = this.state.bundles.map((bundle: any) => <Card>
            {
                bundle.basket.filter((item: any) => item.item != "VA" && item.item != "tabs9").map((item: any) =>
                    <Image src={this.props.devices[item.item] ? this.props.devices[item.item].colours[0].img : ""} />
                )
            }
            <Card.Content>
                <Header>{bundle.name}</Header>
                <Card.Meta>{bundle.accredit}'s bundle</Card.Meta>
            </Card.Content>


        </Card>);

        return bundleDisplay;
    }

    componentDidMount() {
        this.fetchBundles()
    }

    render() {
        return (<Fragment>
            {
                this.state.loading ? <Loader /> : this.displayBundles()
            }
        </Fragment>)
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
                <Header onClick={() => { this.setState({ collapsed: !this.state.collapsed, tempdeposit: this.props.total * 0.1 }) }}>Finance <Icon style={{ float: 'right' }} name={this.state.collapsed ? 'chevron down' : 'chevron up'} ></Icon></Header>
                {this.state.collapsed ? '' :
                    <Fragment>
                        <Grid style={{ width: '100%', margin: '0' }}>
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
                                        min={100}
                                        max={800}
                                        name='deposit'
                                        onChange={(e) => { this.props.handleChange(e); }}
                                        step={1}
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
                                        value={(this.state.tempdeposit)}
                                    />

                                </Grid.Column>
                                <Grid.Column width={4}>
                                    <Button
                                        onClick={() => {
                                            let e = {
                                                target: {
                                                    name: 'deposit',
                                                    value: this.state.tempdeposit / total * 1000,
                                                    min: 100,
                                                    max: 800
                                                }
                                            };
                                            this.props.handleChange(e).then(
                                                () => this.setState({ tempdeposit: (total / 1000 * this.props.deposit).toFixed(2) })
                                            );

                                        }
                                        }

                                        icon='check'
                                    />
                                </Grid.Column>
                            </Grid.Row>

                            <br />

                            <Grid.Row style={{ paddingRight: 0}}>
                                <Grid.Column width={4} style={{padding: '7'}}>
                                    <Label style={{ textAlign: 'center', width: '100%', height: '100%' }}>Total <br /> £{total}</Label>
                                </Grid.Column>
                                <Grid.Column width={4} style={{padding: '7'}}>
                                    <Label style={{ textAlign: 'center', width: '100%', height: '100%' }}>Period <br /> {this.state.period} months </Label>
                                </Grid.Column>
                                <Grid.Column width={4} style={{padding: '7'}}>
                                    <Label style={{ textAlign: 'center', width: '100%', height: '100%' }}>Deposit <br /> £{(this.props.deposit / 1000 * total).toFixed(2)} </Label>
                                </Grid.Column>
                                <Grid.Column width={4} style={{padding: '7'}}>
                                    <Label style={{ textAlign: 'center', width: '100%', height: '100%' }}>Monthly <br /> £{((total - (this.props.deposit / 1000 * total)) / this.state.period).toFixed(2)} </Label>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
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
                    {this.props.state.loading ? <Loader /> : this.getList(this.props.devices)}
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

    getOffers() {
        let device: any = this.props.devices[this.state.device as keyof typeof this.props.devices];
        console.log(device.offers)
        return device.offers == undefined ? <br /> : device.offers.map((offer: any) => <Segment style={{ textAlign: "center" }}>{offer.display}</Segment>)
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

                {this.props.loading ? <Placeholder /> : this.getOffers()}

                {/* <Button as={Segment} style={{ textAlign: 'center', width: '100%' }} color='green' onClick={() => { this.props.updateBasket(this.state.basket.device); this.state.basket.care ? this.props.updateBasket(this.state.basket.care) : console.log('xd') }}>
                    Add to basket <Icon name='add' />
                </Button> */}

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