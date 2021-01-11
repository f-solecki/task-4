import React, { Component, useEffect, useState } from 'react';
import { View, Text, Button, ImageBackground, StyleSheet } from 'react-native';
import * as MediaLibrary from "expo-media-library";

class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uri: null,
        };
    }

    componentDidMount = async () => {
        let last = await MediaLibrary.getAssetsAsync({
            first: 1,
            sortBy: MediaLibrary.SortBy.creationTime,
            mediaType: 'photo'
        })
        this.setState({ uri: last.assets[0].uri })
    }

    componentDidUpdate = async () => {
        let last = await MediaLibrary.getAssetsAsync({
            first: 1,
            sortBy: MediaLibrary.SortBy.creationTime,
            mediaType: 'photo'
        })
        this.setState({ uri: last.assets[0].uri })
    }

    render() {

        return (<View style={{ flex: 1 }}>
            <ImageBackground source={{ uri: this.state.uri }} style={styles.image} >
                <Text style={styles.text}>HomeScreen</Text>
                <Button title='Open Camera to change the photo' onPress={() => this.props.navigation.navigate('Camera')} />
            </ImageBackground>
        </View>)
    }
}

const styles = StyleSheet.create({
    text: {
        color: "white",
        fontSize: 42,
        fontWeight: "bold",
        textAlign: "center",
        backgroundColor: "#000000a0"
    },
    image: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between'
    }
})
export default HomeScreen