const { SignIn } = require("./SignIn");
const { SignUp } = require("./SignUp");

const router = require("express").Router();
function checkUserState(req, res, next) {
    if (req && req.cookies && req.cookies["jwt"]) {
        let returner = {
            result: "User entity already logged in",
            success: false,
        };
        res.status(403).send(returner);
    } else {
        next();
    }
}
router.post("/signin", [checkUserState], SignIn);
router.post("/signup", [checkUserState], SignUp);
router.post("/signout", (req, res) => {
    if (req.cookies["jwt"]) {
        res.clearCookie("jwt");
        res.removeHeader("Authorization");
        res.status(200).json({
            success: true,
            msg: "You have successfully logged out!",
            user: req.user,
        });
    } else {
        res.status(200).json({
            success: false,
            msg: "No User to logout",
            user: null,
        });
    }
});

module.exports = router;
