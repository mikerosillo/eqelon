import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Actions } from 'react-native-router-flux';
import { Collapse, CollapseHeader, CollapseBody, AccordionList } from 'accordion-collapse-react-native';
import { Thumbnail, List, ListItem, Separator, Footer, FooterTab } from 'native-base';
import * as Progress from 'react-native-progress';
import Drawer from 'react-native-drawer';
import Icon from 'react-native-vector-icons/Ionicons';
import DocumentPicker from 'react-native-document-picker';
import base64 from 'react-native-base64';
import RNFS from 'react-native-fs';
import {
    StyleSheet,
    Text,
    View,
    Button,
    TouchableOpacity,
    ScrollView,
    Image,
    DrawerLayoutAndroid,
    ImageBackground,
    TouchableHighlight,
    Dimensions,
    AsyncStorage,
    Alert,
    NativeModules,
} from 'react-native';

export default class AddDocuments extends React.Component {
    constructor(props) {
        super(props);
        //Initialization of the state to store the selected file related attribute
        this.state = {
            singleFile: '',
            multipleFile: [],
            file: 'Archivo aun no seleccionado',
            vehicleData: [],
            documentType: '',
            pdf: '',
            resType: '',
        };
    };
    openDrawer() {
        this.drawer.openDrawer();
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
        Actions.vehicleDetail({
            vehicleData: this.state.vehicleData,
            userFunds: this.state.userFunds,
        })
    };
    goToCarpeta() {
        Actions.carpetaLegal({
            // userFunds: this.state.userFunds
        })
    };
    async selectOneFile() {
        //Opening Document Picker for selection of one file
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles],
                readContent: true,
                //There can me more options as well
                // DocumentPicker.types.allFiles
                // DocumentPicker.types.images
                // DocumentPicker.types.plainText
                // DocumentPicker.types.audio
                // DocumentPicker.types.pdf
            });
            //Printing the log realted to the file
            // console.log('res : ' + JSON.stringify(res));
            // console.log('URI : ' + res.uri);
            // console.warn('Type : ' + res.type);
            // console.log('File Name : ' + res.name);
            // console.log('File Size : ' + res.size);
            //Setting the state to show single file attributes
            let type = res.type
            this.setState({ singleFile: res, file: res.name, resType: type });
            RNFS.readFile(res.uri, 'base64').then((res) => {
                this.setState({ pdf: res })
                console.warn(this.state.pdf)
            }).catch((err) => {
                console.warn(err.message)
            })

        } catch (err) {
            //Handling any exception (If any)
            if (DocumentPicker.isCancel(err)) {
                //If user canceled the document selection
                alert('Canceled from single doc picker');
            } else {
                //For Unknown Error
                console.warn('Unknown Error: ' + JSON.stringify(err));
                throw err;
            }
        }
    };
    checkDocumentType() {
        let documentType = this.state.resType
        console.warn(documentType)
        if (documentType == '') {
            Alert.alert('Favor de seleccionar un documento')
        }
        else if (documentType == 'application/pdf') {
            this.addVehicleDocument()
        } else if (documentType == 'image/png') {
            this.addVehicleDocumentImage()
        } else {
            Alert.alert('El documento seleccionado debe ser en formato pdf o png.')
        }

    };
    resultPdf() {
        let documentFundId = this.state.documentId
        if (documentFundId == '23') {
            this.addSerieDocument2()
        } else if (documentFundId == '22') {
            this.addSerieDocument2()
        } else if (documentFundId == '21') {
            this.addSerieDocument2()
        } else if (documentFundId == '5') {
            this.addSerieDocument2()
        } else {
            this.addSerieDocument()
        }
    };
    resultImage() {
        let documentFundId = this.state.documentId
        if (documentFundId == '23') {
            this.addSerieDocumentImage2()
        } else if (documentFundId == '22') {
            this.addSerieDocumentImage2()
        } else if (documentFundId == '21') {
            this.addSerieDocumentImage2()
        } else if (documentFundId == '5') {
            this.addSerieDocumentImage2()
        } else {
            this.addSerieDocumentImage()
        }
    };
    addVehicleDocument = async () => {
        console.warn('add 1 called')
        // fun_document_id console.warn(this.state.documentId)
        // console.warn(this.state.documentType)
        //  App_user_Fund_Id console.warn(this.state.documentFundId)

        var encoded = this.state.pdf
        const gotToken = await AsyncStorage.getItem('ACCESS_TOKEN');
        const gotClient = await AsyncStorage.getItem('CLIENT');
        const gotUid = await AsyncStorage.getItem('UID');

        if (gotToken && gotClient && gotUid) {
            console.warn(this.state.documentFundId)
            console.warn(this.state.documentType)
            const response = await fetch('http://hq.eucledian.com:7270/vehicle_documents', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'access-token': gotToken,
                    client: gotClient,
                    uid: gotUid,
                },
                body: JSON.stringify({
                    vehicle_document: {
                        vehicle_id: this.state.vehicleData.id,
                        document_type: this.state.documentType,
                        file: `data:application/pdf;base64,${encoded}`
                    }
                }),
            })
                .then((response) => {
                    console.warn(response)
                    if (response.ok) {
                        this.goToCarpeta()
                    }

                })
                .catch(err => console.warn(err.message));
        }
    };
    addSerieDocument2 = async () => {
        console.warn('add 2 called')
        // fun_document_id console.warn(this.state.documentId)
        // console.warn(this.state.documentType)
        //  App_user_Fund_Id console.warn(this.state.documentFundId)

        var encoded = this.state.pdf
        const gotToken = await AsyncStorage.getItem('ACCESS_TOKEN');
        const gotClient = await AsyncStorage.getItem('CLIENT');
        const gotUid = await AsyncStorage.getItem('UID');

        if (gotToken && gotClient && gotUid) {
            console.warn(this.state.documentFundId)
            console.warn(this.state.documentType)
            const response = await fetch('http://hq.eucledian.com:7270/vehicle_documents', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'access-token': gotToken,
                    client: gotClient,
                    uid: gotUid,
                },
                body: JSON.stringify({
                    vehicle_document: {
                        vehicle_id: this.state.vehicleData.id,
                        document_type: this.state.documentType,
                        file: `data:application/pdf;base64,${encoded}`
                    }
                }),
            })
                .then((response) => {
                    console.warn(response)
                    if (response.ok) {
                        this.getNewSerieInfo()
                    }

                })
                .catch(err => console.warn(err.message));
        }
    };
    addVehicleDocumentImage = async () => {
        console.warn('add 1 called')
        // fun_document_id console.warn(this.state.documentId)
        // console.warn(this.state.documentType)
        //  App_user_Fund_Id console.warn(this.state.documentFundId)

        var encoded = this.state.pdf
        const gotToken = await AsyncStorage.getItem('ACCESS_TOKEN');
        const gotClient = await AsyncStorage.getItem('CLIENT');
        const gotUid = await AsyncStorage.getItem('UID');

        if (gotToken && gotClient && gotUid) {
            console.warn(this.state.documentFundId)
            console.warn(this.state.documentType)
            const response = await fetch('http://hq.eucledian.com:7270/vehicle_documents', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'access-token': gotToken,
                    client: gotClient,
                    uid: gotUid,
                },
                body: JSON.stringify({
                    vehicle_document: {
                        vehicle_id: this.state.vehicleData.id,
                        document_type: this.state.documentType,
                        file: `data:image/png;base64,${encoded}`
                    }
                }),
            })
                .then((response) => {
                    console.warn(response)
                    if (response.ok) {
                        this.goToCarpeta()
                    }

                })
                .catch(err => console.warn(err.message));
        }
    };
    addSerieDocumentImage2 = async () => {
        console.warn('add 2 called')
        // fun_document_id console.warn(this.state.documentId)
        // console.warn(this.state.documentType)
        //  App_user_Fund_Id console.warn(this.state.documentFundId)

        var encoded = this.state.pdf
        const gotToken = await AsyncStorage.getItem('ACCESS_TOKEN');
        const gotClient = await AsyncStorage.getItem('CLIENT');
        const gotUid = await AsyncStorage.getItem('UID');

        if (gotToken && gotClient && gotUid) {
            console.warn(this.state.documentFundId)
            console.warn(this.state.documentType)
            const response = await fetch('http://hq.eucledian.com:7270/vehicle_documents', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'access-token': gotToken,
                    client: gotClient,
                    uid: gotUid,
                },
                body: JSON.stringify({
                    vehicle_document: {
                        vehicle_id: this.state.vehicleData.id,
                        document_type: this.state.documentType,
                        file: `data:image/png;base64,${encoded}`
                    }
                }),
            })
                .then((response) => {
                    console.warn(response)
                    if (response.ok) {
                        this.getNewSerieInfo()
                    }

                })
                .catch(err => console.warn(err.message));
        }
    };
    // addVehicleDocument = async () => {
    //     var encoded = this.state.pdf
    //     const gotToken = await AsyncStorage.getItem('ACCESS_TOKEN');
    //     const gotClient = await AsyncStorage.getItem('CLIENT');
    //     const gotUid = await AsyncStorage.getItem('UID');

    //     if (gotToken && gotClient && gotUid) {
    //         const response = await fetch('http://hq.eucledian.com:7270/vehicle_documents', {
    //             method: 'POST',
    //             headers: {
    //                 Accept: 'application/json',
    //                 'Content-Type': 'application/json',
    //                 'access-token': gotToken,
    //                 client: gotClient,
    //                 uid: gotUid,
    //             },
    //             body: JSON.stringify({
    //                 vehicle_document: {
    //                     vehicle_id: this.state.vehicleData.id,
    //                     document_type: this.state.documentType,
    //                     file: `data:application/pdf;base64,${encoded}`
    //                 }
    //             }),
    //         })
    //             .then((response) => {
    //                 if (response.ok) {
    //                     this.goToCarpeta()
    //                 }

    //             })
    //             .catch(err => console.warn(err.message));
    //     }
    // };
    componentWillMount() {
        this.state.userFunds = this.props.userFunds
        this.state.vehicleData = this.props.vehicleData
        this.state.documentType = this.props.documentType
        let userFunds = this.state.userFunds
        let documentType = this.state.documentType
        let vehicleData = this.state.vehicleData
        this.setState({ vehicleData: vehicleData, documentType: documentType, userFunds: userFunds })
        console.warn(this.state.documentType)
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
                    <View style={{ flex: 1, alignItems: 'center', marginTop: 30 }}>
                        {/*To show single file attribute*/}
                        <View style={{ width: '86%' }}>
                            <TouchableOpacity onPress={this.selectOneFile.bind(this)} style={{
                                flexDirection: 'row',
                                backgroundColor: 'rgb(195, 145, 55)',
                                height: 50,
                                width: '100%',
                                borderRadius: 15,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                                <Text style={{ color: '#FFF', fontFamily: 'OpenSans-Bold', fontSize: 20 }}>
                                    Seleccionar archivo
                                </Text>
                                {/* <Image
                                    source={{
                                        uri: 'https://img.icons8.com/offices/40/000000/attach.png',
                                    }}
                                    style={styles.imageIconStyle}
                                /> */}
                            </TouchableOpacity>
                        </View>
                        <View style={{ width: '86%', marginTop: 20, marginBottom: 20, alignItems: 'center' }}>
                            <Text style={{ color: '#FFF', fontFamily: 'OpenSans-Bold', fontSize: 13 }}>{this.state.file}</Text>
                        </View>
                        {/*Showing the data of selected Single file*/}
                        {/* <View style={{ flex: 1, backgroundColor: '#FFF', width: '84%', marginTop: 40 }} >
                            <Text style={styles.textStyle}>
                                File Name:{' '}
                                {this.state.singleFile.name ? this.state.singleFile.name : ''}
                                {'\n'}
                                Type: {this.state.singleFile.type ? this.state.singleFile.type : ''}
                                {'\n'}
                                File Size:{' '}
                                {this.state.singleFile.size ? this.state.singleFile.size : ''}
                                {'\n'}
                                URI: {this.state.singleFile.uri ? this.state.singleFile.uri : ''}
                                {'\n'}
                            </Text>
                        </View> */}
                    </View>
                    <View style={{ flex: 1 }}>
                        <View style={{ marginTop: 0, alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => {
                                this.checkDocumentType()
                            }} style={{ backgroundColor: 'rgb(195, 145, 55)', width: 210, height: 35, alignItems: 'center', borderRadius: 5 }}>
                                <Text style={{ color: '#FFF', fontSize: 13, fontFamily: 'OpenSans-Bold', paddingTop: 10 }}>Guardar</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ marginTop: 30, alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => {
                                this.goBack();
                            }} style={{ backgroundColor: '#FFF', width: 210, height: 35, alignItems: 'center', borderRadius: 5 }}>
                                <Text style={{ color: 'black', fontSize: 13, fontFamily: 'OpenSans-Bold', paddingTop: 10 }}>Cancelar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

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
    imageIconStyle: {
        height: 20,
        width: 20,
        resizeMode: 'stretch',
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