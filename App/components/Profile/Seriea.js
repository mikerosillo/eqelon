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
import Realm from 'realm';
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
var numeral = require('numeral');

let realms;

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            serieDocuments: [],
            serieDescription: '',
            serieCapitalizacion: '',
            serieValorTotal: '',
            serieName: '',
            projectInfo: [],
            whichSerie: [],
            serieinfo: [],
            projects: [],
            userFunds: [],
            completion: '',
            userDocuments: [],
            fundDocuments: [],
            SERIEID: '',
            documentFundId: '',
            app_user_fund_id: '',
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
            serieName: this.state.serieName,
            userFunds: this.state.userFunds,
            projectInfo: this.state.projectInfo,
            serieinfo: this.state.serieinfo,
            completion: this.state.completion,
            userDocuments: this.state.userDocuments,
            fundDocuments: this.state.fundDocuments,
            SERIEID: this.state.SERIEID,
            // projects: this.state.projects,
            documentFundId: this.state.documentFundId,
            app_user_fund_id: this.state.app_user_fund_id,
        })
    }
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
    goToProject() {
        console.warn(this.state.userDocuments)
        Actions.proyectoseriea({
            userDocuments: this.state.userDocuments,
            userFunds: this.state.userFunds,
            projectInfo: this.state.projectInfo,
            serieinfo: this.state.serieinfo,
            completion: this.state.completion,
            userDocuments: this.state.userDocuments,
            fundDocuments: this.state.fundDocuments,
        })

    };
    goToStart() {
        Actions.start({
            type: 'reset',
        });
    };
    saveProjectInfo(data) {
        // console.warn(data)
        this.state.projectInfo = data
        let project = this.state.projectInfo
        this.setState({ projectInfo: project })
        this.goToProject()
    };

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
    async getInfoSerie2() {
        console.warn('once')
        const gotToken = await AsyncStorage.getItem('ACCESS_TOKEN');
        const gotClient = await AsyncStorage.getItem('CLIENT');
        const gotUid = await AsyncStorage.getItem('UID');

        if (gotToken && gotClient && gotUid) {
            // console.warn(gotToken, gotClient, gotUid)
            return fetch('http://hq.eucledian.com:7270/funds/2', {
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
                            let proyecto1 = data.fund.projects[0].name;
                            let proyecto2 = data.fund.projects[1].name;
                            let capital = data.fund.capital;
                            let totalCost = data.fund.total_cost
                            console.warn(data.fund)
                            this.setState({
                                name: data.fund.name,
                                proyecto1: proyecto1,
                                proyecto2: proyecto2,
                                capital: capital,
                                totalCost: totalCost,
                            })
                            if (this.state.name && this.state.proyecto1 && this.state.proyecto2 !== null) {
                                //   this.addToToRealm()
                                console.warn(this.state.name, this.state.proyecto1, this.state.proyecto2, this.state.capital, this.state.totalCost)

                            }
                            // AsyncStorage.setItem('SERIE_NAME', JSON.stringify(data.fund.name));
                        })
                        .catch((error) => {
                            console.warn(error.message);
                        });
                })
        }

    };
    formatNumber(num) {
        numFor = numeral(num).format('$0,0.00');
        return this.setState({ serieCapitalizacion: numFor })
    }
    formatNumber2(num) {
        numFor = numeral(num).format('$0,0.00');
        return this.setState({ valorTotal: numFor })
    };
    //   howManyProjects(){
    //       let howMany = this.state.projectExist
    //       if(howMany.length = 1) {
    //           this.setState({proyecto1: howMany[0].name})
    //       }
    //   }
    async getP() {
        const gotToken = await AsyncStorage.getItem('ACCESS_TOKEN');
        const gotClient = await AsyncStorage.getItem('CLIENT');
        const gotUid = await AsyncStorage.getItem('UID');
        console.warn('serie one called')
        if (gotToken && gotClient && gotUid) {
            // console.warn(gotToken, gotClient, gotUid)
            return fetch(`http://hq.eucledian.com:7270/funds/${this.state.whichSerie}`, {
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
                            let howMany = data.fund.projects
                            this.setState({ projectExist: howMany })
                            let capitalNotFormated = data.fund.capital;
                            let valorTotalNotFormated = data.fund.total_cost
                            let name = data.fund.name
                            let description = data.fund.description
                            this.setState({
                                name: name,
                                description: description,
                            })
                            this.formatNumber(capitalNotFormated)
                            this.formatNumber2(valorTotalNotFormated)
                        })
                        // .then(() => {
                        //   AsyncStorage.getItem('SERIE_NAME').then((value) => {
                        //     // if (value !== null) {
                        //     //   const d = JSON.parse(value);
                        //     //   Alert.alert(JSON.stringify(d + 'from placeHolder'))
                        //     // } else {
                        //     //   Alert.alert('some wrong');
                        //     // }
                        //   });
                        // })
                        .catch((error) => {
                            Alert.alert(error.message);
                        });
                })
        }

    };
    // addToToRealm = () => {
    //     realms = new Realm({
    //         schema: [{
    //             name: 'serieTest',
    //             properties:
    //             {
    //                 name: 'string',
    //                 projects: 'string',
    //                 // usuario_id: { type: 'int' },
    //                 // created_at: 'string',

    //             }
    //         }]
    //     });

    //     realms.write(() => {
    //         const fromRealm = realms.create('serieTest', {
    //             name: this.state.name,
    //             projects: this.state.proyecto1,
    //             // usuario_id: JSON.parse(this.props.user_id_journal),
    //             // created_at: 'jun 3 19'

    //         });
    //         //AsyncStorage.setItem('JOURNAL_ID_FROM_REALM', JSON.stringify(myDiarioFromRealm.usuario_id))
    //         //   console.warn(toRealm)
    //         // this.state.diario_from_realm.push(myDiarioFromRealm.content)
    //         // console.warn(this.state.diario_from_realm)

    //     })
    //     console.warn(realms.objects('serieTest'))
    //     this.getRealm()
    //     // let fromRealm = realm.objects('serieTest').filtered('projects');
    //     //console.warn('this' + JSON.stringify(this.state.diario_from_realm))
    //     // console.warn(thisdiario)
    //     // if (this.state.diario_from_realm !== null) {
    //     //     this.goToProfile()
    //     // } else {
    //     //     Alert.alert('Please add journal')
    //     // }

    // };
    // getRealm = async () => {



    //     Realm.open({
    //         schema: [{
    //             name: 'serieTest',
    //             properties: {
    //                 name: 'string',
    //                 projects: 'string',
    //             }
    //         }]
    //     }).then(realm => {
    //         let result = realm.objects('serieTest').filtered(projects);
    //         console.warn(typeOf(result))
    //         this.setState({ proyecto2: result })
    //         //console.warn(this.state.diario_from_realm[0].content)

    //         var txt = [];
    //         for (var i = 0; i < result.length; i++) {
    //             txt.push(this.state.proyecto2[i].content);
    //             this.setState({ proyecto2: txt })
    //             console.warn(this.state.proyecto2)
    //         }
    //         if (this.state.proyecto2 !== null) {
    //             Alert.alert('made it')
    //         } else {
    //             Alert.alert('diario from realm is null')
    //         }

    //     });

    //     // else if (this.state.connection_Status === "Online") {
    //     //   this.getUserJournals();
    //     // }
    //     // else if (this.state.connection_Status === 'Offline') {
    //     //   this.setState({ diario_from_realm: this.props.diario_from_realm })
    //     //   // console.warn(this.state.diario_from_realm)
    //     // }


    // }
    componentWillMount() {
        this.state.app_user_fund_id = this.props.app_user_fund_id
        this.state.documentFundId = this.props.documentFundId
        this.state.SERIEID = this.props.SERIEID
        this.state.fundDocuments = this.props.fundDocuments
        this.state.userDocuments = this.props.userDocuments
        this.state.completion = this.props.completion
        this.state.userFunds = this.props.userFunds
        this.state.serieinfo = this.props.serieinfo
        let serieinfo = this.state.serieinfo
        let app_user_fund_id = this.state.app_user_fund_id
        let documentFundId = this.state.documentFundId
        this.setState({ serieinfo: serieinfo, documentFundId: documentFundId, app_user_fund_id: app_user_fund_id })
        this.state.projects = this.props.serieinfo.projects
        let projects = this.state.projects
        console.warn('from will seriea', this.state.documentFundId)
        this.setState({ projects: projects })
        this.state.serieName = this.props.serieinfo.name
        let name = this.state.serieName
        this.setState({ serieName: name })
        this.state.serieValorTotal = this.props.serieinfo.total_cost
        let valor = this.state.serieValorTotal
        this.setState({ serieValorTotal: valor })
        this.state.serieDescription = this.props.serieinfo.description
        let description = this.state.serieDescription
        this.setState({ serieDescription: description })
        this.state.serieCapitalizacion = this.props.serieinfo.capital
        let capitalizacion = this.state.serieCapitalizacion
        this.setState({ serieCapitalizacion: capitalizacion })
        this.formatNumber2(valor)
        this.formatNumber(capitalizacion)

    }
    render() {
        var proyectos = this.state.projects
        console.warn('from render', proyectos)
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
                    source={require('../../../assets/series.png')}
                >
                    <View style={styles.imageRow}>
                        <TouchableOpacity onPress={this.goToProfile.bind(this)}>
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
                        </View>
                        <View style={{ alignItems: 'center', marginLeft: 25, marginRight: 25, marginBottom: 20 }}>
                            <Text style={{ fontFamily: 'OpenSans-Regular', color: '#FFF', textAlign: 'justify' }}>
                                {this.state.serieDescription}
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ width: '50%', marginLeft: 30 }}>
                                <Text style={{ fontFamily: 'OpenSans-Bold', color: '#FFF' }}>
                                    VALOR TOTAL
                                </Text>
                                <Text style={{ fontFamily: 'OpenSans-Regular', color: '#FFF' }}>
                                    USD {this.state.valorTotal}
                                </Text>
                            </View>
                            <View style={{ width: '50%' }}>
                                <Text style={{ fontFamily: 'OpenSans-Bold', color: '#FFF' }}>
                                    CAPITALIZACIÓN
                                </Text>
                                <Text style={{ fontFamily: 'OpenSans-Regular', color: '#FFF' }}>
                                    USD {this.state.serieCapitalizacion}
                                </Text>
                            </View>

                        </View>
                        {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, marginBottom: 10 }}>
                            <Text style={{ fontWeight: 'bold', color: '#FFF', marginLeft: 40, marginRight: 40 }}>
                                VALOR TOTAL
                            </Text>
                            <Text style={{ fontWeight: 'bold', color: '#FFF', marginLeft: 40, marginRight: 40 }}>
                                CAPITALIZACIÓN
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
                            <Text style={{ fontWeight: 'bold', color: '#FFF', marginLeft: 40, marginRight: 40 }}>
                                USD {this.state.valorTotal}
                            </Text>
                            <Text style={{ fontWeight: 'bold', color: '#FFF', marginLeft: 40, marginRight: 40 }}>
                                USD {this.state.capital}
                            </Text>
                        </View> */}
                        <View style={{ alignItems: 'center', marginBottom: 10, marginTop: 10 }}>
                            <View style={{
                                width: '84%',
                            }}>
                                <TouchableOpacity style={{
                                    flexDirection: 'row',
                                    backgroundColor: '#FFF',
                                    height: 50,
                                    width: '100%',
                                    borderRadius: 15,
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                }}
                                    onPress={this.goToMyInfo.bind(this)}
                                >
                                    <Text style={{ color: '#2F4D58', fontFamily: 'OpenSans-Bold', fontSize: 20, marginLeft: '6%', }}>
                                        Mi inversión
                                    </Text>
                                    <Text style={{ color: '#FFF', marginRight: '6%', }}>
                                        <Entypo name='chevron-right' color='#151033' size={30} />
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ width: '100%', minHeight: 400, backgroundColor: 'rgb(195, 145, 55)', borderTopLeftRadius: 30, borderTopRightRadius: 30, marginTop: 10 }}>
                            <Text style={{ fontFamily: 'OpenSans-Regular', color: '#FFF', marginLeft: 25, marginTop: 25, fontSize: 18 }}>
                                PROYECTOS
                            </Text>

                            {this.state.projects.map((data, key) => (

                                <ListItem key={key} onPress={this.saveProjectInfo.bind(this, data)}
                                    style={{ justifyContent: 'space-between', width: '84%', fontFamily: 'OpenSpan-Regular' }}>
                                    <Text style={{ fontFamily: 'OpenSpan-Regular', fontSize: 18, color: '#FFF', marginLeft: 24 }}>{'\u2022' + ' ' + data.name}
                                    </Text>
                                    <Entypo name='chevron-right' color='#FFF' size={30} />
                                </ListItem>

                            ))}

                        </View>
                    </ScrollView>
                    <Footer style={{ height: 50 }}>
                        <FooterTab style={{ alignItems: 'center', justifyContent: 'flex-end', backgroundColor: '#000000', height: 30 }}>

                            <Text style={{ color: 'rgb(195, 145, 55)', fontFamily: 'OpenSans-Regular', marginRight: 20 }}>
                                WORLDSHAPERS{'  '}<Text style={{ color: 'rgb(195, 145, 55)', fontFamily: 'OpenSans-Bold' }}>FUND</Text>
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
