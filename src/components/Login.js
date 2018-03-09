
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  AsyncStorage
} from 'react-native';
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
  Text,
  Tab,
  Tabs,
  Card, 
  CardItem, 
  Thumbnail
} from 'native-base'
import styles from './../styles'

const users = [
  {
    "id": 1,
    "nombre": "Fredy Villegas Gomez",
    "detalles": [
    ]
  },
  {
    "id": 2,
    "nombre": "Monica",
    "detalles": [
      [{"key": "Nota", "type": "str", "value": "¿Zapatos Para Caballeros?"}],
      [{"key": "Nota", "type": "str", "value": "Parece Que No Tenemos Tallas 34, como acostumbras comprar"}],
    ]
  },
  {
    "id": 3,
    "nombre": "Monica",
    "detalles": [
      [{"key": "Nota", "type": "str", "value": "Deberias Reguistrarte Para Tener Una Mejor Esperiencia"}],
      [{"key": "Nota", "type": "str", "value": "Deberias Reguistrarte Para Tener Una Mejor Esperiencia"}],
    ]
  }
]

export default class Login extends React.Component {
  static navigationOptions = {
    headerMode: 'none'
  };
  constructor(props) {
    super(props);
    this.state = { 
      text: '',
      username: null, 
      password: null, 
      modalVisible: false,
    };
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={{width: '100%'}}
          onPress={() => navigate('Index', {user: users[0]})}
        >
          <Card style={{flex: 0}}>
            <CardItem>
              <Left>
                <Thumbnail source={require('../img/freddy.png')} />
                <Body>
                  <Text>Fredy Villegas Gomez</Text>
                </Body>
              </Left>
            </CardItem>
          </Card>
       </TouchableOpacity>
      </View>
    );
  }
}