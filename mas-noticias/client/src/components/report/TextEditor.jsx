import React, { Component } from 'react';
import { useState } from 'react';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './textEditor.css';


 function ControlledEditor (props) {
    
    const [state, setState] = useState({editorState : EditorState.createEmpty()}) ;
    const { editorState } = state;

  function onEditorStateChange (editorState)  {
    setState({
      editorState,
    });
    console.log("editorState: " , editorState)
  };
    
  
    return (
      <Editor
        editorState={editorState}
        wrapperClassName="text-editor-wrapper"
        toolbarClassName="text-editor-toolbar"
        editorClassName="text-editor-container"
        onEditorStateChange={onEditorStateChange}
        toolbar={{
            inline: { inDropdown: true },
            list: { inDropdown: true },
            textAlign: { inDropdown: true },
            link: { inDropdown: true },
            history: { inDropdown: true },
          }}
      />
    )
  
}




// import { EditorState } from 'draft-js';
// import { Editor } from 'react-draft-wysiwyg';


// class ControlledEditor extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       editorState: EditorState.createEmpty(),
//     };
//   }

//   onEditorStateChange = (editorState) => {
//     this.setState({
//       editorState,
//     });
//   };

//   componentWillMount () {
//       this.onEditorStateChange = this.onEditorStateChange.bind(this);
//   }

//   render() {
//     const { editorState } = this.state;
//     return (
//       <Editor
//         editorState={editorState}
//         wrapperClassName="demo-wrapper"
//         editorClassName="demo-editor"
//         onEditorStateChange={this.onEditorStateChange}
//       />
//     )
//   }
// }

export default ControlledEditor;