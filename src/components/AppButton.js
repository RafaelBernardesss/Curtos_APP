import React from "react";
import {
    ActivityIndicator,
    TouchableOpacity,
    Text,
    StyleSheet
} from 'react-native'
import {SPACING, COLORS, RADIUS} from "../constants/Theme.js"

export default function AppButton({title, onPress, loading = false, disabled = false}) {
    return(
        <TouchableOpacity 
        style={[styles.button, (disabled || loading )
            && styles.disabled]}
            onPress={onPress}
            disabled={disabled || loading }>
                {loading ?
                    <ActivityIndicator color="#fff"/>:
                    <Text style={styles.title}>{title}</Text>}

        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button:{
        backgroundColor: COLORS.primary,
        padding: SPACING.md,
        borderRadius: RADIUS.md,
        alignItems: 'center'
    },
    disabled:{
        opacity: 6
    },
    text:{
        color: '#fff',
        fontSize: 16,
        fontWeight: '700'
    },
    title:{
        color: '#fff'
    }
});