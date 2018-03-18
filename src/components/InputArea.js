import React from 'react'

class InputArea extends React.PureComponent {
    state = {
        value: this.props.value,
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.value!==this.state.value) this.setState({ value: nextProps.value });
    }

    handleKeyPress = event => {
        if (event.key === "Enter") this.textInput.blur();
    }
    handleChange = event => {
        this.setState({ value: event.target.value });
    }
    handleFocus = event =>{
        event.target.select();
    }

    render() {
        return <div className={this.props.className}>
            <input type="text"
                ref={(input) => { this.textInput = input; }}
                onFocus={this.handleFocus}
                onBlur={event =>{this.props.onChange(event.target.value);}}
                value={this.state.value || ''}
                onChange={this.handleChange}
                onKeyPress={this.handleKeyPress}
                className="w-100"
                placeholder={this.props.children}
            />
        </div>
    }
};
export default InputArea;