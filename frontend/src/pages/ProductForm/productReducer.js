import dayjs from "dayjs";
export const INITIAL_STATE = {
  category: "",
  country: "",
  company: "",
  code: "",
  brand: "",
  price: 0,
  capicity: "",
  image: "",
  description: "",
  netWeight: 0,
  grossWeight: 0,
  palatSize: 12,
  bl: [
    { code: "", qty: "", date: dayjs("2023-02-03T21:11:54"), warehouse: "" },
    { code: "", qty: "", date: dayjs("2023-02-03T21:11:54"), warehouse: "" },
    { code: "", qty: "", date: dayjs("2023-02-03T21:11:54"), warehouse: "" },
    { code: "", qty: "", date: dayjs("2023-02-03T21:11:54"), warehouse: "" },
  ],
};

export const producReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_INPUT":
      return {};
    case "ADD_BL":
      return {};
    default:
      return state;
  }
};
