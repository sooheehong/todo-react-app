import React from 'react';
import {ListItem, ListItemText, InputBase, Checkbox, ListItemSecondaryAction, IconButton} from "@material-ui/core"
import { DeleteOutline } from '@material-ui/icons';

class Todo extends React.Component {
    constructor(props){
        super(props);
        this.state = { item: props.item, readOnly: true };
        this.delete = props.delete;
        this.update = props.update;
    }
    deleteEventHandler = () => {
        this.delete(this.state.item);
    }
    offReadOnlyMode = () => {
        console.log('event~~', this.state.readOnly);
        this.setState({readOnly: false}, () => {
            console.log("readonly?? ", this.state.readOnly);
        });
    }
    enterKeyEventHandler = (e) => {
        if (e.key === 'Enter') {
            this.setState({readOnly: true});
            this.update(this.state.item);
        }
    }
    editEventHandler = (e) => {
        const thisitem = this.state.item;
        thisitem.title = e.target.value;
        this.setState({item: thisitem});
    }
    checkboxEventHandler = (e) => {
        const thisitem = this.state.item;
        thisitem.done = !thisitem.done;
        this.setState({item: thisitem});
        this.update(this.state.item);
    }
    render(){
        const item = this.state.item;
        return (
            <ListItem>
                <Checkbox 
                    checked={item.done}
                    onChange={this.checkboxEventHandler}
                />
                <ListItemText>
                    <InputBase
                        inputProps={{
                            "aria-label":"naked",
                            readOnly: this.state.readOnly
                        }}
                        onClick={this.offReadOnlyMode}
                        onKeyPress={this.enterKeyEventHandler}
                        onChange={this.editEventHandler}
                        type="text"
                        id={item.id+""}
                        name={item.id+""}
                        value={item.title}
                        multiline={true}
                        fullWidth={true}
                    />
                </ListItemText>

                <ListItemSecondaryAction>
                    <IconButton 
                        aria-label="Delete Todo"
                        onClick={this.deleteEventHandler}
                    >
                        <DeleteOutline />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        );
    }
}

export default Todo;