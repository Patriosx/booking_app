//funciona anonima
// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case "SEARCH_HOTELS": {
      return payload;
    }
    case "RESET_SEARCH": {
      return payload;
    }
    default:
      return state;
  }
};
