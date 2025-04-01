import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { supabase } from "../../supabase";
import AsyncStorage from "@react-native-async-storage/async-storage";

const login = () => {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const router = useRouter();
    useEffect(() => {
        const checkLogin = async () => {
            try{
                const token = await AsyncStorage.getItem("authToken");
                if(token){
                    router.replace("/(home)")
                }
            } catch(error){
                console.log(error)
            }
        }

        checkLogin();
    },[])
    async function signUpWithEmail(){
        const {data,error} = await supabase.auth.signInWithPassword({
            email:email,
            password:password
        })
        if(data){
            const token = data?.session?.access_token;
            AsyncStorage.setItem("authToken",token)
            router.replace("/(home)")
        }
    }
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}
    >
      <View style={{ marginTop: 50 }}>
        <Text style={{ fontSize: 20, textAlign: "center", fontWeight: "bold" }}>
          Food App
        </Text>
      </View>

      <KeyboardAvoidingView>
        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              fontSize: 17,
              fontWeight: "bold",
              marginTop: 12,
              color: "red",
            }}
          >
            Log in to your account
          </Text>
        </View>

        <View style={{ marginTop: 70 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              backgroundColor: "#E0E0E0",
              paddingVertical: 5,
              borderRadius: 5,
              marginTop: 30,
            }}
          >
            <MaterialIcons
              style={{ marginLeft: 8 }}
              name="email"
              size={24}
              color="gray"
            />
            <TextInput
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={{ color: "gray", marginVertical: 10, width: 300 }}
              placeholder="enter your Email"
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              backgroundColor: "#E0E0E0",
              paddingVertical: 5,
              borderRadius: 5,
              marginTop: 30,
            }}
          >
            <AntDesign
              style={{ marginLeft: 8 }}
              name="lock1"
              size={24}
              color="black"
            />
            <TextInput
              value={password}
              onChangeText={(text) => setPassword(text)}
              style={{ color: "gray", marginVertical: 10, width: 300 }}
              placeholder="enter your password"
            />
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 12,
          }}
        >
          <Text>Keep me Logged In</Text>
          <Text>Forgot Password</Text>
        </View>

        <Pressable
        onPress={signUpWithEmail}
          style={{
            width: 200,
            backgroundColor: "#fd5c63",
            borderRadius: 6,
            marginLeft: "auto",
            marginRight: "auto",
            padding: 15,
            marginTop:50
          }}
        >
          <Text style={{textAlign:"center",fontWeight:"bold",fontSize:16,color:"white"}}>Login</Text>
        </Pressable>

        <Pressable onPress={() => router.replace("/register")} style={{marginTop:15}}>
            <Text style={{textAlign:"center",color:"gray",fontSize:16}}>Don't have an Account? Sign Up</Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default login;

const styles = StyleSheet.create({});


// import {
//   StyleSheet,
//   Text,
//   View,
//   SafeAreaView,
//   KeyboardAvoidingView,
//   TextInput,
//   Pressable,
// } from "react-native";
// import React, { useEffect, useState } from "react";
// import { MaterialIcons } from "@expo/vector-icons";
// import { AntDesign } from "@expo/vector-icons";
// import { useRouter } from "expo-router";
// import { supabase } from "../../supabase";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const router = useRouter();

//   useEffect(() => {
//     const checkLogin = async () => {
//       try {
//         const token = await AsyncStorage.getItem("authToken");
//         if (token) {
//           router.replace("/(home)");
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     checkLogin();
//   }, []);

//   async function signUpWithEmail() {
//     const { data, error } = await supabase.auth.signInWithPassword({
//       email: email,
//       password: password,
//     });
//     if (data) {
//       const token = data?.session?.access_token;
//       AsyncStorage.setItem("authToken", token);
//       router.replace("/(home)");
//     }
//   }

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.appTitle}>Food App</Text>
//       </View>

//       <KeyboardAvoidingView style={styles.form}>
//         <View style={styles.loginTextContainer}>
//           <Text style={styles.loginText}>Log in to your account</Text>
//         </View>

//         <View style={styles.inputContainer}>
//           <View style={styles.inputField}>
//             <MaterialIcons style={styles.icon} name="email" size={24} color="gray" />
//             <TextInput
//               value={email}
//               onChangeText={(text) => setEmail(text)}
//               style={styles.input}
//               placeholder="Enter your Email"
//               keyboardType="email-address"
//             />
//           </View>

//           <View style={styles.inputField}>
//             <AntDesign style={styles.icon} name="lock1" size={24} color="gray" />
//             <TextInput
//               value={password}
//               onChangeText={(text) => setPassword(text)}
//               style={styles.input}
//               placeholder="Enter your Password"
//               secureTextEntry
//             />
//           </View>
//         </View>

//         <View style={styles.footer}>
//           <Pressable onPress={signUpWithEmail} style={styles.loginButton}>
//             <Text style={styles.loginButtonText}>Login</Text>
//           </Pressable>

//           <Pressable onPress={() => router.replace("/register")} style={styles.signupTextContainer}>
//             <Text style={styles.signupText}>Don't have an Account? Sign Up</Text>
//           </Pressable>
//         </View>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// };

// export default login;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "white",
//     alignItems: "center",
//   },
//   header: {
//     marginTop: 50,
//     marginBottom: 30,
//   },
//   appTitle: {
//     fontSize: 24,
//     fontWeight: "bold",
//     textAlign: "center",
//   },
//   form: {
//     width: "90%",
//     marginTop: 20,
//   },
//   loginTextContainer: {
//     alignItems: "center",
//     marginBottom: 30,
//   },
//   loginText: {
//     fontSize: 18,
//     fontWeight: "bold",
//     color: "red",
//   },
//   inputContainer: {
//     marginTop: 20,
//   },
//   inputField: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#f0f0f0",
//     paddingVertical: 12,
//     borderRadius: 10,
//     marginBottom: 15,
//   },
//   icon: {
//     marginLeft: 10,
//   },
//   input: {
//     flex: 1,
//     paddingHorizontal: 10,
//     fontSize: 16,
//     color: "#555",
//   },
//   footer: {
//     alignItems: "center",
//     marginTop: 30,
//   },
//   loginButton: {
//     width: 250,
//     backgroundColor: "#fd5c63",
//     borderRadius: 8,
//     paddingVertical: 15,
//     marginBottom: 15,
//   },
//   loginButtonText: {
//     textAlign: "center",
//     fontWeight: "bold",
//     fontSize: 16,
//     color: "white",
//   },
//   signupTextContainer: {
//     marginTop: 10,
//   },
//   signupText: {
//     fontSize: 16,
//     color: "gray",
//     textAlign: "center",
//   },
// });

