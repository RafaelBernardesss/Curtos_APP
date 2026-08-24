import React from "react";
import { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    KeyboardAvoidingView,
    ScrollView,
    Platform,
    TouchableOpacity
} from 'react-native';
import AppInput from '../src/components/AppInput';
import AppButton from '../src/components/AppButton';
import { COLORS } from '../src/constants/Theme';
import {useRouter} from 'expo-router'

export default function Register() {

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    return (
            <KeyboardAvoidingView style={styles.container} behavior={Platform.OS==='ios' ? 'padding': 'height'}>
                <View style={styles.container}>
                    <Text style={styles.title}>Registre-se</Text>
                    <Text style={styles.subtitle}>Crie uma conta</Text>
                    <AppInput label="Nome" placeholder="Digite seu nome" value={nome} onChangeText={setNome}/>
                    <AppInput label="Email" placeholder="exemple@gmail.com" autoCapitalize="none" keyboardType="email-address"
                    value={email} onChangeText={setEmail} />
                    <AppInput label="Senha" placeholder="Digite sua senha" secureTextEntry value={senha} onChangeText={setSenha} />
                    <AppInput label="Confirmar senha" placeholder="Confirme sua senha" secureTextEntry value={senha}
                    onChangeText={setSenha} />
                    <AppButton title="Registrar" loading={loading}/>
                    <TouchableOpacity>
                        <Text style={styles.link} onPress={() => router.push('/index')}>Já tem uma conta ?</Text>
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
    title:{
        fontSize: 34,
        fontWeight: '900',
        color: COLORS.primary,
        textAlign: 'center'
    },
    subtitle:{
        color: '#7f8c8d',
        textAlign: 'center',
        marginTop: 20,
        fontWeight: '700'
    },
    link:{
        color:  COLORS.primaryDark,
        textAlign: 'center',
        marginTop: 20,
        fontWeight: '700'
    },
});