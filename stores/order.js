import { defineStore } from "pinia";

export const useOrderStore = defineStore("order", {
  state: () => ({
    roomData: null, 
    bookingDate: {
      start: null,
      end: null,
    },
    bookingPeople: 1, 
    dayCount: 1, 
  }),
  actions: {
    setOrderData(roomData, bookingDate, bookingPeople,dayCount) {
      this.roomData = roomData;
      this.bookingDate = bookingDate;
      this.bookingPeople = bookingPeople;
      this.dayCount = dayCount;  
    },
  },
});