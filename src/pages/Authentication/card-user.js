import React, { Component } from 'react';
import {
    Col,
    Card,
    UncontrolledTooltip
} from "reactstrap";
import { Link } from "react-router-dom";
import FormValidations from "../Forms/FormValidations";

class CardUser extends Component {
    render() {
        return (
            <React.Fragment>
                {
                    this.props.users.map((user, key) =>
                        <Col xl="12" md="12" key={key}>
                            <Card className="directory-card">
                                <div>
                                    <div className="directory-bg text-center">
                                        <div className="directory-overlay">
                                            <img className="rounded-circle avatar-lg img-thumbnail" src={user.imgUrl} alt="Generic placeholder" />
                                        </div>
                                    </div>

                                    <div className="directory-content text-center p-4">
                                        <p className=" mt-4">{user.designation}</p>
                                        <h5 className="font-size-16">{user.name}</h5>

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
                                <div>
                                    <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Home</button>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Profile</button>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">Contact</button>
                                        </li>
                                    </ul>
                                    <div className="tab-content" id="pills-tabContent">
                                        <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">...</div>
                                        <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">...</div>
                                        <div className="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">...</div>
                                    </div>
                                </div>
                            </Card>
                        </Col>
                    )
                }
            </React.Fragment>
        );
    }
}

export default CardUser;