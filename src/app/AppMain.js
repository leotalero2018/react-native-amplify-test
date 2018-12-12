import React, {Component} from 'react'
import {Dimensions, View, StyleSheet, Linking, Text} from 'react-native'
import QRCodeScanner from 'react-native-qrcode-scanner';
import * as Animatable from "react-native-animatable";
import Analytics from '@aws-amplify/analytics';
import Auth from '@aws-amplify/auth';
import awsconfig from '../../aws-exports.js';

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

console.disableYellowBox = true;



// retrieve temporary AWS credentials and sign requests
Auth.configure(awsconfig);
// send analytics events to Amazon Pinpoint
Analytics.configure(awsconfig);


class AppMain extends Component {

    render() {
        return (this.cameraView());
    }

    handleAnalyticsClick() {
        Analytics.record('AWS Amplify Tutorial Event')
            .then( (evt) => {});
    };

    cameraView() {
        return (
            <View>
                <QRCodeScanner
                    showMarker
                    ref={(node) => { this.scanner = node }}
                    cameraStyle={{height: SCREEN_HEIGHT}}
                    customMarker={
                        <View style={styles.rectangleContainer}>
                            <View style={styles.topOverlay}/>
                            <View style={{flexDirection: "row"}}>
                                <View style={styles.leftAndRightOverlay}/>

                                <View style={styles.rectangle}>

                                    <Animatable.View
                                        style={styles.scanBar}
                                        direction="alternate-reverse"
                                        iterationCount="infinite"
                                        duration={1700}
                                        easing="linear"
                                        animation={AppMain.makeSlideOutTranslation(
                                            "translateY",
                                            SCREEN_WIDTH * 0.28
                                        )}
                                    />
                                </View>

                                <View style={styles.leftAndRightOverlay}/>
                            </View>

                            <View style={styles.bottomOverlay}/>
                        </View>

                    }
                    onRead={this.onSuccess.bind(this)}
                />
            </View>
        );
    }

    onSuccess(e) {
        this.handleAnalyticsClick();
        return (
            this.props.navigation.navigate(
                'PageLink',
                {linkWeb: e.data,
                scanner:this.scanner}
            )
        );
    }

    static makeSlideOutTranslation(translationType, fromValue) {
        return {
            from: {
                [translationType]: SCREEN_WIDTH * -0.28
            },
            to: {
                [translationType]: fromValue
            }
        };
    }


}

const overlayColor = "rgba(0,0,0,0.5)"; // this gives us a black color with a 50% transparency

const rectDimensions = SCREEN_WIDTH * 0.65; // this is equivalent to 255 from a 393 device width
const rectBorderWidth = SCREEN_WIDTH * 0.005; // this is equivalent to 2 from a 393 device width
const rectBorderColor = "red";

const scanBarWidth = SCREEN_WIDTH * 0.60; // this is equivalent to 180 from a 393 device width
const scanBarHeight = SCREEN_WIDTH * 0.0025; //this is equivalent to 1 from a 393 device width
const scanBarColor = "#22ff00";

const styles = StyleSheet.create({
    qr: {
        flex: 1,
        alignItems: 'center',

    },
    camera: {
        marginTop: 150,
        width: 300,
        height: 200,
    },

    rectangleContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "transparent"
    },

    rectangle: {
        height: rectDimensions,
        width: rectDimensions,
        borderWidth: rectBorderWidth,
        borderColor: rectBorderColor,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "transparent"
    },

    topOverlay: {
        flex: 1,
        height: SCREEN_WIDTH,
        width: SCREEN_WIDTH,
        backgroundColor: overlayColor,
        justifyContent: "center",
        alignItems: "center"
    },

    bottomOverlay: {
        flex: 1,
        height: SCREEN_WIDTH,
        width: SCREEN_WIDTH,
        backgroundColor: overlayColor,
        paddingBottom: SCREEN_WIDTH * 0.25
    },

    leftAndRightOverlay: {
        height: SCREEN_WIDTH * 0.65,
        width: SCREEN_WIDTH,
        backgroundColor: overlayColor
    },

    scanBar: {
        width: scanBarWidth,
        height: scanBarHeight,
        backgroundColor: scanBarColor
    }

});

export default AppMain;

