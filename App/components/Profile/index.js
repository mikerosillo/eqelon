import React, { Component } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { Actions } from 'react-native-router-flux';
import { Collapse, CollapseHeader, CollapseBody, AccordionList } from 'accordion-collapse-react-native';
import { Thumbnail, List, ListItem, Separator, Footer, FooterTab } from 'native-base';
import * as Progress from 'react-native-progress';
import Icon from 'react-native-vector-icons/Ionicons';
var numeral = require('numeral');
import {
  StyleSheet,
  View,
  AsyncStorage,
  Alert,
  Text,
  ImageBackground,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
  DrawerLayoutAndroid,
  Modal,
} from 'react-native';
let realms;
export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      collapsed2: false,
      collapsed3: false,
      progress: 0.4,
      userId: '',
      serie: '',
      totalCost: '',
      capital: '',
      capital2: '',
      name: '',
      serieEqelonThree: false,
      userName: '',
      funds: [],
      whichSerie: [],
      serieName: '',
      serieDescription: '',
      capitalizacion: '',
      valorTotal: '',
      serieDocuments: [],
      serieinfo: [],
      opened: [],
      userFunds: [],
      userFundsId: [],
      userFundsOnly: '',
      IDUSER: '',
      seriesUsuario: [],
      seriesUsuario2: [],
      final: [],
      completion: '',
      userDocuments: [],
      fundDocuments: [],
      documentFundId: '',
      app_user_fund_id: '',
      home: false,
      estado: false,
      legales: false,
      contacto: false,
      notificaciones: false,
      nombre: [],
      modalConfirm2: false,
      incompleteDocuments: [],
      actualPayments: [],
      returnedPayments: [],
      appUserInfo: [],
    };
  };

  logout() {
    AsyncStorage.clear();
    Actions.welcome({
      type: 'reset',
    });
  };
  goToProfile() {
    Actions.profile()
  };
  goToEstado() {
    Actions.estado()
  };
  goToLegales() {
    Actions.legales()
  };
  goToContacto() {
    Actions.contacto()
  };
  goToNotificaciones() {
    Actions.notificaciones()
  };
  goToCarpetaLegal() {
    this.setState({ modalConfirm2: false })
    Actions.carpetaLegal({
      serieinfo: this.state.serieinfo,
      userFunds: this.state.userFunds
    })
  };
  setModalVisible2(visible) {
    this.setState({ modalConfirm2: visible })
  };
  goToSeriea(SERIEID) {
    Actions.seriea({
      serieinfo: this.state.serieinfo,
      userFunds: this.state.userFunds,
      completion: this.state.completion,
      userDocuments: this.state.userDocuments,
      fundDocuments: this.state.fundDocuments,
      SERIEID: SERIEID,
      projects: this.state.serieinfo.projects,
      documentFundId: this.state.documentFundId,
      app_user_fund_id: this.state
    });
  }
  goToMyInfoFromIndex() {
    Actions.myinfo({
      serieName: this.state.serieName,
      userFunds: this.state.userFunds,
      projectInfo: this.state.projectInfo,
      serieinfo: this.state.serieinfo,
      completion: this.state.completion,
      userDocuments: this.state.userDocuments,
      fundDocuments: this.state.fundDocuments,
      SERIEID: this.state.SERIEID,
      documentFundId: this.state.documentFundId,
      app_user_fund_id: this.state.app_user_fund_id,
    })
  }
  openDrawer() {
    this.drawer.openDrawer();
  };
  formatNumber(num) {
    numFor = numeral(num).format('$0,0.00');
    this.state.capital = numFor
    return this.state.capital
  };
  addToToRealm = (p) => {
    console.warn(p.length)
    realms = new Realm({
      schema: [{
        name: 'Payments12',
        properties:
        {
          actualPayments: {
            type: 'string?[]',

          },
        }
      }]
    });

    realms.write(() => {
      const fromRealm = realms.create('Payments12', {
        actualPayments: p,
      });
    })
  };
  getRealm = async () => {
    Realm.open({
      schema: [{
        name: 'Payments12',
        properties: {
          actualPayments: {
            type: 'string?[]',
          },
        }
      }]
    }).then(realm => {
      let result = realm.objects('Payments12');
      var lastObj = result[result.length - 1]
      let resValue = Object.values(lastObj);
      this.setState({ actualPayments: resValue[0] })
      console.warn('from realm', this.state.actualPayments.length)
    });
  };
  async called(sum, porcentageCompletado) {
    var n = porcentageCompletado.toFixed(2) * 100;
    const gotToken = await AsyncStorage.getItem('ACCESS_TOKEN');
    const gotClient = await AsyncStorage.getItem('CLIENT');
    const gotUid = await AsyncStorage.getItem('UID');
    if (gotToken && gotClient && gotUid && n == 100) {
      return fetch(`http://hq.eucledian.com:7270/funds/${sum}`, {
        method: 'GET',
        headers: {
          'access-token': gotToken,
          client: gotClient,
          uid: gotUid,
        },
      })
        .then((response) => {
          response
            .json()
            .then((data) => {
              let funds = data.fund
              this.state.seriesUsuario.push(funds)
              let opened = this.state.seriesUsuario.map(() => {
                return false;
              })
              this.setState({ opened: opened })
              let returnedPayments = this.state.returnedPayments
              // this.getRealm()
              // let actualPayments = this.state.actualPayments
              if (returnedPayments.length >= 1) {
                this.setModalVisible2(true)
              } else {
                console.warn('error in logic')
              }

            })
            .catch((error) => {
              Alert.alert(error.message);
            });
        })
    } else {
      return fetch(`http://hq.eucledian.com:7270/funds/${sum}`, {
        method: 'GET',
        headers: {
          'access-token': gotToken,
          client: gotClient,
          uid: gotUid,
        },
      })
        .then((response) => {
          response
            .json()
            .then((data) => {
              let name = data.fund.name
              this.state.nombre.push(name)
              let returnedPayments = this.state.returnedPayments
              // this.getRealm()
              // let actualPayments = this.state.actualPayments
              if (returnedPayments.length >= 1) {

                this.setModalVisible2(true)
              } else {
                console.warn('error in logic')
              }
              Alert.alert('Nesecita completar los documentos de la serie  ' + JSON.stringify(this.state.nombre[0]))
            })
            .catch((error) => {
              Alert.alert(error.message);
            });
        })
    }
  }
  async getUserFounds(userFunds) {
    var i = 0
    var userFundsOnly = userFunds.forEach(() => {
      var porcentageCompletado = userFunds[i].completion
      var sum = userFunds[i].fund_id
      this.setState({ ID: sum, porcentageCompletado: porcentageCompletado })
      this.called(sum, porcentageCompletado)
      i = i + 1
    })
  };
  async getUserSeries() {
    const gotToken = await AsyncStorage.getItem('ACCESS_TOKEN');
    const gotClient = await AsyncStorage.getItem('CLIENT');
    const gotUid = await AsyncStorage.getItem('UID');
    if (gotToken && gotClient && gotUid) {
      return fetch('http://hq.eucledian.com:7270/app_user_funds/', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'access-token': gotToken,
          client: gotClient,
          uid: gotUid,
        },
      })
        .then((response) => {
          response.json().then((data) => {
            console.warn('from getInfoUser data', data)
            let seriesDeUsuario = data.app_user_funds
            this.state.userFunds = seriesDeUsuario
            this.getUserFounds(this.state.userFunds)
            console.warn(this.state.userFunds)
          })

        }).catch((err) => {
          console.warn(err.message)
        })
    }

  };
  async getAppUsersInfo() {
    const gotToken = await AsyncStorage.getItem('ACCESS_TOKEN');
    const gotClient = await AsyncStorage.getItem('CLIENT');
    const gotUid = await AsyncStorage.getItem('UID');
    if (gotToken && gotClient && gotUid) {
      return fetch('http://hq.eucledian.com:7270/app_users/me', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'access-token': gotToken,
          client: gotClient,
          uid: gotUid,
        },
      })
        .then((response) => {
          response.json().then((data) => {
            this.setState({ returnedPayments: data.app_user.pending_return_payments })
          })
        }).catch((err) => {
          console.warn(err.message)
        })
    }

  };

  componentWillMount() {
    AsyncStorage.getItem('USER_ID').then((value) => {
      this.setState({ IDUSER: value })
    })
    AsyncStorage.getItem('USER_NAME').then((value) => {
      this.setState({ userName: value })
    })
    this.getAppUsersInfo()
    this.getUserSeries()
  };
  updateStateThenGoToSeriea(data) {
    this.state.app_user_fund_id = data.id
    let id = this.state.IDUSER
    let app_user_fund_id = this.state.app_user_fund_id
    let fundsDocuments = data.fund_documents
    this.state.fundDocuments = fundsDocuments
    let funds = data.app_user_funds
    var porcentage = funds.map((element) => {
      if (element.app_user_id == id) {
        let userDocuments = element.app_user_fund_documents
        let completion = element.completion
        this.state.completion = completion
        this.state.documentFundId = element.id
        this.state.userDocuments = element.app_user_fund_documents
        let documentFundId = this.state.documentFundId
        this.setState({ completion: element.completion, userDocuments: element.app_user_fund_documents, documentFundId: documentFundId, app_user_fund_id: app_user_fund_id })
      }
    })
    this.state.serieinfo = data
    let serieinfo = this.state.serieinfo
    this.setState({ serieinfo: serieinfo })
    this.goToSeriea(data.id)

  };
  llamarfuncion(opens) {
    if (opens == false) {
      return <Image
        style={{ width: 17, height: 17 }}
        resizeMode={'cover'}
        source={require('../../../assets/plus.png')}
      />

    } else {
      return <Image
        style={{ width: 17, height: 17 }}
        resizeMode={'contain'}
        source={require('../../../assets/less.png')}
      />
    }
  };
  getHeigthStyle(key) {
    var colors = ['#2F4D58', 'rgba(52, 52, 52, 0.6)'];
    var series = this.state.seriesUsuario
    if (series.length - 1 === key) {
      return {
        minHeight: 500,
        justifyContent: 'space-between',
        flexDirection: 'row', backgroundColor: colors[key % colors.length],
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30
      }
    } else {
      return {
        minHeight: 60,
        justifyContent: 'space-between',
        flexDirection: 'row', backgroundColor: colors[key % colors.length],
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        marginBottom: '-4%'
      }
    }
  };
  render() {
    var linkStyle;
    if (this.state.home) {
      linkStyle = { color: '#ed1212', cursor: 'pointer' }
    } else {
      linkStyle = { color: '#000' }
    }
    var seriesUsuario = this.state.seriesUsuario
    // console.warn(seriesUsuario)
    var open2 = this.state.collapsed2
    var open3 = this.state.collapsed3
    if (open2 == false) {
      var open2 = <Image style={{ width: 20, height: 20 }} resizeMode={'contain'} source={require('../../../assets/plus.png')} />
    } else {

      open2 = <Image style={{ width: 20, height: 20 }} resizeMode={'contain'} source={require('../../../assets/less.png')} />
    }
    if (open3 == false) {
      var open3 = <Image style={{ width: 20, height: 20 }} resizeMode={'contain'} source={require('../../../assets/plus.png')} />
    } else {
      open3 = <Image style={{ width: 20, height: 20 }} resizeMode={'contain'} source={require('../../../assets/less.png')} />
    }
    var menu = <Icon name='md-menu' color='#fff' size={40} style={{ borderRadius: 10 }} />
    var drawer = (
      <View style={{ flex: 1, backgroundColor: '#1a193d' }}>
        <Text style={{ color: '#FFF', marginTop: 30, fontSize: 25, }}></Text>
        <View style={{ flex: 1, justifyContent: 'flex-start', marginTop: 40 }}>
          <TouchableOpacity style={{ flexDirection: 'row' }} onPress={this.goToProfile}>
            <FontAwesome style={{ marginLeft: 20 }} name='home' color='#fff' size={20} />
            <Text style={{ color: '#FFF', marginLeft: 19, marginBottom: 25, fontFamily: 'OpenSans-Regular' }}> HOME </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ flexDirection: 'row' }} onPress={this.goToEstado}>
            <FontAwesome style={{ marginLeft: 20 }} name='dollar' color='#fff' size={20} />
            <Text style={{ color: '#FFF', marginLeft: 25, marginBottom: 25, fontFamily: 'OpenSans-Regular' }}> ESTADO DE CUENTA </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ flexDirection: 'row' }} onPress={this.goToLegales}>
            <FontAwesome style={{ marginLeft: 20 }} name='balance-scale' color='#fff' size={20} />
            <Text style={{ color: '#FFF', marginLeft: 10, marginBottom: 25, fontFamily: 'OpenSans-Regular' }}> LEGALES </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ flexDirection: 'row' }} onPress={this.goToContacto}>
            <MaterialIcons style={{ marginLeft: 20 }} name='contact-phone' color='#fff' size={20} />
            <Text style={{ color: '#FFF', marginLeft: 19, marginBottom: 25, fontFamily: 'OpenSans-Regular' }}> CONTACTO </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ flexDirection: 'row' }} onPress={this.goToNotificaciones}>
            <MaterialCommunityIcons style={{ marginLeft: 20 }} name='bell-ring' color='#fff' size={20} />
            <Text style={{ color: '#FFF', marginLeft: 19, marginBottom: 25, fontFamily: 'OpenSans-Regular' }}> NOTIFICACIONES </Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <TouchableOpacity onPress={this.logout}>
            <Text style={{ color: '#FFF', marginLeft: 20, marginBottom: 10, fontFamily: 'OpenSans-Bold' }}> CERRAR CESIÓN </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
    return (
      <DrawerLayoutAndroid renderNavigationView={() => drawer} drawerWidth={300}
        statusBarBackgroundColor='#1a193d' ref={_drawer => (this.drawer = _drawer)}>
        <ImageBackground
          style={styles.imgBackground}
          resizeMode="cover"
          source={require('../../../assets/BG_LEGALES_11.png')}
        >
          <View style={styles.imageRow}>
            {/* <TouchableOpacity onPress={this.goToProfile}>
                        <Entypo name='chevron-thin-left' color='#FFF' size={35} />
                    </TouchableOpacity> */}
            <Image
              style={styles.imageEqelon}
              resizeMode={'contain'}
              source={require('../../../assets/LOGO_EQELON.png')}
            />
            <TouchableOpacity onPress={this.openDrawer.bind(this)}>
              <Text>{menu}</Text>
            </TouchableOpacity>
          </View>
          <ScrollView style={{}}>
            <Modal
              animationType="slide"
              transparent={false}
              visible={this.state.modalConfirm2}
              onRequestClose={() => {
                this.setModalVisible2(!this.state.modalConfirm2);
              }}>
              <ImageBackground
                style={styles.imgBackground}
                resizeMode="cover"
                source={require('../../../assets/FONDO_14.png')}
              >
                <View style={{ flex: 1, alignItems: 'flex-start', width: '100%' }}>
                  <View style={{ width: '84%', alignItems: 'flex-start', marginLeft: 24, flexDirection: 'column' }}>
                    <Text style={{ color: '#FFF', fontFamily: 'OpenSans-Bold', marginTop: 30, fontSize: 20 }}>Pago relacionado :</Text>
                    <Text style={{ color: '#FFF', fontFamily: 'OpenSans-Bold', marginTop: 30, fontSize: 20 }}>Fecha :</Text>
                    <Text style={{ color: '#FFF', fontFamily: 'OpenSans-Bold', marginTop: 30, fontSize: 20 }}>Monto :</Text>
                    <Text style={{ color: '#FFF', fontFamily: 'OpenSans-Bold', marginTop: 30, fontSize: 20 }}>Serie :</Text>
                  </View>
                </View>
                <View style={{ flex: 1 }}>
                  <View style={{ marginTop: 30, alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => {
                      this.setState({ modalConfirm2: false })
                      // this.goToCarpetaLegal()
                    }} style={{ backgroundColor: '#FFF', width: 210, height: 35, alignItems: 'center', borderRadius: 5 }}>
                      <Text style={{ color: 'black', fontSize: 13, fontFamily: 'OpenSans-Bold', paddingTop: 10 }}>Firmar</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </ImageBackground>
            </Modal>
            <View style={styles.profileInfo}>
              <TouchableOpacity onPress={this.goToCarpetaLegal.bind(this)} style={{ width: '90%', alignItems: 'center' }}>
                <Text style={styles.TextStyle}>
                  {this.state.userName}
                  {"\n"}
                  <Text style={{ fontSize: 10, fontWeight: 'normal', marginTop: '5%', marginBottom: '5%' }}>
                    <AntDesign name='addfolder' color='#fff' size={20} />{'  '}
                    Agregar o Editar Documentos
                </Text>
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
              <Text style={{ fontFamily: 'OpenSans-Bold', color: '#FFF', marginLeft: '14%', fontSize: 15 }}>
                CARPETA LEGAL
              </Text>
              <Text style={{ fontFamily: 'OpenSans-Bold', color: '#FFF', marginRight: '13%', fontSize: 15 }}>
                40%
            {/* {this.state.progress + '0%'} */}
              </Text>
            </View>
            <View style={{ alignItems: 'center', marginBottom: 40, marginTop: 10 }}>
              <Progress.Bar
                fillStyle={{}}
                progress={this.state.progress}
                width={350}
                height={11.25}
                color={'rgb(195, 145, 55)'}
                borderWidth={0}
                unfilledColor={'#FFF'}
              />
            </View>
            {/* <View style={{ flex: 1, width: '100%', marginTop: '-5%', justifyContent: 'center' }}> */}
            <View style={{ marginBottom: 10 }}>
              <Text onPress={this.getRealm.bind(this)} style={{ fontFamily: 'OpenSans-Bold', marginLeft: '14%', color: '#FFF', fontSize: 20, marginBottom: 2 }}>
                SERIES
              </Text>
            </View>
            {/* <ScrollView style={{ flex: 1, backgroundColor: #1c414c '#2F4D58', borderTopLeftRadius: 30, borderTopRightRadius: 30 }}> */}
            <View style={{ width: '100%', backgroundColor: '#2F4D58', minHeight: 500, borderTopLeftRadius: 30, borderTopRightRadius: 30 }}>
              {seriesUsuario.map((data, key) => (


                <View style={this.getHeigthStyle(key)}>
                  <Collapse
                    // <TouchableOpacity key={key} minHeight: data[key != (data.length - 1) ? 90 : 500] onPress={this.saveJournalId.bind(this, data)}>
                    onToggle={(isCollapsed) => {
                      this.setState({ collapsed: isCollapsed })
                      var newOpened = this.state.opened
                      newOpened[key] = !newOpened[key]
                      console.warn(data)
                    }
                    }
                    // onToggle={this.setState({serieEqelonThree: true})}
                    style={{ width: '100%' }}>
                    <CollapseHeader style={{ justifyContent: 'space-between', flexDirection: 'row', width: '100%' }}>
                      <Text style={{ color: '#FFF', marginTop: 10, marginBottom: 10, fontFamily: 'OpenSans-Regular', fontSize: 18, marginLeft: '14%' }}>
                        {data.name}
                      </Text>
                      {/* <TouchableOpacity key={key} onPress={this.saveFundsId.bind(this, data)}> */}
                      <View key={key} style={{ color: '#FFF', marginTop: 10, marginBottom: 10, fontWeight: 'bold', marginRight: '14%' }}>
                        {this.llamarfuncion(this.state.opened[key])}
                      </View>
                      {/* </TouchableOpacity> */}
                    </CollapseHeader>
                    <CollapseBody style={{ alignItems: 'center', width: '100%' }}>
                      <View style={{ width: '83%', marginBottom: 10 }}>
                        <ListItem style={{ justifyContent: 'space-between' }}>
                          <Text style={{ flexDirection: 'row', color: '#FFF', fontFamily: 'OpenSans-Regular' }}>{'\u2022' + ' ' + "Capitalización Total"}</Text>
                          <Text style={{ color: '#FFF', fontFamily: 'OpenSans-Regular' }}>
                            {this.formatNumber(data.capital)}
                          </Text>
                        </ListItem>
                        <ListItem style={{ justifyContent: 'space-between' }}>
                          <Text style={{ flexDirection: 'row', color: '#FFF', fontFamily: 'OpenSans-Regular' }}>{'\u2022' + ' ' + "Participación"}</Text>
                          <Text style={{ color: '#FFF', fontFamily: 'OpenSans-Regular' }}>$000,000.00</Text>
                        </ListItem>
                        <ListItem style={{ justifyContent: 'space-between' }}>
                          <Text style={{ flexDirection: 'row', color: '#FFF', fontFamily: 'OpenSans-Regular' }}>{'\u2022' + ' ' + "Capital Comprometido"}</Text>
                          <Text style={{ color: '#FFF', fontFamily: 'OpenSans-Regular' }}>$000,000.00</Text>
                        </ListItem>
                        <ListItem style={{ justifyContent: 'space-between' }}>
                          <Text style={{ flexDirection: 'row', color: '#FFF', fontFamily: 'OpenSans-Regular' }}>{'\u2022' + ' ' + "Capital Invertido"}</Text>
                          <Text style={{ color: '#FFF', fontFamily: 'OpenSans-Regular' }}>$000,000.00</Text>
                        </ListItem>
                        <List style={{ flexDirection: 'row', justifyContent: 'space-between', width: '90%', marginLeft: '5%' }}>
                          <Text style={{ flexDirection: 'row', color: 'rgb(195, 145, 55)', marginTop: 8, fontFamily: 'OpenSans-Regular' }}>{'\u2022' + ' ' + "Siguiente Pago"}</Text>
                          <Text style={{ color: 'rgb(195, 145, 55)', fontFamily: 'OpenSans-Regular', marginTop: 8, marginRight: '1%' }}>$000,000.00</Text>
                        </List>
                        <List style={{ flexDirection: 'row', justifyContent: 'space-between', width: '90%', marginLeft: '5%' }}>
                          <Text style={{ color: '#FFF', marginTop: 5, marginLeft: 35, fontFamily: 'OpenSans-Regular' }}>{'\u2022' + ' ' + "Fecha"}</Text>
                          <Text style={{ color: '#FFF', fontFamily: 'OpenSans-Regular', marginTop: 5, marginRight: '1%' }}>20/05/2019</Text>
                        </List>
                        <List style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginBottom: 40 }}>
                          <TouchableOpacity key={key} onPress={this.updateStateThenGoToSeriea.bind(this, data)} >
                            <Text style={{ color: '#FFF', textAlign: 'center', fontFamily: 'OpenSans-Regular' }}>DETALLE DE LA SERIE</Text>
                          </TouchableOpacity>
                          <Text style={styles.line2}>
                          </Text>
                        </List>
                      </View>
                    </CollapseBody>
                  </Collapse>
                </View>
              ))}
            </View>
          </ScrollView>
          <Footer style={{ height: 30 }}>
            <FooterTab style={{ alignItems: 'center', justifyContent: 'flex-end', backgroundColor: '#000000', height: 30 }}>
              {/* <TouchableHighlight onPress={this.logout}>
                <Text style={{ color: 'rgb(195, 145, 55)', marginLeft: 20 }}> Logout </Text>
              </TouchableHighlight> */}
              <Text style={{ color: 'rgb(195, 145, 55)', fontWeight: '100', marginRight: 20 }}>
                WORLDSHAPERS{'  '}<Text style={{ color: 'rgb(195, 145, 55)', fontWeight: 'bold' }}>FUND</Text>
              </Text>
            </FooterTab>
          </Footer>
        </ImageBackground>
      </DrawerLayoutAndroid>
    );
  }
}
const styles = StyleSheet.create({
  imgBackground: {
    width: '100%',
    height: '100%',
    flex: 1,

  },
  toolbar: {
    backgroundColor: '#1a193d',
    height: 56
  },
  imageRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 0,
    alignItems: 'center'
  },
  imageEqelon: {
    width: Dimensions.get('window').width - 230,
    resizeMode: "contain",
    height: 70,
    marginLeft: '5%',
  },
  imageMenu: {
    width: Dimensions.get('window').width - 380,
    resizeMode: "contain",
    height: 70,
    marginRight: '5%',
  },
  profileInfo: {
    width: '100%',
    marginBottom: 20,
    //flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  bullet: {
    flexDirection: 'row',
    width: 10,
    color: '#FFF'
  },
  TextStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '90%',
    height: 60,
    backgroundColor: '#2F4D58',
    fontSize: 15,
    color: '#FFF',
    paddingLeft: '3%',
    borderRadius: 15,
    fontWeight: 'bold',
    paddingTop: 7,
    paddingLeft: 40
  },
  secondText: {
    fontWeight: 'normal',
  },
  line: {
    marginTop: '3%',
    backgroundColor: '#FFF',
    width: '90%',
    height: '6%',
    borderRadius: 30,
  },
  line2: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    width: '45%',
    height: '2%',
    borderRadius: 30,
    marginBottom: 10
  },
  buttonLogOut: {
    marginTop: 180,
    marginBottom: 10,
    justifyContent: 'center',
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    color: '#FFF',
  },
});
