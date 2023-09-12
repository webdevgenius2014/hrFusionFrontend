import React, { createElement } from "react"
const Form = ({
  defaultValues,    
  children,  
  onSubmit,
  handleSubmit,  
  register,
  className,
  ...rest
}) => {
  return (
    <form className={`${dStyles.form} ${className}`} onSubmit={handleSubmit(onSubmit)} {...rest}>     
      {Array.isArray(children)
        ? children.map((child) => {          
            return (child && child.props.name
              ? createElement(child.type, {
                  ...{
                    ...child.props,
                    register,
                    key: child.props.name
                  }
                })
              : child);
          })
        : children
      } 
      
    </form>
  );
};

export default Form;