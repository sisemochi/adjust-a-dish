import React, {useEffect, useState} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import {Text} from 'react-native-paper';
import {useLocalSearchParams} from 'expo-router';
import {supabase} from '@/lib/supabase';
import Spacer from '@/components/Spacer';
import {getOrderRecipesWithReplacements} from '@/lib/server.supabase';

export default function SeeOrder() {
  const [orderRecipes, setOrderRecipes] = useState<{
    id: string;
    recipe_id: string | null;
    order_id: string | null;
    recipe: {
      name: string | null;
      description: string | null;
    } | null;
    replacements: {
      final_ingredient_name: string;
      original_ingredient_name: string;
      quantity: number;
      unit: string;
    }[];
  }[]>([]);
  const {orderId} = useLocalSearchParams();

  useEffect(() => {
    async function fetchOrderRecipes() {
      try {
        const {data, error} = await supabase
          .from('order_recipes')
          .select('id, recipe_id, order_id, recipe:recipes(name, description)')
          .eq('order_id', orderId);

        if (error) {
          throw error;
        }
        if (!data) {
          console.log('No data found');
          return;
        }

        const replacements = await getOrderRecipesWithReplacements();

        const recipesWithReplacements = data.map((recipe) => ({
          ...recipe,
          replacements: replacements.filter(
            (replacement) => replacement.recipe_id === recipe.recipe_id
          ),
        }));


        // console.log('Order recipes data: ', JSON.stringify(recipesWithReplacements, null, 2));
        setOrderRecipes(recipesWithReplacements);
      } catch (e) {
        console.error(e);
      }
    }

    fetchOrderRecipes();
  }, [orderId]);

  return (
    <View style={{flex: 1, padding: 24}}>
      <Text variant={'titleLarge'}>Order Details</Text>
      <Spacer height={16}/>
      <FlatList
        data={orderRecipes}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => (
          <View style={styles.itemContainer}>
            <Text>{item.recipe?.name}</Text>
            <Text>{item.recipe?.description}</Text>
            {item.replacements.map((replacement, index) => {
                if (replacement.original_ingredient_name === replacement.final_ingredient_name) {
                  return null
                }

                return (
                  <View key={index} style={styles.replacementContainer}>
                    <Text>Original Ingredient: {replacement.original_ingredient_name}</Text>
                    <Text>Replacement Ingredient: {replacement.final_ingredient_name}</Text>
                    <Text>
                      Quantity: {replacement.quantity} {replacement.unit}
                    </Text>
                  </View>
                );
              }
            )}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  replacementContainer: {
    paddingTop: 8,
    paddingLeft: 16,
  },
});