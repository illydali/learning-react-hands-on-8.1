import React from "react";
import "./styles.css";

export default class App extends React.Component {
  state = {
    users: [
      {
        _id: Math.floor(Math.random() * 10000),
        name: "Jon Snow",
        email: "jonsnow@winterfell.com"
      },
      {
        _id: Math.floor(Math.random() * 10000),
        name: "Ned Stark",
        email: "nedstark@winterfell.com"
      },
      {
        _id: Math.floor(Math.random() * 10000),
        name: "Frodo Baggins",
        email: "frodo@bagend.com"
      }
    ],
    newUserName: "",
    newUserEmail: "",
    userBeingEdited: null,
    modifiedUserName: "",
    modifiedUserEmail: ""
  };

  updateFormField = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  renderAddUser() {
    return (
      <React.Fragment>
        <input
          type="text"
          placeholder="User name"
          value={this.state.newUserName}
          onChange={this.updateFormField}
          name="newUserName"
        />
        <input
          type="text"
          placeholder="User email"
          value={this.state.newUserEmail}
          onChange={this.updateFormField}
          name="newUserEmail"
        />
        <button onClick={this.addUser}>Add</button>
      </React.Fragment>
    );
  }

  renderEditUser(user) {}

  render() {
    return (
      <div className="App">
        {this.state.users.map((user) => {
          if (
            this.state.userBeingEdited !== null &&
            this.state.userBeingEdited._id === user._id
          ) {
            return (
              <React.Fragment key={user._id}>
                <div class="box">
                  <input
                    style={{ display: "block" }}
                    type="text"
                    name="modifiedUserName"
                    value={this.state.modifiedUserName}
                    onChange={this.updateFormField}
                  />
                  <input
                    style={{ display: "block" }}
                    type="text"
                    name="modifiedUserEmail"
                    value={this.state.modifiedUserEmail}
                    onChange={this.updateFormField}
                  />
                  <button onClick={this.processEdit}>Update</button>
                  <button onClick={this.cancelEdit}>Cancel</button>
                </div>
              </React.Fragment>
            );
          } else {
            return (
              <React.Fragment key={user._id}>
                <div class="box">
                  <h3>{user.name}</h3>
                  <h4>{user.email}</h4>
                  <button
                    onClick={() => {
                      this.beginEdit(user);
                    }}
                  >
                    Update
                  </button>
                  <button
                    onClick={() => {
                      this.deleteUser(user);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </React.Fragment>
            );
          }
        })}
        {this.renderAddUser()}
      </div>
    );
  }

  addUser = function () {
    let newUser = {
      _id: Math.floor(Math.random() * 10000 + 9999),
      name: this.state.newUserName,
      email: this.state.newUserEmail
    };
    let cloned = [...this.state.users, newUser];
    // cloned.push(newUser); // alternatively, clone then push
    this.setState({
      users: cloned
    });
  };

  cancelEdit = () => {
    this.setState({
      userBeingEdited: null
    });
  };

  beginEdit = (user) => {
    this.setState({
      userBeingEdited: user,
      modifiedUserName: user.name,
      modifiedUserEmail: user.email
    });
  };

  processEdit = (user) => {
    //clone the array
    let cloned = this.state.users.slice();

    // clone the object that is being changed
    let changedUser = { ...this.state.userBeingEdited };

    // modfify the object that is being changed
    changedUser.name = this.state.modifiedUserName;
    changedUser.email = this.state.modifiedUserEmail;

    // modify the array to replace with the changed object
    let indexToReplace = this.state.users.findIndex((u) => {
      return u._id === changedUser._id;
    });

    cloned[indexToReplace] = changedUser;

    // replace the clone into the array
    this.setState({
      users: cloned,
      userBeingEdited: null
    });
  };

  processEditRedux = () => {
    let changedUser = {
      ...this.state.userBeingEdited,
      name: this.state.modifiedUserName,
      email: this.state.modifiedUserEmail
    };

    let indexToReplace = this.state.users.findIndex(
      (u) => u._id === this.state.userBeingEdited._id
    );

    this.setState({
      users: [
        ...this.state.users.slice(0, indexToReplace),
        changedUser,
        ...this.state.users.slice(indexToReplace + 1)
      ],
      userBeingEdited: null
    });
  };

  deleteUser = (user) => {
    let cloned = this.state.users.slice();
    let indexToRemove = this.state.users.findIndex((u) => {
      return u._id === user._id;
    });
    cloned.splice(indexToRemove, 1);
    this.setState({
      users: cloned
    });
  };
}
