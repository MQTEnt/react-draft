import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextInput, CustomizeForm, ControllActiveButton } from '../Validation/Inputs';
import { required, number } from '../Validation/Rules';

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
}));

const CreateProduct = (props) => {
    const { onChangeItem, item, disableButton } = props
    const classes = useStyles();
    

    const handleChange = (event, type) => {
        onChangeItem({
            ...item, [type]: event.target.value
        });


    }

    return (
        <CustomizeForm className={classes.container} autoComplete="off">
            <TextInput
                autoFocus
                id="name"
                label="Name"
                onChange={event => {handleChange(event, 'name')}}
                validations={[required]}
            />
            <TextInput
                id="quantity"
                label="Quantity"
                onChange={event => {handleChange(event, 'quantity')}}
                validations={[number]}
            />
            <TextInput
                id="price"
                label="Price"
                onChange={event => {handleChange(event, 'price')}}
                validations={[number]}
            />
            <ControllActiveButton disableButton={disableButton} />
        </CustomizeForm>
    );
}

export default CreateProduct;