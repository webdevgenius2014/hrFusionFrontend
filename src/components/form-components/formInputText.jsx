import * as React from 'react';
import TextField from '@mui/material/TextField';
import { Controller } from "react-hook-form";
export const FormInputText= ({name, control, label, required=false, error, ...rest}) => {       
    return (
        <Controller
            control={control}
            name={name}
            rules={{required: required===true?label+' is required':required}}            
            render={({field:{onChange, value, ref}}) => (
                <TextField 
                    ref={ref}              
                    label={label}
                    varient={"filled"}
                    type="text"
                    autoComplete='off'
                    value={value?value:''}
                    onChange={onChange} 
                    fullWidth={true}
                    size="small" 
                    error={!!error}                                       
                    helperText={error && `${error.message}`} 
                    margin="normal" 
                    {...rest}                   
                />
            )}
        />
    );
};