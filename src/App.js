import React from 'react';

class GenericTextBox extends React.Component {

  constructor(props){
    super(props);
    this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange(e){
    const value = e.target.value;
    
    /* call the parent's onChange */
    this.props.onChange(value);

    if (this.props.overrideOnChange) {
    }
    else {
      /* handle onChange locally */
      console.log('make http call with', value);
    }
  }

  render() { return <div>hello<input type="text" onChange={this.onInputChange}/></div> }

}

class MyTextBox extends React.Component {

  constructor(props){
    super(props);
    this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange(value){

    /* call parent */
    this.props.onChange(value);

    /* handle onChange locally */

    console.log('make super special http call with', value, 'and DATE');
  }

  render() { return <GenericTextBox onChange={this.onInputChange} overrideOnChange={true} /> }

}

class MyForm extends React.Component {

  handleChange(value){
    console.log('set state on form', value)
  }

  render() { return <form> <MyTextBox onChange={this.handleChange} /> </form> }
}

class ExistingForm extends React.Component {

  handleChange(value){
    console.log('set state on form', value)
  }

  render() { return <form> <GenericTextBox onChange={this.handleChange} /> </form> }

}

function App() {
  return (
    <div className="App">
      <MyForm/>
      <ExistingForm/>
    </div>
  );
}

export default App;
