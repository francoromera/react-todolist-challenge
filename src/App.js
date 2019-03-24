import React, { Component } from 'react';
import { connect } from 'react-redux';

import './App.css';

import List from './components/list';
import Input from './components/input';
import Button from './components/button';

import {
    retrieveListItems,
    addListItem,
    editListItem,
    removeListItem,
} from "./actions/listActions";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            text: '',
            edit: null,
        };
        this.handleSave = this.handleSave.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
    }

    componentDidMount() {
        const { retrieveListItems } = this.props;
        retrieveListItems();
    }

    handleSave() {
        const { text, edit } = this.state;
        const { list, addListItem, editListItem } = this.props;
        if (text.trim()) {
            this.setState({ text: '', edit: null });
            if (edit) {
                editListItem(
                    list.find(it => it.id.toString() === edit.toString()),
                    this.state.text.trim(),
                );
            } else {
                addListItem({
                    name: this.state.text.trim(),
                });
            }
        }
    }

    handleEdit(item) {
        this.setState({
            edit: item.id,
            text: item.name,
        })
    }

    handleRemove(item) {
        const { removeListItem } = this.props;
        removeListItem(item);
    }

    render() {
        const { list, messages } = this.props;
        const { text, edit } = this.state;
        const orderedList = list.sort((a, b) => a.name.localeCompare(b.name));
        return (
            <div className="container">

                <h1>Todo List</h1>
                
                <div className='add-item-to-list'>
                    <Input
                        name='item'
                        placeholder='New Item...'
                        value={text}
                        onChange={(text) => this.setState({ text })}
                    />
                    <Button onClick={this.handleSave} type='add'>
                        {edit ? 'Edit' : 'Add'}
                    </Button>
                    {edit && (
                        <Button onClick={() => this.setState({
                            edit: null,
                            text: '',
                        })} type='cancel'>Cancel</Button>
                    )}
                </div>

                {messages && messages.length > 0 && (
                    <div className="message-container">
                        {messages.map((message, i) => (
                            <div key={i} className={`message message-${message.type}`}>
                                { message.text }
                            </div>
                        ))}
                    </div>
                )}

                <List
                    items={orderedList}
                    onEdit={this.handleEdit}
                    onRemove={this.handleRemove}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { list, messages } = state;
    return {
        list,
        messages,
    }
};

const mapDispatchToProps = {
    retrieveListItems,
    addListItem,
    editListItem,
    removeListItem,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
