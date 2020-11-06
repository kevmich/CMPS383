import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  Modal,
  TouchableHighlight,
  Alert
} from "react-native";
import baseURL from "../constants/BaseUrl";
import DateTimePicker from "@react-native-community/datetimepicker";
import axios from "axios";
import { useState, useEffect } from "react";
import NumericInput from 'react-native-numeric-input'

export default FlatListBasics = () => {
  const [fields, setFields] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedField, setSelectedField] = useState();

  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [showTime, setShowTime] = useState(false);
  const [smallBucket, setSmallBucket] = useState(0);
  const [mediumBucket, setMediumBucket] = useState(0);
  const [largeBucket, setLargeBucket] = useState(0);

  // const [show, setShow] = useState(false);


  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const handleSmall = (value) => {
    setSmallBucket(value)
  }

  const handleMed = (value) => { 
    setMediumBucket(value)

  }

  const handleLarge = (value) => {
    setLargeBucket(value)

  }

  const showMode = currentMode => {
    setShow(true);
    setShowTime(!showTime);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  function handleClick(item) {
    setModalVisible(true);
    setSelectedField(item);
  }

  function purchaseTicket(element){
    axios(baseURL + "api/farm-field-tickets", {
      method: "post",
      data: {
        "ticketTimeSlot": "2020-05-25T04:36:54.172Z",
        "smallBucket" : smallBucket,
        "mediumBucket" : mediumBucket,
        "largeBucket" : largeBucket,
        "farmFieldId": element.id,
      },
      withCredentials: true
    })
    .then((res) => console.log(res))
    .catch((err) => console.log(err))
  }

  useEffect(() => {
    axios.get(baseURL + "api/farm-fields/active").then(res => {
      setFields(res.data);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Window has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              {selectedField ? selectedField.name : "select a field"}
            </Text>
            <View style={{ paddingBottom: 10 }}>
              <View style={{ paddingBottom: 10 }}>
                <NumericInput onChange={value => handleSmall(value)} />
              </View>
              <View style={{ paddingBottom: 10 }}>
                <NumericInput onChange={value => handleMed(value)} /> 
              </View>
              <View style={{ paddingBottom: 10 }}>
                <NumericInput onChange={value => handleLarge(value)} /> 
              </View>
              <Button
              onPress={() => purchaseTicket(selectedField)} 
              title="Purchase"
              />
                
            </View>
            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>

      <FlatList
        data={fields}
        renderItem={({ item }) => (
          <View style={styles.ListView}>
            <Text style={styles.getStartedText}>{item.name}</Text>
            <Image
              source={{ uri: "https://i.imgur.com/HGn2cIG.jpeg" }}
              style={styles.welcomeImage}
            />
            <Button
              color="#6BC1C1"
              style={styles.Button}
              title="Purchase"
              onPress={() => handleClick(item)}
            />
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44
  },
  welcomeImage: {
    width: "95%",
    height: 125,
    marginTop: 3,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 5
  },
  ListView: {
    marginBottom: 15,
    paddingBottom: 10,
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
    elevation: 0.25,
    borderRadius: 3
  },
  getStartedText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    lineHeight: 24,
    textAlign: "center"
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 10,
    backgroundColor: "white",
    borderRadius: 10,
    paddingHorizontal: 55,
    paddingVertical: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    width: 190
  }
});
