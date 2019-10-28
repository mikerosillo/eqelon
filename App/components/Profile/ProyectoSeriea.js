import React, { Component } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Actions } from 'react-native-router-flux';
import MapView, { Marker } from 'react-native-maps';
import { Collapse, CollapseHeader, CollapseBody, AccordionList } from 'accordion-collapse-react-native';
import { Thumbnail, List, ListItem, Separator, Footer, FooterTab } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import Realm from 'realm';
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
} from 'react-native';
var numeral = require('numeral');

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

export default class ProyectoSeriea extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
            collapsed2: false,
            collapsed3: false,
            progress: 0.4,
            markers: [],
            projectName: '',
            projectType: '',
            stateName: '',
            stateAbbre: '',
            status: '',
            logo: '',
            valorTotal: '',
            capitalizacion: '',
            rent_area: '',
            clase: '',
            direccion: '',
            longitud: 1,
            latitud: 2,
            description: '',
            numeroDeCuartos: '',
            numeroDeOficinas: '',
            numeroDeUnidadesHabitacionales: '',
            numeroDeUnidadesRetail: '',
            projectId: '1',
            whichProject: [],
            projectInfo: [],
            serieinfo: [],
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

    logout() {
        AsyncStorage.clear();
        Actions.welcome({
            type: 'reset',
        });
    }
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
        // let see = this.state.proyectoId
        // console.warn(this.state.projectInfo)
        Actions.seriea({
            // projectInfo: this.state.projectInfo,
            userDocuments: this.state.userDocuments,
            serieinfo: this.state.serieinfo,
            userFunds: this.state.userFunds
        })
    };
    goToDocuments() {
        Actions.documents({
            projectInfo: this.state.projectInfo,
            serieinfo: this.state.serieinfo,
            userFunds: this.state.userFunds,
            completion: this.state.completion,
            userDocuments: this.state.userDocuments,
        })
    }

    goToStart() {
        Actions.start({
            type: 'reset',
        });
    };
    checkType() {
        if (this.state.projectType == 0) {
            return 'Hotelería'
        } else if (this.state.projectType == 1) {
            return 'Residencial'
        } else if (this.state.projectType == 2) {
            return 'Oficinas'
        } else if (this.state.projectType == 3) {
            return 'Comercial'
        } else if (this.state.projectType == 4) {
            return 'Usos mixtos'
        } else {
            return 'Need to add option'
        }
    };
    checkStatus() {
        if (this.state.status == 0) {
            return 'En construcción'
        } else if (this.state.status == 1) {
            return 'En proceso de estabilización'
        } else if (this.state.status == 2) {
            return 'Estabilizado'
        } else {
            return 'Need to add option'
        }
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
    handlePress(e) {
        this.setState({
            markers: [
                ... this.state.markers,
                {
                    coordinate: e.nativeEvent.coordinate,
                    cost: `$${getRandomInt(50, 300)}`
                }
            ]
        })
    }
    // async getInfoProject1() {
    //     const gotToken = await AsyncStorage.getItem('ACCESS_TOKEN');
    //     const gotClient = await AsyncStorage.getItem('CLIENT');
    //     const gotUid = await AsyncStorage.getItem('UID');

    //     if (gotToken && gotClient && gotUid) {
    //         // console.warn(gotToken, gotClient, gotUid)
    //         return fetch('http://hq.eucledian.com:7270/projects', {
    //             method: 'GET',
    //             headers: {
    //                 'access-token': gotToken,
    //                 client: gotClient,
    //                 uid: gotUid,
    //             },
    //         })
    //             .then((response) => {
    //                 response
    //                     .json()
    //                     .then((data) => {
    //                         let info = data.projects[0];
    //                         console.warn(info)
    //                         let proyectoName = data.projects[0].name;
    //                         let projectType = data.projects[0].project_type;
    //                         let stateName = data.projects[0].state.name;
    //                         let stateAbbre = data.projects[0].state.abbreviation;
    //                         let status = data.projects[0].status;
    //                         let logo = data.projects[0].logo;
    //                         let numeroDeUnidadesHabitacionales = data.projects[0].housing_units;
    //                         let numeroDeUnidadesRetail = data.projects[0].retail_units;
    //                         let numeroDeCuartos = data.projects[0].rooms;
    //                         let numeroDeOficinas = data.projects[0].offices
    //                         let valorTotalNotFormated = data.projects[0].cost;
    //                         let capitalNotFormated = data.projects[0].capital;
    //                         // let numeroDeUnidadesRetail = data.projects[0].
    //                         let areaRentableNotFormated = data.projects[0].rent_area;
    //                         let clase = data.projects[0].segment;
    //                         let direccion = data.projects[0].address;
    //                         let longitud = data.projects[0].longitude;
    //                         let latitud = data.projects[0].latitude;
    //                         let description = data.projects[0].description
    //                         console.warn(status)
    //                         this.formatNumber(capitalNotFormated)
    //                         this.formatNumber2(valorTotalNotFormated)
    //                         this.formatNumber3(areaRentableNotFormated)
    //                         this.setState({
    //                             proyectoName: proyectoName,
    //                             projectType: projectType,
    //                             stateName: stateName,
    //                             stateAbbre: stateAbbre,
    //                             status: status,
    //                             logo: logo,
    //                             numeroDeCuartos: numeroDeCuartos,
    //                             numeroDeOficinas: numeroDeOficinas,
    //                             numeroDeUnidadesHabitacionales: numeroDeUnidadesHabitacionales,
    //                             numeroDeUnidadesRetail: numeroDeUnidadesRetail,
    //                             //   valorTotal: valorTotal,
    //                             //   capitalizacion: capitalizacion,
    //                             //   areaRentable: areaRentable,
    //                             clase: clase,
    //                             direccion: direccion,
    //                             latitud: latitud,
    //                             longitud: longitud,
    //                             description: description,
    //                         })
    //                         this.checkType()
    //                         this.checkStatus()
    //                         //   console.warn(data.projects[0].logo)
    //                         //   console.warn(data.projects[0])

    //                         // AsyncStorage.setItem('SERIE_NAME', JSON.stringify(data.fund.name));
    //                     })
    //                     // .then(() => {
    //                     //   AsyncStorage.getItem('SERIE_NAME').then((value) => {
    //                     //     // if (value !== null) {
    //                     //     //   const d = JSON.parse(value);
    //                     //     //   Alert.alert(JSON.stringify(d + 'from placeHolder'))
    //                     //     // } else {
    //                     //     //   Alert.alert('some wrong');
    //                     //     // }
    //                     //   });
    //                     // })
    //                     .catch((error) => {
    //                         Alert.alert(error.message);
    //                     });
    //             })
    //     }

    // };
    async getInfoProject2() {
        const gotToken = await AsyncStorage.getItem('ACCESS_TOKEN');
        const gotClient = await AsyncStorage.getItem('CLIENT');
        const gotUid = await AsyncStorage.getItem('UID');

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
                            let info = data.projects[1];
                            console.warn(info)
                            let proyectoName = data.projects[1].name;
                            let projectType = data.projects[1].project_type;
                            let stateName = data.projects[1].state.name;
                            let stateAbbre = data.projects[1].state.abbreviation;
                            let status = data.projects[1].status;
                            let logo = data.projects[1].logo;
                            let numeroDeUnidadesHabitacionales = data.projects[1].housing_units;
                            let numeroDeUnidadesRetail = data.projects[1].retail_units;
                            let valorTotalNotFormated = data.projects[1].cost;
                            let capitalNotFormated = data.projects[1].capital;
                            let projectId = data.projects[1].id
                            let areaRentableNotFormated = data.projects[1].rent_area;
                            let clase = data.projects[1].segment;
                            let direccion = data.projects[1].address;
                            let longitud = data.projects[1].longitude;
                            let latitud = data.projects[1].latitude;
                            let description = data.projects[1].description;
                            let numeroDeCuartos = data.projects[1].rooms;
                            let numeroDeOficinas = data.projects[1].offices
                            this.formatNumber(capitalNotFormated)
                            this.formatNumber2(valorTotalNotFormated)
                            this.formatNumber3(areaRentableNotFormated)
                            this.setState({
                                proyectoName: proyectoName,
                                projectType: projectType,
                                stateName: stateName,
                                stateAbbre: stateAbbre,
                                status: status,
                                logo: logo,
                                numeroDeCuartos: numeroDeCuartos,
                                numeroDeOficinas: numeroDeOficinas,
                                proyectoId: projectId,
                                numeroDeUnidadesHabitacionales: numeroDeUnidadesHabitacionales,
                                numeroDeUnidadesRetail: numeroDeUnidadesRetail,
                                //   valorTotal: valorTotal,
                                //   capitalizacion: capitalizacion,
                                //   areaRentable: areaRentable,
                                clase: clase,
                                direccion: direccion,
                                latitud: latitud,
                                longitud: longitud,
                                description: description,
                            })
                            this.checkType()
                            this.checkStatus()
                            //   console.warn(data.projects[0].logo)
                            //   console.warn(data.projects[0])

                            // AsyncStorage.setItem('SERIE_NAME', JSON.stringify(data.fund.name));
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
    addTotalToRealm = () => {
        realm = new Realm({
            schema: [{
                name: 'serieTest',
                properties:
                {
                    total: 'string',
                    // usuario_id: { type: 'int' },
                    // created_at: 'string',

                }
            }]
        });

        realm.write(() => {
            const total = realm.create('serieTest', {
                total: this.state.total_cost,
                // usuario_id: JSON.parse(this.props.user_id_journal),
                // created_at: 'jun 3 19'

            });
            //AsyncStorage.setItem('JOURNAL_ID_FROM_REALM', JSON.stringify(myDiarioFromRealm.usuario_id))
            console.warn(total)
            // this.state.diario_from_realm.push(myDiarioFromRealm.content)
            // console.warn(this.state.diario_from_realm)

        })
        //console.warn(realm.objects('user_journals'))
        //this.goToProfile()
        // let thisdiario = realm.objects('user_journals').filtered('content');
        //console.warn('this' + JSON.stringify(this.state.diario_from_realm))
        // console.warn(thisdiario)
        // if (this.state.diario_from_realm !== null) {
        //     this.goToProfile()
        // } else {
        //     Alert.alert('Please add journal')
        // }

    };
    formatNumber(num) {
        numFor = numeral(num).format('$0,0.00');
        return this.setState({ capitalizacion: numFor })
    };
    formatNumber2(num) {
        numFor = numeral(num).format('$0,0.00');
        return this.setState({ valorTotal: numFor })
    };
    formatNumber3(num) {
        numFor = numeral(num).format('0,0');
        return this.setState({ rent_area: numFor })
    };
    componentWillMount() {
        this.state.userDocuments = this.props.userDocuments
        this.state.completion = this.props.completion
        this.state.userFunds = this.props.userFunds
        this.state.projectInfo = this.props.projectInfo
        let projectInfo = this.state.projectInfo
        this.state.serieinfo = this.props.serieinfo
        let serieinfo = this.state.serieinfo
        this.state.status = this.props.projectInfo.status
        let userDocuments = this.state.userDocuments
        let completion = this.state.completion
        let status = this.state.status
        console.warn(projectInfo)
        this.setState({ projectInfo: projectInfo, serieinfo: serieinfo, status: status, userDocuments: userDocuments, completion: completion })
        this.formatNumber(projectInfo.capital)
        this.formatNumber2(projectInfo.cost)
        this.formatNumber3(projectInfo.rent_area)
    };
    //   saveProjectId(){

    //         this.goToDocuments()
    //     }
    render() {
        var project = this.state.projectInfo
        var numeroDeCuartos = project.rooms
        var numeroDeOficinas = project.offices
        var numeroDeUnidadesHabitacionales = project.housing_units
        var numeroDeUnidadesRetail = project.retail_units
        var opens = this.state.collapsed
        var open2 = this.state.collapsed2
        var open3 = this.state.collapsed3
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
        if (numeroDeCuartos !== null) {
            var numeroDeCuartos = (
                <ListItem style={{ justifyContent: 'space-between', marginBottom: 20 }}>
                    <Text style={{ flexDirection: 'row', color: '#FFF', fontWeight: 'bold' }}>{'\u2022' + ' ' + "Número de Cuartos"}</Text>
                    <Text style={{ color: '#FFF', fontWeight: '100' }}>{project.rooms}</Text>
                </ListItem>
            )
        } else {
            numeroDeCuartos = null
        };
        if (numeroDeOficinas !== null) {
            var numeroDeOficinas = (
                <ListItem style={{ justifyContent: 'space-between', marginBottom: 20 }}>
                    <Text style={{ flexDirection: 'row', color: '#FFF', fontWeight: 'bold' }}>{'\u2022' + ' ' + "Número de Oficinas"}</Text>
                    <Text style={{ color: '#FFF', fontWeight: '100' }}>{project.offices}</Text>
                </ListItem>
            )
        } else {
            numeroDeOficinas = null
        };
        if (numeroDeUnidadesHabitacionales !== null) {
            var numeroDeUnidadesHabitacionales = (
                <ListItem style={{ justifyContent: 'space-between', marginBottom: 20 }}>
                    <Text style={{ flexDirection: 'row', color: '#FFF', fontWeight: 'bold' }}>{'\u2022' + ' ' + "Número de Unidades Habitacionales"}</Text>
                    <Text style={{ color: '#FFF', fontWeight: '100' }}>{project.housing_units}</Text>
                </ListItem>
            )
        } else {
            numeroDeUnidadesHabitacionales = null
        };
        if (numeroDeUnidadesRetail !== null) {
            var numeroDeUnidadesRetail = (
                <ListItem style={{ justifyContent: 'space-between', marginBottom: 20 }}>
                    <Text style={{ flexDirection: 'row', color: '#FFF', fontWeight: 'bold' }}>{'\u2022' + ' ' + "Número de Unidades Retail"}</Text>
                    <Text style={{ color: '#FFF', fontWeight: '100' }}>{project.retail_units}</Text>
                </ListItem>
            )
        } else {
            numeroDeUnidadesRetail = null
        };
        var markers = [
            {
                latitude: this.state.latitud,
                longitude: this.state.longitud,
                title: 'Foo Place',
                subtitle: '1234 Foo Drive'
            }
        ];

        return (
            <DrawerLayoutAndroid renderNavigationView={() => drawer} drawerWidth={300}
                statusBarBackgroundColor='#1a193d' ref={_drawer => (this.drawer = _drawer)}>
                <ImageBackground
                    style={styles.imgBackground}
                    resizeMode="cover"
                    source={require('../../../assets/BG_PROYECTO.png')}
                >
                    <View style={styles.imageRow}>
                        <TouchableOpacity onPress={this.goBack.bind(this)}>
                            <Entypo name='chevron-thin-left' color='#FFF' size={30} />
                        </TouchableOpacity>
                        <Image
                            style={styles.imageEqelon1}
                            resizeMode={'contain'}
                            source={require('../../../assets/LOGO_EQELON.png')}
                        />
                        <TouchableOpacity onPress={this.openDrawer.bind(this)}>
                            <Text>{menu}</Text>
                        </TouchableOpacity>
                    </View>
                    <ScrollView style={{}}>
                        <View style={{}}>
                            <Text style={{ color: '#FFF', fontWeight: 'bold', marginLeft: 20, marginRight: 20, marginTop: 20, fontSize: 18 }}>
                                PROYECTO:
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ width: '60%' }} >
                                <Text style={{ color: 'rgb(195, 145, 55)', marginLeft: 20, fontFamily: 'OpenSans-Regular', fontSize: 22 }}>
                                    {project.name}
                                </Text>
                            </View>
                            <View style={{ width: '40%' }} >
                                <Text style={{ color: 'rgb(195, 145, 55)', marginLeft: 'auto', marginRight: 10, fontFamily: 'OpenSans-Regular', fontSize: 18 }}>
                                    {this.checkType()}
                                </Text>
                            </View>
                        </View>
                        {/* <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginTop: 10 }}>
                            <Text style={{ color: 'rgb(195, 145, 55)', marginLeft: 20, fontFamily: 'OpenSans-Regular', fontSize: 22 }}>
                                {project.name}
                            </Text>
                            <Text style={{ color: 'rgb(195, 145, 55)', marginRight: 20, fontFamily: 'OpenSans-Regular', fontSize: 18 }}>
                                {this.checkType()}
                            </Text>
                        </View> */}
                        <View style={{ marginBottom: 25 }}>
                            <Text style={{ color: '#FFF', fontWeight: 'normal', marginLeft: 20 }}>
                                {project.city}, {project.state.name}, EUA.
                            </Text>
                        </View>
                        <View style={{ justifyContent: 'flex-start', flexDirection: 'row' }}>
                            <Text style={{ color: '#FFF', fontWeight: 'normal', marginLeft: 20 }}>
                                ESTATUS:
                            </Text>
                            <Text style={{ color: '#FFF', fontWeight: 'normal', marginRight: 20, fontStyle: 'italic' }}>
                                {' '}  {this.checkStatus()}
                            </Text>
                        </View>
                        <View style={{ alignItems: 'center', marginTop: 15 }}>
                            <View style={{ backgroundColor: 'transparent', width: '90%', height: 180 }}>
                                <Image
                                    resizeMode={'contain'}
                                    source={{ uri: project.logo }}
                                    style={{ height: 180, width: '100%' }}
                                />
                            </View>
                        </View>
                        <View style={{ alignItems: 'center', marginTop: 15 }}>
                            <View style={{ width: '90%' }}>
                                <Text style={{ fontWeight: '100', color: '#FFF', textAlign: 'justify' }}>
                                    {project.description}
                                </Text>
                            </View>
                            <View style={{ width: '90%', marginTop: 20, flexDirection: 'row' }}>
                                <View style={{ width: '40%' }}>
                                    < Text style={{ color: 'rgb(195, 145, 55)', fontSize: 18, fontWeight: 'bold' }}>
                                        Valor Total:
                                    </Text>
                                </View>
                                <View style={{ width: '60%' }}>
                                    <Text style={{ color: '#FFF', fontSize: 18 }}>
                                        USD {this.state.valorTotal}
                                    </Text>
                                </View>
                            </View>
                            <View style={{ width: '90%', marginTop: 5, flexDirection: 'row' }}>
                                <View style={{ width: '40%' }}>
                                    < Text style={{ color: 'rgb(195, 145, 55)', fontSize: 18, fontWeight: 'bold' }}>
                                        Capitalización:
                                    </Text>
                                </View>
                                <View style={{ width: '60%' }}>
                                    <Text style={{ color: '#FFF', fontSize: 18 }}>
                                        USD {this.state.capitalizacion}
                                    </Text>
                                </View>
                            </View>
                            <View style={{ width: '90%', marginTop: 5, flexDirection: 'row' }}>
                                <View style={{ width: '40%' }}>
                                    < Text style={{ color: 'rgb(195, 145, 55)', fontSize: 18, fontWeight: 'bold' }}>
                                        Área Rentable:
                                    </Text>
                                </View>
                                <View style={{ width: '60%' }}>
                                    <Text style={{ color: '#FFF', fontSize: 18 }}>
                                        {this.state.rent_area}{' '}sf
                                    </Text>
                                </View>
                            </View>
                            <View style={{ width: '90%', marginTop: 5, flexDirection: 'row' }}>
                                <View style={{ width: '40%' }}>
                                    < Text style={{ color: 'rgb(195, 145, 55)', fontSize: 18, fontWeight: 'bold' }}>
                                        Clase:
                                    </Text>
                                </View>
                                <View style={{ width: '60%' }}>
                                    <Text style={{ color: '#FFF', fontSize: 18 }}>
                                        {project.segment}
                                    </Text>
                                </View>
                            </View>
                            {/* <View style={{ width: '90%', marginTop: 5, flexDirection: 'row' }}>
                                <View style={{ width: '40%' }}>
                                    < Text style={{ color: 'rgb(195, 145, 55)', fontSize: 18, fontWeight: 'bold' }}>
                                        Número de cuartos:
                                    </Text>
                                </View>
                                <View style={{ width: '60%', justifyContent:'flex-end' }}>
                                    <Text style={{ color: '#FFF', fontSize: 18 }}>
                                        {this.state.numeroDeCuartos}
                                    </Text>
                                </View>
                            </View> */}

                            <View style={{ width: '90%', marginTop: 5, flexDirection: 'row' }}>
                                <View style={{ width: '40%' }}>
                                    < Text style={{ color: 'rgb(195, 145, 55)', fontSize: 18, fontWeight: 'bold' }}>
                                        Dirección:
                                    </Text>
                                </View>
                                <View style={{ width: '60%' }}>
                                    <Text style={{ color: '#FFF', fontSize: 18, fontWeight: 'normal' }}>
                                        {project.address}
                                    </Text>
                                    {/* <Text style={{ color: '#FFF', fontSize: 18, fontWeight: 'normal' }}>
                                        Florida Bay #12345
                                    </Text> */}
                                </View>
                            </View>
                            <View style={{ backgroundColor: '#FFF', width: '90%', height: 180, marginTop: 20 }}>
                                <MapView
                                    style={{ flex: 1 }}
                                    region={{
                                        // latitude: 42.882004,
                                        // longitude: 74.582748,
                                        latitude: Number(project.latitude),
                                        longitude: Number(project.longitude),
                                        latitudeDelta: 0.0922,
                                        longitudeDelta: 0.0421
                                    }}
                                // showsUserLocation={true}
                                // annotations={markers}
                                // onPress={this.handlePress.bind(this)}
                                >
                                    <MapView.Marker
                                        coordinate={{
                                            latitude: Number(project.latitude),
                                            longitude: Number(project.longitude)
                                        }}
                                        title={"Eucledian"}
                                        description={"Development"}
                                    >
                                        <View style={styles.marker}>
                                            <Image
                                                style={styles.imageEqelon}
                                                resizeMode={'contain'}
                                                source={require('../../../assets/BOTON_RESERVAR-Recovered.png')}
                                            />


                                        </View>
                                    </MapView.Marker>
                                    {/* {this.state.markers.map((marker) => {
                                        return (
                                            <Marker {...marker} >
                                                <View style={styles.marker}>
                                                    <Text style={styles.pin}>{marker.cost}</Text>
                                                </View>
                                            </Marker>
                                        )
                                    })} */}
                                </MapView>
                            </View>
                            <View style={{ width: '84%', backgroundColor: 'rgba(52, 52, 52, 0.6)', borderRadius: 40, marginTop: 15 }}>
                                <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                                    <Collapse isCollapsed={this.state.collapsed}
                                        onToggle={(isCollapsed) => this.setState({ collapsed: isCollapsed })}
                                        style={{ width: '100%' }}>
                                        <CollapseHeader style={{ justifyContent: 'space-between', flexDirection: 'row', width: '100%' }}>
                                            <Text style={{ color: '#FFF', marginTop: 10, marginBottom: 10, fontFamily: 'OpenSans-Regular', fontSize: 20, marginLeft: '6%' }}>
                                                Información Adicional
                                            </Text>
                                            <View style={{ color: '#FFF', marginTop: 10, marginBottom: 10, fontWeight: 'bold', marginRight: '6%' }}>
                                                {opens}
                                            </View>
                                        </CollapseHeader>
                                        <CollapseBody style={{ alignItems: 'center', width: '100%' }}>
                                            <View style={{ width: '95%', marginBottom: 10, fontFamily: 'OpenSans-Regular' }}>
                                                {numeroDeCuartos}
                                                {numeroDeOficinas}
                                                {numeroDeUnidadesHabitacionales}
                                                {numeroDeUnidadesRetail}
                                            </View>
                                        </CollapseBody>
                                    </Collapse>
                                </View>
                            </View>
                            <View style={{
                                width: '84%',
                                marginTop: 15,
                                marginBottom: 25,
                            }}>
                                <TouchableOpacity style={{
                                    flexDirection: 'row',
                                    backgroundColor: 'rgb(195, 145, 55)',
                                    height: 50,
                                    width: '100%',
                                    borderRadius: 40,
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                }}
                                    onPress={this.goToDocuments.bind(this)}
                                >
                                    <Text style={{ color: '#FFF', fontFamily: 'OpenSans', fontSize: 20, marginLeft: '6%', }}>
                                        Documentación
                                    </Text>
                                    <Text style={{ color: '#FFF', marginRight: '4%' }}>
                                        <Entypo name='chevron-right' color='#FFF' size={30} />
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView >
                    <Footer style={{ height: 50 }}>
                        <FooterTab style={{ alignItems: 'center', justifyContent: 'flex-end', backgroundColor: '#000000', height: 30 }}>
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
        //flex: 1,

    },
    marker: {
        // backgroundColor: '#550bbc',
        // padding: 5,
        // borderRadius: 5,
    },
    pin: {
        color: '#FFF',
        fontWeight: 'bold',
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
        height: 30,
    },
    imageEqelon1: {
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
        //marginBottom: 20,
        //flex: 1,
        alignItems: 'flex-start',
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
