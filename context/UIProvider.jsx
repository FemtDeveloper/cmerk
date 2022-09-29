import { useReducer } from "react";
import { UiContext, uiReducer } from "./";

const UI_INITIAL_STATE = {
  isMenuOpen: false,
  isModalOpen: false,
  isRegisterModalOpen: false,
};

export const UiProvider = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

  const toggleSideMenu = () => {
    dispatch({ type: "[UI] - ToggleMenu" });
  };
  const toggleSigninModal = () => {
    dispatch({ type: "[UI] - ToggleSigninModal" });
  };
  const toggleRegisterModal = () => {
    dispatch({ type: "[UI] - ToggleSigninModal" });
    dispatch({ type: "[UI] - ToggleRegisterModal" });
  };

  return (
    <UiContext.Provider
      value={{
        ...state,

        // Methods
        toggleSideMenu,
        toggleSigninModal,
        toggleRegisterModal,
      }}
    >
      {children}
    </UiContext.Provider>
  );
};
