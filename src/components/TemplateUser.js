import React , {useEffect} from 'react'
import {
    Col,
    Card,
    UncontrolledTooltip,
    Container,
    Row,
} from "reactstrap"
import { Link } from "react-router-dom";
import Footer from "../components/VerticalLayout/Footer"

import { useState } from "react";


 const TemplateUser = props =>{
    const [user, setUser] = useState(null);

    useEffect( () => {
        const userData  = localStorage.getItem("authUser")?JSON.parse(localStorage.getItem("authUser")):null
        console.log(userData.data)
        const user ={
                id: 3, imgUrl: process.env.REACT_APP_URL_IMAGES_USERS+userData.data.image, designation: userData.data.fonction, name: userData.data.nom+" "+userData.data.prenom, desc: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium",
                socials: [
                    { id: 1, title: "Facebook", icon: "fab fa-facebook-f", link: "#", colorclass: "primary" },
                    { id: 2, title: "Twitter", icon: "fab fa-twitter", link: "#", colorclass: "info" },
                    { id: 3, title: "mobile", icon: "fa fa-phone", link: "#", colorclass: "danger" },
                    { id: 4, title: "skype", icon: "fab fa-skype", link: "#", colorclass: "info" },
                ]
            }
        
            setUser(user)

      }, [])

  return (
<>
    {user ?
        <Col xl="12" md="12" >

    <Card className="directory-card">
    <div>
        <div className="directory-bg text-center">
            <div className="directory-overlay">
                <img className="rounded-circle avatar-lg img-thumbnail" src={user.imgUrl} alt="Generic placeholder" />
            </div>
        </div>

        <div className="directory-content text-center p-4">
            <h5 className="font-size-16 mt-4">{user.name}</h5>
            <p className=" ">{user.designation}</p>

            <p className="text-muted">{user.desc}</p>

            <ul className="social-links list-inline mb-0 mt-4">
                {
                    user.socials.map((social, key) =>
                        <React.Fragment key={key}>
                            <li className="list-inline-item">
                                <Link title="" className={"tooltips btn-" + social.colorclass} id={social.title + user.id} to={social.link}><i className={social.icon}></i></Link>
                                <UncontrolledTooltip placement="top" target={social.title + user.id}>
                                    {social.title}
                                </UncontrolledTooltip>
                            </li>{" "}
                        </React.Fragment>
                    )
                }
            </ul>
        </div>
    </div>
    {props.children}
    </Card>

    </Col>
    
    :
    <></>
}
      <footer className="footer-user">
            <div className='col-12 text-center' >
              © {new Date().getFullYear()} SPOC <span className="d-none d-sm-inline-block"> - Fabriquer avec <i className="mdi mdi-heart text-danger"></i> Par Islem.</span>
            </div>
      </footer>
</>
  );
};
export default TemplateUser;
