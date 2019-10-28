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
import DocumentPicker from 'react-native-document-picker';
var numeral = require('numeral');
import Moment from 'moment';
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
    Linking,
    Modal,
} from 'react-native';
import { max } from 'moment';
var rendered = []
export default class CarpetaLegal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
            collapsed1: false,
            collapsed2: false,
            collapsed3: false,
            collapsed4: false,
            userFunds: [],
            userVehicles: [],
            opened: [],
            USERID: '',
            vehicleData: [],
            userName: '',
            modalVisible: false,
            modalConfirm: false,
            vehicleId: '',
            vehicleDocumentIdToDelete: '',
            file: 'No file choosen',
        };
    };
    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }
    setModalVisible2(visible) {
        this.setState({ modalVisible: visible });
    }
    logout() {
        AsyncStorage.clear();
        Actions.welcome({
            type: 'reset',
        });
    };
    goToAddDocuments(documentType) {
        Actions.addDocuments({
            vehicleData: this.state.vehicleData,
            documentType: documentType,
            userFunds: this.state.userFunds,
        })
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
    goBack() {
        Actions.carpetaLegal({
            userFunds: this.state.userFunds
        })
    };
    goToFirma() {
        Actions.firma({
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
    // goToVehicleDetail() {
    //     Actions.vehicleDetail({
    //         vehicleData: this.state.vehicleData,
    //     })
    // };
    deleteVehicleDocument = async (ID) => {
        const gotToken = await AsyncStorage.getItem('ACCESS_TOKEN');
        const gotClient = await AsyncStorage.getItem('CLIENT');
        const gotUid = await AsyncStorage.getItem('UID');

        if (gotToken && gotClient && gotUid) {
            const response = await fetch(`http://hq.eucledian.com:7270/vehicle_documents/${ID}`, {
                method: 'DELETE',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'access-token': gotToken,
                    client: gotClient,
                    uid: gotUid,
                },
            })
                .then((response) => {
                    if (response.ok) {
                        this.goBack()
                    }
                })
                .catch(err => console.warn(err.message));
        }
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
                            console.warn(vehicles)
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
        let userFunds = this.state.userFunds
        this.state.vehicleData = this.props.vehicleData
        let vehicleId = this.state.vehicleData.id
        let data = this.state.vehicleData
        this.setState({ vehicleData: data, userFunds: userFunds })
        console.warn(this.state.vehicleData)
        AsyncStorage.getItem('USER_ID').then((value) => {
            this.setState({ USERID: value })
            this.getUserVehicles()
        }).catch((err) => {
            console.warn(err.message)
        }).then(() => {
            AsyncStorage.getItem('USER_NAME').then((value) => {
                this.setState({ userName: value })
            }).catch((err) => {
                console.warn(err.message)
            })
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
            return <Image
                style={{ width: 17, height: 17 }}
                resizeMode={'contain'}
                source={require('../../../assets/less.png')}
            />
        }
    };
    format(num) {
        var n = num.toFixed(2) * 100;
        return n
    };
    check(documents, type) {
        // Moment.locale('es')
        var arr = []
        arr = [documents]
        var document = (
            <View>
                {arr.map((data, key) => (
                    <ListItem style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                        <Text style={{ flexDirection: 'row', color: '#FFF', fontFamily: 'OpenSans-Regular' }}>{'\u2022' + ' ' + Moment(data.created_at).format('D MMM YY')}</Text>
                        <TouchableOpacity onPress={() => {
                            // console.warn(data)
                            Linking.openURL(data.file)
                        }}>
                            <Text style={{ color: '#FFF', fontWeight: '100', marginRight: 20 }}>
                                <AntDesign name='download' color='#fff' size={25} />
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            this.goToAddDocuments(data.document_type)
                        }}>
                            <Text style={{ color: '#FFF', fontWeight: '100' }}><AntDesign name='upload' color='#fff' size={25} /></Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            this.setState({ vehicleDocumentIdToDelete: data.id })
                            this.setState({ modalConfirm: true })
                        }}>
                            <Text style={{ color: '#FFF', fontWeight: '100' }}><Entypo name='cross' color='#fff' size={25} /></Text>
                        </TouchableOpacity>
                    </ListItem>
                ))}
            </View>
        )
        var containsDocTypeFileNotNull = arr.some((element) => {
            return element.document_type == type
        })
        if (containsDocTypeFileNotNull) {
            return document
        }

    };
    render() {
        var porcentage = this.state.vehicleData.completion
        var vehicle = this.state.vehicleData
        var vehicleDocs = this.state.vehicleData.vehicle_documents
        var open = this.state.collapsed
        var open1 = this.state.collapsed1
        var open2 = this.state.collapsed2
        var open3 = this.state.collapsed3
        var open4 = this.state.collapsed4
        if (open == false) {
            var open = <Image style={{ width: 17, height: 17 }} resizeMode={'contain'} source={require('../../../assets/plus.png')} />
        } else {

            open = <Image style={{ width: 17, height: 17 }} resizeMode={'contain'} source={require('../../../assets/less.png')} />
        }
        if (open1 == false) {
            var open1 = <Image style={{ width: 17, height: 17 }} resizeMode={'contain'} source={require('../../../assets/plus.png')} />
        } else {

            open1 = <Image style={{ width: 17, height: 17 }} resizeMode={'contain'} source={require('../../../assets/less.png')} />
        }
        if (open2 == false) {
            var open2 = <Image style={{ width: 17, height: 17 }} resizeMode={'contain'} source={require('../../../assets/plus.png')} />
        } else {
            open2 = <Image style={{ width: 17, height: 17 }} resizeMode={'contain'} source={require('../../../assets/less.png')} />
        }
        if (open3 == false) {
            var open3 = <Image style={{ width: 17, height: 17 }} resizeMode={'contain'} source={require('../../../assets/plus.png')} />
        } else {

            open3 = <Image style={{ width: 17, height: 17 }} resizeMode={'contain'} source={require('../../../assets/less.png')} />
        }
        if (open4 == false) {
            var open4 = <Image style={{ width: 17, height: 17 }} resizeMode={'contain'} source={require('../../../assets/plus.png')} />
        } else {
            open4 = <Image style={{ width: 17, height: 17 }} resizeMode={'contain'} source={require('../../../assets/less.png')} />
        }
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
                        <Modal
                            animationType="slide"
                            transparent={false}
                            visible={this.state.modalConfirm}
                            onRequestClose={() => {
                                this.setModalVisible(!this.state.modalConfirm);
                            }}>

                            <ImageBackground
                                style={styles.imgBackground}
                                resizeMode="cover"
                                source={require('../../../assets/FONDO_14.png')}
                            >


                                <View style={{ flex: 1, alignItems: 'center' }}>
                                    <Text style={{ color: '#FFF', fontFamily: 'OpenSans-Bold', marginTop: 30, fontSize: 20 }}>Quieres borrar este documento?</Text>
                                </View>
                                <View style={{ flex: 1 }}>
                                    <View style={{ marginTop: 0, alignItems: 'center' }}>
                                        <TouchableOpacity onPress={() => {
                                            let ID = this.state.vehicleDocumentIdToDelete
                                            this.deleteVehicleDocument(ID);
                                            this.setState({ modalConfirm: false })
                                        }} style={{ backgroundColor: 'rgb(195, 145, 55)', width: 210, height: 35, alignItems: 'center', borderRadius: 5 }}>
                                            <Text style={{ color: '#FFF', fontSize: 13, fontFamily: 'OpenSans-Bold', paddingTop: 10 }}>Borrar</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ marginTop: 30, alignItems: 'center' }}>
                                        <TouchableOpacity onPress={() => {
                                            this.setState({ modalConfirm: false });
                                        }} style={{ backgroundColor: '#FFF', width: 210, height: 35, alignItems: 'center', borderRadius: 5 }}>
                                            <Text style={{ color: 'black', fontSize: 13, fontFamily: 'OpenSans-Bold', paddingTop: 10 }}>Cancelar</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </ImageBackground>
                        </Modal>
                        <View style={{ marginLeft: 30, marginTop: 10, marginBottom: 10 }} >
                            <Text style={{ color: 'rgb(195, 145, 55)', fontSize: 20, fontWeight: '900' }}>
                                {vehicle.name}
                            </Text>
                        </View>
                        <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                            < Text style={{ color: '#FFF', fontSize: 18, fontFamily: 'OpenSans-Regular', marginLeft: 25 }}>
                                Avance{' '}{this.format(porcentage)}{' '}%
                            </Text>
                        </View>
                        <View style={{ alignItems: 'center', marginBottom: 15, marginTop: 10 }}>
                            <Progress.Bar
                                fillStyle={{}}
                                progress={porcentage}
                                width={350}
                                height={11.25}
                                color={'rgb(195, 145, 55)'}
                                borderWidth={0}
                                unfilledColor={'#FFF'}
                            />
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '87%', marginBottom: 10 }}>
                            <Text style={{ color: '#FFF', fontFamily: 'OpenSans-Bold', marginLeft: 30, marginTop: 20, fontSize: 20 }}>
                                Documentos
                            </Text>
                        </View>

                        <View style={{ width: '100%', backgroundColor: '#2F4D58', minHeight: 500, borderTopLeftRadius: 30, borderTopRightRadius: 30 }}>
                            <View style={{ justifyContent: 'space-between', flexDirection: 'row', backgroundColor: '#2F4D58', borderTopLeftRadius: 30, borderTopRightRadius: 30, minHeight: 90, marginBottom: '-10%' }}>
                                <Collapse
                                    onToggle={(isCollapsed) => {
                                        this.setState({ collapsed: isCollapsed })
                                    }
                                    }
                                    style={{ width: '100%' }}>
                                    <CollapseHeader style={{ justifyContent: 'space-between', flexDirection: 'row', width: '100%' }}>
                                        <Text style={{ color: '#FFF', marginTop: 10, marginBottom: 10, fontFamily: 'OpenSans-Regular', fontSize: 18, marginLeft: 30 }}>
                                            Título de Propiedad
                                            </Text>
                                        <Text style={{ color: '#FFF', marginTop: 10, marginBottom: 10, fontWeight: 'bold', marginRight: '14%' }}>
                                            {open}
                                        </Text>
                                    </CollapseHeader>
                                    <CollapseBody style={{ alignItems: 'center', width: '100%' }}>
                                        <View style={{ width: '95%', marginBottom: 10 }}>
                                            {vehicleDocs.map((data, key) => (
                                                <View style={{ fontFamily: 'OpenSans-Regular' }}>
                                                    {this.check(data, 0)}
                                                </View>
                                            ))}
                                            <View style={{ fontFamily: 'OpenSans-Regular' }}>
                                                <List style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                                    <TouchableOpacity onPress={() => {
                                                        this.goToAddDocuments(0);
                                                    }} >
                                                        <Text style={{ marginTop: 20, fontZise: 18, color: '#FFF', textAlign: 'center', fontFamily: 'OpenSans-Regular' }}>Agregar Documento</Text>
                                                    </TouchableOpacity>
                                                    <Text style={styles.line2}>
                                                    </Text>
                                                </List>
                                            </View>
                                        </View>
                                    </CollapseBody>
                                </Collapse>
                            </View>


                            <View style={{ justifyContent: 'space-between', flexDirection: 'row', backgroundColor: 'rgba(52, 52, 52, 0.6)', borderTopLeftRadius: 30, borderTopRightRadius: 30, minHeight: 90, marginBottom: '-10%' }}>
                                <Collapse
                                    onToggle={(isCollapsed) => {
                                        this.setState({ collapsed1: isCollapsed })

                                    }
                                    }
                                    style={{ width: '100%' }}>
                                    <CollapseHeader style={{ justifyContent: 'space-between', flexDirection: 'row', width: '100%' }}>
                                        <Text style={{ color: '#FFF', marginTop: 10, marginBottom: 10, fontFamily: 'OpenSans-Regular', fontSize: 18, marginLeft: 30 }}>
                                            Datos Bancarios
                                        </Text>
                                        <Text style={{ color: '#FFF', marginTop: 10, marginBottom: 10, fontWeight: 'bold', marginRight: '14%' }}>
                                            {open1}
                                        </Text>

                                    </CollapseHeader>
                                    <CollapseBody style={{ alignItems: 'center', width: '100%' }}>
                                        <View style={{ width: '95%', marginBottom: 10 }}>
                                            {vehicleDocs.map((data, key) => (
                                                <View style={{ fontFamily: 'OpenSans-Regular' }}>
                                                    {this.check(data, 1)}
                                                </View>
                                            ))}
                                            <View style={{ fontFamily: 'OpenSans-Regular' }}>
                                                <List style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                                    <TouchableOpacity onPress={() => {
                                                        this.goToAddDocuments(1);
                                                    }} >
                                                        <Text style={{ marginTop: 20, fontZise: 18, color: '#FFF', textAlign: 'center', fontFamily: 'OpenSans-Regular' }}>Agregar Documento</Text>
                                                    </TouchableOpacity>
                                                    <Text style={styles.line2}>
                                                    </Text>
                                                </List>
                                            </View>
                                        </View>
                                    </CollapseBody>
                                </Collapse>
                            </View>



                            <View style={{ justifyContent: 'space-between', flexDirection: 'row', backgroundColor: '#2F4D58', borderTopLeftRadius: 30, borderTopRightRadius: 30, minHeight: 90, marginBottom: '-10%' }}>
                                <Collapse
                                    onToggle={(isCollapsed) => {
                                        this.setState({ collapsed2: isCollapsed })
                                    }
                                    }
                                    style={{ width: '100%' }}>
                                    <CollapseHeader style={{ justifyContent: 'space-between', flexDirection: 'row', width: '100%' }}>
                                        <Text style={{ color: '#FFF', marginTop: 10, marginBottom: 10, fontFamily: 'OpenSans-Regular', fontSize: 18, marginLeft: 30 }}>
                                            ID Socios
                                            </Text>
                                        <Text style={{ color: '#FFF', marginTop: 10, marginBottom: 10, fontWeight: 'bold', marginRight: '14%' }}>
                                            {open2}
                                        </Text>

                                    </CollapseHeader>
                                    <CollapseBody style={{ alignItems: 'center', width: '100%' }}>
                                        <View style={{ width: '95%', marginBottom: 10 }}>
                                            {vehicleDocs.map((data, key) => (
                                                <View style={{ fontFamily: 'OpenSans-Regular' }}>
                                                    {this.check(data, 2)}
                                                </View>
                                            ))}
                                            <View style={{ fontFamily: 'OpenSans-Regular' }}>
                                                <List style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                                    <TouchableOpacity onPress={() => {
                                                        this.goToAddDocuments(2);
                                                    }} >
                                                        <Text style={{ marginTop: 20, fontZise: 18, color: '#FFF', textAlign: 'center', fontFamily: 'OpenSans-Regular' }}>Agregar Documento</Text>
                                                    </TouchableOpacity>
                                                    <Text style={styles.line2}>
                                                    </Text>
                                                </List>
                                            </View>
                                        </View>
                                    </CollapseBody>
                                </Collapse>
                            </View>



                            <View style={{ justifyContent: 'space-between', flexDirection: 'row', backgroundColor: 'rgba(52, 52, 52, 0.6)', borderTopLeftRadius: 30, borderTopRightRadius: 30, minHeight: 90, marginBottom: '-10%' }}>
                                <Collapse
                                    onToggle={(isCollapsed) => {
                                        this.setState({ collapsed3: isCollapsed })

                                    }
                                    }
                                    style={{ width: '100%' }}>
                                    <CollapseHeader style={{ justifyContent: 'space-between', flexDirection: 'row', width: '100%' }}>
                                        <Text style={{ color: '#FFF', marginTop: 10, marginBottom: 10, fontFamily: 'OpenSans-Regular', fontSize: 18, marginLeft: 30 }}>
                                            Tax ID
                                            </Text>
                                        <Text style={{ color: '#FFF', marginTop: 10, marginBottom: 10, fontWeight: 'bold', marginRight: '14%' }}>
                                            {open3}
                                        </Text>

                                    </CollapseHeader>
                                    <CollapseBody style={{ alignItems: 'center', width: '100%' }}>
                                        <View style={{ width: '95%', marginBottom: 10 }}>
                                            {vehicleDocs.map((data, key) => (
                                                <View style={{ fontFamily: 'OpenSans-Regular' }}>
                                                    {this.check(data, 3)}
                                                </View>
                                            ))}
                                            <View style={{ fontFamily: 'OpenSans-Regular' }}>
                                                <List style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                                    <TouchableOpacity onPress={() => {
                                                        this.goToAddDocuments(3);
                                                    }} >
                                                        <Text style={{ marginTop: 20, fontZise: 18, color: '#FFF', textAlign: 'center', fontFamily: 'OpenSans-Regular' }}>Agregar Documento</Text>
                                                    </TouchableOpacity>
                                                    <Text style={styles.line2}>
                                                    </Text>
                                                </List>
                                            </View>
                                        </View>
                                    </CollapseBody>
                                </Collapse>
                            </View>



                            <View style={{ justifyContent: 'space-between', flexDirection: 'row', backgroundColor: '#2F4D58', borderTopLeftRadius: 30, borderTopRightRadius: 30, minHeight: 90, marginBottom: '-10%' }}>
                                <Collapse
                                    onToggle={(isCollapsed) => {
                                        this.setState({ collapsed4: isCollapsed })

                                    }
                                    }
                                    style={{ width: '100%' }}>
                                    <CollapseHeader style={{ justifyContent: 'space-between', flexDirection: 'row', width: '100%' }}>
                                        <Text style={{ color: '#FFF', marginTop: 10, marginBottom: 10, fontFamily: 'OpenSans-Regular', fontSize: 18, marginLeft: 30 }}>
                                            Waiver
                                            </Text>
                                        <Text style={{ color: '#FFF', marginTop: 10, marginBottom: 10, fontWeight: 'bold', marginRight: '14%' }}>
                                            {open4}
                                        </Text>
                                    </CollapseHeader>
                                    <CollapseBody style={{ alignItems: 'center', width: '100%' }}>
                                        <View style={{ width: '95%', marginBottom: 10 }}>
                                            {vehicleDocs.map((data, key) => (
                                                <View style={{ fontFamily: 'OpenSans-Regular' }}>
                                                    {this.check(data, 4)}
                                                </View>
                                            ))}
                                            <View style={{ fontFamily: 'OpenSans-Regular' }}>
                                                <List style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                                    <TouchableOpacity onPress={() => {
                                                        this.goToAddDocuments(4);
                                                    }} >
                                                        <Text style={{ marginTop: 20, fontZise: 18, color: '#FFF', textAlign: 'center', fontFamily: 'OpenSans-Regular' }}>Agregar Documento</Text>
                                                    </TouchableOpacity>
                                                    <Text style={styles.line2}>
                                                    </Text>
                                                </List>
                                            </View>
                                        </View>
                                    </CollapseBody>
                                </Collapse>
                            </View>

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
        //flex: 1,
        alignItems: 'center',
        marginTop: 20,
    },
    bullet: {
        flexDirection: 'row',
        width: 10,
        color: '#FFF'
    },
    TextStyle: {
        textAlign: 'center',
        width: '90%',
        height: 60,
        backgroundColor: 'rgb(195, 145, 55)',
        fontSize: 15,
        color: '#FFF',
        borderRadius: 15,
        fontWeight: '100',
        paddingTop: 25,
    },
    secondText: {
        fontWeight: 'normal',
    },
    line2: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFF',
        width: '40%',
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
