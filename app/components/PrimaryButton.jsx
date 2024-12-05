import {View, Text, Pressable} from 'react-native';
import React from 'react';
import {rippleColor} from '../constants/Colors';

const ButtonType = {
  large: 'text-white text-2xl font-Pbold',
  medium: 'text-white text-xl font-Pbold',
  small: 'text-white text-lg font-Pbold',
};

export function PrimaryButton({
  className = 'p-3 px-8',
  icon,
  onPress,
  text = 'Button',
  type = 'medium',
}) {
  return (
    <View className="bg-primaryColor rounded-xl overflow-hidden">
      <Pressable
        className={className}
        onPress={onPress}
        android_ripple={{color: rippleColor}}>
        {icon ? (
          <View className="flex-row gap-2 justify-center items-center">
            {icon}
            <Text className={ButtonType[type]}>{text}</Text>
          </View>
        ) : (
          <Text className={ButtonType[type]}>{text}</Text>
        )}
      </Pressable>
    </View>
  );
}
