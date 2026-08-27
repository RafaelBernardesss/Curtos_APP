import { useEffect, useState } from "react";
import React from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    SafeAreaViewBase,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    Alert
} from "react-native";
import { useRouter } from 'expo-router';
import AppButton from '../src/components/AppButton';
import AppInput from '../src/components/AppInput';
import { COLORS } from '../src/constants/Theme';

const API_URL = "http://192.168.137.70:3000";

export default function App() {

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    async function handleLogin() {
        if(!email || !senha ) {
            Alert.alert("Preencha todos os campos")
            return;
        }

        setLoading(true);
        try{
            const response = await fetch(`${API_URL}/login`, {
                method: "POST",
                headers:{
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({email, senha})
            });

            const data = await response.json();

            if(!response.ok) {
                throw new Error(data.message || "Erro ao cadastrar")
            }
            
            Alert.alert("Logado com sucesso!");
            console.log("Tentando navegar para Home")
            router.push('/Telas/HomeScreen')

        } catch(error){
            Alert.alert("Erro", error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <KeyboardAvoidingView style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <View style={styles.container}>
                <Text style={styles.title}>Curtos</Text>
                <Text style={styles.subtitle}>Junte-se a nossa mais nova comunidade</Text>
                <AppInput label="Email" placeholder="Digite seu email" autoCapitalize="none" keyboardType="email-address"
                    value={email} onChangeText={setEmail} />
                <AppInput label="senha" secureTextEntry placeholder="Digite sua senha" value={senha} onChangeText={setSenha} />
                <AppButton title="Entrar" loading={loading}  onPress={handleLogin}/>
                <TouchableOpacity>
                    <Text style={styles.link} onPress={() => router.push('/RegisterScreen')}>Criar uma conta</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 24,
        paddingBottom: '20%'

    },
    title: {
        fontSize: 34,
        fontWeight: '900',
        color: COLORS.primary,
        textAlign: 'center',
    },
    subtitle: {
        color: '#7f8c8d',
        textAlign: 'center',
        marginTop: 8,
        marginBottom: 32
    },
    link: {
        color: COLORS.primaryDark,
        textAlign: 'center',
        marginTop: 20,
        fontWeight: '700'
    }
});