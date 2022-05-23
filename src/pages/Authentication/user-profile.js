import React, { useEffect } from 'react';
import { Row ,Col} from "reactstrap";

import MetaTags from 'react-meta-tags';

import { connect } from "react-redux";

//Import Action to copy breadcrumb items from local state to redux state
import { setBreadcrumbItems } from "../../store/actions";

//Import Components
import CardUser from "./card-user";

//Import Images
import user2 from "../../assets/images/users/user-2.jpg";
import user3 from "../../assets/images/users/user-3.jpg";
import user4 from "../../assets/images/users/user-4.jpg";
import user5 from "../../assets/images/users/user-5.jpg";
import user6 from "../../assets/images/users/user-6.jpg";
import user7 from "../../assets/images/users/user-7.jpg";
import FormValidations from 'pages/Forms/FormValidations';

const PagesDirectory = (props) => {
    const breadcrumbItems = [
        { title: "Lexa", link: "#" },
        { title: "Pages", link: "#" },
        { title: "Directory", link: "#" },
    ]

    useEffect(() => {
        props.setBreadcrumbItems()
    },[])

    const users = [
       
        {
            id: 3, imgUrl: user4, designation: "Creative Director", name: "Joshua D. Pearson", desc: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium",
            socials: [
                { id: 1, title: "Facebook", icon: "fab fa-facebook-f", link: "#", colorclass: "primary" },
                { id: 2, title: "Twitter", icon: "fab fa-twitter", link: "#", colorclass: "info" },
                { id: 3, title: "mobile", icon: "fa fa-phone", link: "#", colorclass: "danger" },
                { id: 4, title: "skype", icon: "fab fa-skype", link: "#", colorclass: "info" },
            ]
        },
    ]

    return (
        <React.Fragment>
            <Col lg={12} className={"p-0"}>
                <CardUser users={users} />
            </Col>
            <MetaTags>
                <title>Directory | Lexa - Responsive Bootstrap 5 Admin Dashboard</title>
            </MetaTags>
            <Row>
        <Col lg={12}>
        </Col>



      </Row>
           
        </React.Fragment>
    );
}

export default connect(null, { setBreadcrumbItems })(PagesDirectory);