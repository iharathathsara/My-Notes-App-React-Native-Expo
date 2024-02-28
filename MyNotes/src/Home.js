import { useFocusEffect } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  BackHandler,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Loading from "./loading";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { main_url } from "./urls";

const Home = ({ navigation }) => {
  //   useFocusEffect(
  //     React.useCallback(() => {
  //       const disableBackButton = () => true;
  //       BackHandler.addEventListener("hardwareBackPress", disableBackButton);
  //       return () => {
  //         BackHandler.removeEventListener("hardwareBackPress", disableBackButton);
  //       };
  //     }, [])
  //   );

  useEffect(() => {
    navigation.addListener("focus", () => {
      getData();
    });
    // getUserDetails();
  }, []);

  const [isLoading, setIsLoading] = useState(true);
  const [mobile, setMobile] = useState("");
  const [name, setName] = useState("");
  const [usertype, setUsertype] = useState("");
  const [userimgpath, setUserimgpath] = useState("");
  const [item, setItem] = useState([]);

  const getData = async () => {
    try {
      const data = await AsyncStorage.getItem("mobile");
      setMobile(data);

      var f = new FormData();
      f.append("mobile", data);
      fetch(main_url + "getDetails.php", {
        method: "POST",
        body: f,
      })
        .then((r) => r.json())
        .then((r) => {
          // alert(r[0].note);
          setItem(r);
          setIsLoading(false);
        })
        .catch((e) => {
          console.log(e);
        });
      // setIsLoading(true);
      var f1 = new FormData();
      f1.append("mobile", data);
      fetch(main_url + "getUserDetails.php", {
        method: "POST",
        body: f1,
      })
        .then((r1) => r1.json())
        .then((r1) => {
          // alert(r1[0].name);
          setName(r1[0].name);
          setUsertype(r1[0].type);
          setUserimgpath(r1[0].img);
          // alert(userimgpath);
          setIsLoading(false);
        })
        .catch((e1) => {
          console.log(e1);
        });
    } catch (e) {}

    // setIsLoading(true);
  };

  const updateNote = (id) => {
    const obj = { id: id };
    navigation.navigate("UpdateNote", obj);
  };

  const signOut = async () => {
    try {
      const data = await AsyncStorage.removeItem("mobile");
      navigation.navigate("Signin");
    } catch (error) {}
  };

  const userUi = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.notebox}
        onPress={() => {
          updateNote(item.id);
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <Image style={styles.noteimg} source={{ uri: main_url + item.img }} />
          <View style={styles.box6}>
            <Text style={styles.notetitle}>{item.title}</Text>
            <Text style={{ width: 180, height: 20 }}>{item.note}</Text>
          </View>
        </View>

        <View style={{ alignSelf: "flex-end" }}>
          <Text style={styles.notetime}>{item.datetime}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  if (isLoading) {
    <Loading />;
  }
  return (
    <SafeAreaView style={styles.main}>
      <View style={styles.nav}>
        <Text style={styles.navtitle}>Home</Text>
        <TouchableOpacity
          onPress={() => {
            signOut();
          }}
        >
          <Image
            style={styles.signoutimg}
            source={require("../assets/images/signout.png")}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.box4}>
        <View style={styles.box1}>
          <Image
            style={styles.profileimg}
            source={{ uri: main_url + userimgpath }}
          />

          <View style={styles.box2}>
            <Text style={styles.username}>{name}</Text>
            <Text>{usertype}</Text>
          </View>
        </View>
        <View style={styles.box3}>
          <TouchableOpacity
            style={styles.createbtn}
            onPress={() => {
              navigation.navigate("Newnote");
            }}
          >
            <Image
              style={styles.plusimg}
              source={require("../assets/images/pluse.png")}
            />
            <Text>New Note</Text>
          </TouchableOpacity>
        </View>
      </View>
      <FlatList style={styles.box5} data={item} renderItem={userUi} />
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
    justifyContent: "space-between",
    padding: 15,
    marginTop: 20,
    borderBottomColor: "black",
    borderBottomWidth: 1,
  },
  navtitle: {
    fontSize: 30,
    fontFamily: "Poppins-Bold",
  },
  signoutimg: {
    width: 40,
    height: 40,
  },
  box1: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  profileimg: {
    width: 80,
    height: 80,
    borderRadius: 50,
  },
  box2: {
    paddingStart: 20,
  },
  username: {
    fontSize: 20,
    fontFamily: "Poppins-Medium",
  },
  plusimg: {
    width: 50,
    height: 50,
  },
  box3: {
    alignItems: "flex-end",
    padding: 10,
    paddingTop: 0,
  },
  createbtn: {
    width: 150,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "brown",
    borderRadius: 10,
  },
  box4: {
    margin: 10,
    backgroundColor: "#f7cc9c",
    borderRadius: 10,
    elevation: 10,
  },
  box5: {
    padding: 10,
    borderTopWidth: 1,
  },
  notebox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: "#f7cc9c",
    elevation: 10,
  },
  noteimg: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  box6: {
    paddingStart: 10,
  },
  notetitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  notetime: {
    fontSize: 13,
  },
});

export default Home;
