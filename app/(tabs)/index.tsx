// app/(tabs)/index.tsx
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";


// LA APLICACION EMPEIZA AQUI


const { width } = Dimensions.get("window");
import { useRouter } from "expo-router";
// Locaciones populares
const popularLocations = [
  { id: "1", name: "Bacalar", image: require("../../assets/images/bacalar.jpg") },
  { id: "2", name: "Cancún", image: require("../../assets/images/cancun.jpg") },
  { id: "3", name: "Chichén Itzá", image: require("../../assets/images/chichenitza.jpg") },
  { id: "4", name: "Tulum", image: require("../../assets/images/tulum.jpg") },
];

// Eventos cercanos
const nearbyEvents = [
  { id: "1", name: "Festival del Chocolate", date: "12 Nov 2025", image: require("../../assets/images/bacalar.jpg") },
  { id: "2", name: "Concierto Playa Caribe", date: "15 Nov 2025", image: require("../../assets/images/cancun.jpg") },
  { id: "3", name: "Exposición Maya", date: "18 Nov 2025", image: require("../../assets/images/chichenitza.jpg") },
  { id: "4", name: "Torneo de Kayak", date: "20 Nov 2025", image: require("../../assets/images/tulum.jpg") },
];

export default function HomeScreen() {
   const router = useRouter(); // 🔹 esto te da el router
  return (
    <ScrollView style={styles.container}>
      {/* Buscador */}
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Buscar lugar o evento..."
          style={styles.searchInput}
          placeholderTextColor="#888"
        />
      </View>

      {/* Locaciones Populares */}
      <Text style={styles.sectionTitle}>Locaciones Populares</Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={popularLocations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            
              onPress={() => router.push(`/locationEvents?location=${item.name}`)}// ← navegación
          >
            <Image source={item.image} style={styles.cardImage} />
            <View style={styles.cardOverlay}>
              <Text style={styles.cardTitle}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingHorizontal: 20 }}
      />


      {/* Eventos Cercanos */}
      <Text style={[styles.sectionTitle, { marginTop: 40 }]}>Eventos Cercanos</Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={nearbyEvents}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.eventCard}>
            <Image source={item.image} style={styles.eventImage} />
            <View style={styles.eventOverlay}>
              <Text style={styles.eventTitle}>{item.name}</Text>
              <Text style={styles.eventDate}>{item.date}</Text>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fefefe",
  },
  searchContainer: {
    marginTop: 30,
    marginHorizontal: 20,
    marginBottom: 30,
  },
  searchInput: {
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 12,
    fontSize: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "700",
    marginHorizontal: 20,
    marginBottom: 15,
    color: "#222",
  },
  card: {
    width: width * 0.7,
    height: 220,
    borderRadius: 20,
    marginRight: 20,
    overflow: "hidden",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
  },
  cardImage: {
    width: "100%",
    height: "100%",
  },
  cardOverlay: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: 15,
    backgroundColor: "rgba(0,0,0,0.4)",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  cardTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
  },
  eventCard: {
    width: width * 0.7,
    height: 200,
    borderRadius: 20,
    marginRight: 20,
    overflow: "hidden",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
  },
  eventImage: {
    width: "100%",
    height: "100%",
  },
  eventOverlay: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: 15,
    backgroundColor: "rgba(0,0,0,0.35)",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  eventTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  eventDate: {
    color: "#fff",
    fontSize: 14,
    marginTop: 3,
  },
});
