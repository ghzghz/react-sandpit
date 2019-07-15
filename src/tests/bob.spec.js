import React from 'react';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { shallow, mount, render } from 'enzyme';

/*
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';
*/

configure({ adapter: new Adapter() });





//import Form from './Form';

class MyDatePicker extends React.Component{
	constructor(props){
		super(props)
    this.onInputChange = this.onInputChange.bind(this);
	}

	onInputChange(e){
		const value = e.target.value;
	  this.props.onChange(value);
	}

	render(){
		return <input name="myDatePicker" onChange={this.onInputChange} />
	}
}

class MyTextBox extends React.Component{

	constructor(props){
		super(props)
    //console.log(this.props.myDate)
    //console.log(this.props.onChange)
    this.onInputChange = this.onInputChange.bind(this);
	}

  onInputChange(e){
    this.props.onChange(e)
		const value = e.target.value;

    console.log(`in onchange with ${value} and ${this.props.myDate}`);

		// call to backend
    this.props.search(value, this.props.myDate);
	}

  render(){
    return  <input
								name="myTextBox"
								onChange={this.onInputChange} />
  }
}

function myCoolSearch() {
}

class MyForm extends React.Component{

  constructor(props){
	 super(props)
   this.state = {'myDate': null}
   this.whenDateChanges = this.whenDateChanges.bind(this);
  }

  whenTextChanges(value){
  }

  whenDateChanges(value){
		// set state
    console.log('the date has changed', value)
		this.setState({myDate: value})
  }

  render(){
    return <form name='myForm'>
      	<MyTextBox
					myDate={this.state.myDate}
					onChange={this.whenTextChanges}
					search={myCoolSearch} />
      	<MyDatePicker
					onChange={this.whenDateChanges}
				/>
      </form>
  }
}



it('does something interesting when we put new text in the textbox', () => {

  const searchFn = jest.fn()

  const wrapper = mount(<MyForm search={searchFn}/>)

  console.log(wrapper.html())

  const textBox = wrapper.find('input[name="myTextBox"]');
  const datePicker = wrapper.find('input[name="myDatePicker"]');

	expect(textBox.exists()).toBe(true);
	expect(datePicker.exists()).toBe(true);

	textBox.simulate('change', {target: {name: 'myTextBox', value: 'BOB'}})

	expect(searchFn).toHaveBeenCalledWith('BOB', null);

	datePicker.simulate('change', {target: {name: 'myDatePicker', value: new Date(2019, 1, 1)}})

	textBox.simulate('change', {target: {name: 'myTextBox', value: 'FRED'}})

	expect(searchFn).toHaveBeenCalledWith('FRED', new Date(2019, 1, 1));

});

