interface counterType {
  totalNumbers: number;
  correctNumbers: number;
}
const Score = ({ counter }: { counter: counterType }) => {
  return (
    <ul>
      <li className="p-3 border-b-2 border-b-gray-600 flex flex-col justify-center items-center">
        <span className="font-extrabold text-5xl text-green-700">{`${counter.totalNumbers} WPM`}</span>
        <span className="text-gray-500 text-xs ">(Words per Minute)</span>
      </li>
      <li className="p-3 border-b-2 border-b-gray-600 flex flex-row justify-between items-center">
        <span>Correct:</span>
        <span className="font-bold text-green-500 ">
          {counter.correctNumbers}
        </span>
      </li>
      <li className="p-3 border-b-2 border-b-gray-600 flex flex-row justify-between items-center">
        <span>Wrong:</span>
        <span className="font-bold text-red-500">
          {counter.totalNumbers - counter.correctNumbers}
        </span>
      </li>
      <li className="p-3 flex flex-row justify-between items-center">
        <span className="">Accuracy:</span>
        <span className="font-bold">
          {(
            (counter.correctNumbers / Math.max(counter.totalNumbers, 1)) *
            100
          ).toFixed(2)}
          %
        </span>
      </li>
    </ul>
  );
};

export default Score;
