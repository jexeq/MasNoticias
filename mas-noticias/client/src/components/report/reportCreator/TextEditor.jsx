import React, { Component } from 'react';
import { useState } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import '../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './textEditor.css';


 function ControlledEditor (props) {

    const {setParagraph} = props;
    const [state, setState] = useState({editorState : EditorState.createEmpty()}) ;
    const { editorState } = state;

  function onEditorStateChange (editorState)  {
    setState( { editorState } );
     
     setParagraph(draftToHtml(convertToRaw(editorState.getCurrentContent())))
  };
    
  
    return (
      <Editor
        editorState={editorState}
        wrapperClassName="text-editor-wrapper"
        toolbarClassName="text-editor-toolbar"
        editorClassName="text-editor-container"
        onEditorStateChange={onEditorStateChange}
        toolbarOnFocus
        placeholder="ingrese texto"
        toolbar={
            {
            options: ['inline', 'fontSize', 'list', 'textAlign', 'colorPicker', 'link', 'emoji', 'remove', 'history'],
            inline: { inDropdown: true },
            list: { inDropdown: true },
            textAlign: { inDropdown: true },
            link: { inDropdown: true },
            history: { inDropdown: true },
              }}
      />
    )
  
}


export default ControlledEditor;