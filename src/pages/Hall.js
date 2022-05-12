import React, { useEffect } from "react"
import MetaTags from 'react-meta-tags';
import Card from "components/Cards";
import { useState } from "react";
import Select from 'react-select'


import { connect } from "react-redux";

//Import Action to copy breadcrumb items from local state to redux state
import { setBreadcrumbItems } from "../store/actions";
import {MDBDataTable} from "mdbreact";

const Hall = (props) => {
  const breadcrumbItems = [
    { title: "SPOC", link: "#" },
    { title: "Salles", link: "#" }
  ]
  return (
    <div>

      <Card
      title='Card Title'
      imageUrl=''
      body="aaaaaaaaaaaa
            aaaaaaaaaaaa"/>
    </div>
  );
}

export default connect(null, { setBreadcrumbItems })(Hall);
