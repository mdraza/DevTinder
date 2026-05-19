const adminAuth = (req, res, next) => {
    console.log("Authorization")
    const token = "abc";
    const isAdminAuthorized = token === "abc";

    if(!isAdminAuthorized){
        res.status(400).send("Unauthorized User")
    }

    next();
}

const userAuth = (req, res, next) => {
    console.log("User authorize checked")
    const token = "abc";
    const isUserAuthorized = token === "abc";
    if(!isUserAuthorized){
        res.status(401).send("Unauthorized request")
    }

    next()
}


module.exports = {
    adminAuth,
    userAuth
}