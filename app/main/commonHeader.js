import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Platform,
} from 'react-native';
import PropTypes from 'prop-types';

const {width, height} = Dimensions.get('window');

export default class CommonHeader extends Component {
    static propTypes = {
        leftItem: PropTypes.func,
        titleItem: PropTypes.func,
        rightItem: PropTypes.func,
    }
    renderLeftItem() {
        if (this.props.leftItem === undefined) {
            return;
        }
        return this.props.leftItem();
    }
    renderTitleItem() {
        if (this.props.titleItem === undefined) {
            return;
        }
        return this.props.titleItem();
    }
    renderRightItem() {
        if (this.props.rightItem === undefined) {
            return ;
        }
        return this.props.rightItem();
    }

    render() {
        return(
            <View style={styles.container}>
                <View>{this.renderLeftItem()}</View>
                <View>{this.renderTitleItem()}</View>
                <View>{this.renderRightItem()}</View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: width,
        height: Platform.OS === 'ios' ? 64 : 44,
        backgroundColor: '#f9db61',
        borderBottomWidth: 0.5,
        borderBottomColor: 'gray',
        paddingTop: Platform.OS === 'ios' ? 15 : 0,
    }
})