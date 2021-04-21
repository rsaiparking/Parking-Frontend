import React, {Component} from 'react';

class Index extends Component {

    render() {
      //I didnt manage to initialize the parkings variable
      const parkings = [1, 2, 3];
        return (
            <React.Fragment>
                <table class="table">
  <thead>
    <tr>
      <th scope="col">ID</th>
      <th scope="col">Parking Name</th>
      <th scope="col"></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">{parkings[0]}</th>
      <td>Centar</td>
      <td><button type="button" onClick={this.getParkings} class="btn btn-success">Choose</button></td>
    </tr>
    <tr>
      <th scope="row">{parkings[1]}</th>
      <td>Mladost 1</td>
      <td><button type="button" onClick={this.getParkings} class="btn btn-success">Choose</button></td>
    </tr>
    <tr>
      <th scope="row">{parkings[2]}</th>
      <td>Studentski Grad</td>
      <td><button type="button" onClick={this.getParkings} class="btn btn-success">Choose</button></td>
    </tr>
  </tbody>
</table>
            </React.Fragment>
        );
    }

    //Calling the Backend
    async getParkings() {
      const response = await fetch("http://localhost:7777/parkings", {
        method: 'GET'
      });
      const data = await response.json();
      return data;
    }
}

export default Index;