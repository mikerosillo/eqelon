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
            collapsed5: false,
            progress: 0,
            projectInfo: [],
            serieinfo: [],
            userFunds: [],
            userName: '',
            completion: '',
            IDUSER: '',
            docName: '',
            fundDocuments: [],
            modalVisible: false,
            modalConfirm: false,
            serieDocumentIdToDelete: '',
            userDocuments: [],
            SERIEID: '',
            projects: [],
            documentFundId: '',
            element: [],
            app_user_fund_id: '',
            documentId: '',
            serieName: '',
        };
    };
    logout() {
        AsyncStorage.clear();
        Actions.welcome({
            type: 'reset',
        });
    };
    goToProfile() {
        Actions.profile({
            // userFunds: this.state.userFunds,
            // projectInfo: this.state.projectInfo,
            // serieinfo: this.state.serieinfo,
            // completion: this.state.completion,
            // userDocuments: this.state.userDocuments,
            // fundDocuments: this.state.fundDocuments,
        })
    }
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
        Actions.myinfo({
            serieinfo: this.state.serieinfo,
            userFunds: this.state.userFunds,
            userDocuments: this.state.userDocuments,
            completion: this.state.completion,
            fundDocuments: this.state.fundDocuments,
            SERIEID: this.state.SERIEID,
            projects: this.state.projects,
            documentFundId: this.state.documentFundId,
            app_user_fund_id: this.state.app_user_fund_id,
            documentId: this.state.documentId,
            serieName: this.state.serieName,
            completion: this.state.completion,
        })
    };
    goToAddDocumentsToSerieDocumentId(documentId) {
        this.state.documentId = documentId
        Actions.addDocumentsToSerie({
            serieinfo: this.state.serieinfo,
            userFunds: this.state.userFunds,
            userDocuments: this.state.userDocuments,
            completion: this.state.completion,
            fundDocuments: this.state.fundDocuments,
            SERIEID: this.state.SERIEID,
            docType: 2,
            projects: this.state.projects,
            documentFundId: this.state.documentFundId,
            app_user_fund_id: this.state.app_user_fund_id,
            documentId: this.state.documentId,
            serieName: this.state.serieName,
        })
    };
    goToAddDocumentsToSerieType(type) {
        Actions.addDocumentsToSerie({
            serieinfo: this.state.serieinfo,
            userFunds: this.state.userFunds,
            userDocuments: this.state.userDocuments,
            completion: this.state.completion,
            fundDocuments: this.state.fundDocuments,
            SERIEID: this.state.SERIEID,
            docType: type,
            projects: this.state.projects,
            documentFundId: this.state.documentFundId,
            app_user_fund_id: this.state.app_user_fund_id,
            documentId: null,
            serieName: this.state.serieName,
        })
    };
    format() {
        var num = this.state.progress;
        var n = num.toFixed(2) * 100;
        return n
    }
    refresh() {
        var r = this.state.userDocuments
        var map = r.map((element) => {
            return element.app_user_fund_documents
        })
        // console.warn(map[0])
        Actions.seriesDocumentsInvestors({
            serieinfo: this.state.serieinfo,
            userFunds: this.state.userFunds,
            userDocuments: map[0],
            completion: this.state.completion,
            fundDocuments: this.state.fundDocuments,
            projects: this.state.projects,
            // SERIEID: this.state.SERIEID,
            documentFundId: this.state.documentFundId,
            app_user_fund_id: this.state.app_user_fund_id,
            serieName: this.state.serieName,
        })
    }
    goToProfile() {
        Actions.profile({
        })
    }
    openDrawer() {
        this.drawer.openDrawer();
    };
    goToVehicleDetail() {
        Actions.vehicleDetail({
            vehicleData: this.state.vehicleData,
        })
    };
    deleteSerieDocument = async (ID) => {
        // console.warn('frrr', ID)
        const gotToken = await AsyncStorage.getItem('ACCESS_TOKEN');
        const gotClient = await AsyncStorage.getItem('CLIENT');
        const gotUid = await AsyncStorage.getItem('UID');

        if (gotToken && gotClient && gotUid) {
            const response = await fetch(`http://hq.eucledian.com:7270/app_user_fund_documents/${ID}`, {
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
                    // console.warn(response)
                    if (response.ok) {
                        this.getNewSerieInfo()
                    }
                })
                .catch(err => console.warn(err.message));
        }
    };
    getNewSerieInfo = async () => {
        var fundDocumentId = this.state.documentFundId

        const gotToken = await AsyncStorage.getItem('ACCESS_TOKEN');
        const gotClient = await AsyncStorage.getItem('CLIENT');
        const gotUid = await AsyncStorage.getItem('UID');

        if (gotToken && gotClient && gotUid) {
            const response = await fetch('http://hq.eucledian.com:7270/app_user_funds', {
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
                        var funds = data.app_user_funds
                        var documentos = funds.filter(item => {
                            return item.id == fundDocumentId
                        });
                        this.setState({ userDocuments: documentos })
                        this.refresh()
                    })

                })
                .catch(err => console.warn(err.message));
        }
    };
    // appUserInfo = async () => {
    //     const gotToken = await AsyncStorage.getItem('ACCESS_TOKEN');
    //     const gotClient = await AsyncStorage.getItem('CLIENT');
    //     const gotUid = await AsyncStorage.getItem('UID');
    //     let ID = await AsyncStorage.getItem('USER_ID');
    //     let SERIEID = this.state.SERIEID;

    //     if (gotToken && gotClient && gotUid) {
    //         const response = await fetch(`http://hq.eucledian.com:7270/app_users/${ID}`, {
    //             method: 'GET',
    //             headers: {
    //                 Accept: 'application/json',
    //                 'Content-Type': 'application/json',
    //                 'access-token': gotToken,
    //                 client: gotClient,
    //                 uid: gotUid,
    //             },
    //         })
    //             .then((response) => {
    //                 response.json().then((data) => {
    //                     console.warn('from response', data.app_user.app_user_funds)
    //                     let userFunds = data.app_user.app_user_funds
    //                     var to = userFunds.map((element) => {
    //                         // return element.id
    //                         if (element.fund_id == SERIEID) {
    //                             return element.app_user_fund_documents
    //                         }
    //                     })
    //                     this.setState({ userDocuments: to })
    //                 })
    //             })
    //             .catch(err => console.warn(err.message));
    //     }
    // };
    check(type) {
        var documents = this.state.userDocuments
        var data = documents.filter(item => {
            return item.document_type == type
        });
        var document = (
            <View>
                {data.map((data, key) => (
                    <ListItem style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                        <Text style={{ flexDirection: 'row', color: '#FFF', fontFamily: 'OpenSans-Regular' }}>{'\u2022' + ' ' + Moment(data.created_at).format('D MMM YY')}</Text>
                        <TouchableOpacity onPress={() => {
                            Linking.openURL(data.file)
                        }}>
                            <Text style={{ color: '#FFF', fontWeight: '100', marginRight: 20 }}>
                                <AntDesign name='download' color='#fff' size={25} />
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            console.warn(data)
                            this.goToAddDocumentsToSerieType(type)
                        }}>
                            <Text style={{ color: '#FFF', fontWeight: '100' }}><AntDesign name='upload' color='#fff' size={25} /></Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            this.setState({ serieDocumentIdToDelete: data.id })
                            this.setState({ modalConfirm: true })
                        }}>
                            <Text style={{ color: '#FFF', fontWeight: '100' }}><Entypo name='cross' color='#fff' size={25} /></Text>
                        </TouchableOpacity>
                    </ListItem>
                ))}
            </View>
        )
        var containsDocTypeFileNotNull = data.some((element) => {
            return element.document_type == type
        })
        if (containsDocTypeFileNotNull) {
            return document
        }
    };

    check2(documentId) {
        var fund_document_id = documentId
        var documents = this.state.userDocuments
        var data = documents.filter(item => {
            return item.fund_document_id == documentId
        });
        var document = (
            <View>
                {data.map((data, key) => (
                    <ListItem style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                        <Text style={{ flexDirection: 'row', color: '#FFF', fontFamily: 'OpenSans-Regular' }}>{'\u2022' + ' ' + Moment(data.created_at).format('D MMM YY')}</Text>
                        <TouchableOpacity onPress={() => {
                            Linking.openURL(data.file)
                        }}>
                            <Text style={{ color: '#FFF', fontWeight: '100', marginRight: 20 }}>
                                <AntDesign name='download' color='#fff' size={25} />
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            this.goToAddDocumentsToSerieDocumentId(fund_document_id)
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
        var containsDocTypeFileNotNull = data.some((element) => {
            return element.fund_document_id == documentId
        })
        if (containsDocTypeFileNotNull) {
            return document
        }
    };
    componentWillMount() {
        this.state.serieName = this.props.serieName
        this.state.app_user_fund_id = this.props.app_user_fund_id
        this.state.documentFundId = this.props.documentFundId
        this.state.projects = this.props.projects
        this.state.SERIEID = this.props.SERIEID
        this.state.fundDocuments = this.props.fundDocuments
        this.state.completion = this.props.completion
        let completion = this.state.completion
        let app_user_fund_id = this.state.app_user_fund_id
        this.state.userDocuments = this.props.userDocuments
        let userDocuments = this.state.userDocuments
        let projects = this.state.projects
        let documentFundId = this.state.documentFundId
        this.state.progress = this.props.completion
        let prog = this.state.progress
        this.state.userFunds = this.props.userFunds
        let userFunds = this.state.userFunds
        this.state.projectInfo = this.props.projectInfo
        let projectInfo = this.state.projectInfo
        this.state.serieinfo = this.props.serieinfo
        let serieinfo = this.state.serieinfo
        let fundDocuments = this.state.fundDocuments
        this.setState({ projectInfo: projectInfo, serieinfo: serieinfo, userFunds: userFunds, progress: prog, userDocuments: userDocuments, completion: completion, fundDocuments: fundDocuments, projects: projects, documentFundId: documentFundId, app_user_fund_id: app_user_fund_id })
        AsyncStorage.getItem('USER_NAME').then((value) => {
            this.setState({ userName: value })
        })
        AsyncStorage.getItem('USER_ID').then((value) => {
            this.setState({ IDUSER: value })
        })
    };


    render() {
        var open = this.state.collapsed
        var open1 = this.state.collapsed1
        var open2 = this.state.collapsed2
        var open3 = this.state.collapsed3
        var open4 = this.state.collapsed4
        var open5 = this.state.collapsed5
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
        if (open5 == false) {
            var open5 = <Image style={{ width: 17, height: 17 }} resizeMode={'contain'} source={require('../../../assets/plus.png')} />
        } else {
            open5 = <Image style={{ width: 17, height: 17 }} resizeMode={'contain'} source={require('../../../assets/less.png')} />
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
                                            let ID = this.state.serieDocumentIdToDelete
                                            this.deleteSerieDocument(ID);
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
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '87%', marginBottom: 10 }}>
                            <Text style={{ color: '#FFF', fontFamily: 'OpenSans-Bold', marginLeft: 30, marginTop: 20, fontSize: 20 }}>
                                {this.state.serieName}
                            </Text>
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'column', width: '100%' }}>
                            <View style={{ width: '100%', justifyContent: 'center', flexDirection: 'row', marginBottom: '-4%' }}>
                                < Text style={{ color: '#FFF', fontSize: 18, fontFamily: 'OpenSans-Regular', marginLeft: 25 }}>
                                    Documentación de la serie {"\n"}
                                </Text>
                            </View>
                            <View style={{ width: '100%', justifyContent: 'center', flexDirection: 'row', marginTop: 0 }}>
                                < Text style={{ color: '#FFF', fontSize: 18, fontFamily: 'OpenSans-Regular', marginLeft: 25 }}>
                                    {this.format()}{' '}%
                                </Text>

                            </View>
                            <View style={{ alignItems: 'center', marginBottom: 15, marginTop: 10 }}>
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
                                        <Text style={{ color: '#FFF', marginTop: 10, marginBottom: 10, fontFamily: 'OpenSans-Regular', fontSize: 18, marginLeft: 30, width: '80%' }}>
                                            LPA
                                            </Text>
                                        <Text style={{ color: '#FFF', marginTop: 10, marginBottom: 10, fontWeight: 'bold', marginRight: '14%', width: '20%' }}>
                                            {open}
                                        </Text>
                                    </CollapseHeader>
                                    <CollapseBody style={{ alignItems: 'center', width: '100%' }}>
                                        <View style={{ width: '95%', marginBottom: 10 }}>

                                            <View style={{ fontFamily: 'OpenSans-Regular' }}>
                                                {this.check(0)}
                                            </View>

                                            <View style={{ fontFamily: 'OpenSans-Regular' }}>
                                                <List style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                                    <TouchableOpacity onPress={() => {
                                                        this.goToAddDocumentsToSerieType(0);
                                                    }} >
                                                        <Text style={{ marginTop: 20, fontZise: 18, color: '#FFF', textAlign: 'center', fontFamily: 'OpenSans-Regular' }}>Agregar documento</Text>
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
                                        <Text style={{ color: '#FFF', marginTop: 10, marginBottom: 10, fontFamily: 'OpenSans-Regular', fontSize: 18, marginLeft: 30, width: '80%' }}>
                                            Subscription Agreement
                                        </Text>
                                        <Text style={{ color: '#FFF', marginTop: 10, marginBottom: 10, fontWeight: 'bold', marginRight: '14%', width: '20%' }}>
                                            {open1}
                                        </Text>

                                    </CollapseHeader>
                                    <CollapseBody style={{ alignItems: 'center', width: '100%' }}>
                                        <View style={{ width: '95%', marginBottom: 10 }}>

                                            <View style={{ fontFamily: 'OpenSans-Regular' }}>
                                                {this.check(1)}
                                            </View>

                                            <View style={{ fontFamily: 'OpenSans-Regular' }}>
                                                <List style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                                    <TouchableOpacity onPress={() => {
                                                        this.goToAddDocumentsToSerieType(1);
                                                    }} >
                                                        <Text style={{ marginTop: 20, fontZise: 18, color: '#FFF', textAlign: 'center', fontFamily: 'OpenSans-Regular' }}>Agregar documento</Text>
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
                                        <Text style={{ color: '#FFF', marginTop: 10, marginBottom: 10, fontFamily: 'OpenSans-Regular', fontSize: 18, marginLeft: 30, width: '80%' }}>
                                            NDA
                                            </Text>
                                        <Text style={{ color: '#FFF', marginTop: 10, marginBottom: 10, fontWeight: 'bold', marginRight: '14%', width: '20%' }}>
                                            {open2}
                                        </Text>

                                    </CollapseHeader>
                                    <CollapseBody style={{ alignItems: 'center', width: '100%' }}>
                                        <View style={{ width: '95%', marginBottom: 10 }}>

                                            <View style={{ fontFamily: 'OpenSans-Regular' }}>
                                                {this.check2(2)}
                                            </View>

                                            <View style={{ fontFamily: 'OpenSans-Regular' }}>
                                                <List style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                                    <TouchableOpacity onPress={() => {
                                                        this.goToAddDocumentsToSerieDocumentId(2);
                                                    }} >
                                                        <Text style={{ marginTop: 20, fontZise: 18, color: '#FFF', textAlign: 'center', fontFamily: 'OpenSans-Regular' }}>Agregar documento</Text>
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
                                        <Text style={{ color: '#FFF', marginTop: 10, marginBottom: 10, fontFamily: 'OpenSans-Regular', fontSize: 18, marginLeft: 30, width: '80%' }}>
                                            Comprobante de Residencia
                                        </Text>
                                        <Text style={{ color: '#FFF', marginTop: 10, marginBottom: 10, fontWeight: 'bold', marginRight: '14%', width: '20%' }}>
                                            {open3}
                                        </Text>

                                    </CollapseHeader>
                                    <CollapseBody style={{ alignItems: 'center', width: '100%' }}>
                                        <View style={{ width: '95%', marginBottom: 10 }}>

                                            <View style={{ fontFamily: 'OpenSans-Regular' }}>
                                                {this.check2(3)}
                                            </View>

                                            <View style={{ fontFamily: 'OpenSans-Regular' }}>
                                                <List style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                                    <TouchableOpacity onPress={() => {
                                                        this.goToAddDocumentsToSerieDocumentId(3);
                                                    }} >
                                                        <Text style={{ marginTop: 20, fontZise: 18, color: '#FFF', textAlign: 'center', fontFamily: 'OpenSans-Regular' }}>Agregar documento</Text>
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
                                        <Text style={{ color: '#FFF', marginTop: 10, marginBottom: 10, fontFamily: 'OpenSans-Regular', fontSize: 18, marginLeft: 30, width: '80%' }}>
                                            ALDO
                                            </Text>
                                        <Text style={{ color: '#FFF', marginTop: 10, marginBottom: 10, fontWeight: 'bold', marginRight: '14%', width: '20%' }}>
                                            {open4}
                                        </Text>
                                    </CollapseHeader>
                                    <CollapseBody style={{ alignItems: 'center', width: '100%' }}>
                                        <View style={{ width: '95%', marginBottom: 10 }}>

                                            <View style={{ fontFamily: 'OpenSans-Regular' }}>
                                                {this.check2(4)}
                                            </View>

                                            <View style={{ fontFamily: 'OpenSans-Regular' }}>
                                                <List style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                                    <TouchableOpacity onPress={() => {
                                                        this.goToAddDocumentsToSerieDocumentId(4);
                                                    }} >
                                                        <Text style={{ marginTop: 20, fontZise: 18, color: '#FFF', textAlign: 'center', fontFamily: 'OpenSans-Regular' }}>Agregar documento</Text>
                                                    </TouchableOpacity>
                                                    <Text style={styles.line2}>
                                                    </Text>
                                                </List>
                                            </View>
                                        </View>
                                    </CollapseBody>
                                </Collapse>
                            </View>


                            <View style={{ justifyContent: 'space-between', flexDirection: 'row', backgroundColor: 'rgba(52, 52, 52, 0.6)', borderTopLeftRadius: 30, borderTopRightRadius: 30, minHeight: 90, marginBottom: '-10%', minHeight: 500 }}>
                                <Collapse
                                    onToggle={(isCollapsed) => {
                                        this.setState({ collapsed5: isCollapsed })

                                    }
                                    }
                                    style={{ width: '100%' }}>
                                    <CollapseHeader style={{ justifyContent: 'space-between', flexDirection: 'row', width: '100%' }}>
                                        <Text style={{ color: '#FFF', marginTop: 10, marginBottom: 10, fontFamily: 'OpenSans-Regular', fontSize: 18, marginLeft: 30, width: '80%' }}>
                                            Documento Test
                                            </Text>
                                        <Text style={{ color: '#FFF', marginTop: 10, marginBottom: 10, fontWeight: 'bold', marginRight: '14%', width: '20%' }}>
                                            {open5}
                                        </Text>
                                    </CollapseHeader>
                                    <CollapseBody style={{ alignItems: 'center', width: '100%' }}>
                                        <View style={{ width: '95%', marginBottom: 10 }}>

                                            <View style={{ fontFamily: 'OpenSans-Regular' }}>
                                                {this.check2(18)}
                                            </View>

                                            <View style={{ fontFamily: 'OpenSans-Regular' }}>
                                                <List style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                                    <TouchableOpacity onPress={() => {
                                                        this.goToAddDocumentsToSerieDocumentId(18);
                                                    }} >
                                                        <Text style={{ marginTop: 20, fontZise: 18, color: '#FFF', textAlign: 'center', fontFamily: 'OpenSans-Regular' }}>Agregar documento</Text>
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
