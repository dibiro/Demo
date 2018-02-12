
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  AsyncStorage,
  Alert,
  Modal
} from 'react-native'
import styles from './../styles'
import {
  Container, 
  Header, 
  Title, 
  Content, 
  Footer, 
  FooterTab, 
  Button, 
  Left, 
  Right, 
  Body, 
  Icon, 
  Text
} from 'native-base'


var user_list = [];
var user = null;

AsyncStorage.getItem('user_list', (err, result) => {
  if (result!=null) {
    user_list = JSON.parse(result)
  }
});

AsyncStorage.getItem('user', (err, result) => {
  if (result!=null) {
    user = JSON.parse(result)
  }
});

export default class Index extends React.Component {
  static navigationOptions = {
    title: 'Home',
  };
  constructor(props) {
    super(props);
    this.state = { 
      visible: false,
      select_user:{
        username:'',
        email:'',
      }
    };

    this.user_select = this.user_select.bind(this)
    this.user_edict = this.user_edict.bind(this)
    this.cange_email = this.cange_email.bind(this)
  }
  cange_email(text){
    user = this.state.select_user
    user.email = text
    this.setState({ select_user: user })
  }
  user_select(user){
    this.setState({ select_user: user, visible: true })
  }
  user_edict(){
    for(var i = 0; i < user_list.length; i++) {
      if (user_list[i].username== this.state.select_user.username) {
        user_list[i].email = this.state.select_user.email
        this.setState({visible: false })
        AsyncStorage.setItem('user_list', JSON.stringify(user_list))
      }
    }
  }
  componentDidMount() {
   var intervalId = setInterval(this.get_user_list, 1000);
   // store intervalId in the state so it can be accessed later:
   this.setState({intervalId: intervalId});
  }
  componentWillUnmount() {
     // use intervalId from the state to clear the interval
     clearInterval(this.state.intervalId);
  }
  get_user_list() {
    AsyncStorage.getItem('user_list', (err, result) => {
      if (result!=null) {
        user_list = JSON.parse(result)
      }
    });
  }
  user_delete(user){
    for(var i = 0; i < user_list.length; i++) {
      if (user_list[i].username==user.username) {
        user_list.splice(i, 1);
        AsyncStorage.setItem('user_list', JSON.stringify(user_list))
      }
    }
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent>
              <Icon name='menu' />
            </Button>
          </Left>
          <Body>
            <Title>Home</Title>
          </Body>
          <Right />
        </Header>
        <Content>
        </Content>
        <Footer>
          <FooterTab>
            <Button full>
              <Text>Footer</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}