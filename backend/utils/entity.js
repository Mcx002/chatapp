module.exports = {
    SUCCESS: (data = null,message = "ok")=>{
        return {success:true,message:message,data:data}
    },
    FAILED: (error = null,message = "ok")=>{
        return {success:false,message:message,error:error}
    },
}