import React, { Component } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { Actions } from 'react-native-router-flux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Collapse, CollapseHeader, CollapseBody, AccordionList } from 'accordion-collapse-react-native';
import { Thumbnail, List, ListItem, Separator, Footer, FooterTab } from 'native-base';
import * as Progress from 'react-native-progress';
import Drawer from 'react-native-drawer';
import Icon from 'react-native-vector-icons/Ionicons';
import SignatureCapture from 'react-native-signature-capture';
import Signature from 'react-native-signature-canvas';
import Realm from 'realm';
import {
    StyleSheet,
    View,
    AsyncStorage,
    Alert,
    TextInput,
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
var numeral = require('numeral');

let realms;

export default class Firma extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userFunds: [],
            nombreDelVehiculo: '',
            signature: '',
            userName: '',
        };
    }
    openDrawer() {
        this.drawer.openDrawer();
    }

    clear = async () => {
        AsyncStorage.clear();
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
    goToMyInfo() {
        Actions.myinfo({
            userFunds: this.state.userFunds,
            projectInfo: this.state.projectInfo,
            serieinfo: this.state.serieinfo
        })
    };
    getImage() {
        console.warn('called')
        this.addSignature()
    };
    _onSaveEvent(result) {
        let sign = result.encoded
        Alert.alert(sign)
        //result.encoded - for the base64 encoded png
        //result.pathName - for the file path name
        AsyncStorage.setItem('SIGNATURE', sign).then(() => {

            this.addSignature.bind(this)

        })
    };

    _onDragEvent() {
        // This callback will be called when the user enters signature
        console.warn("dragged");
    };

    goToCarpetaLegal() {
        Actions.carpetaLegal({ userFunds: this.state.userFunds })
    };
    goToCarpetaLegalAfterSignature() {
        Alert.alert('Firma Creada Exitosamente')
        Actions.carpetaLegal({ userFunds: this.state.userFunds })
    }
    handleSignature = signature => {
        this.setState({ signature });
    };
    addSignature = async () => {
        console.warn('called')
        const gotToken = await AsyncStorage.getItem('ACCESS_TOKEN');
        const gotClient = await AsyncStorage.getItem('CLIENT');
        const gotUid = await AsyncStorage.getItem('UID');
        if (gotClient && gotToken && gotUid) {
            console.warn(this.state.signature)
            return await fetch('http://hq.eucledian.com:7270/app_users/me', {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'access-token': gotToken,
                    client: gotClient,
                    uid: gotUid,
                },
                body: JSON.stringify({
                    app_user: {
                        signature: `data:image/png;base64,${this.state.signature}`
                    }
                }),
            })
                .then((response) => {
                    if (response.ok) {

                        this.goToCarpetaLegalAfterSignature()


                    }

                })
                .catch(err => console.warn(err.message));
        } else {
            console.warn('nedd credentials')
        }
    };
    componentWillMount() {
        this.state.userFunds = this.props.userFunds
        AsyncStorage.getItem('USER_NAME').then((value) => {
            this.setState({ userName: value })
            // this.getUserFounds(this.state.userFunds)
        })
    };
    render() {
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
                    source={require('../../../assets/fondoFirma.png')}
                >
                    <View style={styles.imageRow}>
                        <TouchableOpacity onPress={this.goToCarpetaLegal.bind(this)}>
                            <Entypo name='chevron-thin-left' color='#FFF' size={35} />
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
                    <View style={{ flexDirection: 'row', alignItems: "flex-start", marginTop: 30, marginBottom: 10 }}>
                        <Text style={{ color: 'rgb(195, 145, 55)', marginLeft: 30, fontSize: 20, fontFamily: 'OpenSans-Bold' }}>{this.state.userName} </Text>
                        {/* <Text style={{ color: 'rgb(195, 145, 55)', fontSize: 20, fontFamily: 'OpenSans-Regular' }}>NAME </Text> */}
                    </View>
                    <View style={{ alignItems: "flex-start", marginTop: 0, marginBottom: 20 }}>
                        <Text style={{ color: '#FFF', marginLeft: 30, fontSize: 18, fontFamily: 'OpenSans-Regular' }}>Firma electrónica </Text>
                        <Text style={{ color: '#FFF', marginLeft: 30, fontSize: 15, marginTop: 10, textAlign: 'justify', fontFamily: 'OpenSans-Regular' }}>Asegurate que tu firma sea lo más similar posible
                        ala de tu identificación oficial ya que sera usada para fines legales en todos tus documentos. </Text>
                    </View>
                    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>

                        <SignatureCapture
                            style={[{ height: 300, alignItems: "center", justifyContent: "center" }, styles.signature]}
                            ref="sign"
                            onSaveEvent={(result) => {
                                this.state.signature = result.encoded
                                this.addSignature()
                            }
                            }
                            onDragEvent={this._onDragEvent}
                            saveImageFileInExtStorage={false}
                            showNativeButtons={true}
                            showTitleLabel={true}
                            viewMode={"portrait"} />
                    </View>
                    <Footer style={{ height: 50 }}>
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
    },
    TextStyle: {
        flexDirection: 'row',
        alignItems: 'between',
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
    preview: {
        width: 335,
        height: 114,
        backgroundColor: "#F8F8F8",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 15
    },
    previewText: {
        color: "#FFF",
        fontSize: 14,
        height: 40,
        lineHeight: 40,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: "rgba(255, 255, 255, 0)",
        width: 120,
        textAlign: "center",
        marginTop: 10
    },
    signature: {
        // backgroundColor: 'rgba(255, 255, 255, 0)',

        // color: 'red',
        height: 300,
        borderColor: '#000033',
        borderWidth: 1,
        width: '85%'
    },
    buttonStyle: {
        flex: 1, justifyContent: "center", alignItems: "center", height: 50,
        backgroundColor: "#eeeeee",
        margin: 10
    },
    input: {
        marginLeft: 30,
        padding: 4,
        fontSize: 15,
        backgroundColor: 'rgba(255,255, 255, 0.6)',
        height: 30,
        width: '75%',
        marginTop: 5,
        justifyContent: 'center',
    },
    imageRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginBottom: 0
    },
    imageEqelon: {
        width: Dimensions.get('window').width - 230,
        resizeMode: "contain",
        height: 70,
        marginRight: 40
    },
    imageMenu: {
        width: Dimensions.get('window').width - 380,
        resizeMode: "contain",
        height: 70,
    },
    imageBack: {
        width: Dimensions.get('window').width - 350,
        resizeMode: "contain",
        height: 180,
        marginRight: '5%',
    },
    profileInfo: {
        flexDirection: 'row',
        width: '100%',
        marginTop: 0,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginLeft: 25
    },
    TextStyle: {
        flexDirection: 'row',
        width: '90%',
        height: 60,
        backgroundColor: '#2F4D58',
        fontSize: 15,
        color: '#FFF',
        paddingLeft: '6%',
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
        height: '2%',
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
