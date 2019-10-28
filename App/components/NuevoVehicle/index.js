import React, { Component } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { Actions } from 'react-native-router-flux';
import { Collapse, CollapseHeader, CollapseBody, AccordionList } from 'accordion-collapse-react-native';
import { Thumbnail, List, ListItem, Separator, Footer, FooterTab } from 'native-base';
import * as Progress from 'react-native-progress';
import Drawer from 'react-native-drawer';
import Icon from 'react-native-vector-icons/Ionicons';
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

export default class NuevoVehicle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userFunds: [],
            nombreDelVehiculo: '',
            userName: '',
            vehicle: '',
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
    }
    goToMyInfo() {
        Actions.myinfo({
            userFunds: this.state.userFunds,
            projectInfo: this.state.projectInfo,
            serieinfo: this.state.serieinfo
        })
    }
    goToCarpetaLegal() {
        Actions.carpetaLegal({ userFunds: this.state.userFunds })
    };
    addNewVehicle = async () => {
        const gotToken = await AsyncStorage.getItem('ACCESS_TOKEN');
        const gotClient = await AsyncStorage.getItem('CLIENT');
        const gotUid = await AsyncStorage.getItem('UID');

        return await fetch('http://hq.eucledian.com:7270/vehicles', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'access-token': gotToken,
                client: gotClient,
                uid: gotUid,
            },
            body: JSON.stringify({
                vehicle: {
                    name: this.state.vehicle
                }
            }),
        })
            .then((response) => {
                if (response.ok) {
                    Alert.alert('Vehículo añadido')
                    this.goToCarpetaLegal()
                }
            })
            .catch(err => console.warn(err.message));
    };
    componentWillMount() {
        this.state.userFunds = this.props.userFunds
        AsyncStorage.getItem('USER_NAME').then((value) => {
            this.setState({ userName: value })
        })
    };
    render() {

        var menu = <Icon name='md-menu' color='#fff' size={40} />
        var drawer = (
            <View style={{ flex: 1, backgroundColor: '#1a193d' }}>
                <Text style={{ color: '#FFF', marginTop: 30, fontSize: 25, }}></Text>
                <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                    <TouchableOpacity onPress={this.logout}>
                        <Text style={{ color: 'rgb(195, 145, 55)', marginLeft: 20, marginBottom: 10 }}> Cerrar sesión </Text>
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
                    source={require('../../../assets/fondo_nuevoVehicle.png')}
                >
                    <View style={styles.imageRow}>
                        <TouchableOpacity onPress={this.goToCarpetaLegal.bind(this)}>
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
                    <ScrollView>
                        <View>
                            <Text style={{ fontFamily: 'OpenSans-Bold', color: '#FFF', fontSize: 20, marginTop: 25, marginBottom: 25, marginLeft: 30 }}>{this.state.userName}</Text>
                        </View>
                        <View style={{ marginTop: 20, marginBottom: 30 }}>
                            <Text style={{ color: '#FFF', marginLeft: 30, fontSize: 18, fontFamily: 'OpenSans-Regular' }}>
                                Nuevo Vehículo:
                            </Text>
                            <TextInput
                                onChangeText={val => this.setState({ vehicle: val })}
                                style={styles.input}
                                placeholder="  Soluciones Ejemplo S.A de C.V"
                                placeholderTextColor="black"
                            // secureTextEntry='false'
                            />
                        </View>
                        <View style={{ marginTop: 220, alignItems: 'center' }}>
                            <TouchableOpacity style={{ backgroundColor: 'rgb(195, 145, 55)', width: 210, height: 35, alignItems: 'center', borderRadius: 5 }}>
                                <Text onPress={this.addNewVehicle.bind(this)} style={{ color: '#FFF', fontSize: 13, fontFamily: 'OpenSans-Bold', paddingTop: 10 }}>Guardar</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ marginTop: 30, alignItems: 'center' }}>
                            <TouchableOpacity onPress={this.goToCarpetaLegal.bind(this)} style={{ backgroundColor: '#FFF', width: 210, height: 35, alignItems: 'center', borderRadius: 5 }}>
                                <Text style={{ color: 'black', fontSize: 13, fontFamily: 'OpenSans-Bold', paddingTop: 10 }}>Cancelar</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
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
    input: {
        fontFamily: 'OpenSans-Regular',
        marginLeft: 30,
        padding: 4,
        fontSize: 13,
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
