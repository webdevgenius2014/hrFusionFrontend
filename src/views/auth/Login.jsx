import React from "react";
import {
    Container,
    Content,
    ButtonToolbar,
    Button,
    Panel,
    FlexboxGrid
} from 'rsuite';
import { Form, Schema } from 'rsuite';

const Login = () => {
    const { StringType, NumberType } = Schema.Types;
    const model = Schema.Model({
        email: StringType()
            .isEmail('Please enter a valid email address.')
            .isRequired('This field is required.'),
        password: StringType().isRequired('This field is required.')    
    });

    function TextField(props) {
        const { name, label, accepter, ...rest } = props;
        return (
            <Form.Group controlId={`${name}-3`}>
                <Form.ControlLabel>{label} </Form.ControlLabel>
                <Form.Control name={name} accepter={accepter} {...rest} />
            </Form.Group>
        );
    }
    return (
      <>
        <div className="section-body">
            <div className="login-page">
                <Container>
                    <Content>
                        <FlexboxGrid justify="center" align="middle" style={{ height: '100vh' }}>
                            <FlexboxGrid.Item>
                                <Panel header={<h3>Login <span>HR</span>Suite</h3>} bordered className="loginBox">
                                    <Form model={model}>
                                        <TextField name="email" label="Email:" />
                                        <TextField name="password" label="Password" type="password" autoComplete="off" />
                                        <ButtonToolbar>
                                            <Button appearance="primary" type="submit">
                                                Submit
                                            </Button>
                                            <Button appearance="link">Forgot password?</Button>
                                        </ButtonToolbar>
                                    </Form>
                                </Panel>
                            </FlexboxGrid.Item>
                        </FlexboxGrid>
                    </Content>
                </Container>
            </div>
        </div>
      </>
    )
}
export default Login;