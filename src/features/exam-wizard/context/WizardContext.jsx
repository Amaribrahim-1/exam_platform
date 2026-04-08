import { createContext } from "react";
import { useSearchParams } from "react-router-dom";

const WizardContext = createContext();

function WizardProvider({ children }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const step_param = Number(searchParams.get("step")) || 1;

  function handleStepChange() {
    searchParams.set("step", step_param + 1);
    setSearchParams(searchParams);
  }

  function handleBackStep() {
    searchParams.set("step", step_param - 1);
    setSearchParams(searchParams);
  }

  return (
    <WizardContext.Provider
      value={{ step_param, handleStepChange, handleBackStep }}
    >
      {children}
    </WizardContext.Provider>
  );
}

export { WizardContext, WizardProvider };
