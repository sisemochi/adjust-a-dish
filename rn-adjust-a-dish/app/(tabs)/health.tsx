import {Alert, FlatList, View, ViewStyle} from "react-native";
import {Card, Text, TextInput, useTheme} from "react-native-paper";
import {useEffect, useState} from "react";
import {supabase} from "@/lib/supabase";
import {Session} from "@supabase/auth-js";
import {useRouter} from "expo-router";
import Spacer from "@/components/Spacer";
import Ionicons from "@expo/vector-icons/Ionicons";

type HealthCondition = {
    id?: string,
    name?: string,
    description?: string
}

export default function health() {
    const theme = useTheme()
    const [session, setSession] = useState<Session | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [healthConditions, setHealthConditions] = useState<HealthCondition[]>([])
    const [userHealthConditions, setUserHealthConditions] = useState<HealthCondition[]>([])
    const [searchBarValue, setSearchBarValue] = useState<string>("")
    const router = useRouter()

    useEffect(() => {
        supabase.auth.getSession().then(({data: {session}}) => {
            setSession(session)
        })

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })
    }, []);

    useEffect(() => {
        if (session) {
            getHealthConditions()
            getUserHealthConditions()
        }
    }, [session]);

    const containerStyle: ViewStyle = {
        backgroundColor: theme.colors.background,
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 24,
    }


    return (
        <View style={containerStyle}>
            <TextInput value={searchBarValue} onChangeText={setSearchBarValue} mode={"outlined"}
                       label={"Add new conditions"}/>
            {searchBarValue.length >= 1 &&
                <FlatList
                    data={getFilteredHealthConditions()}
                    contentContainerStyle={{gap: 8}}
                    renderItem={({item}) => (
                        <Card onPress={() => {
                            if(!userHealthConditions.map((value)=>value.name).includes(item.name)) {
                                insertClientHealthCondition(item)
                            }
                            else {
                                Alert.alert("You already have this condition registered")
                            }
                        }}>
                            <Card.Title title={item.name} subtitle={item.description} subtitleNumberOfLines={3}/>
                        </Card>
                    )}
                />
            }
            {searchBarValue.length < 1 && (
                <View>
                    <Spacer height={24}/>
                    <Text variant={"titleMedium"} style={{color: theme.colors.primary}}>Your current health conditions</Text>
                    <Spacer height={16}/>
                    <FlatList
                        keyExtractor={(_, index)=>index.toString()}
                        data={userHealthConditions}
                        contentContainerStyle={{gap: 8}}
                        renderItem={({item}) => (
                            <Card>
                                <Card.Title title={item.name} subtitle={item.description} subtitleNumberOfLines={3}/>
                                <Card.Actions>
                                    <Ionicons
                                        name={"trash-outline"}
                                        size={24}
                                        onPress={()=>{
                                            deleteClientHealthCondition(item)
                                        }}
                                        color={theme.colors.error}
                                    />
                                </Card.Actions>
                            </Card>
                        )}
                    />
                </View>)
            }
        </View>
    )

    async function getHealthConditions() {
        try {
            setLoading(true)
            const {data, error} = await supabase
                .from('health_conditions')
                .select('id, name, description')

            if (error) {
                throw error
            }
            if (data) {
                setHealthConditions(data)
            }
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    function getFilteredHealthConditions() {
        return healthConditions.filter((value) => value.name?.toLowerCase()?.includes(searchBarValue.toLowerCase()))
    }

    async function insertClientHealthCondition(healthCondition: HealthCondition) {
        try {
            const {} = await supabase
                .from("client_health_conditions")
                .insert([{
                    "client_id": session?.user.id,
                    "health_condition_id": healthCondition.id
                }])
        } catch (error) {
            console.error(error)
        } finally {
            setSearchBarValue("")
            getUserHealthConditions()
        }
    }

    async function deleteClientHealthCondition(healthCondition: HealthCondition){
        try{
            await supabase
                .from("client_health_conditions")
                .delete()
                .eq("client_id", session?.user.id)
                .eq("health_condition_id", healthCondition.id);
        }
        catch (error){
            console.error(error)
        }
        finally {
            getUserHealthConditions()
        }
    }

    async function getUserHealthConditions() {
        setLoading(true);

        if (!session?.user) {
            console.error("No user on the session!");
            setLoading(false);
            return;
        }

        try {
            const { data, error } = await supabase
              .from('client_health_conditions')
              .select('health_conditions(id, name, description)')
              .eq('client_id', session.user.id);

            if (error) {
                console.error('Error fetching user health conditions:', error);
                return;
            }

            if (data) {
                const healthConditions = data
                  .map(item => item.health_conditions)
                  .filter(Boolean);

                setUserHealthConditions(healthConditions as HealthCondition[]);
            }
        } catch (err) {
            console.error('Error fetching user health conditions:', err);
        } finally {
            setLoading(false);
        }
    }


}