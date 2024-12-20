import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  ToastAndroid,
} from 'react-native';
import {backgroungColor, foregroundColor} from '../../constants/Colors';
import Octicons from 'react-native-vector-icons/Octicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {PrimaryButton} from '../../components/PrimaryButton';
import userData from '../../constants/Credentials.json';
import useAuth from '../../store/AuthState';
import * as Yup from 'yup';
import {Formik} from 'formik';

const LoginSchema = Yup.object().shape({
  username: Yup.string().required('*Username is required'),
  password: Yup.string()
    .min(3, '*Password should be a minimum of 3 characters')
    .max(16, '*Password should be a maximum of 16 characters')
    .required('*Password is required'),
});

export default function Login({navigation}) {
  const [hidden, setHidden] = useState(true);

  const {login} = useAuth();

  const handleLogin = values => {
    if (
      userData.some(
        user =>
          user.username === values.username.trim() &&
          user.password === values.password.trim(),
      )
    ) {
      console.log('Login Successful');
      login({
        username: values.username.trim(),
        password: values.password.trim(),
      });
    } else {
      console.log('Login Failed');
      ToastAndroid.show('Invalid Credentials, Try again!', ToastAndroid.SHORT);
    }
  };

  return (
    <SafeAreaView className="flex-1 pt-5 bg-backgroungColor">
      <StatusBar barStyle="dark-content" backgroundColor={backgroungColor} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {/* Welcome Image */}
        <View className="justify-center items-center gap-2">
          <Image
            source={require('../../assets/images/welcome.png')}
            className="mb-4"
          />
          <Text className="text-center text-4xl font-Pextrabold">
            Welcome back!
          </Text>
          <Text className="text-center text-xl font-Pregular">
            Login to your existant account
          </Text>
        </View>
        <Formik
          initialValues={{username: '', password: ''}}
          validationSchema={LoginSchema}
          onSubmit={handleLogin}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <>
              {/* Input Fields */}
              <View className="p-7 px-10 gap-7 w-full">
                <View>
                  <TextInput
                    placeholder="Username"
                    placeholderTextColor="#00000080"
                    onChangeText={handleChange('username')}
                    onBlur={handleBlur('username')}
                    value={values.username}
                    className="bg-foregroundColor text-black rounded-xl p-5 px-8 text-xl font-Pregular"
                  />
                  {errors.username && touched.username ? (
                    <Text className="text-red-600 text-sm font-Pregular ml-2 mt-2">
                      {errors.username}
                    </Text>
                  ) : null}
                </View>

                <View className="gap-4">
                  <View className="flex-row justify-between items-center rounded-xl bg-foregroundColor">
                    <TextInput
                      placeholder="Password"
                      placeholderTextColor="#00000080"
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      value={values.password}
                      secureTextEntry={hidden}
                      className="flex-1 text-black p-5 px-8 text-xl font-Pregular"
                    />
                    <TouchableOpacity
                      onPress={() => {
                        setHidden(state => !state);
                      }}>
                      <Octicons
                        name={hidden ? 'eye-closed' : 'eye'}
                        size={24}
                        color="#2E3A59"
                        className="mr-8"
                      />
                    </TouchableOpacity>
                  </View>
                  {errors.password && touched.password ? (
                    <Text className="text-red-600 ml-2 -mt-2 text-sm font-Pregular">
                      {errors.password}
                    </Text>
                  ) : null}
                  <TouchableOpacity>
                    <Text className="text-right font-Pbold text-primaryColor">
                      Forget Password?
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              {/* Login Button */}
              <PrimaryButton
                onPress={handleSubmit}
                text="LOG IN"
                className="p-3.5 px-14"
                type="large"
              />
            </>
          )}
        </Formik>

        {/* Social Logins and Signup Message */}
        <View className="mt-8 mx-14 gap-5 items-center justify-between">
          <Text className="text-center font-Pregular">Or connect using</Text>

          <View className="flex-row gap-8">
            <PrimaryButton
              text="Google"
              type="small"
              icon={<FontAwesome name="google" size={20} color="white" />}
              className="p-3 px-9"
            />
            <PrimaryButton
              text="Facebook"
              type="small"
              icon={<FontAwesome5 name="facebook" size={20} color="white" />}
              className="p-3 px-7"
            />
          </View>

          <View className="flex-row items-center mt-4">
            <Text className="font-Pregular">Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
              <Text className="font-Pbold text-primaryColor">Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
