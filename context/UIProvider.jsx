import { useReducer } from "react";
import { UiContext, uiReducer } from "./";

const UI_INITIAL_STATE = {
  isMenuOpen: false,
  isModalOpen: false,
};

export const UiProvider = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

  const toggleSideMenu = () => {
    dispatch({ type: "[UI] - ToggleMenu" });
  };
  const toggleSigninModal = () => {
    dispatch({ type: "[UI] - ToggleSigninModal" });
  };

  return (
    <UiContext.Provider
      value={{
        ...state,

        // Methods
        toggleSideMenu,
        toggleSigninModal,
      }}
    >
      {children}
    </UiContext.Provider>
  );
};
