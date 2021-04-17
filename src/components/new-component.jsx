import React, {Component} from 'react';

class NewComponent extends Component {
    render() {
        return (
            <React.Fragment>
                <h1>{this.method()}</h1>
            </React.Fragment>
        );
    }

    componentDidMount() {
      this.method();
    }

    method = () => {
      const html = (  
          <h1>"H1"</h1>
      );
      
      console.log('hello');
      return "heloo";
    }
   
}

export default NewComponent;