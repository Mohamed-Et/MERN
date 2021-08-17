import React from "react";
import { useTrans } from "../../Contextes/translation.js";
import { MDBIcon, MDBInputGroup, MDBBtn } from "mdbreact";

const MonitoringForm = (props) => {
    const { t, i18n } = useTrans();

    return (
        <form
            onSubmit={(e) => {
                props.saveMonitoring(e);
            }}
        >
            <MDBInputGroup
                material
                containerClassName="mb-3 mt-0"
                hint="Information"
                type="text"
                value={props.monitoring.information}
                required
                onChange={(e) => {
                    props.setMonitoring({
                        information: e.target.value,
                        author: props.monitoring.author,
                        date_monitoring: props.monitoring.date_monitoring
                    });
                }}
                append={
                    <MDBBtn color="" type="submit" className="mb-3  py-2 z-depth-0">
                        <MDBIcon icon="check" />
                    </MDBBtn>
                }
            />
            <MDBInputGroup
                material
                containerClassName="mb-3 mt-0"
                hint="Author"
                type="text"
                value={props.monitoring.author}
                onChange={(e) => {
                    props.setMonitoring({
                        information: props.monitoring.information,
                        author: e.target.value,
                        date_monitoring: props.monitoring.date_monitoring
                    });
                }}
            />
            <MDBInputGroup
                material
                containerClassName="mb-3 mt-0"
                hint="deadline"
                type="date"
                value={props.monitoring.date_monitoring}
                onChange={(e) => {
                    props.setMonitoring({
                        information: props.monitoring.information,
                        author: props.monitoring.author,
                        date_monitoring: e.target.value
                    });
                }}
            />
        </form>
    );
};
export default MonitoringForm;
