"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const core_1 = require("@material-ui/core");
const PatientCardForm_1 = require("../components/PatientCardForm");
class HospitalRoot extends React.Component {
    render() {
        return (React.createElement(React.Fragment, null,
            React.createElement(core_1.AppBar, { position: "static", color: "default" },
                React.createElement(core_1.Toolbar, null,
                    React.createElement(core_1.Typography, { variant: "h6", color: "inherit" }, "\u0413\u0435\u043D\u0435\u0440\u0430\u0442\u043E\u0440 \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0438 \u043F\u0430\u0446\u0438\u0435\u043D\u0442\u0430"))),
            React.createElement("div", { className: "content" },
                React.createElement(PatientCardForm_1.PatientCardForm, null))));
    }
}
exports.HospitalRoot = HospitalRoot;
//# sourceMappingURL=HospitalRoot.js.map