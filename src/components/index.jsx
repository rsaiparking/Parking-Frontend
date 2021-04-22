import React, {Component} from 'react';

class Index extends Component {

  constructor(props) {
    super(props);
    this.state = {
      parkingLots : []
    };
}
    render() {
        return (
            <React.Fragment>
                <table className="table">
  <thead>
    <tr>
      <th scope="col">ID</th>
      <th scope="col">Parking Name</th>
      <th scope="col"></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">{this.parkingLots}</th>
      <td>Centar</td>
      <td><button type="button" onClick={() => this.routeTo('/testPath/1') } className="btn btn-success">Choose</button></td>
    </tr>
    <tr>
      <th scope="row">{this.parkingLots}</th>
      <td>Mladost 1</td>
      <td><button type="button" onClick={() => this.routeTo('/testPath/2') } className="btn btn-success">Choose</button></td>
    </tr>
    <tr>
      <th scope="row">{this.parkingLots}</th>
      <td>Studentski Grad</td>
      <td><button type="button" onClick={() => this.routeTo('/testPath/3') } className="btn btn-success">Choose</button></td>
    </tr>
  </tbody>
</table>
            </React.Fragment>
        );
    }

    async getParkings() {
      const response = await fetch("http://localhost:7777/parkings", {
        method: 'GET'
      });
      const data = await response.json();
      console.log(data);
      return data;
    }

    routeTo(path) {
      this.props.history.push(path);
    }

    async componentDidMount() {
      const current = this;
      this.setState({parkingLots: await current.getParkings()});
    }
}

export default Index;