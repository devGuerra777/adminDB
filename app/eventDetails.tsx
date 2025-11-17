// app/eventDetails.tsx
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Dimensions, ActivityIndicator } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { supabase } from "../app/libs/supabase";

const { width } = Dimensions.get("window");

export default function EventDetails() {
  const router = useRouter();
  const { id } = useLocalSearchParams() as { id: string };

  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.log("ERROR cargando evento:", error);
      }

      setEvent(data);
      setLoading(false);
    };

    fetchEvent();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Cargando evento...</Text>
      </View>
    );
  }

  if (!event) {
    return (
      <View style={styles.center}>
        <Text>Evento no encontrado</Text>
      </View>
    );
  }

  // ⭐ Construcción correcta de la URL completa
  const fullImageUrl = `https://qnwekduwzooiuusbgmfj.supabase.co/storage/v1/object/public/events/${event.image_url}`;

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 30 }}>
      <Image
        source={{ uri: fullImageUrl }}
        style={styles.image}
      />

      <View style={styles.content}>
        <Text style={styles.title}>{event.title}</Text>

        <View style={styles.metaContainer}>
          <Text style={styles.metaLabel}>Fecha:</Text>
          <Text style={styles.metaValue}>{event.date}</Text>
        </View>

        <View style={styles.metaContainer}>
          <Text style={styles.metaLabel}>Ubicación:</Text>
          <Text style={styles.metaValue}>{event.location}</Text>
        </View>

        <Text style={styles.description}>{event.description}</Text>

        <TouchableOpacity style={styles.button} onPress={() => router.back()}>
          <Text style={styles.buttonText}>Volver a eventos</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  image: { width: width, height: 300 },
  content: { padding: 25 },
  title: { fontSize: 28, fontWeight: "bold", color: "#222", marginBottom: 15 },
  metaContainer: { flexDirection: "row", marginBottom: 8 },
  metaLabel: { fontWeight: "600", fontSize: 16, color: "#555", width: 90 },
  metaValue: { fontSize: 16, color: "#333" },
  description: { fontSize: 16, color: "#444", lineHeight: 24, marginVertical: 20 },
  button: {
    marginTop: 20,
    backgroundColor: "#0D7817",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "600" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});
