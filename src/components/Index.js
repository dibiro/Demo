
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
  Modal,
  Image
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
  Text,
  Tab,
  Tabs,
  Card, 
  CardItem, 
  Thumbnail
} from 'native-base'
import BarcodeScanner from 'react-native-barcodescanner'
import Lightbox from 'react-native-lightbox'

const productos = [
  {
    "id": 1,
    "nombre": "Camisa Local Atletico Nacional",
    "precio" : "150,000",
    "ventas": "546",
    "detalles": [
      {"key": "Tallas", "type": "str", "value": "S, M, XL"},
      {"key": "Marca", "type": "str", "value": "Adidas"},
      {"key": "Colores", "type": "str", "value": "Verde"},
    ]
  },
  {
    "id": 2,
    "nombre": "Camisa Colombia Visitante",
    "precio" : "230,000",
    "ventas": "43",
    "detalles": [
      {"key": "Tallas", "type": "str", "value": "S, M, L"},
      {"key": "Marca", "type": "str", "value": "Adidas"},
      {"key": "Colores", "type": "str", "value": "Rojo"},
    ]
  },
  {
    "id": 3,
    "nombre": "Camisa Inter Milan Local",
    "precio" : "220,000",
    "ventas": "43",
    "detalles": [
      {"key": "Tallas", "type": "str", "value": "M, L"},
      {"key": "Marca", "type": "str", "value": "Nike"},
      {"key": "Colores", "type": "str", "value": "Azul"},
    ]
  },
  {
    "id": 4,
    "nombre": "Camisa Colombia Local",
    "precio" : "180,000",
    "ventas": "43",
    "detalles": [
      {"key": "Tallas", "type": "str", "value": "M, L"},
      {"key": "Marca", "type": "str", "value": "Adidas"},
      {"key": "Colores", "type": "str", "value": "Amarilla"},
    ]
  },
  {
    "id": 5,
    "nombre": "Camisa Real Madrid",
    "precio" : "180,000",
    "ventas": "43",
    "detalles": [
      {"key": "Tallas", "type": "str", "value": "M, L"},
      {"key": "Marca", "type": "str", "value": "Adidas"},
      {"key": "Colores", "type": "str", "value": "Blanco"},
    ]
  }
]

var escaniando = false;

export default class Index extends React.Component {
  static navigationOptions = {
    title: 'Home',
  };
  constructor(props) {
    super(props);
    this.state = { 
      visible: false,
      producto: false,
      torchMode: 'off',
      cameraType: 'back',
      code: '',
      select_user:{
        username:'',
        email:'',
      }
    };
    this.barcodeReceived = this.barcodeReceived.bind(this)
    this.ver = this.ver.bind(this)
  }
  componentWillMount () {
    this.setState({code: ''})
  }
  barcodeReceived (e) {
    if (e.data !== this.state.code) {
      this.setState({code: e.data})
      const this2 = this
      const { navigate } = this.props.navigation
      const { user } = this.props.navigation.state.params
      productos.map(function(producto) {
        if (e.data == producto.id) {
          navigate('Info', {producto: producto, user: user})
          this2.setState({producto: producto})
        }
      })
    }
  }
  ver () {
    const { navigate } = this.props.navigation
    const { user } = this.props.navigation.state.params
    navigate('Info', {producto: this.state.producto, user: user})
  }
  Scanner = () => {
    return (
      <BarcodeScanner
        onBarCodeRead={this.barcodeReceived}
        style={{ flex: 1, }}
        torchMode='off'
        height={500}
        width='100%'
        cameraType={this.state.cameraType}
      />
    )
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>{this.props.navigation.state.params.user.nombre}</Title>
          </Body>
          <Right>
            { this.props.navigation.state.params.user.id === 1 &&
              <Thumbnail source={require('../img/user.jpeg')} />
            }
            { this.props.navigation.state.params.user.id === 2 &&
              <Thumbnail source={require('../img/monica.jpg')} />
            }
            { this.props.navigation.state.params.user.id === 3 &&
              <Thumbnail source={require('../img/invitado.png')} />
            }
          </Right>
        </Header>
        <Content>
          <this.Scanner />
          { !this.state.producto &&
            <Text>
              Bienvenido, Escanea El Producto Que Te Gusto 
            </Text>
          }
          { this.state.producto &&
            <Button block onPress={this.ver} >
              <Title>
                Volver a ver {this.state.producto.nombre} 
              </Title>
            </Button>
          }
        </Content>
      </Container>
    );
  }
}