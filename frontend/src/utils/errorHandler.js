import { toast } from 'react-toastify';

const errorHandler = (controller) => async (data) => {
    try {
        const res = await controller(data)
        if (res?.data) {
            toast(res?.data?.message)
            return res
        }
    } catch (error) {
        const errorMessage = error?.response?.data?.message || error.message
        console.error('Error ' + errorMessage)
        toast(errorMessage)
        return
    }
}
export default errorHandler