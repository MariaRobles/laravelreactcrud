import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Product from './Product';
import AddProduct from './AddProduct';
 
/* An example React component */
class Main extends Component {

    constructor() {
   
        super();
        //Initialize the state in the constructor
        this.state = {
            products: [],
            currentProduct: null
        }
      }
      /*componentDidMount() is a lifecycle method
       * that gets called after the component is rendered
       */
      componentDidMount() {
        /* fetch API in action */
        fetch('/api/products')
            .then(response => {
                return response.json();
            })
            .then(products => {
                //Fetched product is stored in the state
                this.setState({ products });
            });
      }
     
     renderProducts() {
        return this.state.products.map(product => {
            return (
                /* When using list you need to specify a key
                 * attribute that is unique for each list item
                */
                <li onClick={
                () =>this.handleClick(product)} key={product.id} >
                { product.title } 
            </li>        
            );
        })
      }

      handleClick(product) {
        //handleClick is used to set the state
        this.setState({currentProduct:product});
       
      }
       
      render() {
        return (
          /* The extra divs are for the css styles */
              <div>
                  <div>
                   <h3> All products </h3>
                    <ul>
                      { this.renderProducts() }
                    </ul> 
                  </div> 
                 
                  <Product product={this.state.currentProduct} />
                  <AddProduct onAdd={this.handleAddProduct} />
              </div>
          );
        }
    }
    
 
export default Main;
 
/* The if statement is required so as to Render the component on pages that have a div with an ID of "root";  
*/
 
if (document.getElementById('root')) {
    ReactDOM.render(<Main />, document.getElementById('root'));
}