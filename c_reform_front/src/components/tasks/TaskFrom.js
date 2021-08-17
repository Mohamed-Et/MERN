import React, { useState } from "react";
import { useTrans } from "../../Contextes/translation.js";
import { MDBIcon, MDBInputGroup, MDBBtn } from "mdbreact";
import { withStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const TaskForm = (props) => {
  const { t, i18n } = useTrans();

  const [state, setState] = useState({
    checkedC: props.task.implementation,
  });

  const handleChange = (event) => {
    setState({ ...state.checkedC, [event.target.name]: event.target.checked });
  };

  const AntSwitch = withStyles((theme) => ({
    root: {
      width: 28,
      height: 16,
      padding: 0,
      display: 'flex',
    },
    switchBase: {
      padding: 2,
      color: theme.palette.grey[500],
      '&$checked': {
        transform: 'translateX(12px)',
        color: theme.palette.common.white,
        '& + $track': {
          opacity: 1,
          backgroundColor: theme.palette.primary.main,
          borderColor: theme.palette.primary.main,
        },
      },
    },
    thumb: {
      width: 12,
      height: 12,
      boxShadow: 'none',
    },
    track: {
      border: `1px solid ${theme.palette.grey[500]}`,
      borderRadius: 16 / 2,
      opacity: 1,
      backgroundColor: theme.palette.common.white,
    },
    checked: {},
  }))(Switch);

  return (
    <form
      onSubmit={(e) => {
        props.saveTask(e);
      }}
    >
      <MDBInputGroup
        material
        containerClassName="mb-3 mt-0"
        hint="Title"
        type="text"
        value={props.task.title}
        required
        onChange={(e) => {
          props.setTask({
            title: e.target.value,
            deliverable: props.task.deliverable,
            deadline: props.task.deadline,
            implementation: props.task.implementation,
            personInCharge: props.task.personInCharge,
            description: props.task.description,
            startingDate: props.task.startingDate,
            endingDate: props.task.endingDate,
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
        hint="Deliverable"
        type="text"
        value={props.task.deliverable}
        onChange={(e) => {
          props.setTask({
            title: props.task.title,
            deliverable: e.target.value,
            deadline: props.task.deadline,
            implementation: props.task.implementation,
            personInCharge: props.task.personInCharge,
            description: props.task.description,
            startingDate: props.task.startingDate,
            endingDate: props.task.endingDate,
          });
        }}
      />
      <MDBInputGroup
        material
        containerClassName="mb-3 mt-0"
        hint="deadline"
        type="date"
        value={props.task.deadline}
        onChange={(e) => {
          props.setTask({
            title: props.task.title,
            deliverable: props.task.deliverable,
            deadline: e.target.value,
            implementation: props.task.implementation,
            personInCharge: props.task.personInCharge,
            description: props.task.description,
            startingDate: props.task.startingDate,
            endingDate: props.task.endingDate,
          });
        }}
      />

      {/* <select
        className="browser-default custom-select"
        onChange={(e) => {
          props.setTask({
            title: props.task.title,
            deliverable: props.task.deliverable,
            deadline: props.task.deadline,
            implementation: e.target.value,
            personInCharge: props.task.personInCharge,
            description: props.task.description,
            startingDate: props.task.startingDate,
            endingDate: props.task.endingDate,
          });
        }}
      >
        <option>Choose</option>
        <option value="true">Yes</option>
        <option value="false">No</option>
      </select> */}

      <Typography component="div">
        <Grid component="label" container alignItems="center" spacing={1}>
          <Grid item value="false">Off</Grid>
          <Grid item>
            <AntSwitch checked={state.checkedC} value={!state.checkedC} onChange={(e) => {
              handleChange(e);
              props.setTask({
                title: props.task.title,
                deliverable: props.task.deliverable,
                deadline: props.task.deadline,
                implementation: e.target.checked,
                personInCharge: props.task.personInCharge,
                description: props.task.description,
                startingDate: props.task.startingDate,
                endingDate: props.task.endingDate,
              });
            }} name="checkedC" />
          </Grid>
          <Grid item value="true">On</Grid>
        </Grid>
      </Typography>

      <br></br>
      <select
        className="browser-default custom-select"
        value={props.task.personInCharge}
        onChange={(e) => {
          props.setTask({
            title: props.task.title,
            deliverable: props.task.deliverable,
            deadline: props.task.deadline,
            implementation: props.task.implementation,
            personInCharge: e.target.value,
            description: props.task.description,
            startingDate: props.task.startingDate,
            endingDate: props.task.endingDate,
          });
        }}
      >
        <option>Choose the User</option>
        {props.users.map((user, index) => {
          return (
            <option key={index} value={user.email}>
              {user.email}
            </option>
          );
        })}
      </select>

      <MDBInputGroup
        material
        containerClassName="mb-3 mt-0"
        hint="Description"
        type="text"
        value={props.task.description}
        onChange={(e) => {
          props.setTask({
            title: props.task.title,
            deliverable: props.task.deliverable,
            deadline: props.task.deadline,
            implementation: props.task.implementation,
            personInCharge: props.task.personInCharge,
            description: e.target.value,
            startingDate: props.task.startingDate,
            endingDate: props.task.endingDate,
          });
        }}
      />

      <MDBInputGroup
        material
        containerClassName="mb-3 mt-0"
        hint="Starting Date"
        type="date"
        value={props.task.startingDate}
        onChange={(e) => {
          props.setTask({
            title: props.task.title,
            deliverable: props.task.deliverable,
            deadline: props.task.deadline,
            implementation: props.task.implementation,
            personInCharge: props.task.personInCharge,
            description: props.task.description,
            startingDate: e.target.value,
            endingDate: props.task.endingDate,
          });
        }}
      />

      <MDBInputGroup
        material
        containerClassName="mb-3 mt-0"
        hint="Ending Date"
        type="date"
        value={props.task.endingDate}
        onChange={(e) => {
          props.setTask({
            title: props.task.title,
            deliverable: props.task.deliverable,
            deadline: props.task.deadline,
            implementation: props.task.implementation,
            personInCharge: props.task.personInCharge,
            description: props.task.description,
            startingDate: props.task.startingDate,
            endingDate: e.target.value,
          });
        }}
      />
    </form>
  );
};
export default TaskForm;
