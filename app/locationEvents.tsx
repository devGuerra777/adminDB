// app/locationEvents.tsx
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
  Platform,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

// Eventos inventados con ubicación
const allEvents = [
  { id: "1", title: "Festival de Jazz", date: "12 Nov 2025", location: "Bacalar", image: require("../assets/images/bacalar.jpg") },
  { id: "2", title: "Feria Gastronómica", date: "18 Nov 2025", location: "Cancún", image: require("../assets/images/cancun.jpg") },
  { id: "3", title: "Concierto Rock", date: "25 Nov 2025", location: "Tulum", image: require("../assets/images/tulum.jpg") },
  { id: "4", title: "Concierto Maya", date: "20 Nov 2025", location: "Chichén Itzá", image: require("../assets/images/chichenitza.jpg") },
  { id: "5", title: "Festival de Jazz", date: "12 Nov 2025", location: "Bacalar", image: require("../assets/images/bacalar.jpg") },
  { id: "6", title: "Festival de Jazz", date: "12 Nov 2025", location: "Bacalar", image: require("../assets/images/bacalar.jpg") },
  { id: "7", title: "Festival de Jazz", date: "12 Nov 2025", location: "Bacalar", image: require("../assets/images/bacalar.jpg") },
  { id: "8", title: "Festival de Jazz", date: "12 Nov 2025", location: "Bacalar", image: require("../assets/images/bacalar.jpg") },
];

export default function LocationEvents() {
  const router = useRouter();
  const { location } = useLocalSearchParams<{ location: string }>();
  const events = allEvents.filter((e) => e.location === location);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.header}>Eventos en {location}</Text>

        <FlatList
          data={events}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 30 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              activeOpacity={0.85}
              onPress={() => router.push(`/eventDetails?id=${item.id}`)}
            >
              <Image source={item.image} style={styles.image} />
              <View style={styles.overlay} />
              <View style={styles.info}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.date}>{item.date}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fefefe",
  },
  container: {
    flex: 1,
  },
  header: {
    fontSize: 30,
    fontWeight: "800",
    marginTop: 20 ,
    marginHorizontal: 20,
    marginBottom: 20,
    color: "#111",
  },
  card: {
    width: width - 40,
    height: 220,
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 25,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
  },
  overlay: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "50%",
    backgroundColor: "rgba(0,0,0,0.35)",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  info: {
    position: "absolute",
    bottom: 15,
    left: 20,
    right: 20,
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 4,
    textShadowColor: "rgba(0,0,0,0.5)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  date: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
    textShadowColor: "rgba(0,0,0,0.4)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
});
