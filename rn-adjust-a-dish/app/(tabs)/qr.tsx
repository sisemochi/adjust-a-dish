import {StyleSheet, View, ViewStyle} from "react-native";
import {Text, useTheme} from "react-native-paper";
import QRCode from "react-native-qrcode-svg";
import {useEffect, useState} from "react";
import {supabase} from "@/lib/supabase";

export default function qr(){
    const [loading, setLoading] = useState<boolean>(true)
    const [clientHealthConditionIds, setClientHealthConditionIds] = useState<string[]>([])

    const theme = useTheme()

    useEffect(() => {
        supabase.auth.getSession().then(({data: {session}}) => {
            if(session && session.user.id){
                getClientHealthConditionIds(session.user.id)
            }
        })
    }, []);

    const containerStyle: ViewStyle = {
        ...styles.container,
        backgroundColor: theme.colors.background
    }

    if(loading){
        return(
            <View style={containerStyle}>
                <Text variant={"titleMedium"} style={{color: theme.colors.secondary}}>Loading...</Text>
            </View>
        )
    }

    if(!clientHealthConditionIds){
        return(
            <View style={containerStyle}>
                <Text style={{color:theme.colors.error}} variant={"titleMedium"}>No health conditions found</Text>
            </View>
        )
    }

    return(
        <View style={containerStyle}>
            <QRCode value={JSON.stringify({ ids: clientHealthConditionIds })}/>
        </View>
    )

    async function getClientHealthConditionIds(userId: string){
        try {
            const {data, error} = await supabase
                .from('client_health_conditions')
                .select('health_condition_id')
                .eq('client_id', userId)

            if(error){
                throw error
            }
            if(data){
                setClientHealthConditionIds(data.map((value)=>value.health_condition_id))
            }
        }
        catch (error) {
            console.error('getClientHealthConditionIds', error)
        }
        finally {
            setLoading(false)
        }
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems:'center',
        flex:1,
        justifyContent:'center'

    }
})