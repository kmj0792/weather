import React from "react";
import {Alert} from "react-native";
import Loading from "./Loading";
import * as Location from 'expo-location';
import axios from "axios";
import Weather from "./Weather";

const API_KEY ="93c324a7c3d4608b0561fab7fca1cb40";

export default class extends React.Component {
  state={
    isLoading: true
  };
  getWeather = async(latitude,longitude) => {
    const {
      data : {main:{temp},
      weather
    }
  }=await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
      );
      //console.log(data);
      this.setState({
        isLoading:false,
        condition: weather[0].main,
        temp
      });
     
  };
  getLocation = async() => {
     //permission 요청
    try {//허가 해주면 아래과정

      await Location.requestForegroundPermissionsAsync(); 
      // coords.latitude, coords.longitude을 latitude,longitude로 받기
      const {
        coords:{latitude,longitude}
      } = await  Location.getCurrentPositionAsync();
      this.getWeather(latitude, longitude);
      
      //API로 날씨가져오기
    } catch (error) {//허가 거절하면 alert
      Alert.alert("Can't find you.", "So sad");
    }
  };

  componentDidMount(){
    this.getLocation();
  }
  render(){
    const{isLoading, temp, condition}=this.state;
    return isLoading ? <Loading /> : <Weather temp={Math.round(temp)} condition={condition}/>;
  }
}
