import { useProducts } from '@/hooks/useProducts';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function CreateProduct() {
  const { addProduct, loading } = useProducts();
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    category: ''
  });
  const [image, setImage] = useState<{ uri: string; type: string; name: string } | null>(null);

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: 'images',
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        const asset = result.assets[0];
        setImage({
          uri: asset.uri,
          type: 'image/jpeg',
          name: 'image.jpg'
        });
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Erro', 'Não foi possível selecionar a imagem');
    }
  };

  const formatPrice = (value: string) => {
    // Remove tudo que não é número ou ponto decimal
    const numericValue = value.replace(/[^\d.]/g, '');

    // Garante que só tem um ponto decimal
    const parts = numericValue.split('.');
    if (parts.length > 2) {
      return parts[0] + '.' + parts.slice(1).join('');
    }

    // Limita a 2 casas decimais
    if (parts[1] && parts[1].length > 2) {
      return parts[0] + '.' + parts[1].slice(0, 2);
    }

    return numericValue;
  };

  const handleSubmit = async () => {
    if (!form.name || !form.description || !form.price || !form.category) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }

    try {
      // Converte o preço de decimal para centavos
      const priceInCents = Math.round(parseFloat(form.price) * 100);

      await addProduct({
        ...form,
        price: priceInCents,
        image: image || undefined
      });
      router.back();
    } catch (error) {
      console.error('Error creating product:', error);
      Alert.alert('Erro', 'Não foi possível criar o produto. Verifique sua conexão com a internet.');
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <LinearGradient
        colors={['#4f46e5', '#6366f1']}
        style={styles.header}
      >
        <Text style={styles.title}>Adicionar Novo Produto</Text>
      </LinearGradient>

      <View style={styles.content}>
        <TouchableOpacity
          style={styles.imagePicker}
          onPress={pickImage}
          activeOpacity={0.7}
        >
          {image ? (
            <Image source={{ uri: image.uri }} style={styles.image} resizeMode="cover" />
          ) : (
            <View style={styles.imagePickerContent}>
              <Text style={styles.imagePickerText}>Toque para selecionar uma imagem</Text>
              <Text style={styles.imagePickerSubtext}>(Opcional)</Text>
            </View>
          )}
        </TouchableOpacity>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Nome do produto</Text>
          <TextInput
            placeholder="Digite o nome do produto"
            value={form.name}
            onChangeText={(text) => setForm({...form, name: text})}
            style={styles.input}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Descrição</Text>
          <TextInput
            placeholder="Digite a descrição do produto"
            value={form.description}
            onChangeText={(text) => setForm({...form, description: text})}
            style={[styles.input, styles.textArea]}
            multiline
            numberOfLines={4}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Preço (R$)</Text>
          <TextInput
            placeholder="0,00"
            value={form.price}
            onChangeText={(text) => setForm({...form, price: formatPrice(text)})}
            style={styles.input}
            keyboardType="decimal-pad"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Categoria</Text>
          <TextInput
            placeholder="Digite a categoria"
            value={form.category}
            onChangeText={(text) => setForm({...form, category: text})}
            style={styles.input}
          />
        </View>

        <TouchableOpacity
          style={[styles.submitButton, loading && styles.submitButtonDisabled]}
          onPress={handleSubmit}
          disabled={loading}
        >
          <Text style={styles.submitButtonText}>
            {loading ? 'Salvando...' : 'Salvar Produto'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    padding: 20,
    paddingTop: 40,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  content: {
    padding: 20,
  },
  imagePicker: {
    width: '100%',
    height: 200,
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderStyle: 'dashed',
    overflow: 'hidden',
  },
  imagePickerContent: {
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imagePickerText: {
    color: '#64748b',
    fontSize: 16,
    marginBottom: 4,
  },
  imagePickerSubtext: {
    color: '#94a3b8',
    fontSize: 14,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    color: '#1e293b',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    backgroundColor: 'white',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#4f46e5',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#4f46e5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  submitButtonDisabled: {
    backgroundColor: '#93c5fd',
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
