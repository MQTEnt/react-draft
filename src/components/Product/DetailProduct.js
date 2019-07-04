import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextInput, CustomizeForm } from '../Validation/Inputs';
import { required, number } from '../Validation/Rules';

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
}));

const DetailProduct = (props) => {
    const { onChangeItem, item, renderControllButton } = props;
    const classes = useStyles();
    

    const handleChange = (event, type) => {
        onChangeItem({
            ...item, [type]: event.target.value
        })
    }

    return (
        <CustomizeForm className={classes.container} autoComplete="off">
            <TextInput
                disabled
                id="id"
                label="ID"
                value={item.id || ''}
            />
            <TextInput
                className={classes.margin}
                id="name"
                label="Name"
                value={item.name || ''}
                onChange={event => {handleChange(event, 'name')}}
                validations={[required]}
            />
            <TextInput
                id="quantity"
                label="Quantity"
                value={item.quantity || ''}
                onChange={event => {handleChange(event, 'quantity')}}
                validations={[number]}
            />
            <TextInput
                id="price"
                label="Price"
                value={item.price || ''}
                onChange={event => {handleChange(event, 'price')}}
                validations={[number]}
            />
            { renderControllButton() }
        </CustomizeForm>
    );
}

export default DetailProduct;