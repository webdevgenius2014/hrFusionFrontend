import * as React from 'react';
import TextField from '@mui/material/TextField';
import { Controller } from "react-hook-form";
export const FormInputPassword= ({name, control, label, required=false, error, ...rest}) => {       
    return (
        <Controller
            control={control}
            name={name}
            rules={{required: required===true?label+' is required':required}}            
            render={({field:{onChange, value, ref}}) => (
                <TextField                                                                          
                    ref={ref}      
                    focused        
                    label={label}
                    varient="filled"                                                        
                    value={value?value:''}
                    onChange={onChange} 
                    fullWidth={true}                    
                    type="password" 
                    autoComplete="current-password"                 
                    // inputProps={{  
                    //     autoComplete: 'new-password',                      
                    //     form: {
                    //         autocomplete: 'new-password',
                    //     },
                    // }}                                   
                    error={!!error}                    
                    helperText={error && `${error.message}`}
                    margin='normal'
                    {...rest}                     
                />
            )}
        />
    );
};