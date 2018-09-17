## withQueryToggler

This is a React Higher Order Component (HOC), which lets you toggle values in the url. For example: when you have something like a filterbar in your app, which fetches new data React's `componentDidUpdate` lifecycle based on the url and its query string parameters.

### How to use

1. `$ npm install withquerytoggler`

2. Wrap it around your React component (check out `/src/App/App.jsx` for an example)

```
import withQueryToggler from 'withquerytoggler';

class App extends Component {
  addValueToUrl = () => {
    const q = this.props.createQueryValues({ radius: '5' });
    this.props.handleQueryValues(q);
  }
  
  render() {
    return (
      <button 
        type='button' 
        onClick={this.addValueToUrl}
      >
        Add radius=5 to the url!
     </button>
    );
  }
}

export default withQueryToggler(App)
```

### API

withQueryToggler provides you with a couple of methods on your props

`clearQueryValues: () => void`

Resets all the query parameters in the url. Returns void.

`createQueryValues: (query, options) => Object`

Maps to a nice Object for react-router from `query`. Check the examples below for more information. Second argument is the arrayFormat from [`query-string`](https://www.npmjs.com/package/query-string). Returns an Object.

`handleQueryValues: (query, options) => void`

Stringifies the query and uses React Router's `history.push` to add the values to the url. Use `options` to give an `arrayFormat`

`getParsedQuery: (props) => void`

Returns the current query parameters.

### Examples

##### Adding a single value:
```
this.props.createQueryValues({ 
  radius: '5',
});
```

##### Removing a single value:
Set the value to an empty string to remove it from the url. 

```
this.props.createQueryValues({ 
  radius: '',
});
```

##### Adding an Array:
```
this.props.createQueryValues({ 
  areas: [
    ['Rotterdam', true], 
    ['Amsterdam', false]
  ], 
});
```

