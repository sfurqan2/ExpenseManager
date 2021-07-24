import * as React from 'react';
import {  StyleSheet, View, Text} from 'react-native';
import { COLORS, SIZES, FONTS } from '../constants';
import { TextInput } from 'react-native-paper';

const StyledInput = (props) => {
    return(
        <View style={ styles.view }>
            <TextInput
                mode='outlined'
                style={styles.body}
                {...props}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    
    view: {
        flex: 0,
        marginTop: SIZES.padding * 2, 
    },
    body: {
        backgroundColor: COLORS.white,
    },
});

export default StyledInput;
