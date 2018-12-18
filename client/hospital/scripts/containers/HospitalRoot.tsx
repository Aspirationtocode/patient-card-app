import * as React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { PatientCard } from "../components/PatientCard";

export class HospitalRoot extends React.Component {
  render() {
    return (
      <React.Fragment>
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="h6" color="inherit">
              Patient Card Generator
            </Typography>
          </Toolbar>
        </AppBar>
        <div className="content">
          <PatientCard />
        </div>
      </React.Fragment>
    );
  }
}
