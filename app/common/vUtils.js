import {StyleSheet} from 'react-native';
export const formatVND = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")+" VNĐ";
}

export const vStyles = StyleSheet.create({
    h1:{
        fontSize: 20,
        fontWeight: 'bold',
        marginTop:5,
        color:"red"
    },
    price:{
        fontSize:30,
        fontWeight: 'bold',
    }
});