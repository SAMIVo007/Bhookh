import {View, Text, Image} from 'react-native';
import React from 'react';
import {PrimaryButton} from './PrimaryButton';

export default function FoodListCard({name, image, desc, price}) {
  const trimName = (name, length = 25) => {
    return name.length > length ? `${name.substring(0, length)}...` : name;
  };
  return (
    <View className="flex-row w-full h-32 bg-white p-4 rounded-xl shadow-sm items-center">
      <Image
        source={{uri: image}}
        className="w-24 h-full rounded-lg"
        resizeMode="cover"
      />
      <View className="ml-4 flex-1">
        <Text className="text-lg font-Pbold text-gray-800">
          {trimName(name)}
        </Text>
        <Text className="text-sm font-Pregular text-gray-600 mt-1">{desc}</Text>
        <View className="flex-row justify-between items-center">
          <Text className="text-lg font-Pregular mt-2">Rs {price}</Text>
          <PrimaryButton type="tiny" text="Buy Now" className="px-3 p-2" />
        </View>
      </View>
    </View>
  );
}
