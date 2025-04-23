import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

export default function CreateProduct() {
  const [form, setForm] = useState({
    name: '',
    description: '',
    imageUrl: '',
    price: '',
    category: ''
  });

  const handleSubmit = () => {
    // Implemente a chamada à API aqui
    console.log('Produto criado:', form);
    router.back();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Adicionar Novo Produto</Text>
      
      <TextInput
        placeholder="Nome do produto"
        value={form.name}
        onChangeText={(text) => setForm({...form, name: text})}
        style={styles.input}
      />
      
      <TextInput
        placeholder="Descrição"
        value={form.description}
        onChangeText={(text) => setForm({...form, description: text})}
        style={styles.input}
        multiline
      />
      
      <TextInput
        placeholder="URL da imagem"
        value={form.imageUrl}
        onChangeText={(text) => setForm({...form, imageUrl: text})}
        style={styles.input}
      />
      
      <TextInput
        placeholder="Preço (em centavos)"
        value={form.price}
        onChangeText={(text) => setForm({...form, price: text})}
        style={styles.input}
        keyboardType="numeric"
      />
      
      <TextInput
        placeholder="Categoria"
        value={form.category}
        onChangeText={(text) => setForm({...form, category: text})}
        style={styles.input}
      />
      
      <TouchableOpacity 
        style={styles.submitButton}
        onPress={handleSubmit}
      >
        <Text style={styles.submitButtonText}>Salvar Produto</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: '#2563eb',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});