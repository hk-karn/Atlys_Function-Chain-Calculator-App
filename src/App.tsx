import { useEffect, useState } from "react";
import { evaluate } from "mathjs";
import { FunctionCard } from "./components/FunctionCard";
import { InputOutputBox } from "./components/InputOutputBox";

// Function Cards Data where the order of function execution is fixed for this assignment.
// i.e., (1 → 2 → 4 → 5 → 3)
const cardsData = [
  {
    id: 1,
    currentFunctionName: "1",
    nextFunctionName: "2",
    nextFunctionId: 2,
  },
  {
    id: 2,
    currentFunctionName: "2",
    nextFunctionId: 4,
    nextFunctionName: "4",
  },
  { id: 3, currentFunctionName: "3" },
  {
    id: 4,
    currentFunctionName: "4",
    nextFunctionId: 5,
    nextFunctionName: "5",
  },
  {
    id: 5,
    currentFunctionName: "5",
    nextFunctionId: 3,
    nextFunctionName: "3",
  },
];

const nextFunctionLookup: { [key: number]: number | null } = {};

for (const card of cardsData) {
  nextFunctionLookup[card.id] = card.nextFunctionId || null;
}

function App() {
  const [input, setInput] = useState<string | number>("");
  const [output, setOutput] = useState<string | number>("");
  const [equations, setEquations] = useState<{ [key: string]: string }>({});
  const sourceCardId = 1;
  const targetCardId = 3;

  const setFunctionEquation = (id: number, equation: string) => {
    setEquations((prev) => ({ ...prev, [id]: equation }));
  };

  const calculateOutput = () => {
    try {
      // Calculate the result
      let currentNode: number | null = sourceCardId;
      let val = input;

      while (currentNode) {
        const equation = equations[currentNode];
        val = evaluate(equation, { x: val });
        currentNode = nextFunctionLookup[currentNode];
      }

      setOutput(val);
    } catch (error) {
      console.error("Error calculating output:", error);
    }
  };

  useEffect(() => {
    const cardsLength = cardsData.length;
    let noOfEquations = 0;

    // Validate equations
    for (const equation in equations) {
      if (!equations[equation]) {
        return;
      }
      noOfEquations++;
    }

    // Ensure the number of equations matches the cards length
    if (noOfEquations !== cardsLength) {
      return;
    }

    calculateOutput();
  }, [equations, input, calculateOutput]);

  return (
    <>
      <div className="relative z-10 flex px-[124px] gap-x-[131px] gap-y-[107px] flex-wrap justify-center">
        {cardsData.map((card) => (
          <FunctionCard
            key={card.id}
            setFunctionEquation={setFunctionEquation}
            {...card}
            equation={equations[card.id] || ""}
          />
        ))}
      </div>

      <InputOutputBox
        id="input"
        label="Initial value of x"
        connectorCardId={sourceCardId}
        value={input}
        onChange={(val: number) => {
          setInput(val);
        }}
      />

      <InputOutputBox
        id="output"
        label="Final Output y"
        connectorCardId={targetCardId}
        value={output}
      />
    </>
  );
}

export default App;