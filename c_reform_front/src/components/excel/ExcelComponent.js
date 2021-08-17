import React, { useState, Component, Fragment } from 'react';
import { MDBFileInput, MDBBtn } from "mdbreact";

const ExcelComponent = ({get , post , name}) => {

    return(
        <div>
        <form action="" encType="multipart/form-data">
            <MDBFileInput name={name} onChange={get} />
            <MDBBtn rounded outline color="danger" onClick={post}>Submit</MDBBtn>
        </form>
        </div>
    );

}

export default ExcelComponent;