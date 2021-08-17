import React, { useState } from "react";
import { useTrans } from "../../Contextes/translation.js";
import { MDBIcon, MDBInputGroup, MDBBtn } from "mdbreact";

import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";
import Chip from "@material-ui/core/Chip";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

const MeetingForm = (props) => {
  const { t, i18n } = useTrans();
  const [users, setUsers] = useState(props.users);
  const [participants, setParticipants] = useState([]);

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const classes = useStyles();
  const theme = useTheme();
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  return (
    <form
      onSubmit={(e) => {
        props.saveMeeting(e);
      }}
    >
      <MDBInputGroup
        material
        containerClassName="mb-3 mt-0"
        hint="Title"
        type="text"
        value={props.meeting.title}
        required
        onChange={(e) => {
          props.setMeeting({
            title: e.target.value,
            description: props.meeting.description,
            meeting_date: props.meeting.meeting_date,
            participants: props.meeting.participants,
            tasks: props.meeting.tasks,
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
        hint="Description"
        type="text"
        value={props.meeting.description}
        onChange={(e) => {
          props.setMeeting({
            title: props.meeting.title,
            description: e.target.value,
            meeting_date: props.meeting.meeting_date,
            participants: props.meeting.participants,
            tasks: props.meeting.tasks,
          });
        }}
      />
      <br></br>
      <MDBInputGroup
        material
        containerClassName="mb-3 mt-0"
        hint="Meeting Date"
        type="date"
        value={props.meeting.meeting_date}
        onChange={(e) => {
          props.setMeeting({
            title: props.meeting.title,
            description: props.meeting.description,
            meeting_date: e.target.value,
            participants: props.meeting.participants,
            tasks: props.meeting.tasks,
          });
        }}
      />
      {/*       <select
        className="browser-default custom-select "
        onChange={(e) => {
          props.setMeeting({
            title: props.meeting.title,
            description: props.meeting.description,
            meeting_date: props.meeting.meeting_date,
            participants: e.target.value,
            tasks: props.meeting.tasks,
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
 */}
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-mutiple-checkbox-label">Tag</InputLabel>
        <Select
          labelId="demo-mutiple-checkbox-label"
          id="demo-mutiple-checkbox"
          multiple
          value={participants}
          onChange={(e) => {
            setParticipants(e.target.value);
            props.setMeeting({
              title: props.meeting.title,
              description: props.meeting.description,
              meeting_date: props.meeting.meeting_date,
              participants: e.target.value,
              tasks: props.meeting.tasks,
            });
          }}
          input={<Input />}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={MenuProps}
        >
          {users.map((user, index) => (
            <MenuItem key={index} value={user.email}>
              <Checkbox checked={participants.indexOf(index) > -1} />
              <ListItemText primary={user.email} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <br></br>
      <select
        className="browser-default custom-select"
        onChange={(e) => {
          props.setMeeting({
            title: props.meeting.title,
            description: props.meeting.description,
            meeting_date: props.meeting.meeting_date,
            participants: props.meeting.participants,
            tasks: e.target.value,
          });
        }}
      >
        <option>Choose the task</option>

        {props.tasks.map((task, index) => {
          return (
            <option key={index} value={task._id}>
              {task.title}
            </option>
          );
        })}
      </select>
    </form>
  );
};
export default MeetingForm;
