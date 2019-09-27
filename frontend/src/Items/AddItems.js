import React, { Component } from "react";
import axios from "axios";
import ImageUploader from "react-images-upload";

class AddItems extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      description: "",
      section: "select",
      price: "",
      image: "",
      isSave: "",
      pictures: []
    };

    this.nameChangeHandler = this.nameChangeHandler.bind(this);
    this.descriptionChangeHandler = this.descriptionChangeHandler.bind(this);
    this.sectionChangerHandler = this.sectionChangerHandler.bind(this);
    this.priceChangeHandler = this.priceChangeHandler.bind(this);
    this.imageChangeHandler = this.imageChangeHandler.bind(this);
    this.onDrop = this.onDrop.bind(this);

    this.SaveChanges = this.SaveChanges.bind(this);
  }
  componentWillMount() {
    this.setState({
      isSave: false
    });
  }

  nameChangeHandler = e => {
    this.setState({
      name: e.target.value
    });
  };

  descriptionChangeHandler = e => {
    this.setState({
      description: e.target.value
    });
  };

  sectionChangerHandler = e => {
    this.setState({
      section: e.target.value
    });
  };

  priceChangeHandler = e => {
    this.setState({
      price: e.target.value
    });
  };

  imageChangeHandler = e => {
    this.setState({
      image: e.target.value
    });
  };
  onDrop(picture) {
    this.setState({
      pictures: this.state.pictures.concat(picture)
    });
  }
  SaveChanges = () => {
    //var headers = new Headers();
    //prevent page from refresh

    const data = {
      name: this.state.name,
      description: this.state.description,
      section: this.state.section,
      price: this.state.price,
      image: this.state.image
    };
    //set the with credentials to true
    axios.defaults.withCredentials = true;

    //make a post request with the user data
    axios.post("http://localhost:3001/additem", data).then(response => {
      console.log("Status Code : ", response.status);
      console.log(response.request.response);
      if (response.status === 200) {
        this.setState({
          isSave: true
        });
        console.log("Item created successfully");
      } else {
        this.setState({
          isSave: false
        });
      }
    });
  };

  render() {
    return (
      <div className="container">
        <form class="form-horizontal">
          <div class="form-group">
            <label class="control-label col-sm-2">Name:</label>
            <div class="col-sm-10">
              <input
                type="text"
                class="form-control"
                name="name"
                placeholder="Enter Item Name"
                onChange={this.nameChangeHandler}
              />
            </div>
          </div>
          <div class="form-group">
            <label class="control-label col-sm-2">Description:</label>
            <div class="col-sm-10">
              <textarea
                type="text"
                class="form-control"
                name="description"
                placeholder="Enter Description"
                onChange={this.descriptionChangeHandler}
              />
            </div>
          </div>
          <div class="form-group">
            <label class="control-label col-sm-2">Menu Section</label>
            <select class="form-control" onChange={this.sectionChangerHandler}>
              <option value="select">Select</option>
              <option value="Breakfast">Owner</option>
              <option value="Lunch">Lunch</option>
              <option value="Dinner">Dinner</option>
            </select>
          </div>
          <div class="form-group">
            <label class="control-label col-sm-2">Base Price:</label>
            <div class="col-sm-10">
              <input
                type="text"
                class="form-control"
                name="price"
                placeholder="Enter Price"
                onChange={this.priceChangeHandler}
              />
            </div>
          </div>
          <div class="form-group">
            <input
              placeholder="Upload Image"
              onChange={this.imageChangeHandler}
              name="image"
              class="form-control"
              aria-invalid="false"
              type="text"
              style={{ width: "400px", "margin-bottom": "30px" }}
            ></input>

            <ImageUploader
              withIcon={true}
              buttonText="Choose images"
              onChange={this.onDrop}
              imgExtension={[".jpg", ".gif", ".png", ".gif"]}
              maxFileSize={5242880}
              style={{ width: "150px" }}
            />

            <span></span>

            <div class="form-group">
              <div class="col-sm-offset-2 col-sm-10">
                <button
                  name="Save"
                  onClick={this.SaveChanges}
                  style={{
                    background: "#0067db",
                    width: "200px",
                    borderRadius: "20px",
                    height: "46px",
                    color: "white"
                  }}
                >
                  Add Item
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default AddItems;
