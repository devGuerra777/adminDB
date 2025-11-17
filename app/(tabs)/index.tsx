// app/(tabs)/index.tsx
import React, { useEffect, useState } from "react";
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
  ActivityIndicator,
} from "react-native";

import { useRouter } from "expo-router";
import { supabase } from "../libs/supabase";

const { width } = Dimensions.get("window");

export default function HomeScreen() {
  const router = useRouter();

  const [locations, setLocations] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const BASE_URL =
    "https://qnwekduwzooiuusbgmfj.supabase.co/storage/v1/object/public/events/";

  // 🔥 Cargar locaciones y eventos desde Supabase
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);

      // Locaciones
      const { data: locData, error: locError } = await supabase
        .from("locations")
        .select("*");

      if (locError) console.log("ERROR cargando locaciones:", locError);

      // Eventos cercanos
      const { data: eventData, error: eventError } = await supabase
        .from("events")
        .select("*");

      if (eventError) console.log("ERROR cargando eventos:", eventError);

      setLocations(locData || []);
      setEvents(eventData || []);
      setLoading(false);
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Cargando contenido...</Text>
      </View>
    );
  }

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
        data={locations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const fullImage = BASE_URL + item.image_url;

          return (
            <TouchableOpacity
              style={styles.card}
              onPress={() =>
                router.push(`/locationEvents?location=${item.name}`)
              }
            >
              <Image source={{ uri: fullImage }} style={styles.cardImage} />
              <View style={styles.cardOverlay}>
                <Text style={styles.cardTitle}>{item.name}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
        contentContainerStyle={{ paddingHorizontal: 20 }}
      />

      {/* Eventos Cercanos */}
      <Text style={[styles.sectionTitle, { marginTop: 40 }]}>
        Eventos Cercanos
      </Text>

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const fullImage = BASE_URL + item.image_url;

          return (
            <TouchableOpacity
              style={styles.eventCard}
              onPress={() => router.push(`/eventDetails?id=${item.id}`)}
            >
              <Image source={{ uri: fullImage }} style={styles.eventImage} />
              <View style={styles.eventOverlay}>
                <Text style={styles.eventTitle}>{item.title}</Text>
                <Text style={styles.eventDate}>{item.date}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
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
  cardImage: { width: "100%", height: "100%" },
  cardOverlay: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: 15,
    backgroundColor: "rgba(0,0,0,0.4)",
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
  eventImage: { width: "100%", height: "100%" },
  eventOverlay: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: 15,
    backgroundColor: "rgba(0,0,0,0.35)",
  },
  eventTitle: { color: "#fff", fontSize: 18, fontWeight: "700" },
  eventDate: { color: "#fff", fontSize: 14, marginTop: 3 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});

