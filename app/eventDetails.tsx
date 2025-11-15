// app/eventDetails.tsx
import React from "react";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Dimensions } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";

const { width } = Dimensions.get("window");

const events = [
  { id: "1", title: "Festival de Jazz", date: "12 Nov 2025", location: "Bacalar", image: require("../assets/images/tulum.jpg"), description: "Disfruta del mejor Jazz en vivo con artistas internacionales. Habrá food trucks, talleres y sorpresas para toda la familia. ¡No te lo pierdas!" },
  { id: "2", title: "Feria Gastronómica", date: "18 Nov 2025", location: "bacalar", image: require("../assets/images/tulum.jpg"), description: "Explora sabores de todo el mundo en nuestra feria gastronómica. Degustaciones, chefs invitados y concursos de cocina. Ideal para toda la familia." },
  { id: "3", title: "Concierto Rock", date: "25 Nov 2025", location: "Cancún", image: require("../assets/images/tulum.jpg"), description: "Una noche de rock inolvidable con bandas locales e internacionales. Ven con tus amigos y disfruta de la energía del escenario. Compra tus boletos anticipados." },
  { id: "4", title: "Exposición de Arte", date: "30 Nov 2025", location: "Galería Central", image: require("../assets/images/tulum.jpg"), description: "Una noche de rock inolvidable con bandas locales e internacionales. Ven con tus amigos y disfruta de la energía del escenario. Compra tus boletos anticipados." },
];

export default function EventDetails() {
  const router = useRouter();
  const { id } = useLocalSearchParams() as { id: string };

  const event = events.find(e => e.id === id);

  if (!event) {
    return (
      <View style={styles.center}>
        <Text>Evento no encontrado</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 30 }}>
      <Image source={event.image} style={styles.image} />
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
