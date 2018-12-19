import * as React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { PatientCardForm } from "../components/PatientCardForm";

export class HospitalRoot extends React.Component {
  render() {
    return (
      <React.Fragment>
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="h6" color="inherit">
              Генератор карточки пациента
            </Typography>
          </Toolbar>
        </AppBar>
        <div className="content">
          <PatientCardForm />
        </div>
      </React.Fragment>
    );
  }
}
