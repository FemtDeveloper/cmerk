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

    default:
      return state;
  }
};
