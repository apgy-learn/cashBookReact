import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Platform,
    ImageBackground,
    DeviceEventEmitter,
} from 'react-native';
import {Navigator} from 'react-native-deprecated-custom-components';

import CommonHeader from '../main/commonHeader';
import CommonFooter from '../main/commonFooter';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    renderTitleItem() {
        return(
            <Text style={styles.navTitleItemStyle} >记账本</Text>
        )
    }

    componentDidMount() {
        DeviceEventEmitter.emit('hiddenTabbar', false);
    }

    render() {
        return (
            <View style={styles.container} >
                <CommonHeader titleItem={() => this.renderTitleItem()} />
                <CommonFooter activeFooter={'Home'} navigation={this.props.navigation} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    navTitleItemStyle: {
        width: 60,
        height: 40,
        lineHeight: 40,
        fontSize: 16,
    }
});