'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getDomProps = exports._ = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _has = require('lodash/has');

var _has2 = _interopRequireDefault(_has);

var _map = require('lodash/map');

var _map2 = _interopRequireDefault(_map);

var _each = require('lodash/each');

var _each2 = _interopRequireDefault(_each);

var _filter = require('lodash/filter');

var _filter2 = _interopRequireDefault(_filter);

var _pick = require('lodash/pick');

var _pick2 = _interopRequireDefault(_pick);

var _difference = require('lodash/difference');

var _difference2 = _interopRequireDefault(_difference);

var _omit = require('lodash/omit');

var _omit2 = _interopRequireDefault(_omit);

var _extend = require('lodash/extend');

var _extend2 = _interopRequireDefault(_extend);

var _flatten = require('lodash/flatten');

var _flatten2 = _interopRequireDefault(_flatten);

var _defaults = require('lodash/defaults');

var _defaults2 = _interopRequireDefault(_defaults);

var _values = require('lodash/values');

var _values2 = _interopRequireDefault(_values);

var _find = require('lodash/find');

var _find2 = _interopRequireDefault(_find);

var _reduce = require('lodash/reduce');

var _reduce2 = _interopRequireDefault(_reduce);

var _keys = require('lodash/keys');

var _keys2 = _interopRequireDefault(_keys);

var _debounce = require('lodash/debounce');

var _debounce2 = _interopRequireDefault(_debounce);

var _isEmpty = require('lodash/isEmpty');

var _isEmpty2 = _interopRequireDefault(_isEmpty);

var _isArray = require('lodash/isArray');

var _isArray2 = _interopRequireDefault(_isArray);

var _groupBy = require('lodash/groupBy');

var _groupBy2 = _interopRequireDefault(_groupBy);

var _orderBy = require('lodash/orderBy');

var _orderBy2 = _interopRequireDefault(_orderBy);

var _trim = require('lodash/trim');

var _trim2 = _interopRequireDefault(_trim);

var _clone = require('lodash/clone');

var _clone2 = _interopRequireDefault(_clone);

var _indexOf = require('lodash/indexOf');

var _indexOf2 = _interopRequireDefault(_indexOf);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by ravi.hamsa on 6/28/16.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var identity = function identity(arg1) {
    return arg1;
};
var _ = exports._ = {
    has: _has2.default,
    map: _map2.default,
    isEmpty: _isEmpty2.default,
    reduce: _reduce2.default,
    groupBy: _groupBy2.default,
    each: _each2.default,
    filter: _filter2.default,
    pick: _pick2.default,
    omit: _omit2.default,
    extend: _extend2.default,
    defaults: _defaults2.default,
    flatten: _flatten2.default,
    find: _find2.default,
    keys: _keys2.default,
    debounce: _debounce2.default,
    identity: identity,
    isArray: _isArray2.default,
    values: _values2.default,
    trim: _trim2.default,
    clone: _clone2.default,
    difference: _difference2.default,
    indexOf: _indexOf2.default,
    orderBy: _orderBy2.default
};

var getUniqueId = function () {
    var counter = 1000;
    return function () {
        return '' + ++counter;
    };
}();

var connectToStore = function connectToStore(Component, stores) {
    var ComponentWrapper = function (_React$Component) {
        _inherits(ComponentWrapper, _React$Component);

        function ComponentWrapper(props) {
            _classCallCheck(this, ComponentWrapper);

            var _this = _possibleConstructorReturn(this, (ComponentWrapper.__proto__ || Object.getPrototypeOf(ComponentWrapper)).call(this, props));

            _this.state = {};
            return _this;
        }

        _createClass(ComponentWrapper, [{
            key: 'UNSAFE_componentWillMount',
            value: function UNSAFE_componentWillMount() {
                var _this2 = this;

                var self = this;
                this.unsubscribeStore = [];
                _.each(stores, function (item) {
                    var stateName = item.stateName,
                        _item$event = item.event,
                        event = _item$event === undefined ? 'change' : _item$event,
                        store = item.store,
                        _item$parser = item.parser,
                        parser = _item$parser === undefined ? identity : _item$parser;

                    _this2.unsubscribeStore.push(store.on(event, function (args) {
                        self.setState({
                            stateName: parser(args)
                        });
                    }));
                });
            }
        }, {
            key: 'componentWillUnmount',
            value: function componentWillUnmount() {
                if (this.unsubscribeStore) {
                    _.each(this.unsubscribeStore, function (unsubscribe) {
                        return unsubscribe();
                    });
                }
            }
        }, {
            key: 'render',
            value: function render() {
                return _react2.default.createElement(Component, _extends({}, this.props, this.state));
            }
        }]);

        return ComponentWrapper;
    }(_react2.default.Component);

    return ComponentWrapper;
};

var cloneChildren = function cloneChildren(children, props) {
    if (!children) {
        return null;
    }
    if (children.map) {
        return children.map(function (child, index) {
            var key = props.key;
            if (key === undefined) {
                key = index;
            }
            return _react2.default.cloneElement(child, _extends({}, props, { key: key
            }));
        });
    } else {
        return _react2.default.cloneElement(children, _extends({}, props));
    }
};

var domProps = 'abbr accept acceptCharset accessKey action allowFullScreen allowTransparency alt async autoComplete autoFocus autoPlay cellPadding cellSpacing challenge charset checked cite class className cols colSpan command content contentEditable contextMenu controls coords crossOrigin data dateTime default defer dir disabled download draggable dropzone encType for form formAction formEncType formMethod formNoValidate formTarget frameBorder headers height hidden high href hrefLang htmlFor httpEquiv icon id inputMode isMap itemId itemProp itemRef itemScope itemType kind label lang list loop manifest max maxLength media mediaGroup method min minLength multiple muted name noValidate open optimum pattern ping placeholder poster preload radioGroup readOnly rel required role rows rowSpan sandbox scope scoped scrolling seamless selected shape size sizes sortable span spellCheck src srcDoc srcSet start step style tabIndex target title translate type typeMustMatch useMap value width wmode wrap onCopy onCut onPaste onLoad onError onWheel onScroll onCompositionEnd onCompositionStart onCompositionUpdate onKeyDown onKeyPress onKeyUp onFocus onBlur onChange onInput onSubmit onClick onContextMenu onDoubleClick onDrag onDragEnd onDragEnter onDragExit onDragLeave onDragOver onDragStart onDrop onMouseDown onMouseEnter onMouseLeave onMouseMove onMouseOut onMouseOver onMouseUp onSelect onTouchCancel onTouchEnd onTouchMove onTouchStart onAnimationStart onAnimationEnd onAnimationIteration onTransitionEnd'.split(' ');
var getDomProps = exports.getDomProps = function getDomProps(props) {
    var filteredProps = {};
    for (var prop in props) {
        if (domProps.indexOf(prop) > -1) {
            filteredProps[prop] = props[prop];
        }
    }
    return filteredProps;
};

var starterConfig = {
    dateFormat: 'DD/MM/YYYY'
};
var setStarterConfig = function setStarterConfig(key, value) {
    starterConfig[key] = value;
};

var getStarterConfig = function getStarterConfig(key) {
    return starterConfig[key];
};

exports.default = {
    identity: identity, cloneChildren: cloneChildren, connectToStore: connectToStore, getUniqueId: getUniqueId, setStarterConfig: setStarterConfig, getStarterConfig: getStarterConfig
};