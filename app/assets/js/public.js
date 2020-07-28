import {
    Alert,
} from 'react-native';
export function alert(message, confirm, title = '提示') {
    if (!message) return;
    Alert.alert(
        title,
        message,
        [
            {
                text: '确定',
                onPress: () =>{
                    if(confirm) {
                        confirm();
                    }
                }
            }
        ]
    )
}