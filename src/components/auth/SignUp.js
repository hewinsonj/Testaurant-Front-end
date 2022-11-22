import React, { useState, Component } from 'react'
import { useNavigate } from 'react-router-dom'
import { signUp, signIn } from '../../api/auth'
import messages from '../shared/AutoDismissAlert/messages'
import { Grid, Segment, Feed, Icon, Button, Divider, Form, Container, Input, Message, Select } from 'semantic-ui-react'


const options = [
  { key: 'g', text: 'General', value: 'general' },
  { key: 'a', text: 'Admin', value: 'admin' }
]

const SignUp = (props) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [username, setUsername] = useState('')

  const navigate = useNavigate()

  const onSignUp = (event) => {
  event.preventDefault()

  const { msgAlert, setUser } = props

      const credentials = {email, username, password, passwordConfirmation}

  signUp(credentials)
    .then(() => signIn(credentials))
    .then((res) => setUser(res.data.user))
    .then(() =>
      msgAlert({
        heading: 'Sign Up Success',
        message: messages.signUpSuccess,
        variant: 'success',
      })
    )
    .then(() => navigate('/user-page'))
    .catch((error) => {
              setEmail('')
              setUsername('')
              setPassword('')
              setPasswordConfirmation('')
      msgAlert({
        heading: 'Sign Up Failed with error: ' + error.message,
        message: messages.signUpFailure,
        variant: 'danger',
      })
    })
}


return (

 
      
      <Segment  
          padded='very'  
          inverted color='yellow' 
          verticalAlign='middle' 
          id="segment"
      >
          <h3>Sign Up</h3>
          <Form  onSubmit= {onSignUp}>
            
              <Grid columns={2}>
                <Grid.Column>
                  <Form.Field>
                  <Form.Input 
                      fluid
                      required
                      type='first_name'
                      name='first_name'
                      value={email}
                      placeholder='Enter your first name'
                      onChange={e => setEmail(e.target.value)}

                  />
              
              < br/>

                  <Form.Input 
                      fluid
                      required
                      type='last_name'
                      name='last_name'
                      value={username}
                      placeholder='Enter your last name'
                      onChange={e => setUsername(e.target.value)}

                  />
          
              <br />
           
                  <Form.Input 
                      fluid
                      icon='lock'
                      iconPosition='left'
                      required
                      name='password'
                      value={password}
                      type='password'
                      placeholder='Password'
                      onChange={e => setPassword(e.target.value)}

                  />
            
              <br />
             
                  <Form.Input
                      fluid 
                      icon='check' 
                      iconPosition='left' 
                      placeholder='Confirm Password'
                      required
                      name='passwordConfirmation'
                      value={passwordConfirmation}
                      type='password'
                      onChange={e => setPasswordConfirmation(e.target.value)}
                     
                  />
                  </Form.Field>
                  </Grid.Column>
                  <Grid.Column>
                  <Form.Field>
                  <Form.Input 
                      fluid
                      required
                      type='email'
                      name='email'
                      value={username}
                      placeholder='Enter your email'
                      onChange={e => setUsername(e.target.value)}
                  />
          
              <br />
           
                  <Form.Select 
                      fluid
                      required
                      name='access'
                      value={password}
                      type='select'
                      placeholder='Select Access Level'
                      onChange={e => setPassword(e.target.value)}
                      options={options}

                  />
            
              <br />
             
                  <Form.Input
                      fluid 
                      placeholder='Enter your admin code'
                      required
                      name='admin_code'
                      value={passwordConfirmation}
                      type='text'
                      onChange={e => setPasswordConfirmation(e.target.value)}
                     
                  />
                  </Form.Field>
                  </Grid.Column> 
                  </Grid>
             
              <br />
              <Form.Button 
                   secondary 
                   inverted 
                   color='yellow'
                  class="signButton" 
                  type='submit'
                  centered
                  textAlign='center'
                  verticalAlign='middle'
              >
                  Submit
              </Form.Button>

          </Form>
      </Segment>
)

}

export default SignUp