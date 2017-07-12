import React, { Component } from 'react'
import { Modal, Input, Button, Icon } from 'antd'
import { Contact, Search } from '../components'

//! 测试数据
import { contacts } from '../TEST_DATA'

export default class ChatAddPeople extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: [],
        }
    }

    select = (index) => {
        let selected = this.state.selected
        let arrayIndex = selected.indexOf(index)
        if (arrayIndex !== -1) {
            selected.splice(arrayIndex, 1)
            this.setState({
                selected: [...selected],
            })
        } else {
            selected.push(index)
            selected.sort((a, b) => (a - b))
            this.setState({
                selected: [...selected]
            })
        }
    }

    unSelect = (index) => {
        console.log(index)
        let selected = this.state.selected
        console.log(selected)
        selected.splice(index, 1)
        console.log(selected)
        this.setState({
            selected: [...selected]
        })
    }

    render() {
        const selectedPeople = this.state.selected.map((index) => (
            contacts[index]
        ))
        return (
            <Modal
                title={null}
                footer={null}
                closable={false}
                visible={this.props.visible}
                wrapClassName="im-chat-addpeople"
                width={500}
            >
                <div className="im-chat-addpeople-left">
                    <div className="im-chat-addpeople-search">
                        <Input.Search className="im-chat-addpeople-input" onChange={() => { }} />
                    </div>
                    <div className="im-chat-addpeople-contactsList">
                        {contacts.map((c, index) => (
                            <div className="im-chat-addpeople-contacts" onClick={() => { this.select(index) }} key={c.name}>
                                <Contact
                                    avatar={c.avatar}
                                    name={c.name}
                                />
                                {
                                    this.state.selected.indexOf(index) !== -1
                                        ?
                                        <Button icon="check" type="primary" shape="circle" size="small" />
                                        :
                                        <Button shape="circle" size="small"></Button>
                                }
                            </div>
                        ))}
                    </div>
                </div>
                <div className="im-chat-addpeople-right">
                    <h3 className="im-chat-addpeople-righthead">已选择:</h3>
                    <div className="im-chat-addpeople-selectedList">
                        {selectedPeople.map((c, index) => (
                            <div className="im-chat-addpeople-selected" key={c.name}>
                                <Contact
                                    avatar={c.avatar}
                                    name={c.name}
                                />
                                <Button
                                    type="danger"
                                    shape="circle"
                                    icon="close"
                                    size="small"
                                    onClick={() => { this.unSelect(index) }}
                                    ghost
                                />
                            </div>
                        ))}
                    </div>
                    <div className="im-chat-addpeople-buttons">
                        <Button className="im-chat-addpeople-nobutton" onClick={this.props.onCloseAddPeople}>NO</Button>
                        <Button className="im-chat-addpeople-okbutton" onClick={this.props.onCloseAddPeople}>OK</Button>
                    </div>
                </div>
            </Modal>
        )
    }
}