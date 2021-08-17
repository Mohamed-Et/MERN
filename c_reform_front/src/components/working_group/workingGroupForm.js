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

const WorkingGroupForm = (props) => {
  const { t, i18n } = useTrans();
  const [users, setUsers] = useState(props.users);
  const [userworkers, setUserworkers] = useState([]);

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const classes = useStyles();
  const theme = useTheme();
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 300,
      },
    },
  };
  return (
    <form
      onSubmit={(e) => {
        props.saveWorkinggroup(e);
      }}
    >
      
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-mutiple-checkbox-label">User Workers</InputLabel>
        <Select
          labelId="demo-mutiple-checkbox-label"
          id="demo-mutiple-checkbox"
          multiple
          value={userworkers}
          onChange={(e) => {
            setUserworkers(e.target.value);
            props.setWorkinggroup({
              userWorkers: e.target.value,
              userFacilitator: props.workinggroup.userFacilitator,
            });
          }}
          input={<Input />}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={MenuProps}
        >
          {users.map((user, index) => (
            <MenuItem key={index} value={user.email}>
              <Checkbox checked={userworkers.indexOf(index) > -1} />
              <ListItemText primary={user.email} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <br></br>
      <select
        className="browser-default custom-select"
        onChange={(e) => {
          props.setWorkinggroup({
            userWorkers: props.workinggroup.userWorkers,
            userFacilitator: e.target.value,
          });
        }}
        
      >
        <option>Choose the workers</option>

        {props.users.map((user, index) => {
          return (
            <option key={index} value={user.email}>
              {user.email}
            </option>
          );
        })}
      </select>

     
            <MDBBtn color="" type="submit" className="mb-3  py-2 z-depth-0">
              <MDBIcon icon="check" />
            </MDBBtn>
          
    </form>
  );
};
export default WorkingGroupForm;