/**
 * Created by ravi.hamsa on 2/24/17.
 */
import React, {Component, PropTypes} from "react";
import Selection from 'selection-manager';
import FormElement from './FormElement';
import SelectionFormElement from './SelectionFormElement';
import List from '../common/List';
import InlinePopupGroup from '../common/InlinePopupGroup'
const {InlinePopup,InlineButton,  InlineBody} = InlinePopupGroup;

export class SelectableListItem extends Component {

    getClassName() {
        let itemData = this.props.itemData;

        let selectionManager = this.props.selectionManager;
        let className = 'list-item ';

        if (selectionManager._selected) {
            if (selectionManager.isSelected(itemData)) {
                className += ' active';
            } else {
                className += ' not-active';
            }
        }
        return className;
    }

    deselectItem() {
        let {itemData, selectionManager} = this.props;
        selectionManager.deselect(itemData);
    }

    deSelect(event) {
        event.preventDefault();
        this.deselectItem();
    }

    render() {
        let itemData = this.props.itemData;
        let className = this.getClassName();
        return <li data-id={itemData.id} className={className}>
            {itemData.name}
        </li>;
    }
}


export default class Dropdown extends SelectionFormElement {

    constructor() {
        super(...arguments);
        this.onKeyPressHandler =  _.debounce(this._onKeyPressHandler.bind(this), 300)
        this.state.query = '';
    }

    onChangeUpdates(value){
        if(!this.multiSelect){
            if(this.refs['inlinePopup']){
                this.refs['inlinePopup'].closePopup();
            }
        }
    }

    _onKeyPressHandler() {
        var target = this.refs.searchBox;
        var value = target.value;
        this.setState({query: value});
    }

    getSummaryText(placeholder){
        let {selectionManager, multiSelect} = this;
        let selected = selectionManager.getSelected();
        if(!selected){
            return  placeholder || '--Select-- ';
        }
        if(!multiSelect){
            return selected.name;
        }else{
            return selected.length + ' Selected';
        }
    }

    renderButton(){
        let selectionSummary = this.getSummaryText(this.props.placeholder);
        return <div className="drop-down-button">
            <span className="drop-down-text"> {selectionSummary}</span>
            <span className="glyphicon glyphicon-chevron-down drop-down-icon"></span>
        </div>
    }

    render() {
        let formClasses = this.getFormClasses();
        let errors = this.getErrors();
        let options = this.props.options;
        let ListItem = this.props.ListItem || SelectableListItem;
        let placeholder = this.props.placeholder || "Please Enter Text";


        let filteredOptions = _.filter(options, (item) => {
            return item.name.toLowerCase().indexOf(this.state.query.toLowerCase()) > -1;
        })



        return <fieldset className={formClasses}>
            {this.props.showLabel ? <label>{this.props.label}</label> : null}
            <div className="form-control drop-down">
                <InlinePopup ref="inlinePopup" >
                    <InlineButton>
                        {this.renderButton()}
                    </InlineButton>
                    <InlineBody>
                        <div className="drop-down-body">
                            <input type="text" autoFocus defaultValue={this.state.query} ref="searchBox" onChange={this.onKeyPressHandler} className="drop-down-input" placeholder={placeholder}/>
                            <div onClick={this.clickHandler.bind(this)}>
                                <List ListItem={ListItem} items={filteredOptions} selection={this.state.selection}
                                      selectionManager={this.selectionManager}/>
                            </div>
                        </div>
                    </InlineBody>
                </InlinePopup>

            </div>

            {this.props.helperText ? <small className="text-muted">{this.props.helperText}</small> : '' }
            {errors.length > 0 ? <small className="text-danger">{errors[0].message}</small> : '' }
        </fieldset>
    }
}

Dropdown.defaultProps = {
    ...FormElement.defaultProps,
    type:'drop-down'
}
