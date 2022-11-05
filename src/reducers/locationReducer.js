import { LOCATION_CHANGE, DATE_CHANGE } from "../constants";
import * as locationService from "../services/LocationService";

const initialState = {
  location: null,
  date: "2022-11-04",
};

const locationReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOCATION_CHANGE:
      locationService.setLocation(action.payload);

      return {
        ...state,
        location: action.payload,
      };
    case DATE_CHANGE:
      return {
        ...state,
        date: action.payload,
      };
    default:
      return state;
  }
};

export default locationReducer;
