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
    const { error, data: {session} } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })

    if (error || !session) {
      Alert.alert(error.message)
    }
    else{
      //navigate based on role
      //1. Get profile and role

      const {data} = await  supabase.from('profiles').select('role').eq('id', session.user.id).single()

      if(!data){
        Alert.alert("No profile found")
        return
      }

      //2. Navigate to the correct screen
      if(data.role === 'client' || data.role === "") {
        console.log("client role")
        router.navigate('./(tabs)')
      }
      if(data.role === 'server'){
        console.log("server role")
        router.navigate('/server')
      }
      if(data.role === 'kitchen'){
        console.log("kitchen role")
        router.navigate('/kitchen')
      }
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