export const uiReducer = (state, action) => {
  switch (action.type) {
    case "[UI] - ToggleMenu":
      return {
        ...state,
        isMenuOpen: !state.isMenuOpen,
      };
    case "[UI] - ToggleSigninModal":
      return {
        ...state,
        isModalOpen: !state.isModalOpen,
      };
    case "[UI] - ToggleRegisterModal":
      return {
        ...state,
        isModalOpen: !state.isModalOpen,
        isRegisterModalOpen: !state.isRegisterModalOpen,
      };

    default:
      return state;
  }
};
