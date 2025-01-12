import {Button, Text, TextInput} from "react-native-paper";
import {Alert, AppState, StyleSheet, View} from "react-native";
import Spacer from "@/components/Spacer";
import {useState} from "react";
import {supabase} from "@/lib/supabase";
import {useRouter} from "expo-router";

AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh()
  } else {
    supabase.auth.stopAutoRefresh()
  }
})

export default function login(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  
  const router = useRouter()

  async function signInWithEmail() {
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })

    if (error) {
      Alert.alert(error.message)
    }
    else{
      router.navigate('./(tabs)')
    }
    setLoading(false)
  }
  
  return (
    <View style={styles.container}>
      <Spacer height={96}/>
      <Text variant={"headlineLarge"} style={styles.text}>Welcome!</Text>
      <Spacer height={32}/>
      
      <TextInput mode={'outlined'} value={email} onChangeText={setEmail} label={"Email"} autoCapitalize={"none"}/>
      <Spacer height={16}/>
      <TextInput mode={'outlined'} value={password} onChangeText={setPassword} secureTextEntry={true} label={"Password"}/>
      
      <Spacer height={32}/>
      <Button onPress={() => {
        console.log(email)
        console.log(password)
        signInWithEmail()
      }} mode={"contained"} style={styles.button} loading={loading}>
        Login
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24
  },
  text: {
    alignSelf: 'center',
  },
  button: {
    width: "100%"
  }
  
})