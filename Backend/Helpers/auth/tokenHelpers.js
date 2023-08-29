const isTokenIncluded =(req) => {
   
    return (
        req.headers.authorization && req.headers.authorization.startsWith("Bearer")
    )

}

const getAccessTokenFromHeader = (req) => {

    const authorization = req.headers.authorization

    const access_token = authorization.split(" ")[1]

    return access_token
}


const sendToken = (user,statusCode ,res)=>{

    const token = user.generateJwtFromUser()

    return res.status(statusCode).json({
        success: 1,
        token,
        data : user,
        message : "Login Successfull"
        
    })

}

module.exports ={
    sendToken,
    isTokenIncluded,
    getAccessTokenFromHeader
}
