import { useEffect, useState } from "react";
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
import Loading from "./loading";
import { main_url } from "./urls";

export function RegisterUi({ navigation }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    loadType();
  }, []);

  const loadType = () => {
    setIsLoading(true);
    fetch(main_url + "loadType.php")
      .then((r) => r.json())
      .then((r) => {
        // try {
        setItems(r);
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

  const signup = () => {
    setIsLoading(true);
    const f = new FormData();
    f.append("f", fname);
    f.append("l", lname);
    f.append("m", mobile);
    f.append("p", password);
    f.append("t", value);

    fetch(main_url + "signUp.php", {
      method: "POST",
      body: f,
    })
      .then((r) => r.text())
      .then((r) => {
        if (r == "Success") {
          Alert.alert("Success", r);
          navigation.navigate("Signin");
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
    <SafeAreaView style={styles.container}>
      <Text style={{ fontFamily: "DancingScript", fontSize: 70 }}>
        My Notes
      </Text>
      <Text style={styles.title1}>Register</Text>
      <Image
        style={styles.img1}
        source={require("../assets/images/register.jpg")}
      />
      <View style={styles.box1}>
        {/* <Text style={styles.text1}>First Name</Text> */}
        <TextInput
          style={styles.input1}
          placeholder="First Name"
          value={fname}
          onChangeText={setFname}
        />
      </View>
      <View style={styles.box1}>
        {/* <Text style={styles.text1}>Last Name</Text> */}
        <TextInput
          style={styles.input1}
          placeholder="Last Name"
          value={lname}
          onChangeText={setLname}
        />
      </View>
      <View style={styles.box1}>
        {/* <Text style={styles.text1}>Mobile number</Text> */}
        <TextInput
          style={styles.input1}
          placeholder="Mobile Number"
          keyboardType="number-pad"
          value={mobile}
          onChangeText={setMobile}
        />
      </View>
      <View style={styles.box1}>
        {/* <Text style={styles.text1}>Password</Text> */}
        <TextInput
          style={styles.input1}
          placeholder="Password"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
      </View>
      <View style={styles.box1}>
        {/* <Text style={styles.text1}>User Type</Text> */}
        <DropDownPicker
          style={{ borderRadius: 20 }}
          placeholder="Select User type"
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
        />
      </View>

      <View style={styles.box1}>
        <TouchableOpacity
          style={styles.btn1}
          onPress={() => {
            signup();
          }}
        >
          <Text style={styles.btnText1}>Sign Up</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.box2}>
        <Text>Already have an account</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Signin");
          }}
        >
          <Text style={styles.text2}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
  // return ui;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  title1: {
    fontFamily: "Poppins-BoldItalic",
    fontSize: 40,
    color: "black",
  },
  box1: {
    width: "100%",
    marginBottom: 20,
  },
  text1: {
    marginLeft: 20,
    fontSize: 16,
  },
  input1: {
    width: "100%",
    borderColor: "black",
    borderWidth: 1,
    padding: 8,
    paddingStart: 20,
    borderRadius: 20,
  },
  btn1: {
    alignItems: "center",
    borderRadius: 20,
    padding: 8,
    backgroundColor: "brown",
  },
  btnText1: {
    fontSize: 20,
    color: "white",
    fontFamily: "Poppins-Medium",
  },
  box2: {
    alignItems: "center",
  },
  text2: {
    color: "blue",
  },
  img1: {
    width: 200,
    height: 200,
  },
});
