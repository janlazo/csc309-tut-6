import React from 'react';
import ReactDOM from 'react-dom';

function Item(props) {
    return (
        <li>{props.currency} -> {props.value}</li>
    );
}

class PlainList extends React.Component {
    render() {
        return (
            <ul>
                {this.props.items.map(item => (
                    <Item key={item.currency} currency={item.currency} value={item.value}/>
                ))}
            </ul>
        );
    }
}

class TutorialApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: []
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {
        return (
            <div>
                <h3>React / Fetch Tutorial</h3>
                <PlainList items={this.state.items}/>
                <form onSubmit={this.handleSubmit}>
                    <button>Fetch Data</button>
                </form>
            </div>
        );
    }

    handleSubmit(e) {
        var foo = this;
        e.preventDefault();
        fetch('http://api.fixer.io/2017-11-02')
            .then(function (response) {
                if (response.ok) {
                    return response.json();
                }
                throw "No Data";
            })
            .then(function (obj) {
                foo.setState({
                    items: Object.keys(obj.rates).map(function (currency) {
                        return {
                            currency: currency,
                            value: obj.rates[currency]
                        };
                    })
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}

ReactDOM.render(<TutorialApp/>, document.getElementById('root'));
