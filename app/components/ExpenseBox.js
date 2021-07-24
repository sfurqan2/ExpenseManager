import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import { SIZES, COLORS, FONTS } from "../constants";
import moment from "moment";

const ExpenseBox = (props) => {
    function colorChoice(type){
        switch(type){
            case 'YEARLY':
                return COLORS.orange;
                break;
            case 'MONTHLY':
                return COLORS.green;
                break;
            case 'DAILY':
                return COLORS.blue;
                break;
            default:
                break;
        }
        
    }   

    return(
        //2021-06-05 00:43:12
        <View style={styles.box}>
            <View>
                <Text style={{...FONTS.h4, fontWeight: 'bold', color: colorChoice(props.type) }}>{props.title}</Text>
                <Text style={{ color: COLORS.lightGray2}}>{moment(props.date, "YYYY-MM-DD hh:mm:ss").add(5, 'hours').fromNow()}</Text>
                <Text style={[
                    styles.type, 
                    {backgroundColor: colorChoice(props.type)}
                ]}>{props.type}</Text>
                
            </View>
            <Text style={{ ...FONTS.h2, fontWeight:'bold', color: colorChoice(props.type)}}>{props.amount}</Text>
        </View> 
    );
}

const styles = StyleSheet.create({
    box: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 5,
        padding: SIZES.padding * 2,
        margin: 0.5,
        marginTop: SIZES.padding *2,
        backgroundColor: '#0353a4',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: SIZES.padding2
    },
    type: {
        ...FONTS.body5, 
        paddingVertical: 2, 
        paddingHorizontal: 12, 
        alignSelf: 'flex-start', 
        color: COLORS.white, 
        marginTop: SIZES.padding2, 
        borderRadius: 20,
    }
});

export default ExpenseBox;