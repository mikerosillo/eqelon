import React, { Component } from 'react';
import { Alert, Text, View, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';

const GetInfoSerie1 = async () => {
    const gotToken = await AsyncStorage.getItem('ACCESS_TOKEN');
    const gotClient = await AsyncStorage.getItem('CLIENT');
    const gotUid = await AsyncStorage.getItem('UID');

    if (gotToken && gotClient && gotUid) {
        // console.warn(gotToken, gotClient, gotUid)
        return fetch('http://hq.eucledian.com:7270/funds/1', {
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
                        console.warn(data)
                        AsyncStorage.setItem('SERIE_NAME', JSON.stringify(data.fund.name));
                    })
                    .then(() => {
                        AsyncStorage.getItem('SERIE_NAME').then((value) => {
                            if (value !== null) {
                                const d = JSON.parse(value);
                                Alert.alert(JSON.stringify(d + 'from placeHolder'))
                            } else {
                                Alert.alert('some wrong');
                            }
                        });
                    })
                    .catch((error) => {
                        Alert.alert(error.message);
                    });
            })
    }
}

export default GetInfoSerie1;

