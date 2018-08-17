import React, { Component } from 'react';
import ContactInfo from './ContactInfo';
import ContactDetails from './ContactDetails';
import ContactCreate from './ContactCreate';

import update from 'react-addons-update';

export default class Contact extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedKey: -1,
            keyword: '',
            contactData: [{
                name: 'Albert',
                phone: '647-100-1001'
            }, {
                name: 'Bernard',
                phone: '647-200-2002'
            }, {
                name: 'Christopher',
                phone: '647-300-3003'
            }, {
                name: 'Dave',
                phone: '647-400-4004'
            }, {
                name: 'Edward',
                phone: '647-500-5005'
            }]
        };

        // this.handleChange = this.handleChangeChange.bind(this);
    }

    componentDidMount() {
        const contactData = localStorage.contactData;

        if(contactData) {
            this.setState({
                contactData: JSON.parse(contactData)
            })
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if(JSON.stringify(prevState.contactData) != JSON.stringify(this.state.contactData)) {
            localStorage.contactData = JSON.stringify(this.state.contactData);
        }
    }

    // This arrow function does not need to specify this
    handleChange = (e) => {
        this.setState({
            keyword: e.target.value
        });
    }

    handleClick = (key) => {
        this.setState({
            selectedKey: key
        });

        console.log(key, 'is selected.');
    }

    handleCreate = (contact) => {
        this.setState({
            contactData: update(this.state.contactData, { $push: [contact] })
        });
    }

    handleRemove = () => {
        if(this.state.selectedKey < 0) {
            return;
        }

        this.setState({
            contactData: update(this.state.contactData,
                { $splice: [[this.state.selectedKey, 1]] }
            ),
            selectedKey: -1
        });
    }

    handleEdit = (name, phone) => {
        this.setState({
            contactData: update(this.state.contactData,
            {
                [this.state.selectedKey]: {
                    name: { $set: name },
                    phone: { $set: phone }
                }
            })
        })
    }

    render() {
        const mapToComponents = (data) => {
            data.sort();
            data = data.filter(
                (contact) => {
                    return contact.name.toLowerCase().indexOf(this.state.keyword) > -1;
                }
            )
            return data.map((contact, i) => {
                return (
                    <ContactInfo 
                        contact={contact} 
                        key={i} 
                        onClick={()=> this.handleClick(i)}
                    />
                );
            });
        };

        return (
            <div>
                <h1>Contacts</h1>
                <input
                    name="keyword"
                    placeholder="Search"
                    value={this.state.keyword}
                    onChange={this.handleChange} />
                <div>{mapToComponents(this.state.contactData)}</div>
                <ContactDetails 
                    isSelected={this.state.selectedKey != -1}
                    contact={this.state.contactData[this.state.selectedKey]} 
                    onRemove={this.handleRemove} 
                    onEdit={this.handleEdit} />
                <ContactCreate 
                    onCreate={this.handleCreate} />
                
            </div>
        );
    }
}