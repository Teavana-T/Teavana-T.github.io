import { Component } from "react";


class FakeReviewCore extends Component {

    componentDidMount() {
        const apiUrl = 'https://randomuser.me/api/?results=3';
        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => console.log('This is your data', data));
    }

    render() {
        return (
            <div>

            </div>
        );
    }

}


export default FakeReviewCore;