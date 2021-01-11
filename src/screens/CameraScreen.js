import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as Permissions from "expo-permissions";
import { Camera } from 'expo-camera';
import * as MediaLibrary from "expo-media-library";


class CameraScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasCameraPermission: null,
            type: Camera.Constants.Type.back,
            hasMediaPermission: null
        };
    }

    componentDidMount = async () => {
        let { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status == 'granted' });
        let { permMedia } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
        // this.setState({ hasMediaPermission: permMedia == 'granted' });
    }

    photo = async () => {
        if (this.camera) {
            let photo = await this.camera.takePictureAsync();
            let asset = await MediaLibrary.createAssetAsync(photo.uri)

            this.props.navigation.navigate('Home', { data: asset.uri })
        }
    }

    render() {
        const { hasCameraPermission } = this.state;

        if (hasCameraPermission == null) {
            return <View />;
        } else if (hasCameraPermission == false) {
            return <Text>No permission to use camera</Text>;
        } else {
            return (
                <View style={{ flex: 1 }}>
                    <Camera
                        ref={ref => {
                            this.camera = ref
                        }}
                        style={styles.camera}
                        type={this.state.type}>
                        <TouchableOpacity style={styles.photoButon} onPress={() => this.photo()} >
                            <View style={styles.circleButton} />
                        </TouchableOpacity>

                    </Camera>
                </View>
            );
        }
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    circleButton: {
        width: 70,
        height: 70,
        backgroundColor: 'white',
        marginBottom: 10,
        borderRadius: 35
    },
    camera: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    }

})


export default CameraScreen;
