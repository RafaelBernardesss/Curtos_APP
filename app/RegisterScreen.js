import React from "react";
import { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    KeyboardAvoidingView,
    ScrollView,
    Platform,
    TouchableOpacity,
    Alert
} from 'react-native';
import AppInput from '../src/components/AppInput';
import AppButton from '../src/components/AppButton';
import { COLORS } from '../src/constants/Theme';
import {useRouter} from 'expo-router'

const API_URL = "http://192.168.137.70:3000"; //Ajustando o IP e a porta do back-end e do front-end

export default function Register() {
    
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    //função para registrar
    async function handleRegister() {
        if(!nome || !email || !senha || !confirmarSenha){
            Alert.alert("Preencha todos os campos");
            return;
        }
        //condição para a verificação da senha
        if(senha !== confirmarSenha){
            Alert.alert("A senha não esta igual")
            return;
        }

        setLoading(true);

        try{
            //Variavel para poder postar 
            const response = await fetch(`${API_URL}/cadastrar`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({nome, email, senha}),
            });

            const data = await response.json();

            if(!response.ok){
                throw new Error(data.message || "Erro ao cadastrar");
            }

            Alert.alert("Usuario Cadastrado com sucesso!");
            router.push('/');

        } catch (error){
            Alert.alert("Erro", error.message);
        } finally {
            setLoading(false)
        }
    }


    return (
            <KeyboardAvoidingView style={styles.container} behavior={Platform.OS==='ios' ? 'padding': 'height'}>
                <View style={styles.container}>
                    <Text style={styles.title}>Registre-se</Text>
                    <Text style={styles.subtitle}>Crie uma conta</Text>
                    <AppInput label="Nome" placeholder="Digite seu nome" value={nome} onChangeText={setNome}/>
                    <AppInput label="Email" placeholder="exemple@gmail.com" autoCapitalize="none" keyboardType="email-address"
                    value={email} onChangeText={setEmail} />
                    <AppInput label="Senha" placeholder="Digite sua senha" secureTextEntry value={senha} onChangeText={setSenha} />
                    <AppInput label="Confirmar senha" placeholder="Confirme sua senha" secureTextEntry value={confirmarSenha}
                    onChangeText={setConfirmarSenha} />
                    <AppButton title="Registrar" loading={loading} onPress={handleRegister}/>
                    <TouchableOpacity>
                        <Text style={styles.link} onPress={() => router.push('/')}>Já tem uma conta ?</Text>
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