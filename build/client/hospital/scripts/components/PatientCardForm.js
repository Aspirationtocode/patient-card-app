"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const moment = require("moment");
require("moment/locale/ru");
const download = require("downloadjs");
const axios_1 = require("axios");
const core_1 = require("@material-ui/core");
const material_ui_pickers_1 = require("material-ui-pickers");
const moment_1 = require("@date-io/moment");
const types_1 = require("../types");
moment.locale("ru");
class PatientCardForm extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            number: "",
            receiptDate: new Date(),
            dischargeDate: new Date(),
            department: "",
            roomNumber: "",
            attendingDoctor: "",
            transportationType: types_1.TransportationType.ARMCHAIR,
            intolerance: "",
            fullName: "",
            gender: types_1.Gender.MALE,
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
        this.handleReceiptDateChange = (receiptDate) => {
            this.setState({
                receiptDate
            });
        };
        this.handleDischargeDateChange = (dischargeDate) => {
            this.setState({
                dischargeDate
            });
        };
        this.handleDateOfBirthChange = (dateOfBirth) => {
            this.setState({
                dateOfBirth
            });
        };
        this.handleGenderChange = (event) => {
            this.setState({
                gender: event.target.value
            });
        };
        this.handleTransportationTypeChange = (event) => {
            this.setState({
                transportationType: event.target.value
            });
        };
        this.handleChange = (field) => (event) => {
            this.setState({
                [field]: event.target.value
            });
        };
        this.handleGenerate = () => {
            const data = this.getData();
            axios_1.default("/hospital-generate", {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                method: "POST",
                responseType: "blob",
                data
            }).then(response => {
                download(response.data, "Карточка пациента");
            });
        };
    }
    render() {
        const { receiptDate, dischargeDate, gender, transportationType, dateOfBirth } = this.state;
        return (React.createElement(material_ui_pickers_1.MuiPickersUtilsProvider, { utils: moment_1.default },
            React.createElement(core_1.Grid, { container: true, spacing: 24 },
                this.getTextField("number", "№ Медицинской карты", "number"),
                React.createElement(core_1.Grid, { item: true, xs: 6 },
                    React.createElement(material_ui_pickers_1.DatePicker, { variant: "outlined", fullWidth: true, label: "\u0414\u0430\u0442\u0430 \u043F\u043E\u0441\u0442\u0443\u043F\u043B\u0435\u043D\u0438\u044F", onChange: this.handleReceiptDateChange, value: receiptDate })),
                React.createElement(core_1.Grid, { item: true, xs: 6 },
                    React.createElement(material_ui_pickers_1.DatePicker, { variant: "outlined", fullWidth: true, label: "\u0414\u0430\u0442\u0430 \u0432\u044B\u043F\u0438\u0441\u043A\u0438", onChange: this.handleDischargeDateChange, value: dischargeDate })),
                this.getTextField("department", "Отделение"),
                this.getTextField("roomNumber", "Палата №", "number"),
                this.getTextField("attendingDoctor", "Лечащий врач"),
                this.getTextField("intolerance", "Непереносимость"),
                this.getTextField("fullName", "ФИО"),
                React.createElement(core_1.Grid, { item: true, xs: 6 },
                    React.createElement(core_1.Select, { variant: "outlined", fullWidth: true, onChange: this.handleGenderChange, value: gender }, Object.keys(types_1.Gender).map(key => {
                        const value = types_1.Gender[key];
                        return (React.createElement(core_1.MenuItem, { key: value, value: value }, value));
                    }))),
                React.createElement(core_1.Grid, { item: true, xs: 6 },
                    React.createElement(core_1.Select, { fullWidth: true, onChange: this.handleTransportationTypeChange, value: transportationType }, Object.keys(types_1.TransportationType).map(key => {
                        const value = types_1.TransportationType[key];
                        return (React.createElement(core_1.MenuItem, { key: value, value: value }, value));
                    }))),
                this.getTextField("phoneNumber", "Номер телефона"),
                React.createElement(core_1.Grid, { item: true, xs: 6 },
                    React.createElement(material_ui_pickers_1.DatePicker, { variant: "outlined", fullWidth: true, label: "\u0414\u0430\u0442\u0430 \u0420\u043E\u0436\u0434\u0435\u043D\u0438\u044F", onChange: this.handleDateOfBirthChange, value: dateOfBirth })),
                this.getTextField("age", "Возраст", "number"),
                this.getTextField("residence", "Постоянное место жительства"),
                this.getTextField("job", "Место работы, профессия или должность"),
                this.getTextField("disability", "Инвалидность"),
                this.getTextField("injuryHours", "Доставлен в стационар после (часов)", "number"),
                this.getTextField("admissionDiagnosis", "Клинический диагноз"),
                this.getTextField("clinicalDiagnosisA", "Основной диагноз"),
                this.getTextField("clinicalDiagnosisB", "Осложнение основного диагноза"),
                this.getTextField("clinicalDiagnosisC", "Сопутствующий диагноз"),
                this.getTextField("operations", "Хирургические операции")),
            React.createElement(core_1.Button, { variant: "contained", color: "primary", style: { margin: 15 }, onClick: this.handleGenerate }, "\u0421\u043A\u0430\u0447\u0430\u0442\u044C \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442")));
    }
    getTextField(field, label, type = "text") {
        return (React.createElement(core_1.Grid, { item: true, xs: 6 },
            React.createElement(core_1.TextField, { variant: "outlined", onChange: this.handleChange(field), fullWidth: true, value: this.state[field], label: label, type: type })));
    }
    getData() {
        const dates = ["receiptDate", "dischargeDate", "dateOfBirth"].reduce((prev, curr) => {
            return Object.assign({}, prev, { [curr]: moment(this.state[curr]).format("LL") });
        }, {});
        return JSON.stringify(Object.assign({}, this.state, dates));
    }
}
exports.PatientCardForm = PatientCardForm;
//# sourceMappingURL=PatientCardForm.js.map