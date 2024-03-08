import * as React from 'react';
import TextField from '@mui/material/TextField';
import { Controller } from "react-hook-form";
export const FormInputPassword= ({name, control, label, required=false,focused=false, error, ...rest}) => {       
    return (
        <Controller
            control={control}
            name={name}
            // rules={{required: required===true?label+' is required':required}}            
            render={({field:{onChange, value, ref}}) => (
                <TextField                                                                          
                    ref={ref}      
                    focused={focused}     
                    label={label}
                    varient="filled"                                                        
                    onChange={onChange} 
                    fullWidth={true}  
                    sx={{marginTop:'0px'}}                  
                    type="password" 
                    autoComplete="current-password"                                                
                    error={!!error}                    
                    helperText={error && `${error?.message}`}
                    margin='normal'
                    {...rest}                     
                />
            )}
        />
    );
};