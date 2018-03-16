import React from 'react'

class InputArea extends React.PureComponent {
    state = {
        value: this.props.value,
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.value!==this.props.value) this.setState({ value: nextProps.value });
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
                onBlur={this.props.change}
                value={this.state.value || ''}
                onChange={this.handleChange}
                onKeyPress={this.handleKeyPress}
                index={this.props.index}
                className="w-100"
            />
        </div>
    }
};
export default InputArea;