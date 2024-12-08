import {StyleSheet, View} from "react-native";
import {Button, Text} from "react-native-paper";
import {SafeAreaView} from "react-native-safe-area-context";
import {Image} from "expo-image";
import Spacer from "@/components/Spacer";
import {useRouter} from "expo-router";

export default function index() {
  const router = useRouter()
  
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title} variant={"displayMedium"}>Adjust a Dish</Text>
      <Spacer height={16}/>
      <Image source={require('../assets/images/home-image.png')} style={styles.image} contentFit={"contain"}/>
      
      <View style={styles.buttonContainer}>
        <Spacer height={16}/>
        <Button onPress={() => {
          router.navigate('./register')
        }} mode={"outlined"} style={styles.button}>
          Sign up
        </Button>
        <Spacer height={16}/>
        <Button onPress={() => {
          router.navigate('./login')
        }} mode={"contained"} style={styles.button}>
          Login
        </Button>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  title: {
    marginTop: 64,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
  button: {
    width: "100%"
  },
  buttonContainer: {
    flex:1,
    alignItems:"center",
    width:"100%",
    flexDirection:'column-reverse'
  },
})