import React, { useEffect, useState } from "react";
import {FlatList, Image, RefreshControl, ScrollView, StyleSheet, Text, Touchable, TouchableOpacity, View, BackHandler} from "react-native"
import LinearGradient from 'react-native-linear-gradient';
import axios, { Axios } from "axios";


const DetailScreen = ({navigation, route}) => {
    const [data, setData] = useState([]);
    const [refresh, setRefresh] = useState(false);

    function getDetails(id){
        axios.get('https://www.episodate.com/api/show-details?q=' + id).then((response) => {
            console.log('response', response);
            if(response?.data) {
                setData(response.data.tvShow);
            }
        }).catch((err) => {
            console.log('err', err);
        })
    }

    useEffect(() => {
        getDetails(route.params.id);

        const backAction = () => {
            navigation.goBack();
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => {
            backHandler.remove();
        };
    }, []);

    const onRefresh = () => {
        getDetails(route.params.id);
    }

    const render = ({item}) => {
        return (
            <View style={Style.genres}>
                <Text style={Style.genre}>{item}</Text>
            </View>
        )
    }

    const pictures = ({item}) => {
        return (
            <View style={{ marginRight: 20, marginTop: 10, marginBottom: 40 }}>
                <Image
                    source={{ uri: item }}
                    style={{ width: 275, height: 180 }}
                />
            </View>
        );
    }

    return (
        <LinearGradient 
            style={[Style.home]}
            colors={['#3E3E40', '#090A0E']} 
            locations={[0, 0.6]}   
        >
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refresh}
                        onRefresh={onRefresh}
                    />
                }
                style={{ height: '100%' }}
            >
                <LinearGradient
                    colors={['rgba(0,0,0,0)', '#090A0E']}
                    locations={[0, 0.6]}
                    style={{ position: 'relative', }}
                >
                    <Image
                        source={{ uri: data.image_path }}
                        style={{ width: '100%', height: 500, opacity: 0.3 }}
                    />
                    <View style={Style.titleContainer}>
                        <Text style={Style.title}>{data.name}</Text>
                        <Text style={Style.rating}>{data.rating}</Text>
                    </View>
                </LinearGradient>

                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', paddingLeft: 20 }}>
                    <FlatList
                        data={data.genres}
                        renderItem={render}
                        horizontal={true}
                    />
                </View>

                <View style={{ paddingLeft: 20, marginTop: 10, flexDirection: 'row' }}>
                    <Text style={Style.genre}>{data.runtime}m</Text>
                </View>

                <View style={Style.descContainer}>
                    <Text style={Style.descTitle}>Description :</Text>
                    <Text style={Style.desc}>{data.description}</Text>
                </View>

                <Text style={[Style.descTitle, {paddingLeft: 20, marginTop: 20}]}>Pictures : </Text>

                <View style={{ paddingHorizontal: 20 }}>
                    <FlatList
                        data={data.pictures}
                        renderItem={pictures}
                        horizontal={true}
                    />
                </View>
            </ScrollView>
            
        </LinearGradient>
    )
}

const Style = StyleSheet.create({
    title: {
        color: 'white', 
        fontWeight: 'bold',
        fontSize: 30
    },
    rating: {
        backgroundColor: '#E8E230',
        color: 'black',
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
        fontWeight: 'bold',
        fontSize: 16
    },
    titleContainer: {
        width: '100%',
        position: 'absolute',
        paddingHorizontal: 20,
        bottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    home: {
        width: '100%'
    },
    genres: {
        paddingRight: 10,
        paddingTop: 10
    },
    genre: {
        color: 'white',
        backgroundColor: '#3e3e40',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#9ca4ad',
        paddingVertical: 3,
        paddingHorizontal: 5
    },
    descTitle: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold'
    },
    descContainer: {
        marginTop: 20,
        paddingHorizontal: 20
    },
    desc: {
        color: '#9ca4ad',
        marginTop: 7
    }
})

export default DetailScreen;