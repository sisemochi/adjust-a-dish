import {supabase} from "@/lib/supabase";

export async function getRestaurantItems(restaurantId: string) {
  try {
    const {data} = await supabase.from('recipes').select('*').eq('restaurant_id', restaurantId)

    if(!data){
      return []
    }
    return data.map((item) => {
      return {
        id: item.id,
        name: item.name,
        description: item.description,
        restaurantId: item.restaurant_id,
      }
    })
  } catch (error) {
    console.error('getRestaurantItems', error)
  }
}

export async function getOrderRecipesWithReplacements() {
  const { data, error } = await supabase
    .rpc('get_order_recipes_with_replacements')

  if (error) {

    console.error('Error fetching order recipes with replacements:', error)
    throw error
  }

  console.log(JSON.stringify(data))

  return data
}