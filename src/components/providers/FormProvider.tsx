import React, { SetStateAction, useState } from "react";

const FormContext = React.createContext<
  | {
      showValidation: boolean;
      setShowValidation: React.Dispatch<SetStateAction<boolean>>;
    }
  | undefined
>(undefined);

type props = {
  children: React.ReactNode;
};
export function FormProvider({ children }: props) {
  const [showValidation, setShowValidation] = useState(false);

  const contextContent = {
    showValidation,
    setShowValidation,
  };

  return (
    <FormContext.Provider value={contextContent}>
      {children}
    </FormContext.Provider>
  );
}

export function useForm() {
  const context = React.useContext(FormContext);
  if (context === undefined) {
    throw new Error("useForm must be used within a FormProvider");
  }
  return { ...context };
}
