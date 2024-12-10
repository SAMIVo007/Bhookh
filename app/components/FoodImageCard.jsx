import React from 'react';
import {View, Text, ImageBackground} from 'react-native';
import {PrimaryButton} from './PrimaryButton';

export default function FoodImageCard({name, image, price, desc}) {
  // console.log('FoodImageCard:', name, price, desc);
  const trimName = (name, length = 23) => {
    return name.length > length ? `${name.substring(0, length)}...` : name;
  };

  return (
    <View
      className="flex-1 m-3 rounded-xl overflow-hidden"
      style={{elevation: 5}}>
      <ImageBackground
        source={{
          uri: image || 'https://cdn.dummyjson.com/recipe-images/24.webp',
        }}
        onError={error => console.log('Image Load Error:', error)}
        className="w-80 h-64 justify-end">
        <View className="bg-white bg-opacity-50 p-4 rounded-t-xl">
          <Text className=" text-xl font-Pbold">{trimName(name)}</Text>
          <Text className=" font-Pregular my-1">{trimName(desc, 30)}</Text>
          <View className="flex-row justify-between items-end ">
            <Text className=" text-base font-Pregular">Rs {price}</Text>
            <PrimaryButton type="tiny" text="5 left" className="px-5 p-2" />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}
