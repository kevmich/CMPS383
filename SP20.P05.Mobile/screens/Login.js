import * as React from "react";
import {useState, useEffect} from 'react'
import { Animated, Easing } from 'react-native';
import baseURL from '../constants/BaseUrl'
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Alert,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Axios from "axios";
import LottieView from 'lottie-react-native';
import QRCode from 'react-native-qrcode-generator';
import Logo from '../components/images/LA.png'
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Permissions from 'expo-permissions';



export default function Login(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null)
    const [progress, setProgress] = useState()

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

    function loginSuccess(res) {
      setUser(res.data.username);
      getRole();
      setTimeout(() => {
        setProgress(0)
      }, 1000)
    }

    async function requestPermission() {
      const { status } = await Permissions.getAsync(Permissions.CAMERA);
      setHasPermission(status === 'granted')
      console.log(status)
      console.log(hasPermission)
      console.log(scanned)
      }
    function getRole(){
      Axios.get(baseURL + "api/authentication")
      .then(res => setRole(res.data.role[0]))
      .catch(error => console.warn(error))
    }

    const handleLogin = () => {
        Axios.post(baseURL + "api/authentication/login", { "Username": username, "Password": password })
        .then(res => (res.status = 200 ? loginSuccess(res) : console.log(res)))
        .catch(err => err.response.status === 400 ? Alert.alert("Error, wrong username or password. Please try again") : Alert.alert("Error, please try again."))
    }

    const handleBarCodeScanned = ({ type, data }) => {
      setScanned(true);
      Alert.alert("data" + data)
      Axios.post(data,
      {
        withCredentials: true
      }
      )

    };

    useEffect(() => {
      (async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
      })();
    }, []);

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.getStartedContainer}>
          {/* <DevelopmentModeNotice /> */}

          <Text style={styles.WelcomeText}>
            Welcome To LA Community Farms {user}
          </Text>
          {user ? (
             progress != 0 ? (<LottieView style={styles.animation} source={require('../components/animations/376-check-mark.json')} autoPlay loop={false} progress={progress}/>) 
             :
            (role == 'Admin' ? (
              
              <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={{paddingTop: 50, width: 200, height: 400}}
              />
            )
            : 
             <QRCode
                value={baseURL + "api/farm-field-tickets/1/redeem"}
                size={200}
                bgColor='black'
                fgColor='white'
                // logo={Logo}
                // logoSize={30}
                // logoBackgroundColor='transparent'
                />
            )
          ): 
            <ScrollView>
            <View>
              <TextInput style={styles.inputs}
                  placeholder="username"
                  underlineColorAndroid='transparent'
                  onChangeText={(input) => setUsername(input)}/>
                  <TextInput style={styles.inputs}
                  secureTextEntry
                  placeholder="password"
                  underlineColorAndroid='transparent'
                  onChangeText={(input) => setPassword(input)}/>

                <Button
                style={StyleSheet.Button}
                    title="Login"
                    onPress={() => handleLogin(username, password)}
              />
              </View>
              </ScrollView>
           
          }
        </View>
      </ScrollView>
    </View>
  );
  
}



Login.navigationOptions = {
  header: null
};



const styles = StyleSheet.create({
    inputs:{
        height:45,
        marginBottom:10,
        borderBottomColor: '#FFFFFF',
        flex:1,
    },
    animation: {
      marginTop: 10,
      height: 150
    },
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  developmentModeText: {
    marginBottom: 20,
    color: "rgba(0,0,0,0.4)",
    fontSize: 14,
    lineHeight: 19,
    textAlign: "center"
  },
  contentContainer: {
    paddingTop: 10
  },
  welcomeContainer: {
    alignItems: "center",
    marginBottom: 20,
    height: 210
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: "contain",
    marginTop: 3,
    marginLeft: -10
  },
  getStartedContainer: {
    alignItems: "center",
    marginHorizontal: 25
  },
  homeScreenFilename: {
    marginVertical: 7
  },
  codeHighlightText: {
    color: "rgba(96,100,109, 0.8)"
  },
  codeHighlightContainer: {
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 3,
    paddingHorizontal: 4
  },
  getStartedText: {
    fontSize: 15,
    paddingBottom: 10,
    color: "rgba(96,100,109, 1)",
    lineHeight: 24,
    textAlign: "center",
    paddingHorizontal: 50
  },
  WelcomeText: {
    fontSize: 20,
    color: "rgba(96,100,109, 1)",
    lineHeight: 27,
    textAlign: "center",
    paddingBottom: 15
  },
  tabBarInfoContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3
      },
      android: {
        elevation: 20
      }
    }),
    alignItems: "center",
    backgroundColor: "#fbfbfb",
    paddingVertical: 20
  },
  tabBarInfoText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    textAlign: "center"
  },
  navigationFilename: {
    marginTop: 5
  },
  helpContainer: {
    marginTop: 15,
    alignItems: "center"
  },
  helpLink: {
    paddingVertical: 15
  },
  helpLinkText: {
    fontSize: 14,
    color: "#2e78b7"
  },
  Button: {
    paddingLeft: '5px'
  }
});
