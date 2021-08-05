import React, { Component } from 'react';
import './ValueInput.css';
import { Image, Input, Label, Button, Icon, Popup } from 'semantic-ui-react';

class InputBox extends Component<{
    onValueSubmit: any,
    name: string,
    placeholder: string,
    labelImage: any,
    labelText: string,
    hintText: string
    value: any
}, {}> {

    render() {
        return (
            <Input
                name={this.props.name}
                placeholder={this.props.placeholder}
                value={this.props.value}
                onChange={(event) => this.props.onValueSubmit(event.target.name, event.target.value)}
                className='pixelImage'
                type='number'
                labelPosition='left'
                fluid
                action
                style={{ paddingBottom: '5px' }}
            >
                <Label style={{ width: 120 }}>
                    <Image inline size='mini' src={this.props.labelImage} spaced='right' />
                    {this.props.labelText}
                </Label>
                <input style={{ paddingLeft: '6px', paddingRight: '3px' }} />
                <Popup trigger={<Button icon><Icon name="question" /></Button>}>{this.props.hintText}</Popup>
            </Input>

        );
    }
}

export default InputBox;