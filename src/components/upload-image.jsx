import React, { Component } from 'react';

class ImageUploader extends Component {

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
                                readOnly="readOnly"
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
                return ;
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
        if (email == undefined || email == null || email == "" ||
        plateNumber == undefined || plateNumber == null || plateNumber == "") {
            alert("Please extract your number and write down your email address!");
            return;
        }
        const infoForm = {
            email: email,
            plateNumber: plateNumber
        };
        console.log(JSON.stringify(infoForm));
        fetch("http://localhost:8080" + "/info", {
            method: 'post',
            body: JSON.stringify(infoForm),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(async response => {
            await response.text();
            if (response.status !== 200) {
                alert('Information was not sent... Try again!');
            }
        })
    }

    changeInputField = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

}

export default ImageUploader;