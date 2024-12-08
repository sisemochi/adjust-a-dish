import {View, StyleSheet, Alert} from "react-native";
import {Button, Text, TextInput} from "react-native-paper";
import Spacer from "@/components/Spacer";
import {useState} from "react";
import {supabase} from "@/lib/supabase";

export default function register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  
  async function signUpWithEmail() {
    setLoading(true)
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    })
    
    if (error) Alert.alert(error.message)
    if (!session) Alert.alert('Please check your inbox for email verification!')
    setLoading(false)
  }
  
  return (
    <View style={styles.container}>
      <Spacer height={96}/>
      <Text variant={"headlineLarge"} style={styles.text}>Register</Text>
      <Spacer height={32}/>
      
      <TextInput mode={'outlined'} value={email} onChangeText={setEmail} label={"Email"}/>
      <Spacer height={16}/>
      <TextInput mode={'outlined'} value={password} onChangeText={setPassword} secureTextEntry={true} label={"Password"}/>
      
      <Spacer height={24}/>
      <Button onPress={signUpWithEmail} mode={"contained"}>
        Sign up
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    paddingHorizontal: 24
  },
  text: {
    alignSelf: 'center',
  },
})