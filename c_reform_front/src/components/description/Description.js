import React, { useState, useEffect } from "react";
import { Editor, EditorState, convertToRaw } from 'draft-js';
import RichTextEditor from "../RichText/RichTextEditor";
import { MDBIcon, MDBInputGroup, MDBBtn } from "mdbreact";
import { stateToHTML } from "draft-js-export-html";

import "./Description.css";


import axios from "axios";

const Description = (props) => {
  const parse = require('html-react-parser');
  const [openForm, setOpenForm] = useState(false);

  var pathArray = window.location.pathname.split("/");
  /* const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty(),
  ); */
  const [state, setState] = useState({ editorState: EditorState.createEmpty() });
  const [editor, setEditor] = useState("");

  /*  const rawDraftContentState = JSON.stringify(convertToRaw(editorState.getCurrentContent())); */

  const OpenFormF = (e) => {
    if (e === "new") {
      setOpenForm(!openForm);
    }
  };

  const saveDesc = (event) => {
    event.preventDefault();
    axios
      .patch(
        `${process.env.REACT_APP_API_URL}subcategory/${pathArray[6]}`,
        {
          description: editor,
        }
      )
      .then((response) => {
        if (response.status === 200) {
          window.location.reload(false);
        }
      });
  };


  // convert the raw state back to a useable ContentState object
  /* const contentState = convertFromRaw(JSON.parse(rawDraftContentState)); */

  return (
    <form
      onSubmit={(e) => {
        saveDesc(e);
      }}
    >
      <div>
        <p>{parse(props.description)}</p>
        <MDBIcon
          icon={(openForm && "minus-circle") || "plus-circle"}
          size="1x"
          className="indigo1-text pr-3 mb-2 right text-right"
          onClick={(e) => {
            OpenFormF("new");
          }}
        />
        {openForm && (
          <div className="ap">
            <RichTextEditor editorState={state.editorState} setEditor={setEditor} />
            <MDBBtn color="" type="submit" className="mb-3  py-2 z-depth-0">
              <MDBIcon icon="check" />
            </MDBBtn>
          </div>
        )}

      </div>
    </form>
  );
};
export default Description;
