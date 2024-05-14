import toast from "react-hot-toast"

const useToastMessages = () => {
  const showToast = (message, type = "success") => {
    switch (type) {
      case "success":
        toast.success(message)
        break
      case "error":
        toast.error(message)
        break
      default:
        toast.success(message)
    }
  }

  return { showToast }
}

export default useToastMessages
