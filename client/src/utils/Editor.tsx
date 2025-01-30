import { Editor } from '@tinymce/tinymce-react';

interface CustomEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const CustomEditor: React.FC<CustomEditorProps> = ({ value, onChange }) => {
  return (
    <Editor
      apiKey='4vwhnn90fvqtkijfopg3yzjydcywqxgw2kzks79fgkqie9q5'
      init={{
        plugins:
          'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
        toolbar:
          'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link | align lineheight | numlist bullist indent outdent',
      }}
      value={value}
      onEditorChange={(content) => onChange(content)}
    />
  );
};

export default CustomEditor;
