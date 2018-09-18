import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';

export default function(WrappedComponent) {
  class withQueryToggler extends Component {
    defaultParseOptions = {
      arrayFormat: 'bracket',
    };

    getDefaultOptions = (options) => {
      return Object.keys(this.defaultParseOptions).reduce(
        (finalOptions, key) => {
          finalOptions[key] =
            !options || !options[key]
              ? this.defaultParseOptions[key]
              : options[key];
          return finalOptions;
        },
        {}
      );
    };

    getParsedQuery = (props, options = undefined) => {
      const newProps = props || this.props;
      const parseOptions = this.getDefaultOptions(options);
      return queryString.parse(newProps.location.search, parseOptions);
    };

    removeItem = (parsedQuery, key, term) => {
      const termIndex = parsedQuery[key].findIndex(
        (arrVal) => arrVal === term.toString()
      );

      if (termIndex > -1) {
        parsedQuery[key].splice(termIndex, 1);
      }

      return parsedQuery[key];
    };

    createQueryValue = (key, value, transformToArray = false) => {
      // get the current query values from the url
      const parsedQuery = this.getParsedQuery();

      // if current value is array
      if (Array.isArray(parsedQuery[key])) {
        // if add/remove single value
        const term = value[0];
        if (!Array.isArray(term)) {
          //add or remove single value from array
          const remove = value[0][1] || false;
          if (remove) {
            parsedQuery[key] = this.removeItem(parsedQuery, key, term);
          } else {
            // lets add it, but first check if it is already there
            if (!parsedQuery[key].includes(term)) {
              parsedQuery[key].push(term);
            }
          }
        } else {
          // add or remove multiple items
          parsedQuery[key] = value.reduce(
            (newQuery, arrVal) => {
              const term = arrVal[0];
              const add = arrVal.length === 1 || arrVal[1];

              if (!add) {
                return this.removeItem(parsedQuery, key, term);
              } else {
                if (!newQuery.includes(term)) {
                  newQuery.push(term);
                }

                return newQuery;
              }
            },
            [...parsedQuery[key]]
          );
        }
      } else if (typeof parsedQuery[key] === 'string') {
        const term = value[0];
        const workTerm = Array.isArray(term) ? value[0] : value;
        const workRemove = Array.isArray(term) ? value[1] : value.length === '';

        // if string => replace or reset (React Router will remove key)
        parsedQuery[key] = workRemove ? '' : workTerm;
      } else if (!parsedQuery[key]) {
        // if key doesn't exist yet..
        const term = value[0];
        if (!Array.isArray(value[0])) {
          // add or remove single value -- account for non array values here
          const workTerm = Array.isArray(term) ? value[0] : value;
          const workRemove = Array.isArray(term)
            ? value[1]
            : value.length === '';

          if (workRemove) {
            parsedQuery[key] = '';
          } else {
            parsedQuery[key] = transformToArray ? [workTerm] : workTerm;
          }
        } else {
          // always add values if the key doesnt exist yet
          // only filter/map values that are true
          parsedQuery[key] = value
            .filter((val) => val[1] || val.length === 1)
            .map((val) => val[0]);
        }
      }

      // remove key from query if value is empty
      if (parsedQuery[key].length === 0) {
        delete parsedQuery[key];
      }

      return parsedQuery;
    };

    /**
     * Every key of the param Object is the query parameter that you want to work with
     * The values of those keys get used in createQueryValue
     * @param values {Object}
     * @returns {{}}
     */
    createQueryValues = (values) => {
      const parsedQuery = this.getParsedQuery();
      return Object.keys(values).reduce(
        (newQuery, key) => {
          const value = this.createQueryValue(key, values[key]);
          newQuery[key] = value[key];
          return newQuery;
        },
        { ...parsedQuery }
      );
    };

    /**
     * Stringifies query and pushes to url
     * @param query {Object}
     * @param options {Object | undefined}
     */
    handleQueryValues = (query, options = undefined) => {
      const parseOptions = this.getDefaultOptions(options);
      const stringifiedQuery = queryString.stringify(query, parseOptions);
      this.props.history.push({ search: stringifiedQuery });
    };

    /**
     * Removes all query parameters from url
     */
    clearQueryValues = () => {
      this.props.history.push({ search: '' });
    };

    render() {
      return (
        <WrappedComponent
          clearQueryValues={this.clearQueryValues}
          createQueryValues={this.createQueryValues}
          createQueryValue={this.createQueryValue}
          getParsedQuery={this.getParsedQuery}
          handleQueryValues={this.handleQueryValues}
        />
      );
    }
  }

  return withRouter(withQueryToggler);
}
