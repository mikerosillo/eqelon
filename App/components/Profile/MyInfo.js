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
var numeral = require('numeral');
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
            progress: 0,
            projectInfo: [],
            serieinfo: [],
            userFunds: [],
            userName: '',
            completion: '',
            IDUSER: '',
            docName: '',
            fundDocuments: [],
            userDocuments: [],
            SERIEID: '',
            s: null,
            projects: [],
            documentFundId: '',
            app_user_fund_id: '',
            serieName: '',
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
    goToProyectoSeriea() {
        Actions.proyectoseriea();
    }
    goToSeriea() {
        Actions.seriea({
            serieinfo: this.state.serieinfo,
            userFunds: this.state.userFunds,
            userDocuments: this.state.userDocuments,
            completion: this.state.completion,
            SERIEID: this.state.SERIEID,
            projects: this.state.projects,
            documentFundId: this.state.documentFundId,
            app_user_fund_id: this.state.app_user_fund_id,
            serieName: this.state.serieName,
        });
    }

    goToSeriesDocumentsInvestors() {
        Actions.seriesDocumentsInvestors({
            serieinfo: this.state.serieinfo,
            userFunds: this.state.userFunds,
            userDocuments: this.state.userDocuments,
            completion: this.state.completion,
            fundDocuments: this.state.fundDocuments,
            SERIEID: this.state.SERIEID,
            projects: this.state.projects,
            documentFundId: this.state.documentFundId,
            app_user_fund_id: this.state.app_user_fund_id,
            serieName: this.state.serieName,
        });
    };
    appUserInfo = async () => {
        const gotToken = await AsyncStorage.getItem('ACCESS_TOKEN');
        const gotClient = await AsyncStorage.getItem('CLIENT');
        const gotUid = await AsyncStorage.getItem('UID');
        let ID = await AsyncStorage.getItem('USER_ID');
        let SERIEID = this.state.SERIEID;

        if (gotToken && gotClient && gotUid) {
            const response = await fetch(`http://hq.eucledian.com:7270/app_users/${ID}`, {
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
                        console.warn('from response', data.app_user.app_user_funds)
                        let userFunds = data.app_user.app_user_funds
                        var to = userFunds.forESach((element) => {
                            // return element.id
                            if (element.fund_id == SERIEID) {
                                return element.app_user_fund_documents
                            }
                        })
                        this.setState({ s: to })
                        console.warn('from to', this.state.s)
                    })
                })
                .catch(err => console.warn(err.message));
        }
    };


    format() {
        var num = this.state.progress;
        var n = num.toFixed(2) * 100;
        return n
    }
    mapTruUserDocuments(type) {
        var documentos = this.state.userDocuments
        console.warn(documentos)
        var containsDocType = documentos.some((element) => {
            return element.document_type == type && element.status == 1
        })
        if (containsDocType) {
            return <AntDesign name='check' color='green' size={18} />
        }
        return <Entypo name='cross' color='red' size={18} />
    };
    mapTruUserDocuments2(fundDocumentId) {
        var documentos = this.state.userDocuments
        console.warn(documentos)
        var containsDocType = documentos.some((element) => {
            return element.fund_document_id == fundDocumentId && element.status == 1
        })
        if (containsDocType) {
            return <AntDesign name='check' color='green' size={18} />
        }
        return <Entypo name='cross' color='red' size={18} />
    };
    componentWillMount() {
        // this.appUserInfo()
        this.state.serieName = this.props.serieName
        this.state.app_user_fund_id = this.props.app_user_fund_id
        this.state.documentFundId = this.props.documentFundId
        this.state.projects = this.props.projects
        this.state.SERIEID = this.props.SERIEID
        this.state.fundDocuments = this.props.fundDocuments
        this.state.completion = this.props.completion
        let serieName = this.state.serieName
        let completion = this.state.completion
        let projects = this.state.projects
        let app_user_fund_id = this.state.app_user_fund_id
        let documentFundId = this.state.documentFundId
        this.state.userDocuments = this.props.userDocuments
        let userDocuments = this.state.userDocuments
        console.warn('from myinfo', this.state.documentFundId)
        this.state.progress = this.props.completion
        let prog = this.state.progress
        this.state.userFunds = this.props.userFunds
        let userFunds = this.state.userFunds
        this.state.projectInfo = this.props.projectInfo
        let projectInfo = this.state.projectInfo
        this.state.serieinfo = this.props.serieinfo
        let serieinfo = this.state.serieinfo
        let fundDocuments = this.state.fundDocuments
        this.setState({ serieName: serieName, projectInfo: projectInfo, serieinfo: serieinfo, userFunds: userFunds, progress: prog, userDocuments: userDocuments, completion: completion, fundDocuments: fundDocuments, projects: projects, documentFundId: documentFundId, app_user_fund_id: app_user_fund_id })
        AsyncStorage.getItem('USER_NAME').then((value) => {
            this.setState({ userName: value })
        })
    }
    render() {
        var fundDocuments = this.state.fundDocuments
        var userDocuments = this.state.userDocuments
        var opens = this.state.collapsed
        var open2 = this.state.collapsed2
        var open3 = this.state.collapsed3
        var open4 = this.state.collapsed4
        if (opens == false) {
            var opens = <Image
                style={{ width: 17, height: 17 }}
                resizeMode={'contain'}
                source={require('../../../assets/plus.png')}
            />
        } else {
            opens = <Image
                style={{ width: 17, height: 17 }}
                resizeMode={'contain'}
                source={require('../../../assets/less.png')}
            />
        }
        if (open2 == false) {
            var open2 = <Image
                style={{ width: 17, height: 17 }}
                resizeMode={'contain'}
                source={require('../../../assets/plus.png')}
            />
        } else {
            open2 = <Image
                style={{ width: 17, height: 17 }}
                resizeMode={'contain'}
                source={require('../../../assets/less.png')}
            />
        }
        if (open3 == false) {
            var open3 = <Image
                style={{ width: 17, height: 17 }}
                resizeMode={'contain'}
                source={require('../../../assets/plus.png')}
            />
        } else {
            open3 = <Image
                style={{ width: 17, height: 17 }}
                resizeMode={'contain'}
                source={require('../../../assets/less.png')}
            />
        }
        if (open4 == false) {
            var open4 = <Image
                style={{ width: 17, height: 17 }}
                resizeMode={'contain'}
                source={require('../../../assets/plus.png')}
            />
        } else {
            open4 = <Image
                style={{ width: 17, height: 17 }}
                resizeMode={'contain'}
                source={require('../../../assets/less.png')}
            />
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
                        <TouchableOpacity onPress={this.goToSeriea.bind(this)}>
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
                        <View style={{ marginTop: 20, marginBottom: 20 }}>
                            {/* <MaterialCommunityIcons style={{ marginLeft: 25 }} name='face-profile' color='#FFF' size={80} /> */}
                            <Text style={{ color: '#FFF', fontSize: 20, marginLeft: 25, fontFamily: 'OpenSans-Bold' }}>{this.state.serieName}</Text>
                            <Text style={{ color: 'rgb(195, 145, 55)', fontSize: 20, marginLeft: 25, fontFamily: 'OpenSans-Regular' }}>{this.state.userName}</Text>
                        </View>
                        <View style={{ marginLeft: 24, marginTop: 20, marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ width: '40%' }}>
                                < Text style={{ color: 'rgb(195, 145, 55)', fontSize: 18, fontFamily: 'OpenSans-Bold' }}>
                                    Participación:
                                </Text>
                            </View>
                            <View style={{ width: '60%' }}>
                                <Text style={{ fontFamily: 'OpenSans-Bold', color: '#FFF', fontSize: 18 }}>
                                    20%
                                </Text>
                            </View>
                        </View>
                        {/* <ScrollView style={{ flex: 1, backgroundColor: '#2F4D58', borderTopLeftRadius: 30, borderTopRightRadius: 30 }}> */}
                        <View style={{ width: '100%', backgroundColor: '#2F4D58', borderTopLeftRadius: 30, borderTopRightRadius: 30 }}>
                            <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                                <Collapse isCollapsed={this.state.collapsed}
                                    onToggle={(isCollapsed) => this.setState({ collapsed: isCollapsed })}
                                    style={{ width: '100%' }}>
                                    <CollapseHeader style={{ justifyContent: 'space-between', flexDirection: 'row', width: '100%' }}>
                                        <Text style={{ color: '#FFF', marginTop: 10, marginBottom: 10, fontFamily: 'OpenSans-Regular', fontSize: 18, marginLeft: 25 }}>
                                            Capital commitment{"\n"}
                                            <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 15, }}>USD $152,320.00</Text>
                                        </Text>
                                        <Text style={{ color: '#FFF', marginTop: 10, marginBottom: 10, fontWeight: 'bold', marginRight: 25 }}>
                                            {opens}
                                        </Text>
                                    </CollapseHeader>
                                    <CollapseBody onPress={this.goToSeriea.bind(this)} style={{ alignItems: 'center', width: '100%' }}>
                                        <View style={{ width: '96%', marginBottom: 10 }}>
                                            {/* <ListItem style={{ justifyContent: 'space-between' }}>
                                                <Text style={{ flexDirection: 'row', color: '#FFF', fontWeight: 'bold' }}>{'\u2022' + ' ' + "Capital Invertido"}</Text>
                                                <Text style={{ color: '#FFF', fontWeight: '100' }}>$152,320.00</Text>
                                            </ListItem> */}
                                            <ListItem style={{ justifyContent: 'space-between' }}>
                                                <Text style={{ flexDirection: 'row', color: '#FFF', fontFamily: 'OpenSans-Regular' }}>{'\u2022' + ' ' + "20/05/2019"}</Text>
                                                <Text style={{ color: '#FFF', fontWeight: '100' }}>$100,000.00</Text>
                                            </ListItem>
                                            <ListItem style={{ justifyContent: 'space-between' }}>
                                                <Text style={{ flexDirection: 'row', color: '#FFF', fontFamily: 'OpenSans-Regular' }}>{'\u2022' + ' ' + "15/10/2019"}</Text>
                                                <Text style={{ color: '#FFF', fontWeight: '100' }}>$52,320.00</Text>
                                            </ListItem>
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
                                            <Text style={{ color: '#FFF', marginTop: 10, marginBottom: 10, fontFamily: 'OpenSans-Regular', fontSize: 18, marginLeft: 25 }}>
                                                Capital invertido{"\n"}
                                                <Text style={{ fontWeight: '100', fontSize: 15, }}>USD $152,320.00</Text>
                                            </Text>
                                            <Text style={{ color: '#FFF', marginTop: 10, marginBottom: 10, fontFamily: 'OpenSans-Regular', marginRight: 25 }}>
                                                {open2}
                                            </Text>
                                        </CollapseHeader>
                                        <CollapseBody onPress={this.goToSeriea.bind(this)} style={{ alignItems: 'center', width: '100%' }}>
                                            <View style={{ width: '96%', marginBottom: 10 }}>
                                                <ListItem style={{ justifyContent: 'space-between' }}>
                                                    <Text style={{ flexDirection: 'row', color: '#FFF', fontFamily: 'OpenSans-Regular' }}>{'\u2022' + ' ' + "20/05/2019"}</Text>
                                                    <Text style={{ color: '#FFF', fontWeight: '100' }}>$100,000.00</Text>
                                                </ListItem>
                                                <ListItem style={{ justifyContent: 'space-between' }}>
                                                    <Text style={{ flexDirection: 'row', color: '#FFF', fontFamily: 'OpenSans-Regular' }}>{'\u2022' + ' ' + "15/10/2019"}</Text>
                                                    <Text style={{ color: '#FFF', fontWeight: '100' }}>$52,320.00</Text>
                                                </ListItem>
                                            </View>
                                        </CollapseBody>
                                    </Collapse>
                                </View>
                                <View style={{ minHeight: 500, justifyContent: 'flex-start', width: '100%', backgroundColor: '#2F4D58', borderTopLeftRadius: 30, borderTopRightRadius: 30 }}>
                                    <View style={{ alignItems: 'center', marginTop: 10 }}>
                                        <Collapse isCollapsed={this.state.collapsed4}
                                            onToggle={(isCollapsed) => this.setState({ collapsed4: isCollapsed })}
                                            style={{ width: '100%' }}>
                                            <CollapseHeader style={{ justifyContent: 'space-between', flexDirection: 'column', width: '100%' }}>
                                                <View style={{ width: '100%', justifyContent: 'space-between', flexDirection: 'row' }}>
                                                    < Text style={{ color: '#FFF', fontSize: 18, fontFamily: 'OpenSans-Regular', marginLeft: 25 }}>
                                                        Documentos {"\n"}
                                                        {/* < Text style={{ color: '#FFF', fontSize: 18, fontFamily: 'OpenSans-Regular', marginLeft: 25 }}>
                                                            {this.format()}{' '}%
                                                        </Text> */}
                                                    </Text>
                                                    <Text style={{ color: '#FFF', fontSize: 18, marginRight: 25 }}>{open4}</Text>
                                                </View>
                                                {/* <View style={{ alignItems: 'center', marginBottom: 15, marginTop: 10 }}>
                                                    <Progress.Bar
                                                        fillStyle={{}}
                                                        progress={this.state.progress}
                                                        width={350}
                                                        height={11.25}
                                                        color={'rgb(195, 145, 55)'}
                                                        borderWidth={0}
                                                        unfilledColor={'#FFF'}
                                                    />
                                                </View> */}
                                            </CollapseHeader>
                                            <CollapseBody style={{ alignItems: 'center', width: '100%' }}>
                                                <View style={{ width: '83%', marginBottom: 10 }}>
                                                    <View>
                                                        <ListItem style={{ justifyContent: 'space-between' }}>
                                                            <View style={{ width: '80%' }}>
                                                                <Text style={{ flexDirection: 'row', color: '#FFF', fontFamily: 'OpenSans-Regular' }}>{'\u2022' + ' ' + "LPA"}</Text>
                                                            </View>

                                                            <View style={{ width: '20%', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                                                                <Text style={{ color: '#FFF', fontSize: 22, fontWeight: '100', }}>
                                                                    {this.mapTruUserDocuments(0)}
                                                                </Text>
                                                            </View>

                                                        </ListItem>
                                                    </View>
                                                    <View>
                                                        <ListItem style={{ justifyContent: 'space-between' }}>
                                                            <View style={{ width: '80%' }}>
                                                                <Text style={{ flexDirection: 'row', color: '#FFF', fontFamily: 'OpenSans-Regular' }}>{'\u2022' + ' ' + "Subscription agreement"}</Text>
                                                            </View>

                                                            <View style={{ width: '20%', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                                                                <Text style={{ color: '#FFF', fontSize: 22, fontWeight: '100', }}>
                                                                    {this.mapTruUserDocuments(1)}
                                                                </Text>
                                                            </View>

                                                        </ListItem>
                                                    </View>
                                                    <View>
                                                        <ListItem style={{ justifyContent: 'space-between' }}>
                                                            <View style={{ width: '80%' }}>
                                                                <Text style={{ flexDirection: 'row', color: '#FFF', fontFamily: 'OpenSans-Regular' }}>{'\u2022' + ' ' + "NDA"}</Text>
                                                            </View>

                                                            <View style={{ width: '20%', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                                                                <Text style={{ color: '#FFF', fontSize: 22, fontWeight: '100', }}>
                                                                    {this.mapTruUserDocuments2(2)}
                                                                </Text>
                                                            </View>

                                                        </ListItem>
                                                    </View>
                                                    <View>
                                                        <ListItem style={{ justifyContent: 'space-between' }}>
                                                            <View style={{ width: '80%' }}>
                                                                <Text style={{ flexDirection: 'row', color: '#FFF', fontFamily: 'OpenSans-Regular' }}>{'\u2022' + ' ' + "Comprobante de residencia"}</Text>
                                                            </View>

                                                            <View style={{ width: '20%', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                                                                <Text style={{ color: '#FFF', fontSize: 22, fontWeight: '100', }}>
                                                                    {this.mapTruUserDocuments2(3)}
                                                                </Text>
                                                            </View>

                                                        </ListItem>
                                                    </View>
                                                    <View>
                                                        <ListItem style={{ justifyContent: 'space-between' }}>
                                                            <View style={{ width: '80%' }}>
                                                                <Text style={{ flexDirection: 'row', color: '#FFF', fontFamily: 'OpenSans-Regular' }}>{'\u2022' + ' ' + "ALDO"}</Text>
                                                            </View>

                                                            <View style={{ width: '20%', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                                                                <Text style={{ color: '#FFF', fontSize: 22, fontWeight: '100', }}>
                                                                    {this.mapTruUserDocuments2(4)}
                                                                </Text>
                                                            </View>

                                                        </ListItem>
                                                    </View>
                                                    <View>
                                                        <ListItem style={{ justifyContent: 'space-between' }}>
                                                            <View style={{ width: '80%' }}>
                                                                <Text style={{ flexDirection: 'row', color: '#FFF', fontFamily: 'OpenSans-Regular' }}>{'\u2022' + ' ' + "Documento test"}</Text>
                                                            </View>

                                                            <View style={{ width: '20%', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                                                                <Text style={{ color: '#FFF', fontSize: 22, fontWeight: '100', }}>
                                                                    {this.mapTruUserDocuments2(18)}
                                                                </Text>
                                                            </View>

                                                        </ListItem>
                                                    </View>
                                                    <View>
                                                        <List style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                                            <TouchableOpacity onPress={this.goToSeriesDocumentsInvestors.bind(this)} >
                                                                <Text style={{ marginTop: 20, fontZise: 18, color: '#FFF', textAlign: 'center', fontFamily: 'OpenSans-Regular' }}>Ver documentos</Text>
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
                            </View>
                        </View>
                    </ScrollView >
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
                </ImageBackground >
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
    line2: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFF',
        width: '40%',
        height: '2%',
        borderRadius: 30,
        marginBottom: 50
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
