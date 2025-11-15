// app/(tabs)/two.tsx
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");
// pantalla de los eventos////////////////////////////////
// Datos de eventos (puedes actualizar o traer de API)
const events = [
  {
    id: "1",
    title: "Festival de Jazz",
    date: "12 Nov 2025",
    location: "Plaza Central",
    image: require("../../assets/images/tulum.jpg"),
  },
  {
    id: "2",
    title: "Feria Gastronómica",
    date: "18 Nov 2025",
    location: "Parque Principal",
    image: require("../../assets/images/tulum.jpg"),
  },
  {
    id: "3",
    title: "Concierto Rock",
    date: "25 Nov 2025",
    location: "Auditorio Municipal",
    image: require("../../assets/images/tulum.jpg"),
  },
  {
    id: "4",
    title: "Exposición de Arte",
    date: "30 Nov 2025",
    location: "Galería Central",
    image: require("../../assets/images/tulum.jpg"),
  },
];

export default function EventsScreen() {
  const router = useRouter();

  const handlePress = (id: string) => {
    // Navega a la pantalla de detalles del evento con el ID
    router.push(`/eventDetails?id=${id}`);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ padding: 15 }}
      showsVerticalScrollIndicator={false}
    >
      {events.map((event) => (
        <TouchableOpacity
          key={event.id}
          style={styles.card}
          activeOpacity={0.8}
          onPress={() => handlePress(event.id)}
        >
          <Image source={event.image} style={styles.image} />
          <View style={styles.overlay}>
            <Text style={styles.title}>{event.title}</Text>
            <Text style={styles.subtitle}>{event.date}</Text>
            <Text style={styles.subtitle}>{event.location}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  card: {
    width: width - 30,
    borderRadius: 16,
    marginBottom: 20,
    backgroundColor: "#fff",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5, // para Android
  },
  image: {
    width: "100%",
    height: 180,
  },
  overlay: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: 15,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
  },
  subtitle: {
    color: "#f0f0f0",
    fontSize: 14,
  },
});
