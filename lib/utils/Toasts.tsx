import Toast from "react-native-toast-message";

const ToastSuccess = (message: string) => Toast.show({ type: "success", text1: "Success!", text2: message });
const ToastError = (message: string) => Toast.show({ type: "error", text1: "Error", text2: message });

export { ToastSuccess, ToastError };
