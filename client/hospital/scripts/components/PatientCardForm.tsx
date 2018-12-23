import * as React from "react";
import * as moment from "moment";
import "moment/locale/ru";
import * as download from "downloadjs";
import { default as axios } from "axios";
import { TextField, Grid, Button, Select, MenuItem } from "@material-ui/core";
import { MuiPickersUtilsProvider, DatePicker } from "material-ui-pickers";
import MomentUtils from "@date-io/moment";
import { PatientCard, Gender, TransportationType } from "../types";

type PatientCardFormState = PatientCard & { [key: string]: any };

moment.locale("ru");

export class PatientCardForm extends React.Component<{}, PatientCardFormState> {
  state = {
    number: "",
    receiptDate: new Date(),
    dischargeDate: new Date(),
    department: "",
    roomNumber: "",
    attendingDoctor: "",
    transportationType: TransportationType.ARMCHAIR,
    intolerance: "",
    fullName: "",
    gender: Gender.MALE,
    phoneNumber: "",
    dateOfBirth: new Date(),
    age: "",
    residence: "",
    job: "",
    disability: "",
    injuryHours: "",
    admissionDiagnosis: "",
    clinicalDiagnosisA: "",
    clinicalDiagnosisB: "",
    clinicalDiagnosisC: "",
    operations: ""
  };

  render() {
    const {
      receiptDate,
      dischargeDate,
      gender,
      transportationType,
      dateOfBirth
    } = this.state;
    return (
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <Grid container spacing={24}>
          {this.getTextField("number", "№ Медицинской карты", "number")}
          <Grid item xs={6}>
            <DatePicker
              variant="outlined"
              fullWidth
              label="Дата поступления"
              onChange={this.handleReceiptDateChange}
              value={receiptDate}
            />
          </Grid>
          <Grid item xs={6}>
            <DatePicker
              variant="outlined"
              fullWidth
              label="Дата выписки"
              onChange={this.handleDischargeDateChange}
              value={dischargeDate}
            />
          </Grid>
          {this.getTextField("department", "Отделение")}
          {this.getTextField("roomNumber", "Палата №", "number")}
          {this.getTextField("attendingDoctor", "Лечащий врач")}
          {this.getTextField("intolerance", "Непереносимость")}
          {this.getTextField("fullName", "ФИО")}
          <Grid item xs={6}>
            <Select
              variant="outlined"
              fullWidth
              onChange={this.handleGenderChange}
              value={gender}
            >
              {Object.keys(Gender).map(key => {
                const value = Gender[key];
                return (
                  <MenuItem key={value} value={value}>
                    {value}
                  </MenuItem>
                );
              })}
            </Select>
          </Grid>
          <Grid item xs={6}>
            <Select
              fullWidth
              onChange={this.handleTransportationTypeChange}
              value={transportationType}
            >
              {Object.keys(TransportationType).map(key => {
                const value = TransportationType[key];
                return (
                  <MenuItem key={value} value={value}>
                    {value}
                  </MenuItem>
                );
              })}
            </Select>
          </Grid>
          {this.getTextField("phoneNumber", "Номер телефона")}
          <Grid item xs={6}>
            <DatePicker
              variant="outlined"
              fullWidth
              label="Дата Рождения"
              onChange={this.handleDateOfBirthChange}
              value={dateOfBirth}
            />
          </Grid>
          {this.getTextField("age", "Возраст", "number")}
          {this.getTextField("residence", "Постоянное место жительства")}
          {this.getTextField("job", "Место работы, профессия или должность")}
          {this.getTextField("disability", "Инвалидность")}
          {this.getTextField(
            "injuryHours",
            "Доставлен в стационар после (часов)",
            "number"
          )}
          {this.getTextField("admissionDiagnosis", "Клинический диагноз")}
          {this.getTextField("clinicalDiagnosisA", "Основной диагноз")}
          {this.getTextField(
            "clinicalDiagnosisB",
            "Осложнение основного диагноза"
          )}
          {this.getTextField("clinicalDiagnosisC", "Сопутствующий диагноз")}
          {this.getTextField("operations", "Хирургические операции")}
        </Grid>
        <Button
          variant="contained"
          color="primary"
          style={{ margin: 15 }}
          onClick={this.handleGenerate}
        >
          Скачать документ
        </Button>
      </MuiPickersUtilsProvider>
    );
  }

  private getTextField(
    field: keyof PatientCardFormState,
    label: string,
    type: "number" | "text" = "text"
  ) {
    return (
      <Grid item xs={6}>
        <TextField
          variant="outlined"
          onChange={this.handleChange(field)}
          fullWidth
          value={this.state[field]}
          label={label}
          type={type}
        />
      </Grid>
    );
  }

  private handleReceiptDateChange = (receiptDate: Date) => {
    this.setState({
      receiptDate
    });
  };

  private handleDischargeDateChange = (dischargeDate: Date) => {
    this.setState({
      dischargeDate
    });
  };

  private handleDateOfBirthChange = (dateOfBirth: Date) => {
    this.setState({
      dateOfBirth
    });
  };

  private handleGenderChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    this.setState({
      gender: event.target.value as Gender
    });
  };

  private handleTransportationTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    this.setState({
      transportationType: event.target.value as TransportationType
    });
  };

  private handleChange = (field: keyof PatientCardFormState) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    this.setState({
      [field]: event.target.value
    });
  };

  private handleGenerate = () => {
    const data = this.getData();

    axios("/hospital-generate", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "POST",
      responseType: "blob",
      data
    }).then(response => {
      download(response.data, "Сгенерированная Карточка пациента");
    });
  };

  private getData() {
    const dates = ["receiptDate", "dischargeDate", "dateOfBirth"].reduce(
      (prev, curr) => {
        return {
          ...prev,
          [curr]: moment(this.state[curr]).format("LL")
        };
      },
      {}
    );
    return JSON.stringify({
      ...this.state,
      ...dates
    });
  }
}
