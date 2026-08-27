import React from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    SafeAreaView
} from 'react-native';

export default function Home(){
    return(
        <View style={styles.container}>
            <ScrollView style={styles.container}>
                <SafeAreaView styles={styles.container}>
                    <Text>Bem vindo a tela inicial do CURTOS</Text>
                </SafeAreaView>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{

    },
})