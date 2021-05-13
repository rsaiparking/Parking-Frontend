import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Index extends Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {
    this.getParkings();
  }

  render() {
    return (
      <React.Fragment>
        <div id="parking" class="row text-center"></div>
      </React.Fragment>
    );
  }

  async getParkings() {
    let elements = [];
    const response = await fetch("http://localhost:7777/parkings", {
      method: 'GET'
    });
    const data = await response.json();
    const projectElement = (<table className="table">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Parking Name</th>
          <th scope="col">Park a car</th>
          <th scope="col">Unpark a car</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">{data[0]}</th>
          <td>Centar</td>
          <td><button type="button" onClick={() => this.routeTo('/park/' + data[0])} className="btn btn-success">Park</button></td>
          <td><button type="button" onClick={() => this.routeTo('/unpark/' + data[0])} className="btn btn-danger">Unpark</button></td>
        </tr>
        <tr>
          <th scope="row">{data[1]}</th>
          <td>Mladost 1</td>
          <td><button type="button" onClick={() => this.routeTo('/park/' + data[1])} className="btn btn-success">Park</button></td>
          <td><button type="button" onClick={() => this.routeTo('/unpark/' + data[1])} className="btn btn-danger">Unpark</button></td>
        </tr>
        <tr>
          <th scope="row">{data[2]}</th>
          <td>Studentski Grad</td>
          <td><button type="button" onClick={() => this.routeTo('/park/' + data[2])} className="btn btn-success">Park</button></td>
          <td><button type="button" onClick={() => this.routeTo('/unpark/' + data[2])} className="btn btn-danger">Unpark</button></td>
        </tr>
      </tbody>
    </table>);
    elements.push(projectElement);
    const parkingDiv = document.getElementById('parking');
    ReactDOM.render(elements, parkingDiv);
  }

  routeTo(path) {
    this.props.history.push(path);
  }
}

export default Index;