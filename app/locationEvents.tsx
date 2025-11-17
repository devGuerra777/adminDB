// app/locationEvents.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from "../app/libs/supabase";

const { width } = Dimensions.get("window");

export default function LocationEvents() {
  const router = useRouter();
  const { location } = useLocalSearchParams<{ location: string }>();

  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!location) return;

    const fetchEvents = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("location", location);

      if (error) console.log("ERROR cargando eventos:", error);

      setEvents(data || []);
      setLoading(false);
    };

    fetchEvents();
  }, [location]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Cargando eventos...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.header}>Eventos en {location}</Text>

        <FlatList
          data={events}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 30 }}
          renderItem={({ item }) => {
            const fullImageUrl = `https://qnwekduwzooiuusbgmfj.supabase.co/storage/v1/object/public/events/${item.image_url}`;

            return (
              <TouchableOpacity
                style={styles.card}
                activeOpacity={0.85}
                onPress={() => router.push(`/eventDetails?id=${item.id}`)}
              >
                <Image source={{ uri: fullImageUrl }} style={styles.image} />

                <View style={styles.overlay} />

                <View style={styles.info}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.date}>{item.date}</Text>
                </View>
              </TouchableOpacity>
            );
          }}
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
    marginTop: 20,
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
  image: { width: "100%", height: "100%", borderRadius: 20 },
  overlay: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "50%",
    backgroundColor: "rgba(0,0,0,0.35)",
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
  },
  date: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

