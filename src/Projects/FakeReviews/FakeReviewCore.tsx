import { Component } from "react";
import { Label, Card, Icon, Image, Container } from 'semantic-ui-react';


interface apiResult {"gender":"male","name":{"title":"Mr","first":"Rasmus","last":"Staven"},"location":{"street":{"number":7883,"name":"Thorvald Erichsens vei"},"city":"Storås","state":"Telemark","country":"Norway","postcode":"4695","coordinates":{"latitude":"48.4104","longitude":"-150.3957"},"timezone":{"offset":"-10:00","description":"Hawaii"}},"email":"rasmus.staven@example.com","login":{"uuid":"cc1cdcc5-2646-4eb5-89cd-2262e901aced","username":"smallsnake253","password":"melissa","salt":"kzpA3TvU","md5":"c17a746f6a7e0bbd46a1d25ccafde3f1","sha1":"5686e0b11df4062d4cb43b8513782e6322e2bf90","sha256":"19e7b2f3b47ede5a404389afcc6a31f5d4452f7914451e622b8bea6f9607d301"},"dob":{"date":"1952-06-10T18:03:30.431Z","age":69},"registered":{"date":"2008-11-02T08:38:55.377Z","age":13},"phone":"85016798","cell":"45808267","id":{"name":"FN","value":"10065241949"},"picture":{"large":"https://randomuser.me/api/portraits/men/17.jpg","medium":"https://randomuser.me/api/portraits/med/men/17.jpg","thumbnail":"https://randomuser.me/api/portraits/thumb/men/17.jpg"},"nat":"NO"}



interface state {
    results: apiResult[];
}


class FakeReviewCore extends Component<any, state> {
    constructor(props: any) {
        super(props)

        this.state = {
            results: []
        }
    }

    componentDidMount() {
        const apiUrl = 'https://randomuser.me/api/?results=3';
        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => this.setState(data));
    }

    render() {

         let sub1 = this.state.results?.[0];

        return (
            <Container>
                <Card>
                    <Image src={ sub1?.picture.large || null } />
                    <Card.Content extra>
                        hdaihvibvoininid afi hoishgdgdqwfu wdqoihfoiqoihfhqoihf  oqhoqhdfoihfohor
                    </Card.Content>
                    <Card.Content>
                    
                        <Card.Header>
                            <Icon name={ sub1?.gender === "male" ? "male" : "female" } size='large' />
                            { `${sub1?.name.first} ${sub1?.name.last}` }
                        </Card.Header>
                        <Card.Meta style={{float:'right', textAlign: 'right'}}>
                            {sub1?.registered.age} years old <br />
                            { `Joined at ${ new Date(Date.parse(sub1?.registered.date)).toLocaleDateString('en-UK') }` }
                        </Card.Meta>
                        <Card.Description style={{ textAlign: 'center', paddingTop: 10 }}>
                           <Label content={sub1?.email} />
                           <Label content={sub1?.phone} />
                           <Label content={sub1?.login.username} />
                        </Card.Description>
                    </Card.Content>
                    
                </Card>
            </Container>
        );
    }

}


export default FakeReviewCore;