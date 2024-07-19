type highlightType = "allTrue" | "allFalse" | "none" | "current" | "false";

const Words = ({
  wordScroller,
  inputBoxRef,
  wordsInUse,
  highlighted,
}: {
  wordScroller: number;
  inputBoxRef: React.RefObject<HTMLDivElement>;
  wordsInUse: string[];
  highlighted: highlightType[];
}) => {
  return (
    <div className="w-full h-20 rounded-md border-2 border-black relative overflow-hidden px-2 bg-white">
      <div
        className="absolute flex flex-row flex-wrap "
        style={{ top: `-${wordScroller}px` }}
        ref={inputBoxRef}
      >
        {wordsInUse.map((word, index) => {
          return (
            <span
              key={index}
              className={`p-1 text-2xl  rounded-sm ${
                highlighted[index] === "allTrue" ? "text-green-700" : ""
              } ${highlighted[index] === "allFalse" ? "text-red-700" : ""} ${
                highlighted[index] === "current" ? "bg-gray-400" : ""
              } ${highlighted[index] === "false" ? "bg-red-500" : ""}
            ${highlighted[index] === "none" ? "none" : ""}
        `}
            >
              {word}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default Words;
