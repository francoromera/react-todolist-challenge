import React, { Component } from "react";

import './index.css';
import Button from '../button';

class List extends Component {

    render() {
        const { items, onEdit, onRemove } = this.props;
        return (
            <table>
                <thead>
                    <tr>
                        <th width='66%'>Item</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(item => (
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>
                                <Button type='edit' onClick={() => onEdit(item)}>
                                    Edit
                                </Button>
                                <Button type='delete' onClick={() => onRemove(item)}>
                                    Delete
                                </Button> 
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }
}

export default List;
