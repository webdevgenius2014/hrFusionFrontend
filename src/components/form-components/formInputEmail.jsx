import * as React from 'react';
import TextField from '@mui/material/TextField';
import { Controller } from "react-hook-form";
export const FormInputEmail= ({name, control, label, required,focused, error, ...rest}) => {      
    return (
        <Controller
            control={control}
            name={name}
            rules={{
                required: required===true?label+' is required':required,
                pattern: /^[a-zA-Z0-9]+@+[a-zA-Z0-9]+.+[A-z]/
            
            }}                      
            render={({field:{onChange, value, ref}}) => (
                <TextField                    
                    key={name} 
                    ref={ref}
                    type="email"  
                    focused={focused}                                                 
                    label={label}
                    varient={"filled"}                    
                    autoComplete='chrome-off'                                                                       
                    // value={value?value:''}
                    onChange={onChange}                    
                    fullWidth={true}                    
                    error={!!error}
                    helperText={error && `${error.message}`}
                    margin="normal" 
                    {...rest}
                />
            )}
        />
    );
};