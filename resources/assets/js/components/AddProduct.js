
import React, { Component } from 'react';
import ReactDOM from "react-dom";
class AddProduct extends Component {
 
    constructor(props) {
      super(props);
         /* Initialize the state. */
         this.state = {
            newProduct: {
                title: '',
                description: '',
                price: 0,
                availability: 0
            }
          }
       
      //Boilerplate code for binding methods with `this`
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleInput = this.handleInput.bind(this);
      this.handleAddProduct = this.handleAddProduct.bind(this);
    }
     
    /* This method dynamically accepts inputs and stores it in the state */
    handleInput(key, e) {
       
      /*Duplicating and updating the state */
      var state = Object.assign({}, this.state.newProduct); 
      state[key] = e.target.value;
      this.setState({newProduct: state });
    }
   /* This method is invoked when submit button is pressed */
    handleSubmit(e) {
      //preventDefault prevents page reload   
      e.preventDefault();
      /*A call back to the onAdd props. The current
       *state is passed as a param
       */
      this.props.onAdd(this.state.newProduct);
    }

    handleAddProduct(product) {
     
        product.price = Number(product.price);
        /*Fetch API for post request */
        fetch( 'api/products/', {
            method:'post',
            /* headers are important*/
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
             
            body: JSON.stringify(product)
        })
        .then(response => {
            return response.json();
        })
        .then( data => {
            //update the state of products and currentProduct
            this.setState((prevState)=> ({
                products: prevState.products.concat(data),
                currentProduct : data
            }))
        })
      
      }
   
    render() {
      const divStyle = {
          /*Code omitted for brevity css */ }
       
      return(
        <div> 
          <h2> Add new product </h2>
          <div style={divStyle}> 
          
          <form onSubmit={this.handleSubmit}>
            <label> Title: 
             { /*On every keystroke, the handeInput method is invoked */ }
              <input type="text" onChange={(e)=>this.handleInput('title',e)} />
            </label>
             
            <label> Description: 
              <input type="text" onChange={(e)=>this.handleInput('description',e)} />
            </label>
             
           { /* Input fields for Price and availability omitted for brevity */}
   
            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>)
    }
  }
   
  export default AddProduct;