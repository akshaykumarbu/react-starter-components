/**
 * Created by ravi.hamsa on 6/29/16.
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import FormElement from './FormElement';
import InlinePopupGroup from '../common/InlinePopupGroup';
import Selection from 'selection-manager';

const {InlinePopup, InlineButton, InlineBody} = InlinePopupGroup;

class AutoComplete extends FormElement {
    constructor() {
        super(...arguments);
        this.state.searchString = '';
        this.selection = new Selection({
            multiSelect: this.props.multiSelect
        });
    }

    UNSAFE_componentWillMount() {
        super.UNSAFE_componentWillMount();
        this.selection.select(this.getDefaultValue());
        this.unsubscribeSelection = this.selection.on('change', selection => {
            this.setValue(selection.id);
        });
    }

    getDefaultValue() {
        const options = this.props.options;
        const selectedId = this.props.defaultValue;
        let selectedOption = options.find(item => item.id === selectedId);
        if (!selectedOption) {
            const selectText = this.props.selectText || 'Select';
            selectedOption = {
                id: '-1', name: selectText
            };
        }
        return selectedOption;
    }

    componentWillUnmount() {
        super.componentWillUnmount();
        if (this.unsubscribeSelection) {
            this.unsubscribeSelection();
        }
    }

    selectOption(selectedId, event) {
        event.preventDefault();
        this.selection.select(selectedId);
        if (!this.selection.isMultiSelect()) {
            this.ref_popupBody.props.closePopup();
        }
    }

    localOnChange(event) {
        this.setState({
            searchString: this.getValueFromNode(event.target)
        });
    }

    onClosePopup() {
        const selected = this.selection.getSelected();
        if (selected.id !== '-1') {
            this.setState({
                searchString: selected.name
            });
        } else {
            this.setState({
                searchString: ''
            });
        }

    }

    render() {

        const defaultValue = this.getDefaultValue();
        const selectedOption = this.selection.getSelected();
        const options = this.props.options || [];
        const formClasses = this.getFormClasses();
        const errors = this.getErrors();
        const searchString = this.state.searchString;
        const filteredOptions = options.filter(item => item.name.toLowerCase().indexOf(searchString.toLowerCase()) > -1);

        return <fieldset className={formClasses}>
            {this.props.showLabel ? <label className="element-label">{this.props.label}</label> : null}
            <InlinePopup onClosePopup={this.onClosePopup.bind(this)}>
                <InlineButton>
                    <div style={{
                        position: 'relative'
                    }}>
                        {/*<span>{selectedOption.name}</span>*/}
                        <input className="form-control" name={this.props.name} disabled={this.props.disabled}
                            autoComplete="off"
                            placeholder={this.props.placeholder} onChange={this.localOnChange.bind(this)}
                            value={this.state.searchString}>
                        </input>
                    </div>
                    {/*<option value="-1">{selectText}</option>
                     {options.map(function(option, index){
                     return <option value={option.id} key={index}>{option.name}</option>
                     },this)}*/}

                </InlineButton>
                <InlineBody ref={element => this.ref_popupBody = element}>
                    <ul style={{
                        maxHeight: '200px', overflow: 'auto'
                    }}>
                        {filteredOptions.map(function(option, index) {
                            return <li value={option.id} key={index}
                                onClick={this.selectOption.bind(this, option)}>{option.name}</li>;
                        }, this)}
                    </ul>
                </InlineBody>
            </InlinePopup>
            {this.props.helperText ? <small className="text-muted">{this.props.helperText}</small> : ''}
            {errors.length > 0 ? <small className="text-danger">{errors[0].message}</small> : ''}
        </fieldset>;
    }
}


export default AutoComplete;

AutoComplete.defaultProps = {
    ...FormElement.defaultProps,
    type: 'auto-complete'
};
