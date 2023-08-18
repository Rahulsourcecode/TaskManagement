// const { showNotification } = require("./notifications")

exports.errorHandler = (controller) => async (data) => {
    try {
       const res =  await controller(data)
        if(res?.data){
            // showNotification(res?.data?.message , 'success','success')
            return res
        } 
    } catch (error) {
        const errorMessage = error?.response?.data?.message || error.message
        console.error('Error '+ errorMessage)
        // showNotification(errorMessage)
        return 
    }
}