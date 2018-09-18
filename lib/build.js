"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _react = _interopRequireWildcard(require("react"));

var _reactRouterDom = require("react-router-dom");

var _queryString = _interopRequireDefault(require("query-string"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _default(WrappedComponent) {
  var withQueryToggler =
  /*#__PURE__*/
  function (_Component) {
    _inherits(withQueryToggler, _Component);

    function withQueryToggler() {
      var _getPrototypeOf2;

      var _temp, _this;

      _classCallCheck(this, withQueryToggler);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _possibleConstructorReturn(_this, (_temp = _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(withQueryToggler)).call.apply(_getPrototypeOf2, [this].concat(args))), _this.defaultParseOptions = {
        arrayFormat: 'bracket'
      }, _this.getDefaultOptions = function (options) {
        return Object.keys(_this.defaultParseOptions).reduce(function (finalOptions, key) {
          finalOptions[key] = !options || !options[key] ? _this.defaultParseOptions[key] : options[key];
          return finalOptions;
        }, {});
      }, _this.getParsedQuery = function (props) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
        var newProps = props || _this.props;

        var parseOptions = _this.getDefaultOptions(options);

        return _queryString.default.parse(newProps.location.search, parseOptions);
      }, _this.removeItem = function (parsedQuery, key, term) {
        var termIndex = parsedQuery[key].findIndex(function (arrVal) {
          return arrVal === term.toString();
        });

        if (termIndex > -1) {
          parsedQuery[key].splice(termIndex, 1);
        }

        return parsedQuery[key];
      }, _this.createQueryValue = function (key, value) {
        var transformToArray = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

        // get the current query values from the url
        var parsedQuery = _this.getParsedQuery(); // if current value is array


        if (Array.isArray(parsedQuery[key])) {
          // if add/remove single value
          var term = value[0];

          if (!Array.isArray(term)) {
            //add or remove single value from array
            var remove = value[0][1] || false;

            if (remove) {
              parsedQuery[key] = _this.removeItem(parsedQuery, key, term);
            } else {
              // lets add it, but first check if it is already there
              if (!parsedQuery[key].includes(term)) {
                parsedQuery[key].push(term);
              }
            }
          } else {
            // add or remove multiple items
            parsedQuery[key] = value.reduce(function (newQuery, arrVal) {
              var term = arrVal[0];
              var add = arrVal.length === 1 || arrVal[1];

              if (!add) {
                return _this.removeItem(parsedQuery, key, term);
              } else {
                if (!newQuery.includes(term)) {
                  newQuery.push(term);
                }

                return newQuery;
              }
            }, _toConsumableArray(parsedQuery[key]));
          }
        } else if (typeof parsedQuery[key] === 'string') {
          var _term = value[0];
          var workTerm = Array.isArray(_term) ? value[0] : value;
          var workRemove = Array.isArray(_term) ? value[1] : value.length === ''; // if string => replace or reset (React Router will remove key)

          parsedQuery[key] = workRemove ? '' : workTerm;
        } else if (!parsedQuery[key]) {
          // if key doesn't exist yet..
          var _term2 = value[0];

          if (!Array.isArray(value[0])) {
            // add or remove single value -- account for non array values here
            var _workTerm = Array.isArray(_term2) ? value[0] : value;

            var _workRemove = Array.isArray(_term2) ? value[1] : value.length === '';

            if (_workRemove) {
              parsedQuery[key] = '';
            } else {
              parsedQuery[key] = transformToArray ? [_workTerm] : _workTerm;
            }
          } else {
            // always add values if the key doesnt exist yet
            // only filter/map values that are true
            parsedQuery[key] = value.filter(function (val) {
              return val[1] || val.length === 1;
            }).map(function (val) {
              return val[0];
            });
          }
        } // remove key from query if value is empty


        if (parsedQuery[key].length === 0) {
          delete parsedQuery[key];
        }

        return parsedQuery;
      }, _this.createQueryValues = function (values) {
        var parsedQuery = _this.getParsedQuery();

        return Object.keys(values).reduce(function (newQuery, key) {
          var value = _this.createQueryValue(key, values[key]);

          newQuery[key] = value[key];
          return newQuery;
        }, _objectSpread({}, parsedQuery));
      }, _this.handleQueryValues = function (query) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

        var parseOptions = _this.getDefaultOptions(options);

        var stringifiedQuery = _queryString.default.stringify(query, parseOptions);

        _this.props.history.push({
          search: stringifiedQuery
        });
      }, _this.clearQueryValues = function () {
        _this.props.history.push({
          search: ''
        });
      }, _temp));
    }

    _createClass(withQueryToggler, [{
      key: "render",
      value: function render() {
        return _react.default.createElement(WrappedComponent, {
          clearQueryValues: this.clearQueryValues,
          createQueryValues: this.createQueryValues,
          createQueryValue: this.createQueryValue,
          getParsedQuery: this.getParsedQuery,
          handleQueryValues: this.handleQueryValues
        });
      }
    }]);

    return withQueryToggler;
  }(_react.Component);

  return (0, _reactRouterDom.withRouter)(withQueryToggler);
}
