import { View, Text, Button } from "react-native";
import { router } from "expo-router";

export default function Login() {
  return (
    <View style={{ flex: 1, justifyContent:"center", alignItems:"center" }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Iniciar Sesión</Text>

      <Button
        title="Entrar"
        onPress={() => router.replace("/(tabs)")}
      />
    </View>
  );
}
