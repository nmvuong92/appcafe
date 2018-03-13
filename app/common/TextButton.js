
import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,

} from 'react-native';


const TextButton = ({ onPress, disabled, style, text, upText, upTextStyle }) => (
    <TouchableOpacity
        onPress={onPress}
        disabled={disabled}
        activeOpacity={0.75}
        style={{alignItems:'center'}}

        >
            <Text style={upTextStyle}>
                {upText}
            </Text>
            <Text style={style}>
                {text}
            </Text>
    </TouchableOpacity>
);


export default TextButton;
