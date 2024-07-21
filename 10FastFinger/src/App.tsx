import { useEffect, useRef, useState } from "react";
import Words from "./components/Words";
import Score from "./components/Score";
import wordsData from "../db.json"; // Replace "words.json" with the actual file name
const words: string[] = wordsData.words.split("|"); // Access the "words" property from the JSON object
import Timer from "./components/Timer";
interface textHandlerParams {
  value: string;
  id: number;
}
type highlightType = "allTrue" | "allFalse" | "none" | "current" | "false";
interface counterType {
  totalNumbers: number;
  correctNumbers: number;
}

function App() {
  const [id, setId] = useState<number>(0);
  const [text, setText] = useState<string>("");
  const [inputDisabled, setInputDisabled] = useState<boolean>(false);
  const [startTypeCheck, setStartTypeCheck] = useState<boolean>(false);
  const [wordsInUse, setWordsInUse] = useState<string[]>([]);
  const [wordScroller, setWordScroller] = useState<number>(0);
  const [resetState, setRestState] = useState<boolean>(false);
  const [minutes, setMinutes] = useState<number>(1);
  const [seconds, setSeconds] = useState<number>(0);
  const inputBoxRef = useRef<HTMLDivElement>(null);

  const [highlighted, setHighlighted] = useState<highlightType[]>(
    new Array(words.length).fill("none")
  );
  const [counter, setCounter] = useState<counterType>({
    totalNumbers: 0,
    correctNumbers: 0,
  });

  const highlightedInitalizer = (): void => {
    setHighlighted((prev) => {
      const next = [...prev].fill("none");
      next[0] = "current";
      return next;
    });
  };

  const nextHighlightedWord = (
    x: textHandlerParams,
    highlightType: highlightType
  ) => {
    setHighlighted((prev) => {
      const newArr = [...prev];
      if (highlightType !== "false" && highlightType !== "current") {
        newArr[x.id] = highlightType;
        if (x.id < newArr.length - 1) {
          newArr[x.id + 1] = "current";
        }
      } else {
        newArr[x.id] = highlightType;
      }
      return newArr;
    });
  };

  const wordGenerator = (words: string[]): void => {
    const limitNum: number = 400;
    const randomIndex = Math.floor(
      Math.random() * (words.length - limitNum - 1)
    );
    setWordsInUse(words.slice(randomIndex, randomIndex + limitNum));
  };

  const reset = () => {
    setStartTypeCheck(false);
    setInputDisabled(false);
    setText("");
    setId(0);

    setHighlighted((prev) => {
      const next = [...prev];
      next.fill("none");
      return next;
    });
    highlightedInitalizer();
    setWordsInUse([]);
    setWordScroller(0);
    setRestState((prev) => !prev);
  };

  useEffect(() => {
    highlightedInitalizer();
    wordGenerator(words);
    setText("");
  }, [resetState]);

  const textHandler = (x: textHandlerParams, words: string[]) => {
    if (!startTypeCheck) {
      setStartTypeCheck(true);
      setHighlighted((prev) => {
        const next = [...prev];
        next[x.id] = "current";
        return next;
      });
    }

    if (
      x.value.trim().length !== words[x.id].length &&
      !words[x.id].includes(x.value.trim())
    ) {
      nextHighlightedWord(x, "false");
    } else {
      nextHighlightedWord(x, "current");
    }

    if (x.value.includes(" ")) {
      setText("");
      setId(x.id + 1);
      setCounter((prev) => {
        return { ...prev, totalNumbers: prev.totalNumbers + 1 };
      });

      if (x.value.trim() === words[x.id]) {
        nextHighlightedWord(x, "allTrue");
        setCounter((prev) => {
          return { ...prev, correctNumbers: prev.correctNumbers + 1 };
        });
      } else {
        nextHighlightedWord(x, "allFalse");
      }
    } else {
      setText(x.value);
    }

    // scroll if needed
    if (inputBoxRef.current && inputBoxRef.current !== null) {
      const currentTop: HTMLSpanElement | null =
        inputBoxRef.current.querySelector(".none");
      //check if we reach the end of the line
      if (currentTop && currentTop?.offsetTop > wordScroller) {
        setWordScroller(() => currentTop?.offsetTop);
      }
    }
  };
  return (
    <div className="bg-gradient-to-r from-violet-600 to-indigo-600 h-lvh">
      <div className="mx-auto pt-20 w-4/5 flex flex-col justify-center items-center gap-3">
        <div className="flex flex-col gap-3 w-full">
          {!inputDisabled && (
            <Words
              wordScroller={wordScroller}
              inputBoxRef={inputBoxRef}
              wordsInUse={wordsInUse}
              highlighted={highlighted}
            />
          )}
          <div className="flex flex-row gap-3">
            <input
              type="text"
              value={text}
              onChange={(e) => {
                textHandler({ value: e.target.value, id }, wordsInUse);
              }}
              className="flex-auto border-2 border-slate-600 bg-blue-50 rounded-lg px-4 py-2 text-lg "
              disabled={inputDisabled}
              autoComplete="off"
            />
            <div className="bg-blue-400 text-black p-2 rounded-lg flex justify-center items-center font-bold border-blue-900 border-2">
              <Timer
                startTypeCheck={startTypeCheck}
                setStartTypeCheck={setStartTypeCheck}
                setInputDisabled={setInputDisabled}
                setText={setText}
                setCounter={setCounter}
                seconds={seconds}
                setSeconds={setSeconds}
                minutes={minutes}
                setMinutes={setMinutes}
              />
            </div>
            <button
              onClick={() => {
                reset();
              }}
              className=" p-2 bg-red-500 rounded-lg font-bold border-2 border-red-900"
            >
              Reset
            </button>
          </div>
        </div>
        {inputDisabled && (
          <div className="w-60 border-gray-600 border-2 rounded-xl bg-white">
            <Score counter={counter} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

// const fetchWords = async () => {
//   const response: wordsDataFetchType[] = await fetch(
//     "https://type.fit/api/quotes"
//   ).then((res) => res.json());
//   const filteredWords = response
//     .map((item) => item.text.replace(/[.!?,;:]/g, " "))
//     .join("");
//   console.log("filteredWords: ", filteredWords);
// };
// useEffect(() => {
//   fetchWords();
// }, []);
