import React, { useCallback, useEffect } from "react";
import {FlatList, Image, RefreshControl, ScrollView, StyleSheet, Text, Touchable, TouchableOpacity, View} from "react-native";
import axios, { Axios } from "axios";
import { useState } from "react/cjs/react.development";
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

const HomeScreen = ({navigation}) => {
    const [data, setData] = useState([]);
    const [data2, setData2] = useState([]);
    const [refresh, setRefresh] = useState(false);

    function getMovie(value){
        axios.get('https://www.episodate.com/api/most-popular?page=' + value).then((response) => {
            if(value === 1){
                if(response?.data) {
                    setData(response.data.tv_shows);
                    setRefresh(false); 
                    
                }
            } else {
                console.log('response', response);
                if(response?.data) {
                    setData2(response.data.tv_shows);
                    // console.log('data2', data2);
                    setRefresh(false);
                    
                }
            }
        }).catch((err) => {
            setRefresh(false);
            console.log('err', err);
        })
    }

    useEffect(()=> {
        getMovie(1);
        getMovie(2);
    }, []);

    const onRefresh = () => {
        setRefresh(true);
        getMovie(1);
        getMovie(2);
    }

    const render = ({item}) => {
        return (
            <TouchableOpacity 
                style={{paddingVertical: 10, paddingRight: 20}} 
                onPress={()=> navigation.navigate('Detail', {id: item?.id})}
            >
                <LinearGradient
                    colors={['#3E3E40', '#090A0E']}
                    style={Style.container}
                >
                    <View style={{ flexDirection: 'row' }}>
                        <View style={Style.imageContainer}>
                            <Image
                                source={{uri: item?.image_thumbnail_path}}
                                resizeMode="contain"
                                style={{width: 175, height: 175, borderRadius: 5}}
                            />
                        </View>
                        <View style={Style.imageContainer}>
                            <Text style={Style.title}>{item.name}</Text>
                            <View style={Style.line}/>
                            <Text style={Style.itemText}>{item.country}</Text>
                        </View>
                        <View style={Style.floatStatus}>
                            <Text style={Style.statusText}>{item.status}</Text>
                        </View>
                    </View>
                </LinearGradient>
            </TouchableOpacity>
        )
    }
    
    return (
        <LinearGradient 
            style={[Style.home, {position: 'relative'}]}
            colors={['#3E3E40', '#090A0E']} 
            locations={[0, 0.4]}   
        >
            <View style={Style.header}>
                <Text style={Style.headerText}>Movies</Text>
                <TouchableOpacity 
                onPress={()=> navigation.navigate('Profile')}
                >
                    <MaterialIcon.Button
                        name="more-horiz"
                        iconStyle={{ marginRight: 0 }}
                        backgroundColor= 'rgba(0,0,0,0)'
                        size={30}
                    />
                </TouchableOpacity>
            </View>
            <ScrollView
                refreshControl={
                <RefreshControl
                    refreshing={refresh}
                    onRefresh={onRefresh}
                />
                }
                style={{ height: '90%' }}
            >
                <View style={{marginTop: 20, marginBottom: 10}}>
                    <Text style={Style.monthText}>January</Text>
                </View>

                <FlatList 
                    data={data}
                    renderItem={render}
                    horizontal={true}
                />

                <View style={{marginTop: 20, marginBottom: 10}}>
                    <Text style={Style.monthText}>February</Text>
                </View>

                <FlatList 
                    data={data2}
                    renderItem={render}
                    horizontal={true}
                />
                
                
            </ScrollView>
        </LinearGradient>

    )
}

const Style = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderRadius: 20,
        borderBottomColor: '#3E3E40',
        borderBottomWidth: 1,
        borderLeftColor: '#3E3E40',
        borderLeftWidth: 1,
        borderRightColor: '#3E3E40',
        borderRightWidth: 2,
        // backgroundColor: '#3e3e40'
    },
    imageContainer: {
        width: 182,
        paddingVertical: 10,
        justifyContent: 'center'
        // backgroundColor: 
    },
    title: {
        color: '#eceded',
        fontSize: 20,
        fontWeight: 'bold',
        paddingBottom: 10,
    },
    itemText: {
        color: '#eceded',
        fontSize: 15,
        paddingVertical: 10
    },
    floatStatus: {
        position: 'absolute',
        right: 0,
        top: 0,
        borderTopEndRadius: 20,
        borderBottomStartRadius: 20,
        backgroundColor: '#E88C30',
        width: 80,
        alignItems: "center"
    },  
    statusText: {
        color: '#090A0E',
        paddingVertical: 8,
        fontWeight: 'bold',
        fontSize: 16
    },
    header: {
        width: "100%",
        height: 70,
        backgroundColor: 'rgba(0,0,0,0)',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10
    },
    headerText: {
        fontSize: 25,
        fontWeight: '500',
        color: '#eceded'
    },
    monthText: {
        fontSize: 25,
        fontWeight: '700',
        color: '#eceded'
    },
    home: {
        paddingHorizontal: 20,
        position: 'relative'
    }
})

export default HomeScreen