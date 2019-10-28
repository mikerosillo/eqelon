import React, { Component } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Actions } from 'react-native-router-flux';
import { Collapse, CollapseHeader, CollapseBody, AccordionList } from 'accordion-collapse-react-native';
import { Thumbnail, List, ListItem, Separator, Footer, FooterTab } from 'native-base';
import * as Progress from 'react-native-progress';
import Drawer from 'react-native-drawer';
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
    Button,
    DrawerLayoutAndroid,
    ToolbarAndroid,
    StatusBar
} from 'react-native';
import { max } from 'moment';
var rendered = []
export default class CarpetaLegal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
            collapsed2: false,
            collapsed3: false,
            collapsed4: false,
            userFunds: [],
            userVehicles: [],
            opened: [],
            USERID: '',
        };
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
    logout() {
        AsyncStorage.clear();
        Actions.welcome({
            type: 'reset',
        });
    };
    goBack() {
        Actions.profile({
            userFunds: this.state.userFunds
        })
    };
    goToFirma() {
        Actions.firma({
            userFunds: this.state.userFunds
        })
    };
    goToVehicleDetail(data) {
        // console.warn('from router' + JSON.stringify(data))
        Actions.vehicleDetail({
            vehicleData: data,
            userFunds: this.state.userFunds
        })
    };
    goToNuevoVehicle() {
        Actions.nuevoVehicle({
            userFunds: this.state.userFunds
        })
    };
    openDrawer() {
        this.drawer.openDrawer();
    };
    async getUserVehicles() {
        const gotToken = await AsyncStorage.getItem('ACCESS_TOKEN');
        const gotClient = await AsyncStorage.getItem('CLIENT');
        const gotUid = await AsyncStorage.getItem('UID');

        if (gotToken && gotClient && gotUid) {
            // console.warn(gotToken, gotClient, gotUid)
            return fetch(`http://hq.eucledian.com:7270/app_users/${this.state.USERID}`, {
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
                            let vehicles = data.app_user.vehicles
                            // let vehicleDocuments = data.app_user.vehicle_documents
                            // console.warn(vehicles)
                            this.setState({ userVehicles: vehicles })
                            let opened = this.state.userVehicles.map(() => {
                                return false;
                            })
                            this.setState({ opened: opened })
                        })

                        .catch((error) => {
                            Alert.alert(error.message);
                        });
                })
                .catch((error) => {
                    console.warn(error.message);
                });
        }

    };
    componentWillMount() {
        this.state.userFunds = this.props.userFunds
        AsyncStorage.getItem('USER_ID').then((value) => {
            this.setState({ USERID: value })
            // console.warn(this.state.USERID)
        }).catch((err) => {
            console.warn(err.message)
        }).then(() => {
            this.getUserVehicles()
        }).catch((err) => {
            console.warn(err.message)
        })
    };
    llamarfuncion(opens) {
        if (opens == false) {
            return <Image
                style={{ width: 17, height: 17 }}
                resizeMode={'cover'}
                source={require('../../../assets/plus.png')}
            />

        } else {
            // this.getInfoSerie1()
            return <Image
                style={{ width: 17, height: 17 }}
                resizeMode={'contain'}
                source={require('../../../assets/less.png')}
            />
        }
    };
    check(documents, type) {
        // console.warn(documents)
        var containsDocType = documents.some((element) => {
            return element.document_type == type && element.status == 1
        })
        if (containsDocType) {
            return <AntDesign name='check' color='green' size={18} />
        }
        return <Entypo name='cross' color='red' size={18} />
    };
    render() {
        var userVehicles = this.state.userVehicles
        var colors = ['#2F4D58', 'rgba(52, 52, 52, 0.6)'];
        var menu = <Icon name='md-menu' color='#fff' size={40} />
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
                    source={require('../../../assets/FONDO_14.png')}
                >
                    <View style={styles.imageRow}>
                        <TouchableOpacity onPress={this.goBack.bind(this)}>
                            <Entypo name='chevron-thin-left' color='#FFF' size={30} />
                        </TouchableOpacity>
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
                        <View style={{ marginLeft: 30, marginTop: 10 }} >
                            <Text style={{ color: '#FFF', fontSize: 20, fontWeight: '900' }}>
                                Carpeta Legal
                        </Text>
                        </View>
                        <View style={{ alignItems: 'center', marginTop: 10 }}>
                            <View style={{ width: '86%' }}>
                                <TouchableOpacity onPress={this.goToFirma.bind(this)} style={{
                                    flexDirection: 'row',
                                    backgroundColor: 'rgb(195, 145, 55)',
                                    height: 50,
                                    width: '100%',
                                    borderRadius: 15,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                    <Text style={{ color: '#FFF', fontFamily: 'OpenSans-Bold', fontSize: 20, marginLeft: '6%', }}>
                                        Mi firma
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '87%' }}>
                            <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }} onPress={this.goToNuevoVehicle.bind(this)}>
                                <Text style={{ color: '#FFF', fontFamily: 'OpenSans-Bold', marginLeft: 30, marginTop: 20, fontSize: 18 }}>
                                    Vehículos de Inversión
                            </Text>
                                <Entypo name='plus' color='#FFF' size={25} style={{ marginTop: 20 }} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ width: '100%', backgroundColor: '#2F4D58', minHeight: 500, borderTopLeftRadius: 30, borderTopRightRadius: 30, marginTop: 10 }}>
                            {userVehicles.map((data, key) => (
                                <View style={{ justifyContent: 'space-between', flexDirection: 'row', backgroundColor: colors[key % colors.length], borderTopLeftRadius: 30, borderTopRightRadius: 30, minHeight: 90, marginBottom: '-10%' }}>
                                    <Collapse
                                        // <TouchableOpacity key={key} onPress={this.saveJournalId.bind(this, data)}>
                                        onToggle={(isCollapsed) => {
                                            this.setState({ collapsed: isCollapsed })
                                            var newOpened = this.state.opened
                                            newOpened[key] = !newOpened[key]
                                        }
                                        }
                                        // onToggle={this.setState({serieEqelonThree: true})}
                                        style={{ width: '100%' }}>
                                        <CollapseHeader style={{ justifyContent: 'space-between', flexDirection: 'row', width: '100%' }}>
                                            <Text style={{ color: '#FFF', marginTop: 10, marginBottom: 10, fontFamily: 'OpenSans-Regular', fontSize: 16, marginLeft: 30 }}>
                                                {data.name}
                                            </Text>
                                            {/* <TouchableOpacity key={key} onPress={this.saveFundsId.bind(this, data)}> */}
                                            <Text key={key} style={{ color: '#FFF', marginTop: 10, marginBottom: 10, fontWeight: 'bold', marginRight: '14%' }}>
                                                {this.llamarfuncion(this.state.opened[key])}
                                            </Text>
                                            {/* </TouchableOpacity> */}
                                        </CollapseHeader>
                                        <CollapseBody style={{ alignItems: 'center', width: '100%' }}>
                                            <View style={{ width: '83%', marginBottom: 10 }}>
                                                <View style={{ fontFamily: 'OpenSans-Regular' }}>
                                                    <ListItem style={{ justifyContent: 'space-between' }}>
                                                        <Text style={{ flexDirection: 'row', color: '#FFF', fontFamily: 'OpenSans-Regular' }}>{'\u2022' + ' ' + "Titulo de Propiedad"}</Text>
                                                        <Text style={{ color: '#FFF', fontWeight: '100' }}>{this.check(data.vehicle_documents, 0)}</Text>
                                                    </ListItem>
                                                    <ListItem style={{ justifyContent: 'space-between' }}>
                                                        <Text style={{ flexDirection: 'row', color: '#FFF', fontFamily: 'OpenSans-Regular' }}>{'\u2022' + ' ' + "Datos Bancarios"}</Text>
                                                        <Text style={{ color: '#FFF', fontWeight: '100' }}>{this.check(data.vehicle_documents, 1)}</Text>
                                                    </ListItem>
                                                    <ListItem style={{ justifyContent: 'space-between' }}>
                                                        <Text style={{ flexDirection: 'row', color: '#FFF', fontFamily: 'OpenSans-Regular' }}>{'\u2022' + ' ' + "ID Socios"}</Text>
                                                        <Text style={{ color: '#FFF', fontWeight: '100' }}>{this.check(data.vehicle_documents, 2)}</Text>
                                                    </ListItem>
                                                    <ListItem style={{ justifyContent: 'space-between' }}>
                                                        <Text style={{ flexDirection: 'row', color: '#FFF', fontFamily: 'OpenSans-Regular' }}>{'\u2022' + ' ' + "Tax ID"}</Text>
                                                        <Text style={{ color: '#FFF', fontFamily: 'OpenSans-Bold' }}>{this.check(data.vehicle_documents, 3)}</Text>
                                                    </ListItem>
                                                    <ListItem style={{ justifyContent: 'space-between' }}>
                                                        <Text style={{ flexDirection: 'row', color: '#FFF', fontFamily: 'OpenSans-Regular' }}>{'\u2022' + ' Waiver'}</Text>
                                                        <Text style={{ color: '#FFF', fontFamily: 'OpenSans-Bold' }}>{this.check(data.vehicle_documents, 4)}</Text>
                                                    </ListItem>
                                                    <List style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                                        <TouchableOpacity onPress={this.goToVehicleDetail.bind(this, data)}  >
                                                            <Text style={{ marginTop: 20, fontZise: 18, color: '#FFF', textAlign: 'center', fontFamily: 'OpenSans-Regular' }}>VER DETALLE DE VEHÍCULO</Text>
                                                        </TouchableOpacity>
                                                        <Text style={styles.line2}>
                                                        </Text>
                                                    </List>
                                                </View>
                                            </View>
                                        </CollapseBody>
                                    </Collapse>
                                </View>
                            ))}
                        </View>
                    </ScrollView>
                    <Footer style={{ height: 30 }}>
                        <FooterTab style={{ alignItems: 'center', justifyContent: 'flex-end', backgroundColor: '#000000', height: 30 }}>
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
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    bullet: {
        flexDirection: 'row',
        width: 10,
        color: '#FFF'
    },
    TextStyle: {
        flexDirection: 'column',
        textAlign: 'center',
        width: '90%',
        height: 60,
        backgroundColor: 'rgb(195, 145, 55)',
        fontSize: 15,
        color: '#FFF',
        borderRadius: 15,
        fontWeight: '100',
    },
    secondText: {
        fontWeight: 'normal',
    },
    line2: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFF',
        width: '55%',
        height: '2%',
        borderRadius: 30,
        marginBottom: 50
    },
    line: {
        marginTop: '3%',
        backgroundColor: '#FFF',
        width: '90%',
        height: '6%',
        borderRadius: 30,
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
