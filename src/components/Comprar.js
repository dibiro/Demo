
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
    "nombre": "Casuales",
    "img": "../img/zapatoscasuales.jpg",
    "precio" : "150,000",
    "descripcion" : "Lorem ipsum in ut cillum duis fugiat consequat eu est adipisicing dolore elit laboris dolor duis excepteur ut aliqua ut labore ea quis velit dolore adipisicing ea cillum et ex nulla in est tempor in ut ea sunt sed.",
    "ventas": "546",
    "detalles": [
      {"key": "Tallas", "type": "arrey", "value": ["34", "36", "38", "42"]},
      {"key": "Marca", "type": "str", "value": "Dolce & Gabbana"},
      {"key": "Colores", "type": "arrey", "value": ["azul", "negro", "gris", "marron"]},
    ]
  },
  {
    "id": 2,
    "nombre": "Tacones",
    "img": "../img/zapatoscasuales.jpg",
    "precio" : "230,000",
    "descripcion" : "Lorem ipsum in ut cillum duis fugiat consequat eu est adipisicing dolore elit laboris dolor duis excepteur ut aliqua ut labore ea quis velit dolore adipisicing ea cillum et ex nulla in est tempor in ut ea sunt sed.",
    "ventas": "43",
    "detalles": [
      {"key": "Tallas", "type": "arrey", "value": ["36", "38"]},
      {"key": "Marca", "type": "str", "value": "Christian Louboutin"},
      {"key": "Colores", "type": "arrey", "value": ["azul", "negro", "gris", "marron"]},
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
              <Thumbnail source={require('../img/freddy.png')} />
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
              Porfavor Escanea Un Condigo, 
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