/**
 * Created by ravi.hamsa on 3/26/17.
 */
import React, {Component} from "react";
import PropTypes from "prop-types";
import RXFormElement from './RXFormElement'

export default class RXCheckbox extends RXFormElement {

    onChange(e) {
        this.updateValue(e.target.checked, 'update');
    }

    getFormClasses() {
        let classArray = super.getFormClasses();
        if (this.state.value) {
            classArray.push('checked');
        }
        return classArray;
    }

    renderElement() {
        let restProps = this.getRestProps();
        delete restProps.label;
        restProps.checked = this.state.value === true;
        restProps.className = (this.props.className || '') + ' form-check-input';
        return <input  {...restProps} onChange={this.onChange.bind(this)}/>
    }

    renderElementWithWrapper() {
        let formClasses = this.getFormClasses();
        let elementProps = this.context.elementPropIndex[this.props.name];
        let error = this.state.error;
        return <fieldset className={formClasses.join(' ')}>
            <label className="element-label form-check-label">{this.renderElement()}{this.props.label}</label>
            {this.props.helperText ? <small className="text-muted">{this.props.helperText}</small> : ''}
            {error ? <small className="text-danger">{error.message}</small> : ''}
        </fieldset>
    }
}

RXCheckbox.propTypes = {
    ...RXFormElement.propTypes,
    value: PropTypes.bool.isRequired,

}

RXCheckbox.defaultProps = {
    ...RXFormElement.defaultProps,
    type: 'checkbox',
    value: false
}
