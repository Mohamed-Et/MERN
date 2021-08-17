import React from "react";
import axios from "axios";
import { useTrans } from "../../Contextes/translation.js";
import { MDBContainer , MDBIcon, MDBInputGroup, MDBBtn } from "mdbreact";

const DocumentationForm = (props) => {
    const { t, i18n } = useTrans();

    const deleteFile = (idFile) => {
        axios
            .delete(`${process.env.REACT_APP_API_URL}document/file/${idFile}`, {})
            .then((response) => {
                console.log(response);
            });
    };
    /*
    {
        props.document.files && props.document.files.map((file) => (
            <MDBContainer>
                <MDBIcon
                    far icon="file-pdf"
                    size="2x"
                    onClick={(e) => {
                        if (window.confirm(t("delete_confirm")))
                            deleteFile(file._id);
                    }}
                />
                <p className="font-weight-bold">{file.url}</p>
            </MDBContainer>
        ))
    }
    */
    return (
        <form
            onSubmit={(e) => {
                props.saveDocument(e);
            }}
        >
            <MDBInputGroup
                material
                containerClassName="mb-3 mt-0"
                hint="Title"
                type="text"
                value={props.document.title}
                required
                onChange={(e) => {
                    props.setDocument({
                        title: e.target.value,
                        desc: props.document.desc,
                        date: props.document.date
                    });
                }}
                append={
                    <MDBBtn color="" type="submit" className="mb-3  py-2 z-depth-0">
                        <MDBIcon icon="check" />
                    </MDBBtn>
                }
            />
            <MDBInputGroup
                material
                containerClassName="mb-3 mt-0"
                hint="Description"
                type="text"
                value={props.document.desc}
                onChange={(e) => {
                    props.setDocument({
                        title: props.document.title ,
                        desc: e.target.value,
                        date: props.document.date
                    });
                }}
            />
            <MDBInputGroup
                material
                containerClassName="mb-3 mt-0"
                hint="date"
                type="date"
                value={props.document.date}
                onChange={(e) => {
                    props.setDocument({
                        title: props.document.title,
                        desc: props.document.desc,
                        date:  e.target.value
                    });
                }}
            />
            
            <br/>
            <input 
            type="file"  
            multiple 
                onChange={(e) => {
                    props.setDocument({
                        title: props.document.title,
                        desc: props.document.desc,
                        date: props.document.date,
                        files: e.target.files
                    });
                }} 
            />
        </form>
    );
};
export default DocumentationForm;
