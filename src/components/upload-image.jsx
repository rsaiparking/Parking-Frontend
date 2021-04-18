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
        });
    }

    changeInputField = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

}

export default ImageUploader;