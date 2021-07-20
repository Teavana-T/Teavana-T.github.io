import React, { Component } from 'react';
import './ValueInput.css';
import { Image, Input, Label, Button, Icon } from 'semantic-ui-react';

class InputBox extends Component<{ onValueSubmit: any, name: string, placeholder: string, labelImage: any, labelText: string }, { value: string }> {
    constructor(props: any) {
        super(props);
        this.state = { value: '' };

        this.onInputChange = this.onInputChange.bind(this);
    }

    onInputChange(event: any) {
        this.setState({ value: event.target.value })
        this.props.onValueSubmit(event.target.name, event.target.value)
        
    }

    render() {
        return (
            <Input
                name={this.props.name}
                placeholder={this.props.placeholder}
                value={this.state.value}
                onChange={this.onInputChange}
                className='pixelImage'
                type='number'
                labelPosition='left'
                fluid
                action
                
            >
                <Label style={{ width: 120 }}>
                    <Image inline size='mini' src={this.props.labelImage} spaced='right' />
                    {this.props.labelText}
                </Label>
                <input style={{ paddingLeft:'6px', paddingRight:'3px'  }} />
                <Button icon><Icon name="question" /></Button>
            </Input>

        );
    }
}

export default InputBox;