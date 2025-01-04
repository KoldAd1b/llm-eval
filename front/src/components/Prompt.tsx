import React, { useRef } from "react";

type Props = {
  clickFn: () => void;
};

const Prompt = ({ clickFn }: Props) => {
  const [inputValue, setInputValue] = React.useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    // Adjust the height of the textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // Reset height
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };
  return (
    <>
      <textarea
        value={inputValue}
        ref={textareaRef}
        onChange={handleInputChange}
        className="placeholder-gray-100 placeholder-opacity-70 focus:ring-opacity-10 text-white rounded-sm transition flex-grow resize-none p-2 mx-2 bg-transparent  border-none outline-none  max-h-[150px] overflow-y-auto scrollbar-thin scrollbar-thumb-white scrollbar-track-transparent"
        placeholder="Create your own evaluation"
      />
      <button
        className="text-black right-[26%] bg-white hover:bg-black hover:text-white size-10 transition-all duration-300 rounded-full hover:transform hover:-translate-y-1 self-end"
        onClick={clickFn}
      >
        ⬆
      </button>
    </>
  );
};

export default Prompt;
