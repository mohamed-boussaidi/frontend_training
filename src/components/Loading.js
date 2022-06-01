import {Spinner} from "react-bootstrap";
import React from "react";

function Loading(){
    return(
        <div className="d-flex justify-content-center" style={{padding:"100px"}}>
            <Spinner animation="border" role="status" variant={"primary"}>
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>
    )
}
export default Loading