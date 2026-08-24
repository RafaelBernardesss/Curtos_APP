import React from "react";
import {
    Text,
    TextInput,
    View,
    StyleSheet
} from 'react-native';
import { COLORS, SPACING, RADIUS } from "../constants/Theme.js";

export default function AppInput({ label, error, ...props }) {
    return (
        <View style={styles.container}>
            {label && <Text style={styles.label}>{label}</Text>}
            <TextInput
                style={[styles.input, error && styles.errorInput]}
                placeholderTextColor={COLORS.muted}{...props}
            />
            {error && <Text style={styles.error}>{error}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: SPACING.md,
    },
    label: {
        color: COLORS.text,
        fontWeight: '600',
        marginBottom: 6
    },
    input: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: RADIUS.md,
        padding: SPACING.sm,
        fontSize: 16
    },
    errorInput: {
        borderColor: COLORS.danger
    },
    error: {
        colors: COLORS.danger,
        fontSize: 12,
        marginTop: 4
    }
});