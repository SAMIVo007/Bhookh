import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from 'react-native';
import useAuth from '../store/AuthState';
import {backgroungColor} from '../constants/Colors';
import Octicons from 'react-native-vector-icons/Octicons';
import FoodImageCard from '../components/FoodImageCard';
import {MotiView} from 'moti';
import {Skeleton} from 'moti/skeleton';
import FoodListCard from '../components/FoodListCard';
import {useFoodStore} from '../store/FoodState';

export default function Home() {
  const {user} = useAuth();
  console.log('User:', user);
  
  const {foodItems, refreshing, refreshFoodItems} = useFoodStore();

  const Spacer = ({height = 16}) => <MotiView style={{height}} />;
  const RefreshView = () => (
    <View className="px-4">
      <MotiView
        transition={{
          type: 'timing',
        }}
        style={{
          flex: 1,
          padding: 16,
          justifyContent: 'center',
        }}
        animate={{backgroundColor: backgroungColor}}>
        <Skeleton colorMode={'light'} width={'100%'} />
        <Spacer height={8} />
        <Skeleton colorMode={'light'} width={'100%'} />
        <Spacer height={8} />
        <Skeleton colorMode={'light'} width={'80%'} />
        <Spacer height={8} />
      </MotiView>
    </View>
  );

  useEffect(() => {
    refreshFoodItems();
  }, []);

  const ListHeader = () => (
    <View>
      {/* welcome message */}
      <View className="mt-8 px-8">
        <Text className="font-Pextrabold text-4xl">Hello,</Text>
        <Text className="font-Pextrabold text-4xl">
          {user ? user.username : 'Abhishek'}.
        </Text>
      </View>
      <Text className="font-Pregular text-2xl mt-7 px-8">
        What do you want to eat?
      </Text>
      {/* Search bar */}
      <View className="bg-[#e1e1e1]  flex-row  mt-10 mx-8 px-8 gap-4 rounded-2xl items-center">
        <Octicons name="search" size={22} color="gray" />
        <TextInput
          placeholder="Search"
          className="flex-1 text-xl font-Pbold pt-3"
          placeholderTextColor="gray"
        />
      </View>
      {/* Categories */}
      <View className="mt-10">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            gap: 20,
            paddingInlineStart: 32,
            paddingInlineEnd: 70,
          }}>
          <TouchableOpacity className=" gap-2 items-center ">
            <View className="p-4 rounded-xl bg-primaryColor">
              <Image source={require('../assets/images/dinner.png')} />
            </View>
            <Text className="text-lg font-Pregular">Dinner</Text>
          </TouchableOpacity>

          <TouchableOpacity className=" gap-2 items-center ">
            <View className="p-4 rounded-xl bg-primaryColor">
              <Image source={require('../assets/images/lunch.png')} />
            </View>
            <Text className="text-lg font-Pregular">Lunch</Text>
          </TouchableOpacity>

          <TouchableOpacity className=" gap-2 items-center ">
            <View className="p-4 rounded-xl bg-primaryColor">
              <Image source={require('../assets/images/breakfast.png')} />
            </View>
            <Text className="text-lg font-Pregular">Breakfast</Text>
          </TouchableOpacity>

          <TouchableOpacity className=" gap-2 items-center ">
            <View className="p-4 rounded-xl bg-primaryColor">
              <Image source={require('../assets/images/dessert.png')} />
            </View>
            <Text className="text-lg font-Pregular">Dessert</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      {/* Today's special */}
      <View className="mt-8 gap-4">
        <View className="flex-row items-center justify-between px-8">
          <Text className="font-Pbold text-3xl">Today's special</Text>
          <TouchableOpacity>
            <Text className="font-Pbold text-xl text-primaryColor">
              See all
            </Text>
          </TouchableOpacity>
        </View>

        {!refreshing ? (
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            initialNumToRender={5}
            contentContainerStyle={{
              paddingInlineStart: 20,
              paddingBlockEnd: 10,
            }}
            data={foodItems}
            renderItem={({item}) => (
              <FoodImageCard
                image={item.image}
                name={item.name}
                desc={item.ingredients[0]}
                price={item.caloriesPerServing}
              />
            )}
            keyExtractor={item => item.id.toString()}
          />
        ) : (
          <RefreshView />
        )}
      </View>

      {/* Popular dish */}
      <View className="flex-row items-center justify-between px-8 my-5">
        <Text className="font-Pbold text-3xl">Popular dish</Text>
        <TouchableOpacity>
          <Text className="font-Pbold text-xl text-primaryColor">See all</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 pt-8 bg-backgroungColor">
      <StatusBar barStyle="dark-content" backgroundColor={backgroungColor} />

      <FlatList
        showsVertcalScrollIndicator={false}
        initialNumToRender={10}
        data={foodItems}
        renderItem={({item}) =>
          !refreshing ? (
            <View className="px-6 py-2">
              <FoodListCard
                image={item.image}
                name={item.name}
                desc={item.ingredients[0]}
                price={item.caloriesPerServing}
              />
            </View>
          ) : (
            <RefreshView />
          )
        }
        keyExtractor={item => item.id.toString()}
        refreshing={refreshing}
        onRefresh={refreshFoodItems}
        ListHeaderComponent={ListHeader}
      />
    </SafeAreaView>
  );
}
