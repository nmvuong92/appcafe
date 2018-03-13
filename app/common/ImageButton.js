
import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';



const ImageButton = ({ onPress, disabled, style, text, imageUrl, imageStyle }) => (
    <TouchableOpacity
        onPress={onPress}
        disabled={disabled}
        activeOpacity={0.75}
        style={{alignItems:'center'}}
        >
        <Image
            source={imageUrl}
            style={imageStyle}
            />
        <Text style={style}>
            {text}
        </Text>
    </TouchableOpacity>
);


export default ImageButton;
