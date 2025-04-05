import React, {useEffect, useState} from 'react';
import {StyleSheet, View, FlatList, TouchableOpacity} from 'react-native';
import {Button, Searchbar, Text} from 'react-native-paper';
import {getRestaurantItems} from '@/lib/server.supabase';
import Spacer from '@/components/Spacer';
import {router, useLocalSearchParams} from "expo-router";
import {supabase} from "@/lib/supabase";

export default function AddItem() {
  const [restaurantItems, setRestaurantItems] = useState<{
    id: string;
    name: string | null;
    description: string | null;
    restaurantId: string | null;
  }[]>();
  const [filteredItems, setFilteredItems] = useState(restaurantItems);
  const [searchbarQuery, setSearchbarQuery] = useState<string>('');

  useEffect(() => {
    getRestaurantItems('41ecd7f4-e761-4b01-b997-610dc2e0db28').then((res) => {
      setRestaurantItems(res);
      setFilteredItems(res);
    });
  }, []);

  useEffect(() => {
    setFilteredItems(
      restaurantItems?.filter((item) =>
        item.name?.toLowerCase().includes(searchbarQuery.toLowerCase())
      )
    );
  }, [searchbarQuery, restaurantItems]);

  //get route params
  const {orderId} = useLocalSearchParams()
  console.log("orderId", orderId)

  const handleSelectItem = async (item: { id: string; name: string | null }) => {
    // Handle item selection logic here
    console.log('Selected item:', item);

    //set searchbar query to item name
    setSearchbarQuery(item.name || '');

    try {
      const {error} = await supabase.from('order_recipes').insert({
        order_id: orderId as string,
        recipe_id: item.id,
      })
      if (error) {
        throw error
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View style={{flex: 1, padding: 24}}>
      <Text variant={'titleLarge'}>Add item to order</Text>
      <Spacer height={16}/>
      <Searchbar
        placeholder="Search items"
        value={searchbarQuery}
        onChangeText={setSearchbarQuery}
      />
      <Spacer height={16}/>
      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => handleSelectItem(item)}>
            <View style={styles.itemContainer}>
              <Text>{item.name}</Text>
              <Text>{item.description}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
      <View style={styles.buttonContainer}>
        <Button mode={'outlined'} style={{width: '100%'}} onPress={()=>{
          router.navigate({
            pathname: `/server/[orderId]/seeOrder`,
            params: {
              orderId: orderId as string
            }
          })
        }}>
          Skip QR Code
        </Button>
        <Button mode={'contained'} style={{width: '100%'}}>
          Scan QR Code
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  buttonContainer: {
    width: '100%',
    gap: 8,
  },
});