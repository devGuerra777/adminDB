// app/(tabs)/home.tsx
import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, ScrollView } from 'react-native';

const { width } = Dimensions.get('window');
////////// pantalla del usuario
const HomeScreen: React.FC = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      
      {/* Foto del usuario */}
      <Image
        source={{ uri: 'https://i.pinimg.com/736x/9b/3a/36/9b3a3616b6769fc11bd846f09159a28a.jpg' }}
        style={styles.profileImage}
      />

      {/* Tarjeta gris con información */}
      <View style={styles.infoCard}>
        <Text style={styles.title}>Hola, ........... 👋</Text>

        <Text style={styles.infoText}>
          • Estatus: Viajero activo
        </Text>
        <Text style={styles.infoText}>
          • Próximo destino sugerido: Bacalar 🌊
        </Text>
        <Text style={styles.infoText}>
          • Interés reciente: Eventos culturales y gastronomía
        </Text>

        <Text style={[styles.infoText, { marginTop: 10, fontWeight: '700' }]}>
          ¡Explora nuevas experiencias y vive tu siguiente aventura!
        </Text>
      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#ffffff',
    paddingTop: 70,
    alignItems: 'center',
  },

  profileImage: {
    marginTop: width * 0.1,
    width: width * 0.60,
    height: width * 0.60,
    borderRadius: (width * 0.60) / 2,
    marginBottom: 40,
    borderWidth: 4,
    borderColor: '#f0f0f0',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
  },

  infoCard: {
    width: width * 0.9,
    backgroundColor: '#f2f2f2',
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: 'flex-start',

    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
  },

  title: {
    fontSize: 26,
    fontWeight: '800',
    marginBottom: 20,
    color: '#222',
  },

  infoText: {
    fontSize: 16,
    color: '#444',
    marginBottom: 6,
  },
});

export default HomeScreen;
