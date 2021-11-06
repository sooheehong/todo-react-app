import React from "react";
import "./index.css"
import App from "./App";
import Login from "./Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { Box } from "@material-ui/core";
import SignUp from "./SignUp";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {"Copyright ⓒ"}
            sooheehong TODO APP, {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

class AppRouter extends React.Component {
    render() {
        return (
            <div>
                <Router>
                    <div>
                        <Switch>
                            <Route path="/login">
                                <Login />
                            </Route>
                            <Route path="/signup">
                                <SignUp />
                            </Route>
                            <Route path="/">
                                <App />
                            </Route>
                        </Switch>
                    </div>
                    <Box mt={5}>
                        <Copyright />
                    </Box>
                </Router>
            </div>
        )
    }
}
export default AppRouter;