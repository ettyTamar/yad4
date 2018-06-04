import React, { Component } from 'react';
import { Content, Form, Item, Input, Label, Button, Text } from "native-base";

export default class componentName extends Component {
  render() {
    return <Content>
        <Form>
          <Item floatingLabel>
            <Label>Email</Label>
            <Input />
          </Item>
          <Item floatingLabel>
            <Label>Username</Label>
            <Input />
          </Item>
          <Item floatingLabel last>
            <Label>Password</Label>
            <Input />
          </Item>
          <Button>
            <Text>Register</Text>
          </Button>
        </Form>
        <Button>
          <Text>Back</Text>
        </Button>
      </Content>;
  }
}
