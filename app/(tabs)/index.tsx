import { Image, StyleSheet, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';

type movie = {
  Poster: string,
  Title: string,
  Plot: string
}

export default function HomeScreen() {

  const [movieName, setMovieName] = useState<string>("")
  const [movie, setMovie] = useState<movie | null>(null)


  const getMovie = async () => {
    const response = await fetch(`http://www.omdbapi.com/?t=${movieName}&apikey=401020e8`)
    const data = await response.json();
    if (response.ok) {
      setMovie(data)
    }
  }

  const handleSearch = () => {
    getMovie()
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <View style={styles.container}>
          <Text style={styles.textMain}>BUSCADOR DE PELÍCULAS</Text>
          <TextInput onChangeText={setMovieName} style={styles.input} placeholder='ingrese la película a buscar'></TextInput>
          <TouchableOpacity onPress={handleSearch} style={styles.btnSearch}>
            <Text style={styles.btnText}>Buscar</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.containerMovie}>
          <Image source={{ uri: movie?.Poster }} style={styles.image}></Image>
          <Text style={styles.title}>{movie?.Title}</Text>
          <Text style={styles.plot}>{movie?.Plot}</Text>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingTop: 40,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    width: '100%',
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  containerMovie: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 'auto',
    width: '80%',
    borderRadius: 50,
    padding: 10,
    marginTop: 10,
    backgroundColor: '#52b788'
  },
  btnSearch: {
    borderWidth: 1,
    backgroundColor: 'blue',
    width: '25%',
  },
  btnText: {
    textAlign: 'center',
    justifyContent: 'center',
    color: 'white',
  },
  image: {
    width: 200,
    height: 200,
    borderWidth: 3,
    borderColor: '#d8f3dc'
  },
  title: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  plot: {
    borderWidth: 1,
    margin: 10,
    padding: 5,
    backgroundColor: '#d8f3dc'
  },
  textMain: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
