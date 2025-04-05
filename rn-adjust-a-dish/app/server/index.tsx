import {StyleSheet, View, FlatList, TouchableOpacity} from "react-native";
import {Button, Text} from "react-native-paper";
import {router} from "expo-router";
import {useEffect, useState} from "react";
import {supabase} from "@/lib/supabase";
import {useIsFocused} from "@react-navigation/native";

export default function index() {
  const [loading, setLoading] = useState(false);
  const [serverId, setServerId] = useState<string>("");
  const [orders, setOrders] = useState<{
    id: string;
    status: string;
    created_at: string;
  }[]>([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    supabase.auth.getUser().then(({data: {user}}) => {
      if(user?.id){
        console.log("User ID: ", user.id);
        setServerId(user.id);
      }
    });
  }, [isFocused]);

  useEffect(() => {
    if (serverId) {
      fetchOrders();
    }
  }, [serverId, isFocused]);

  async function fetchOrders() {
    try {
      const {data, error} = await supabase.from('orders').select('*').eq('server_id', serverId);
      if (error) {
        throw error;
      }
      setOrders(data);
    } catch (e) {
      console.error(e);
    }
  }

  async function createNewOrder() {
    setLoading(true);
    try {
      const {error} = await supabase.from('orders').insert({
        server_id: serverId,
        client_id: null,
        status: 'pending',
        created_at: new Date().toISOString(),
      });
      if (error) {
        throw error;
      }
      fetchOrders();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  async function navigateToAddItem(orderId: string) {
    console.log("Navigate to add item");
    router.navigate({
      pathname: `/server/[orderId]/addItem`,
      params: {
        orderId: orderId
      }
    });
  }

  return (
    <View style={{flex: 1, padding: 24}}>
      <Text variant={"titleLarge"}>{
        orders.length ? "Orders" : "Start by taking an order"
      }</Text>

      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => navigateToAddItem(item.id)}>
            <View style={styles.itemContainer}>
              <Text>Order ID: {item.id}</Text>
              <Text>Status: {item.status}</Text>
              <Text>Created At: {item.created_at}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
      <View style={styles.buttonContainer}>
        <Button mode={'contained'} style={{width: "100%"}} onPress={createNewOrder} loading={loading}>
          Start new order
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    flexDirection: 'column-reverse'
  },
  itemContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});