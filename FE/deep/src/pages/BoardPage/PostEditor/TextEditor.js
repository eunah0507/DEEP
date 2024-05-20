import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/toastui-editor.css";
import { TextEditorContainer } from "./TextEditor.styles";
import "@toast-ui/editor/dist/i18n/ko-kr";
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css";
import "prismjs/themes/prism.css";
import Prism from "prismjs";
import { useRef } from "react";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight";
import axiosInstance from "../../../apis/axiosInstance";

function TextEditor(props) {
    const editorRef = useRef();

    const toolbar = [
        ["bold", "italic", "strike"],
        ["hr", "quote"],
        ["ul", "ol"],
        ["code"],
        ["link", "image"],
    ];

    const onChange = () => {
        const data = editorRef.current.getInstance().getHTML();
        props.setContents(data);
    };

    const uploadImage = async (blob) => {
        const formData = new FormData();
        formData.append("img", blob);

        const response = await axiosInstance.post("/deep/board/img", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        return response.data.img;
    };

    const onUploadImage = async (blob, callback) => {
        const imageUrl = await uploadImage(blob);
        callback(imageUrl, "alt text");
    };

    return (
        <TextEditorContainer>
            <Editor
                initialEditType="wysiwyg"
                autofocus={false}
                ref={editorRef}
                toolbarItems={toolbar}
                hideModeSwitch
                height="50vh"
                language="ko-KR"
                placeholder="내용을 입력해 주세요."
                useCommandShortcut={true}
                onChange={onChange}
                plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]}
                hooks={{
                    addImageBlobHook: onUploadImage,
                }}
            />
        </TextEditorContainer>
    );
}

export default TextEditor;
