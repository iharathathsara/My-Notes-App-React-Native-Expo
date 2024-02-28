import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { main_url } from "./urls";
import Loading from "./loading";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UpdateNote = ({ navigation, route }) => {
  const id = route.params.id;
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");

  const [mobile, setMobile] = useState("");

  useEffect(() => {
    loadCategory();
    getData();
  }, []);

  const loadCategory = () => {
    setIsLoading(true);
    fetch(main_url + "loadCategory.php")
      .then((r) => r.json())
      .then((r) => {
        // const arrlent = r.length;
        const dropitem = [];
        for (var i = 0; i < r.length; i++) {
          const obj = {};
          obj.label = r[i].label;
          obj.value = r[i].value;
          // var img =r[i].icon.toString();
          if (r[i].icon == "1") {
            obj.icon = () => (
              <Image
                source={require("../assets/images/edu.png")}
                style={styles.iconStyle}
              />
            );
          } else if (r[i].icon == "2") {
            obj.icon = () => (
              <Image
                source={require("../assets/images/work.png")}
                style={styles.iconStyle}
              />
            );
          } else if (r[i].icon == "3") {
            obj.icon = () => (
              <Image
                source={require("../assets/images/travel.png")}
                style={styles.iconStyle}
              />
            );
          }

          dropitem.push(obj);
        }
        setItems(dropitem);
        // try {
        // alert(r.label);
        // Alert.alert("message",r);
        // } catch (error) {
        //   console.log(error);
        // }
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getData = async () => {
    try {
      const data = await AsyncStorage.getItem("mobile");
      setMobile(data);

      var f = new FormData();
      f.append("id", id);
      fetch(main_url + "getNoteDetails.php", {
        method: "POST",
        body: f,
      })
        .then((r) => r.json())
        .then((r) => {
            // alert(r[0].title);
          setTitle(r[0].title);
          setNote(r[0].note);
          setValue(r[0].categoryId);
          setIsLoading(false);
        })
        .catch((e) => {
          console.log(e);
        });
    } catch (e) {}
  };

  const updateNote = () => {
    setIsLoading(true);

    const f = new FormData();
    f.append("id", id);
    f.append("title", title);
    f.append("type", value);
    f.append("note", note);

    fetch(main_url + "updateNote.php", {
      method: "POST",
      body: f,
    })
      .then((r) => r.text())
      .then((r) => {
        if (r == "Success") {
          Alert.alert("Success", r);
          navigation.navigate("Home");
        } else {
          Alert.alert("Warning", r);
        }
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={styles.main}>
      <View style={styles.nav}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Home");
          }}
        >
          <Image
            style={styles.signoutimg}
            source={require("../assets/images/back.png")}
          />
        </TouchableOpacity>
        <Text style={styles.navtitle}>UPDATE NOTE</Text>
      </View>
      <View style={styles.box2}>
        <TouchableOpacity
          style={styles.savebtn}
          onPress={() => {
            updateNote();
          }}
        >
          <Image
            style={styles.saveimg}
            source={require("../assets/images/save.png")}
          />
          <Text style={styles.savebtntxt}>Save</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.box1}>
        <TextInput
          style={styles.titletxt}
          onChangeText={setTitle}
          value={title}
          placeholder="Title"
        />
        <DropDownPicker
          style={styles.notetype}
          placeholder="Select Note Type"
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          dropDownContainerStyle={{ backgroundColor: "#f7e8d7" }}
        />
      </View>
      <View style={styles.box3}>
        <TextInput
          value={note}
          onChangeText={setNote}
          style={styles.notetxt}
          multiline={true}
          scrollEnabled={true}
          textAlignVertical="top"
          placeholder="Write Your Note"
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "#f7e8d7",
  },
  nav: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    marginTop: 20,
    borderBottomColor: "black",
    borderBottomWidth: 1,
  },
  navtitle: {
    fontSize: 30,
    fontFamily: "Poppins-Bold",
    paddingStart: 10,
  },
  signoutimg: {
    width: 40,
    height: 40,
  },
  box1: {
    paddingStart: 20,
    paddingEnd: 20,
    // borderWidth:1,
  },
  titletxt: {
    fontSize: 16,
    borderBottomWidth: 1,
    fontFamily: "Poppins-Bold",
  },
  notetype: {
    backgroundColor: null,
    borderWidth: 0,
    borderBottomWidth: 1,
  },
  box2: {
    paddingStart: 20,
    paddingEnd: 20,
    paddingTop: 5,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  savebtn: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#693806",
    padding: 5,
    borderRadius: 5,
  },
  saveimg: {
    width: 30,
    height: 30,
  },
  savebtntxt: {
    color: "#693806",
    fontFamily: "Poppins-Bold",
  },
  box3: {
    padding: 30,
  },
  notetxt: {
    fontSize: 16,
    fontFamily: "Poppins-Regular",
  },
  iconStyle: {
    width: 30,
    height: 30,
    borderRadius: 50,
  },
});

export default UpdateNote;
