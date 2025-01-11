import {FlatList, StyleSheet, View, ViewStyle} from 'react-native';
import {useEffect, useState} from "react";
import {Session} from "@supabase/auth-js";
import {supabase} from "@/lib/supabase";
import {Button, Card, Text, useTheme} from "react-native-paper";
import {useRouter} from "expo-router";
import Spacer from "@/components/Spacer";

type HealthCondition = {
    name?: string,
    description?: string
}

export default function TabOneScreen() {
    const [session, setSession] = useState<Session | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [userHealthConditions, setUserHealthConditions] = useState<HealthCondition[]>([])
    const theme = useTheme()
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
            getUserHealthConditions()
        }
    }, [session]);

    useEffect(() => {
        console.log('User health conditions:', userHealthConditions)
    }, [userHealthConditions]);

    const containerStyle: ViewStyle = {
        ...styles.container,
        backgroundColor: theme.colors.background
    }

    if (loading) {
        return (
            <View style={containerStyle}>
                <Text>Loading...</Text>
            </View>
        )
    }

    return (
        <View style={containerStyle}>
            <Text variant={"headlineSmall"} style={{color: theme.colors.onBackground}}>Your health conditions</Text>
            <Spacer height={16}/>
            {!userHealthConditions ? (
                <View style={{gap:8}}>
                    <Text style={{color:theme.colors.error}}>No health conditions found</Text>
                    <Button mode={'contained'} onPress={()=>{
                        router.navigate("/health")
                    }}>
                        <Text>Go to health</Text>
                    </Button>
                </View>
            ) : (
                <FlatList data={userHealthConditions} contentContainerStyle={{gap:8}} renderItem={({item})=> <Card>
                    <Card.Title title={item.name} subtitle={item.description}/>
                </Card>}/>
            )}
        </View>
    );

    async function getUserHealthConditions() {
        try {
            setLoading(true);
            if (!session?.user) throw new Error('No user on the session!');

            const { data, error } = await supabase
                .from('client_health_conditions')
                .select('health_conditions(name, description)')
                .eq('client_id', session.user.id);

            if (error) throw error;

            if (data) {
                // Flatten and map to HealthCondition[]
                const healthConditions = data
                    .map(item => item.health_conditions)
                    .filter(condition => condition); // Ensure no null or undefined

                setUserHealthConditions(healthConditions as HealthCondition[]);
            }
        } catch (error) {
            console.error('Error fetching user health conditions:', error);
        } finally {
            setLoading(false);
        }
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 16
    }
});
