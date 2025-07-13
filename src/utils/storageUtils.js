const KEY = "appointments";
export const getAppointments = () => JSON.parse(localStorage.getItem(KEY) || "[]");
export const saveAppointments = (appts) => localStorage.setItem(KEY, JSON.stringify(appts));
export const deleteAppointment = (idx) => {
  const arr = getAppointments();
  arr.splice(idx,1);
  saveAppointments(arr);
};
