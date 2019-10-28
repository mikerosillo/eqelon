import React, { Component } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Actions } from 'react-native-router-flux';
import { Collapse, CollapseHeader, CollapseBody, AccordionList } from 'accordion-collapse-react-native';
import { Thumbnail, List, ListItem, Separator, Footer, FooterTab } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import {
    StyleSheet,
    View,
    AsyncStorage,
    TextInput,
    Button,
    Alert,
    Text,
    TouchableOpacity,
    ImageBackground,
    TouchableHighlight,
    Image,
    Dimensions,
    ScrollView,
    DrawerLayoutAndroid,
    Linking,
} from 'react-native';

//let realm;

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
            collapsed2: false,
            collapsed3: false,
            collapsed4: false,
            progress: 0.4,
            projectId: '',
            name: '',
            name2: '',
            name3: '',
            docName: '',
            docName2: '',
            docName3: '',
            documentType: '',
            documentType2: '',
            documentType3: '',
            documentUrl: '',
            documentUrl2: '',
            documentUrl3: '',
            year: '',
            year2: '',
            year3: '',
            idProject: '',
            documents: '',
            allDocuments: [],
            reportes: [],
            reporteNombre: '',
            reportsType0: [],
            reportsType1: [],
            reportsType2: [],
            nameReport0: '',
            nameReport1: '',
            projectInfo: [],
            serieinfo: [],
            reports: [],
            userFunds: [],
            completion: '',
            userDocuments: [],
        };
    }

    openDrawer() {
        this.drawer.openDrawer();
    }
    clear = async () => {
        AsyncStorage.clear();
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
    }
    goToMyInfo() {
        Actions.myinfo()
    }
    goToSeriea() {
        Actions.seriea()
    }
    goToProfile() {
        Actions.profile()
    }
    goToProyectoSeriea() {
        // console.warn(this.state.serieinfo, this.state.projectInfo)
        Actions.proyectoseriea({
            serieinfo: this.state.serieinfo,
            projectInfo: this.state.projectInfo,
            userFunds: this.state.userFunds,
            completion: this.state.completion,
            userDocuments: this.state.userDocuments,
        });
    }

    goToStart() {
        Actions.start({
            type: 'reset',
        });
    }

    async removeItemValue(key) {
        try {
            await AsyncStorage.removeItem(key);
            return true;
        } catch (exception) {
            return false;
        }
    }

    Delete = async () => {
        this.removeItemValue('ACCESS_TOKEN', 'CLIENT', 'UID').then((result) => {
            Alert.alert('Good bye');
            Actions.welcome({
                type: 'reset',
            });
        });
    };
    async getDocumentsProject1() {
        const gotToken = await AsyncStorage.getItem('ACCESS_TOKEN');
        const gotClient = await AsyncStorage.getItem('CLIENT');
        const gotUid = await AsyncStorage.getItem('UID');
        const i = await AsyncStorage.getItem('PROJECT_ID');

        if (gotToken && gotClient && gotUid) {
            // console.warn(gotToken, gotClient, gotUid)
            return fetch('http://hq.eucledian.com:7270/projects', {
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
                            let infos = data.projects[0].reports
                            if (infos.length !== 0) {
                                this.setState({ allDocuments: infos })
                                this.mapTruReportes()
                            }
                        })

                        .catch((error) => {
                            Alert.alert(error.message);
                        });
                })
        }

    };
    mapTruReportes() {
        let all = this.state.reports
        let result = all.filter(function (reports) {
            // console.warn(reports.document_name)
            return reports.document_type == 0;
        });
        this.setState({ reportsType0: result })
        let result2 = all.filter(function (reports) {
            // console.warn(reports.document_name)
            return reports.document_type == 1;
        });
        this.setState({ reportsType1: result2 })
        console.warn(this.state.reportsType1)
        let result3 = all.filter(function (reports) {
            // console.warn(reports.document_name)
            return reports.document_type == 2;
        });
        this.setState({ reportsType2: result3 })
        console.warn(this.state.reportsType2)
        // let finalName = this.state.reportsType0

        // console.warn(this.state.allDocuments)
        // let nameResult0 = finalName.filter(function (reports) {
        //     return reports.document_name == 0;
        // })
        // nameResult0.map((data) => {
        //     console.warn('called ')
        //     this.setState({ nameReport0: data.document_name })
        //     console.warn(this.state.nameReport0)
        // })
    }
    async getDocumentsProject2() {
        const gotToken = await AsyncStorage.getItem('ACCESS_TOKEN');
        const gotClient = await AsyncStorage.getItem('CLIENT');
        const gotUid = await AsyncStorage.getItem('UID');
        const i = await AsyncStorage.getItem('PROJECT_ID');
        if (gotToken && gotClient && gotUid) {
            // console.warn(gotToken, gotClient, gotUid)
            return fetch('http://hq.eucledian.com:7270/projects', {
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
                            let infos = data.projects[1].reports
                            if (infos.length !== 0) {
                                this.setState({ allDocuments: infos })
                                this.mapTruReportes()
                            }
                        })

                        .catch((error) => {
                            Alert.alert(error.message);
                        });
                })
        }

    };
    componentWillMount() {
        this.state.userDocuments = this.props.userDocuments
        this.state.completion = this.props.completion
        this.state.userFunds = this.props.userFunds
        this.state.projectInfo = this.props.projectInfo
        let projectInfo = this.state.projectInfo
        this.state.serieinfo = this.props.serieinfo
        let serieinfo = this.state.serieinfo
        this.state.reports = this.props.projectInfo.reports
        let reports = this.state.reports
        let completion = this.state.completion
        let userDocuments = this.state.userDocuments
        this.setState({ projectInfo: projectInfo, serieinfo: serieinfo, reports: reports, completion: completion, userDocuments: userDocuments })
        this.mapTruReportes()
    };
    checkNameDocumentosGenerales() {
        if (this.state.docName == 0) {
            this.setState({ docName: 'Presentación' })
        }
        if (this.state.docName == 1) {
            this.setState({ docName: 'Operating Agreement' })
        }
        if (this.state.docName == 2) {
            this.setState({ docName: 'Escritura' })
        }
    };
    checkNameReporte() {
        if (this.state.nameReport0 == 0) {
            this.setState({ nameReport0: 'STR' })
        }
        if (this.state.nameReport1 == 1) {
            this.setState({ nameReport1: 'Reporte' })
        }
    };
    mapeoDocumentNameReports(document_name) {
        if (document_name == 0) {
            return "STR";
        } else {
            return "Reporte"
        }
    };
    mapeoDocumentNameDatosGenerales(document_name) {
        if (document_name == 3) {
            return "Operating Agreement"
        } else if (document_name == 2) {
            return "Presentación"
        } else {
            return "Escritura"
        }
    }
    render() {
        var reportes = this.state.reportsType0
        console.warn(this.state.reportsType0)
        var estados = this.state.reportsType1
        var docu = this.state.reportsType2


        var opens = this.state.collapsed
        var open2 = this.state.collapsed2
        var open3 = this.state.collapsed3
        var open4 = this.state.collapsed4

        if (opens == false) {
            var opens = <Image style={{ width: 17, height: 17 }} resizeMode={'contain'} source={require('../../../assets/plus.png')} />
        } else {
            opens = <Image style={{ width: 17, height: 17 }} resizeMode={'contain'} source={require('../../../assets/less.png')} />
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
                    source={require('../../../assets/BG_LEGALES_11.png')}
                >
                    <View style={styles.imageRow}>
                        <TouchableOpacity onPress={this.goToProyectoSeriea.bind(this)}>
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
                        <View style={{}}>
                            <Text style={{ color: 'rgb(195, 145, 55)', fontWeight: 'bold', marginLeft: 20, marginRight: 20, marginTop: 20, fontSize: 22 }}>
                                Documentación del Proyecto
                            </Text>
                        </View>
                        <View style={{ width: '100%', backgroundColor: '#2F4D58', borderTopLeftRadius: 30, borderTopRightRadius: 30, marginTop: 25 }}>
                            <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>

                                <Collapse isCollapsed={this.state.collapsed}
                                    onToggle={(isCollapsed) => this.setState({ collapsed: isCollapsed })}
                                    style={{ width: '100%' }}>
                                    <CollapseHeader style={{ justifyContent: 'space-between', flexDirection: 'row', width: '100%' }}>
                                        <Text style={{ color: '#FFF', marginTop: 10, marginBottom: 10, fontFamily: 'OpenSans-Regular', fontSize: 18, marginLeft: '14%' }}>
                                            Reportes
                                        </Text>
                                        <View style={{ color: '#FFF', marginTop: 10, marginBottom: 10, fontWeight: 'bold', marginRight: '14%' }}>
                                            {opens}
                                        </View>
                                    </CollapseHeader>
                                    <CollapseBody onPress={this.goToSeriea.bind(this)} style={{ alignItems: 'center', width: '100%' }}>
                                        <View style={{ width: '83%', marginBottom: 10 }}>
                                            {reportes.map((data, key) => (
                                                <View>
                                                    <List style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                                                        <Text style={{ color: '#FFF', fontFamily: 'OpenSans-Regular', marginLeft: 15 }}>{'\u2022' + ' ' + this.mapeoDocumentNameReports(data.document_name)}</Text>
                                                        <Text onPress={() => Linking.openURL(data.document)} style={{ color: '#FFF', fontWeight: '100', marginRight: 20 }}>
                                                            <AntDesign name='download' color='#fff' size={25} />
                                                        </Text>
                                                    </List>
                                                    <ListItem style={{ justifyContent: 'space-between' }}>
                                                        <View style={{ width: '90%', justifyContent: 'space-between', flexDirection: 'row', }}>
                                                            <View style={{ width: '40%' }}>
                                                                <Text style={{ flexDirection: 'row', color: '#FFF', fontFamily: 'OpenSans-Regular' }}>{data.name}</Text>
                                                            </View>
                                                            <View style={{ width: '60%', flexDirection: 'row', justifyContent: 'space-between' }}>
                                                                <Text style={{ color: '#FFF', fontWeight: '100' }}>{data.year}</Text>
                                                                {/* <Text onPress={() => Linking.openURL(data.document)} style={{ color: '#FFF', fontFamily: 'OpenSans-Regular', marginRight: 20 }}>
                                                                    <AntDesign name='download' color='#fff' size={25} />
                                                                </Text> */}
                                                            </View>
                                                            {/* <View style={{ width: '40%' }}>
                                                                <Text style={{ flexDirection: 'row', color: '#FFF', fontWeight: '100' }}>{data.name}</Text>
                                                            </View>
                                                            <View style={{ width: '60%' }}>
                                                                <Text style={{ color: '#FFF', fontWeight: '100' }}>{data.year}</Text>
                                                            </View> */}
                                                        </View>
                                                    </ListItem>
                                                </View>
                                            ))}
                                        </View>
                                    </CollapseBody>
                                </Collapse>
                            </View>
                            <View style={{ flex: 1, width: '100%', backgroundColor: 'rgba(52, 52, 52, 0.6)', borderTopLeftRadius: 30, borderTopRightRadius: 30 }}>
                                <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                                    <Collapse isCollapsed={this.state.collapsed2}
                                        onToggle={(isCollapsed) => this.setState({ collapsed2: isCollapsed })}
                                        style={{ width: '100%' }}>
                                        <CollapseHeader style={{ justifyContent: 'space-between', flexDirection: 'row', width: '100%' }}>
                                            <Text style={{ color: '#FFF', marginTop: 10, marginBottom: 10, fontFamily: 'OpenSans-Regular', fontSize: 18, marginLeft: '14%' }}>
                                                Estados financieros
                                            </Text>
                                            <View style={{ color: '#FFF', marginTop: 10, marginBottom: 10, fontWeight: 'bold', marginRight: '14%' }}>
                                                {open2}
                                            </View>
                                        </CollapseHeader>
                                        <CollapseBody style={{ alignItems: 'center', width: '100%' }}>
                                            <View style={{ width: '83%', marginBottom: 10 }}>
                                                {estados.map((data, key) => (
                                                    <View>
                                                        <ListItem style={{ justifyContent: 'space-between' }}>
                                                            <View style={{ width: '100%', justifyContent: 'space-between', flexDirection: 'row', }}>

                                                                <View style={{ width: '30%' }}>
                                                                    <Text style={{ flexDirection: 'row', color: '#FFF', fontFamily: 'OpenSans-Regular' }}>{data.name}</Text>
                                                                </View>
                                                                <View style={{ width: '40%', flexDirection: 'row', justifyContent: 'space-between' }}>
                                                                    <Text style={{ color: '#FFF', fontWeight: '100' }}>{data.year}</Text>
                                                                    {/* <Text onPress={() => Linking.openURL(data.document)} style={{ color: '#FFF', fontFamily: 'OpenSans-Regular', marginLeft: 60 }}>
                                                                        <AntDesign name='download' color='#fff' size={25} />
                                                                    </Text> */}
                                                                </View>
                                                                <View style={{ width: '30%', flexDirection: 'row', justifyContent: 'flex-end' }}>
                                                                    <Text onPress={() => Linking.openURL(data.document)} style={{ color: '#FFF', fontFamily: 'OpenSans-Regular', paddingBottom: 10 }}>
                                                                        <AntDesign name='download' color='#fff' size={25} />
                                                                    </Text>
                                                                </View>
                                                            </View>
                                                        </ListItem>
                                                    </View>
                                                ))}
                                            </View>
                                        </CollapseBody>
                                    </Collapse>
                                </View>
                                <View style={{ justifyContent: 'flex-start', width: '100%', minHeight: 450, backgroundColor: '#2F4D58', borderTopLeftRadius: 30, borderTopRightRadius: 30 }}>
                                    <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                                        <Collapse isCollapsed={this.state.collapsed3}
                                            onToggle={(isCollapsed) => this.setState({ collapsed3: isCollapsed })}
                                            style={{ width: '100%' }}>
                                            <CollapseHeader style={{ justifyContent: 'space-between', flexDirection: 'row', width: '100%' }}>
                                                <Text style={{ color: '#FFF', marginTop: 10, marginBottom: 10, fontFamily: 'OpenSans-Regular', fontSize: 18, marginLeft: '14%' }}>
                                                    Documentos generales
                                                </Text>
                                                <View style={{ color: '#FFF', marginTop: 10, marginBottom: 10, fontWeight: 'bold', marginRight: '14%' }}>
                                                    {open3}
                                                </View>
                                            </CollapseHeader>
                                            <CollapseBody style={{ alignItems: 'center', width: '100%' }}>
                                                <View style={{ width: '83%', marginBottom: 10 }}>
                                                    {docu.map((data, key) => (
                                                        <View>
                                                            <List style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                                                                <Text style={{ color: '#FFF', fontFamily: 'OpenSans-Regular', marginLeft: 15 }}>{'\u2022' + ' ' + this.mapeoDocumentNameDatosGenerales(data.document_name)}</Text>
                                                                <Text onPress={() => Linking.openURL(data.document)} style={{ color: '#FFF', fontWeight: '100', marginRight: 20 }}>
                                                                    <AntDesign name='download' color='#fff' size={25} />
                                                                </Text>
                                                            </List>
                                                            <ListItem style={{ justifyContent: 'space-between' }}>
                                                                <View style={{ width: '90%', justifyContent: 'space-between', flexDirection: 'row', }}>
                                                                    <View style={{ width: '40%' }}>
                                                                        <Text style={{ flexDirection: 'row', color: '#FFF', fontFamily: 'OpenSans-Regular' }}>{data.name}</Text>
                                                                    </View>
                                                                    <View style={{ width: '60%', flexDirection: 'row', justifyContent: 'space-between' }}>
                                                                        <Text style={{ color: '#FFF', fontWeight: '100' }}>{data.year}</Text>
                                                                        {/* <Text onPress={() => Linking.openURL(data.document)} style={{ color: '#FFF', fontFamily: 'OpenSans-Regular', marginRight: 20 }}>
                                                                            <AntDesign name='download' color='#fff' size={25} />
                                                                        </Text> */}
                                                                    </View>
                                                                </View>
                                                            </ListItem>
                                                        </View>
                                                    ))}
                                                </View>
                                            </CollapseBody>
                                        </Collapse>
                                    </View>
                                    {/* <View style={{ justifyContent: 'space-between', flexDirection: 'row', minHeight: 450, width: '100%', backgroundColor: 'rgba(52, 52, 52, 0.6)', borderTopLeftRadius: 30, borderTopRightRadius: 30 }}>
                                        <Collapse isCollapsed={this.state.collapsed4}
                                            onToggle={(isCollapsed) => this.setState({ collapsed4: isCollapsed })}
                                            style={{ width: '100%' }}>
                                            <CollapseHeader style={{ justifyContent: 'space-between', flexDirection: 'row', width: '100%' }}>
                                                <Text style={{ color: '#FFF', marginTop: 10, marginBottom: 10, fontWeight: 'bold', fontSize: 18, marginLeft: '14%' }}>
                                                    Reporte Bimestral
                                                </Text>
                                                <Text style={{ color: '#FFF', marginTop: 10, marginBottom: 10, fontWeight: 'bold', marginRight: '14%' }}>
                                                    {open4}
                                                </Text>
                                            </CollapseHeader>
                                            <CollapseBody style={{ alignItems: 'center', width: '100%' }}>
                                                <View style={{ width: '83%', marginBottom: 10 }}>
                                                    <ListItem style={{ justifyContent: 'space-between' }}>
                                                        <Text style={{ flexDirection: 'row', color: '#FFF', fontWeight: '100' }}>{"2Q"}</Text>
                                                        <Text style={{ color: '#FFF', fontWeight: '100' }}>{"Año"}</Text>
                                                        <Text style={{ color: '#FFF', fontWeight: '100' }}>
                                                            <AntDesign name='download' color='#fff' size={25} />
                                                        </Text>
                                                    </ListItem>
                                                </View>
                                            </CollapseBody>
                                        </Collapse>
                                    </View> */}
                                </View>
                            </View>
                            {/* </ScrollView> */}
                        </View>
                    </ScrollView>
                    <Footer style={{ height: 50 }}>
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
        padding: 4,
        fontSize: 18,
        color: '#FFF',
        backgroundColor: 'rgba(52, 52, 52, 0.6)',
        height: 50,
        width: '75%',
        marginBottom: 20,
        justifyContent: 'center',
        borderRadius: 10,
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
