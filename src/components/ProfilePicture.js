/*import React, { Component } from 'react';

import ProfilePicture from "@dsalvagni/react-profile-picture"
import "@dsalvagni/react-profile-picture/dist/ProfilePicture.css"

class App extends Component {
  constructor(props) {
    super(props)

    this.profilePictureRef = React.createRef();
  }

  handleUpload() {
    const PP = this.profilePicture.current;
    const imageData = PP.getData();
    const file = imageData.file;
    const imageAsDataURL = PP.getImageAsDataUrl();

    
    //add here the upload logic...
  }

  render() {
    return <ProfilePicture
      ref={this.profilePictureRef}
      useHelper={true}
      debug={true}
    />

    <button onClick={this.handleUpload.bind(this)}>Upload</button>
  }
}*/