
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
  Image,
  Picker
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
  Thumbnail,
  Form,
  Item
} from 'native-base'
import BarcodeScanner from 'react-native-barcodescanner'
import Lightbox from 'react-native-lightbox'
var user_list = [];
var user = null;

AsyncStorage.getItem('user_list', (err, result) => {
  if (result!=null) {
    user_list = JSON.parse(result)
  }
});


export default class Info extends React.Component {
  static navigationOptions = {
    title: 'Info',
  };
  constructor(props) {
    super(props);
    this.state = { 
      modalVisible: false,
      visible: false,
      selected1: "key0",
      producto: false,
      torchMode: 'off',
      cameraType: 'back',
      code: '',
      select_user:{
        username:'',
        email:'',
      }
    };
    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.pagar = this.pagar.bind(this)
  }
  openModal() {
    this.setState({modalVisible:true});
  }
  closeModal() {
    this.setState({modalVisible:false});
  }
  pagar() {
    if (this.state.selected1=='key1') {
      Alert.alert(
        'Compra Realizada',
        'Compra Realizada Retire Todos Sus Articulos En La Caja 6',
        [
          {text: 'Ok', onPress: () => this.closeModal(), style: 'cancel'},
        ],
        { cancelable: false }
      )
    } else {
      Alert.alert(
        'Compra Realizada',
        'Sera Eviada A Su Direccion En Las Proximas Horas',
        [
          {text: 'Ok', onPress: () => this.closeModal(), style: 'cancel'},
        ],
        { cancelable: false }
      )
    }
  }
  onValueChange(value: string) {
    this.setState({
      selected1: value
    });
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <Container>
        <Modal
          visible={this.state.modalVisible}
          animationType={'slide'}
          onRequestClose={() => this.closeModal()}
          >
          <Container>
            <Header>
              <Left>
                <Button transparent onPress={() => this.closeModal()}>
                  <Icon name='arrow-back' />
                </Button>
              </Left>
              <Body>
                <Title>{this.props.navigation.state.params.producto.nombre}</Title>
                <Text note>$ {this.props.navigation.state.params.producto.precio}</Text>
              </Body>
            </Header>
            <Content>
              <Form style={{width: '100%'}} >
                <Item>
                  <Text>
                    ¿Como quieres que entregemos tu producto?
                  </Text>
                </Item>
                { this.props.navigation.state.params.producto.id === 3 &&
                  <Picker
                    style={{width: '100%'}}
                    selectedValue={this.state.selected1}
                    onValueChange={(itemValue, itemIndex) => this.setState({selected1: itemValue})}>
                    <Picker.Item label="Entrega Directo En Tu Casa" value="key0" />
                  </Picker>
                }
                { this.props.navigation.state.params.producto.id === 5 &&
                  <Picker
                    style={{width: '100%'}}
                    selectedValue={this.state.selected1}
                    onValueChange={(itemValue, itemIndex) => this.setState({selected1: itemValue})}>
                    <Picker.Item label="Entrega Directo En Tu Casa" value="key0" />
                  </Picker>
                }
                { this.props.navigation.state.params.producto.id === 1 &&
                  <Picker
                    style={{width: '100%'}}
                    selectedValue={this.state.selected1}
                    onValueChange={(itemValue, itemIndex) => this.setState({selected1: itemValue})}>
                    <Picker.Item label="Entrega Directo En Tu Casa" value="key0" />
                    <Picker.Item label="Recoger Ahora En Caja" value="key1" />
                  </Picker>
                }
                { this.props.navigation.state.params.producto.id === 2 &&
                  <Picker
                    style={{width: '100%'}}
                    selectedValue={this.state.selected1}
                    onValueChange={(itemValue, itemIndex) => this.setState({selected1: itemValue})}>
                    <Picker.Item label="Entrega Directo En Tu Casa" value="key0" />
                    <Picker.Item label="Recoger Ahora En Caja" value="key1" />
                  </Picker>
                }
                { this.props.navigation.state.params.producto.id === 4 &&
                  <Picker
                    style={{width: '100%'}}
                    selectedValue={this.state.selected1}
                    onValueChange={(itemValue, itemIndex) => this.setState({selected1: itemValue})}>
                    <Picker.Item label="Entrega Directo En Tu Casa" value="key0" />
                    <Picker.Item label="Recoger Ahora En Caja" value="key1" />
                  </Picker>
                }
              </Form>
            </Content>
            <Footer>
              <FooterTab>
                <Button full onPress={this.pagar}>
                  <Text>Pagar</Text>
                </Button>
              </FooterTab>
            </Footer>
          </Container>

        </Modal>
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
          { this.props.navigation.state.params.producto &&
            <Tabs initialPage={0}>
              <Tab heading="General">
                <Card style={{flex: 0}}>
                  <CardItem>
                    <Left>
                      { this.props.navigation.state.params.producto.id === 1 &&
                        <Thumbnail source={require('../img/p1-1.jpg')} />
                      }
                      { this.props.navigation.state.params.producto.id === 2 &&
                        <Thumbnail source={require('../img/p2.jpg')} />
                      }
                      { this.props.navigation.state.params.producto.id === 3 &&
                        <Thumbnail source={require('../img/p3.jpg')} />
                      }
                      { this.props.navigation.state.params.producto.id === 4 &&
                        <Thumbnail source={require('../img/p4.jpg')} />
                      }
                      { this.props.navigation.state.params.producto.id === 5 &&
                        <Thumbnail source={require('../img/p5.jpg')} />
                      }

                      <Body>
                        <Text>{this.props.navigation.state.params.producto.nombre}</Text>
                        <Text note>$ {this.props.navigation.state.params.producto.precio}</Text>
                      </Body>
                    </Left>
                  </CardItem>
                  <CardItem>
                    <Body>
                      { this.props.navigation.state.params.producto.id === 1 &&
                        <Image source={require('../img/p1-1.jpg')} style={{height: 200, width: '100%', flex: 1}}/>
                      }
                      { this.props.navigation.state.params.producto.id === 2 &&
                        <Image source={require('../img/p2.jpg')} style={{height: 200, width: '100%', flex: 1}}/>
                      }
                      { this.props.navigation.state.params.producto.id === 3 &&
                        <Image source={require('../img/p3.jpg')} style={{height: 200, width: '100%', flex: 1}}/>
                      }
                      { this.props.navigation.state.params.producto.id === 4 &&
                        <Image source={require('../img/p4.jpg')} style={{height: 200, width: '100%', flex: 1}}/>
                      }
                      { this.props.navigation.state.params.producto.id === 5 &&
                        <Image source={require('../img/p5.jpg')} style={{height: 200, width: '100%', flex: 1}}/>
                      }
                    </Body>
                  </CardItem>
                  <CardItem>
                    <Left>
                      <Button transparent textStyle={{color: '#87838B'}}>
                        <Icon name="star" />
                      </Button>
                    </Left>
                  </CardItem>
                </Card>
              </Tab>
              <Tab heading="Detalles">
                <Card style={{flex: 0}}>
                  <CardItem>
                    <Left>
                      <Thumbnail source={require('../img/vendedor.jpeg')} />
                      <Body>
                        <Text>Augusto Gonzales</Text>
                        <Text note>Vendedor</Text>
                      </Body>
                    </Left>
                  </CardItem>
                </Card>
                <Card style={{flex: 0}}>
                  <CardItem>
                    <Body>
                      <Text>{this.props.navigation.state.params.producto.nombre}</Text>
                      <Text note>$ {this.props.navigation.state.params.producto.precio}</Text>
                    </Body>
                  </CardItem>
                  {
                    this.props.navigation.state.params.user.detalles[this.props.navigation.state.params.producto.id-1] &&
                    this.props.navigation.state.params.user.detalles[this.props.navigation.state.params.producto.id-1].map(
                      (detalle, index) => (
                        <CardItem key={'user_detalle'+index}>
                          <Left>
                            <Text>
                              {detalle.key}:
                            </Text>
                          </Left>
                          <Body>
                            { detalle.type === "str" &&
                              <Text>
                                {detalle.value}
                              </Text>
                            }
                            { detalle.type === "arrey" &&
                              detalle.value.map(
                                (value, index2) => (
                                  <Text key={'user_value'+index2}>
                                    {value}, 
                                  </Text>     
                                )
                              )
                            } 
                          </Body>
                        </CardItem>
                      )
                    )
                  }
                  {
                    this.props.navigation.state.params.producto.detalles &&
                    this.props.navigation.state.params.producto.detalles.map(
                      (detalle, index) => (
                        <CardItem key={'detalle'+index} style={{borderColor: detalle.key === "Nota" ? 'black' : 'white', borderWidth: 1,}}>
                          <Left>
                            <Text>
                              {detalle.key}:
                            </Text>
                          </Left>
                          <Body>
                            { detalle.type === "str" &&
                              <Text>
                                {detalle.value}
                              </Text>
                            }
                            { detalle.type === "arrey" &&
                              detalle.value.map(
                                (value, index2) => (
                                  <Text key={'value'+index2}>
                                    {value}, 
                                  </Text>     
                                )
                              )
                            } 
                          </Body>
                        </CardItem>
                      )
                    )
                  }
                </Card>
              </Tab>
            </Tabs>
          }
        </Content>
        <Footer>
          <FooterTab>
            { this.props.navigation.state.params.user.id === 3 &&
              <Button full>
                <Text>Registrate Para Comprar</Text>
              </Button>
            }
            { this.props.navigation.state.params.user.id !== 3 &&
              <Button full onPress={this.openModal} >
                <Text>Comprar</Text>
              </Button>
            }
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}