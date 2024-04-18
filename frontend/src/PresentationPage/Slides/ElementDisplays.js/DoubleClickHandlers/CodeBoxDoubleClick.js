import React, { useEffect, useState } from 'react';
import 'prismjs/themes/prism-okaidia.css';
import Prism from 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-c';
import CustomModal from '../../../../components/CustomModal';
import SelectWithLabel from '../../../../components/SelectWithLabel';
import TextBoxWithLabel from '../../../../components/TextBoxWithLabel';
import InputWithLabels from '../../../../components/InputLabel';
import CustomPrimaryButton from '../../../../components/CustomePrimaryButton';
import usePresentationListStore from '../../../../zustandStore/usePresentationListStore';

// Custom styling for this element.
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#555',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

// Modal component for editing an existing code block.
const CodeBoxDoubleClick = ({
  open,
  handleCloseCodeHandler,
  presentationId,
  selectedSlideId,
  element,
}) => {
  const [code, setCode] = useState(element.text); // Initial code from the element
  const [fontSizeTextBox, setFontSizeTextBox] = useState(
    element.fontSize.replace('em', '')
  ); // Initial font size.
  const [language, setLanguage] = useState('javascript'); // Default language setting.

  // Function to detect programming language based on code syntax.
  const detectLanguage = (codeSnippet) => {
    const patterns = {
      javascript:
        /\b(function|=>|var|let|const|class|console\.log|import|export|default|React)\b/,
      python:
        /\b(def|print|import|from|class|self|if __name__==|__init__|as|None|True|False|lambda|yield)\b/,
      c: /\b(#include|printf|int|float|char|double|struct|return|sizeof|typedef|union|enum|extern)\b/,
    };

    for (const [language, pattern] of Object.entries(patterns)) {
      if (pattern.test(codeSnippet)) {
        return language;
      }
    }

    return 'javascript';
  };

  useEffect(() => {
    setLanguage(detectLanguage(code)); // Detect language every time code changes.
    Prism.highlightAll(); // Trigger syntax highlighting.
  }, [code, language]);

  const updateElementInSlide = usePresentationListStore(
    (state) => state.updateElementInSlide
  );

  // Function to handle saving the edited code.
  const handleEditCode = () => {
    updateElementInSlide(presentationId, selectedSlideId, element.id, {
      text: code,
      fontSize: `${fontSizeTextBox}em`,
      language,
    });
    handleCloseCodeHandler(); // Close the modal after saving.
  };

  return (
    <CustomModal
      open={open}
      handleCloseCreateTextBox={handleCloseCodeHandler}
      style={style}
    >
      <div style={{ width: '100px', height: '100px' }}>
        <pre
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '0',
            left: '0',
            right: '0',
            border: 'none',
            margin: '0',
            padding: '10px',
            pointerEvents: 'none',
            color: 'transparent',
            overflowY: 'scroll',
            fontSize: '16px',
            width: '300px',
            overflow: 'auto',
            height: '100px',
            fontFamily:
              'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
          }}
        >
          <code className={`language-${language}`}>{code}</code>
        </pre>
      </div>
      <SelectWithLabel
        label="Language"
        value={language}
        disabled={true}
        setValue={setLanguage}
        options={[
          { value: 'javascript', label: 'JavaScript' },
          { value: 'python', label: 'Python' },
          { value: 'c', label: 'C' },
        ]}
      />
      <TextBoxWithLabel
        dataTestId={'main-code-box-test'}
        value={code}
        setValue={setCode}
        type="code"
        placeholder="Enter code"
        label="code"
      />
      <InputWithLabels
        dataTestId={'main-code-box-font-size-test'}
        value={fontSizeTextBox}
        setValue={setFontSizeTextBox}
        type="Font Size"
        placeholder="Font Size"
        label="Font Size"
      />

      <CustomPrimaryButton
        dataTestid={'create-new-code-box-btn'}
        label="Create Now"
        additionalStyle={{ marginTop: '30px' }}
        onClick={handleEditCode}
      />
    </CustomModal>
  );
};
export default CodeBoxDoubleClick;
