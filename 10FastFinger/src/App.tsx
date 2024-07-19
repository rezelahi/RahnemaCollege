import { useState } from "react";
import wordsData from "../db.json"; // Replace "words.json" with the actual file name
const words: string[] = wordsData.words.split("|"); // Access the "words" property from the JSON object
interface textHandlerParams {
  value: string;
  id: number;
}
type highlightType = "true" | "false" | "none";
interface counterType {
  totalNumbers: number;
  correctNumbers: number;
}
function App() {
  const [id, setId] = useState<number>(0);
  const [text, setText] = useState<string>("");
  const [highlighted, setHighlighted] = useState<highlightType[]>(
    new Array(words.length).fill("none")
  );
  const [counter, setCounter] = useState<counterType>({
    totalNumbers: 0,
    correctNumbers: 0,
  });
  const [firstTimeCheck, setFirstTimeCheck] = useState(true);

  const textHandler = (x: textHandlerParams) => {
    if (firstTimeCheck) {
      setFirstTimeCheck(false);
      console.log("First Time");
    }
    if (x.value.includes(" ")) {
      setText("");
      setId(x.id + 1);
      setCounter((prev) => {
        return { ...prev, totalNumbers: prev.totalNumbers + 1 };
      });

      //correct Input Value
      if (x.value.trim() === words[x.id]) {
        setHighlighted((prev) => {
          const newArr = [...prev];
          newArr[x.id] = "true";
          return newArr;
        });
        setCounter((prev) => {
          return { ...prev, correctNumbers: prev.correctNumbers + 1 };
        });
      } else {
        setHighlighted((prev) => {
          const newArr = [...prev];
          newArr[x.id] = "false";
          return newArr;
        });
      }
    } else {
      setText(x.value);
      console.log(text);
    }
  };
  return (
    <>
      <div className="w-[800px] h-[110px] bg-slate-100 rounded-md border-2 flex flex-row flex-wrap overflow-hidden">
        {words.map((word, index) => {
          return (
            <span
              key={index}
              className={`px-1 text-lg font-bold ${
                highlighted[index] === "true" ? "bg-green-400" : ""
              } ${highlighted[index] === "false" ? "bg-red-400" : ""}`}
            >
              {word}
            </span>
          );
        })}
      </div>
      <input
        type="text"
        value={text}
        onChange={(e) => {
          textHandler({ value: e.target.value, id });
        }}
        className="border-2 bg-blue-50 round-sm w-[200px] px-4 py-2 text-sm"
      />
      <div className="flex flex-row gap-2">
        <span>Total Words: {counter.totalNumbers}</span>
        <span>Correct Words: {counter.correctNumbers}</span>
        <span>
          Correct Words Percentage:
          {((counter.correctNumbers / counter.totalNumbers) * 100).toFixed(2)}%
        </span>
      </div>
    </>
  );
}

export default App;
