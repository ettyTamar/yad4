import React, { Component } from 'react';
import { Content, Form, Item, Input, Label, Button , Text } from 'native-base';

export default class Login extends Component {
  render() {
    return (
        <Content>
        <Form>
          <Item floatingLabel>
            <Label>Username</Label>
            <Input />
          </Item>
          <Item floatingLabel last>
            <Label>Password</Label>
            <Input />
          </Item>
          <Button>
            <Text>Login</Text>
          </Button>
          <Button>
            <Text>Guest</Text>
          </Button>
        </Form>
        <Button>
            <Text>Register</Text>
          </Button>
      </Content>
    );
  }
}
