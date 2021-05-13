import React, { Component } from 'react';

class ParkComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
        this.image = React.createRef();
    }

    render() {
        return (
            <React.Fragment>
                <div className="col-md-4 mt-4 container card">
                    <div className="text-center border border-light p-5" >
                        <p className="h4 mb-4">Parking spots. Please choose where you are going to park!</p>
                        <table class="table">
                            <tbody id="slots">

                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="col-md-4 mt-4 container card">
                    <div className="text-center border border-light p-5" >
                        <p className="h4 mb-4">Upload photo</p>

                        <div className="form-group">
                            <input
                                onChange={this.changeInputField}
                                ref={this.image}
                                type="file"
                                className="custom-file"
                                id="image"
                                aria-describedby="fileHelp"
                                name="image"
                            />
                        </div>

                        <div className="form-group">
                            <h1 id="plateNumberText"></h1>
                        </div>

                        <button onClick={this.uploadImage} className="btn btn-info btn-block">
                            Extract Plate Number
                        </button>
                    </div>
                </div>
                <div className="col-md-4 mt-4 container card">
                    <div className="text-center border border-light p-5" >
                        <p className="h4 mb-4">Send information</p>

                        <div className="form-group">
                            <input
                                name="email"
                                type="text"
                                className="form-control"
                                id="emailInputField"
                                aria-describedby="emailHelp"
                                placeholder="Email"
                            />
                        </div>

                        <div className="form-group">
                            <input
                                name="plateNumber"
                                type="text"
                                className="form-control"
                                id="plateNumberField"
                            />
                        </div>

                        <div className="form-group">
                            <input
                                name="cell"
                                type="text"
                                className="form-control"
                                id="cellId"
                                readOnly
                                aria-describedby="emailHelp"
                                placeholder="Cell"
                            />
                        </div>

                        <div className="form-group">
                            <input
                                name="parkingId"
                                type="text"
                                className="form-control"
                                id="parkingId"
                                readOnly
                                aria-describedby="emailHelp"
                                placeholder="Parking ID"
                            />
                        </div>

                        <button onClick={this.sendInformation} className="btn btn-info btn-block">
                            Send information
                        </button>
                    </div>
                </div>
            </React.Fragment>
        );
    }


    componentDidMount() {
        const pathname = window.location.pathname;
        const parkId = pathname.split('/')[2];
        const parkingIdInput = document.getElementById('parkingId');
        parkingIdInput.value = parkId;
        fetch("http://localhost:7777/parkings/" + parkId, {
            method: "GET",
        }).then(async response => {
            const jsonResponse = await response.json();
            const parking = jsonResponse['cells'];
            const slots = document.getElementById('slots');
            for (const row of parking) {
                const tr = document.createElement('tr');
                for (const cell of row) {
                    if (cell['parkingId'] == 0 && cell['cellNumber'] == 0) {
                        const th = document.createElement("th");
                        th.setAttribute('scope', 'col');
                        const button = document.createElement('button');
                        button.setAttribute('type', 'button');
                        button.setAttribute('class', 'btn btn-primary');
                        button.setAttribute('hidden', 'hidden');
                        button.innerText = cell['cellNumber'];
                        button.onclick = () => {
                            alert('You cannot park here!');
                        }
                        th.appendChild(button);
                        tr.appendChild(th);
                    } else if (cell['isFree']) {
                        const th = document.createElement("th");
                        th.setAttribute('scope', 'col');
                        const button = document.createElement('button');
                        button.setAttribute('type', 'button');
                        button.setAttribute('class', 'btn btn-success');
                        button.innerText = cell['cellNumber'];
                        const cellInput = document.getElementById('cellId');
                        button.onclick = () => {
                            cellInput.value = cell['cellNumber'];
                        }
                        th.appendChild(button);
                        tr.appendChild(th);
                    } else if (cell['isReserved']) {
                        const th = document.createElement("th");
                        th.setAttribute('scope', 'col');
                        const button = document.createElement('button');
                        button.setAttribute('type', 'button');
                        button.setAttribute('class', 'btn btn-primary');
                        button.innerText = cell['cellNumber'];
                        const cellInput = document.getElementById('cellId');
                        button.onclick = () => {
                            cellInput.value = cell['cellNumber'];
                        }
                        th.appendChild(button);
                        tr.appendChild(th);
                    } else {
                        const th = document.createElement("th");
                        th.setAttribute('scope', 'col');
                        const button = document.createElement('button');
                        button.setAttribute('type', 'button');
                        button.setAttribute('class', 'btn btn-danger');
                        button.innerText = cell['cellNumber'];
                        button.onclick = () => {
                            alert('You cannot park here!');
                        }
                        const cellInput = document.getElementById('cellId');
                        th.appendChild(button);
                        tr.appendChild(th);
                    }
                }
                slots.appendChild(tr);
            }
        });

    }

    uploadImage = async () => {
        const currentThis = this;
        const imageFormData = new FormData();
        if (currentThis.state.image != null) {
            imageFormData.append('file', currentThis.image.current.files[0]);
        }
        fetch("http://localhost:5000" + '/number', {
            method: 'POST',
            body: imageFormData
        }).then(async response => {
            if (response.status !== 200) {
                alert('Cannot obtain plate number information!');
                return;
            }
            const jsonResponse = await response.json();
            console.log("Number " + jsonResponse['plateNumber']);
            const plateNumberH1 = document.getElementById('plateNumberText');
            plateNumberH1.textContent = jsonResponse['plateNumber'];
            const plateNumberField = document.getElementById('plateNumberField');
            plateNumberField.value = jsonResponse['plateNumber'];
        });
    }

    sendInformation = async () => {
        const currentThis = this;
        const email = document.getElementById('emailInputField').value;
        const plateNumber = document.getElementById('plateNumberField').value;
        const parkingId = document.getElementById('parkingId').value;
        const cellId = document.getElementById('cellId').value;
        if (email == undefined || email == null || email == "" ||
            plateNumber == undefined || plateNumber == null || plateNumber == ""
            || parkingId == undefined || parkingId == null || parkingId == ""
            || cellId == undefined || cellId == null || cellId == "") {
            alert("Please fullfil all of the required inputs!");
            return;
        }
        const infoForm = {
            email: email,
            plateNumber: plateNumber
        };
        console.log(JSON.stringify(infoForm));
        fetch("http://localhost:7777" + "/parkings/" + parkingId + '/cells/' + cellId, {
            method: 'post',
            body: JSON.stringify(infoForm),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(async response => {
            await response.text();
            if (response.status == 400) {
                alert("The provided number is already parked.");
                return;
            } else if (response.status != 200) {
                alert('Problem');
                return;
            }
            window.location.reload()
        })
    }

    changeInputField = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

}

export default ParkComponent;