import React, {Component} from 'react'
import {View, WebView, StyleSheet, Image,TouchableOpacity,BackAndroid} from 'react-native'

class PageLink extends Component {


    static navigationOptions = ({navigation}) => {
        const {params} = navigation.state;

        const goBack=()=>{
            params.scanner.reactivate();
            return(

                navigation.goBack()
            );
        };

        return {
            title: params.linkWeb,
            headerLeft: <TouchableOpacity onPress={()=>goBack()}>
                <Image source={require('../img/go_back.png')} style={{marginLeft: 20}}/>
            </TouchableOpacity>,

        }
    };

    componentDidMount() {
        BackAndroid.addEventListener('hardwareBackPress', () => {
            this.props.navigation.getParam('scanner').reactivate();
            return false;
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <WebView
                    source={{
                        uri: this.getLink()
                    }}
                />
            </View>
        );
    }

    getLink() {
        return (
            this.props.navigation.getParam('linkWeb').toString()
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});

export default PageLink;