import React from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Content,
  ButtonToolbar,
  Button,
  Panel,
  FlexboxGrid
} from 'rsuite';
import { Form, Schema } from 'rsuite';
import PasswordField from '../../components/form-fields/passwordField';
import ButtonForm from '../../components/form-fields/buttonForm';

const ResetPassword = (props) => {

  const styles={
    marginBottom:4,
    display:'flex  ',
  }
  return (
    <>
      <div className='section-body'>
        <div className='login-page'>
          <Container>
            <Content>
              <FlexboxGrid justify="center" align="middle" style={{ height: '100vh' }}>
                <FlexboxGrid.Item>
                  <Panel header={<h3>Reset Password</h3>} bordered className="loginBox">
                    <Form>
                      <Form.Group>
                        <label inside style={styles}>Enter Password:</label>
                        <PasswordField />
                      </Form.Group>
                      <Form.Group>
                        <label inside style={styles}>Re-enter Password:</label>
                        <PasswordField />
                      </Form.Group>
                      <ButtonToolbar>
                        <ButtonForm label="Submit"/>
                        <Link to='/login'><Button appearance="link" href="/resetpassword">Back to Login</Button></Link>
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

export default ResetPassword;
