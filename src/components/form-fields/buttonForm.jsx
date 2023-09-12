import React from "react";
import {
    Button
} from 'rsuite';

const ButtonForm = (props) => {
    return (
        <>
            
                <Button appearance="primary" type="submit">
                    {props.label}
                </Button>
            
        </>
    )
}

export default ButtonForm;