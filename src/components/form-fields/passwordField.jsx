import React, {useState} from "react";
import { Input, InputGroup } from 'rsuite';
import EyeIcon from '@rsuite/icons/legacy/Eye';
import EyeSlashIcon from '@rsuite/icons/legacy/EyeSlash';
const PasswordField = () => {
    const [visible, setVisible] = useState(false);

    const handleChange = () => {
      setVisible(!visible);
    };
    return (
       
        <>
            <InputGroup>
                <Input type={visible ? 'text' : 'password'} />
                <InputGroup.Button onClick={handleChange}>
                    {visible ? <EyeIcon /> : <EyeSlashIcon />}
                </InputGroup.Button>
            </InputGroup>
        </>
    )
}

export default PasswordField;