import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextInput, CheckInput, CustomizeForm } from '../Validation/Inputs';
import { required, email } from '../Validation/Rules';
import InputAdornment from '@material-ui/core/InputAdornment';
import EmailIcon from '@material-ui/icons/Email';
import PersonIcon from '@material-ui/icons/Person';
import PasswordIcon from '@material-ui/icons/VpnKey';

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
}));

const Register = (props) => {
    const { onChangeItem, item, renderControllButton } = props
    const classes = useStyles();
    const [isAgreed, setAgree] = useState(false);

    const handleChange = (event, type) => {
        onChangeItem({
            ...item, [type]: (type === 'term') ? event.target.checked : event.target.value
        });

        if(type === 'term') {
            setAgree(event.target.checked);
        }
    }

    return (
        <CustomizeForm className={classes.container} autoComplete="off">
            <TextInput
                autoFocus
                id="name"
                label="Name"
                onChange={event => {handleChange(event, 'name')}}
                validations={[required]}
                startAdornment={<InputAdornment position="start">
                                        <PersonIcon />
                                </InputAdornment>}
            />
            <TextInput
                id="email"
                label="Email"
                onChange={event => {handleChange(event, 'email')}}
                validations={[required, email]}
                startAdornment={<InputAdornment position="start">
                                        <EmailIcon />
                                </InputAdornment>}
            />
            <TextInput
                id="password"
                label="Password"
                type="password"
                onChange={event => {handleChange(event, 'password')}}
                validations={[required]}
                startAdornment={<InputAdornment position="start">
                                        <PasswordIcon />
                                </InputAdornment>}
            />
            <TextInput
                id="repassword"
                label="Re-password"
                type="password"
                onChange={event => {handleChange(event, 'repassword')}}
                validations={[required]}
                startAdornment={<InputAdornment position="start">
                                        <PasswordIcon />
                                </InputAdornment>}
            />
            <CheckInput
                checked={isAgreed}
                onChange={event => {handleChange(event, 'term')}}
                color="primary"
                label={'Agree with the term!'}
                value={isAgreed ? 'checked' : ''}
                validations={[required]}
            />
            { renderControllButton() }
        </CustomizeForm>
    );
}

export default Register;