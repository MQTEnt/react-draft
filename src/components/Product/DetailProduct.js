import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    margin: {
        margin: theme.spacing(1),
    },
}));

const DetailProduct = (props) => {
    const { onChangeItem, item } = props;
    const classes = useStyles();
    

    const handleChange = (event, type) => {
        onChangeItem({
            ...item, [type]: event.target.value
        })
    }

    return (
        <div className={classes.container}>
            <TextField
                disabled
                className={classes.margin}
                id="id"
                label="ID"
                value={item.id}
                fullWidth
                InputProps={{
                    readOnly: true,
                }}
            />
            <TextField
                autoFocus
                className={classes.margin}
                id="name"
                label="Name"
                value={item.name}
                onChange={event => {handleChange(event, 'name')}}
                fullWidth
            />
            <TextField
                className={classes.margin}
                id="quantity"
                label="Quantity"
                value={item.quantity}
                onChange={event => {handleChange(event, 'quantity')}}
                fullWidth
            />
            <TextField
                className={classes.margin}
                id="price"
                label="Price"
                value={item.price}
                onChange={event => {handleChange(event, 'price')}}
                fullWidth
            />
        </div>
    );
}

export default DetailProduct;