import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import { form, control, button } from 'react-validation';

const useStyles = makeStyles(theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    formControl: {
      margin: theme.spacing(1),
    },
}));


// Define own Form component
const Form = ({ getValues, validate, showError, hideError, children, validateAll, ...props }) => {
    const classes = useStyles();

    // destruct non-valid props
    return <form className={classes.formControl} {...props}>{children}</form>
};

// Define own Input component
const CustomizeTextInput = ({ error, isChanged, isUsed, ...props }) => {
    const classes = useStyles();
    return (
        <FormControl className={classes.formControl} error={!!(isChanged && error)} fullWidth>
            <InputLabel htmlFor="component-helper">{props.label}</InputLabel>
            <Input {...props}/>
            <FormHelperText>{isChanged && error}</FormHelperText>
        </FormControl>
    )
};

// This component is just for handling disable/enable button on modal or button on outside form. It renders nothing
const ControllActiveButtonHOC = ({ hasErrors, disableButton, ...props }) => {
    disableButton(hasErrors);
    return null;
};
  

// Now call HOCs on components
const CustomizeForm = form(Form);
const TextInput = control(CustomizeTextInput);
const ControllActiveButton = button(ControllActiveButtonHOC);


export {
    CustomizeForm,
    TextInput,
    ControllActiveButton
}