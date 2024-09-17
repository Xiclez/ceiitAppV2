import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, Switch } from 'react-native';

const SolicitudPrestamo = ({ route, navigation }) => {
  const { objeto } = route.params;
  const [dias, setDias] = useState('');
  const [aceptaTerminos, setAceptaTerminos] = useState(false);
  const [errorDias, setErrorDias] = useState('');
  const [errorTerminos, setErrorTerminos] = useState('');

  const handleSwitchChange = (newValue) => {
    setAceptaTerminos(newValue);
    setErrorTerminos(''); // Limpiar error si se seleccionan los términos
  };

  const handleSolicitarPrestamo = () => {
    let valid = true;

    // Validación del campo de días
    if (!dias || parseInt(dias) <= 0) {
      setErrorDias('Por favor, ingresa una cantidad válida de días.');
      valid = false;
    } else {
      setErrorDias('');
    }

    // Validación de aceptación de términos
    if (!aceptaTerminos) {
      setErrorTerminos('Por favor, acepta los términos y condiciones.');
      valid = false;
    } else {
      setErrorTerminos('');
    }

    if (valid) {
      alert('¡Préstamo solicitado con éxito!');
      navigation.goBack(); // Volver a la pantalla anterior
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Card con detalles del objeto */}
      <View style={styles.card}>
        <View style={styles.row}>
          <Image source={{ uri: objeto.urlImagen }} style={styles.cardImage} />
          <View style={styles.textContainer}>
            <Text style={styles.cardTitle}>Solicitud de Préstamo</Text>
            <Text style={styles.cardDetail}>Objeto: {objeto.nombre}</Text>
            <Text style={styles.cardDetail}>Categoría: {objeto.categoria}</Text>
            <Text style={styles.cardDetail}>Estado: {objeto.estado}</Text>
          </View>
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>¿Cuántos días estimas requerir este objeto?</Text>
        <TextInput
          style={[styles.input, errorDias && styles.errorInput]}
          keyboardType="numeric"
          value={dias}
          onChangeText={setDias}
          placeholder="Indica la cantidad de días"
        />
        {errorDias ? <Text style={styles.errorText}>{errorDias}</Text> : null}
      </View>

      {/* Términos y condiciones scrollable con altura fija */}
      <View style={styles.termsContainer}>
        <ScrollView style={styles.termsScroll}>
          <Text style={styles.termsTitle}>Términos y Condiciones de Uso para Préstamos de Equipos del CEIIT</Text>
          <Text style={styles.termsText}>
          1. Aceptación de Términos: Al solicitar el préstamo de cualquier equipo o herramienta del CEIIT, el usuario acepta cumplir con los siguientes términos y condiciones, así como cualquier normativa interna del centro.{"\n"}

2. Requisitos del Préstamo:

Los usuarios deberán estar registrados en el sistema de préstamos del CEIIT, proporcionando información válida como matrícula o identificación.
El préstamo está limitado a estudiantes y personal autorizado de las carreras afines al uso de los equipos.
3. Uso del Equipo:

El equipo prestado deberá ser utilizado únicamente para actividades académicas relacionadas con los estudios del usuario en la universidad.
El usuario se compromete a no subarrendar, transferir, o ceder el equipo a terceros.
Es responsabilidad del usuario el correcto uso y mantenimiento del equipo durante el periodo de préstamo.
4. Plazo del Préstamo:

El plazo de préstamo será determinado por el personal del CEIIT al momento de la solicitud. Cualquier extensión del plazo deberá ser aprobada por el CEIIT antes de la fecha límite de devolución.
El retraso en la devolución del equipo podría generar sanciones, incluyendo la suspensión de futuros préstamos.
5. Estado del Equipo:

El usuario deberá inspeccionar el equipo antes de su uso. Cualquier daño o mal funcionamiento deberá ser reportado inmediatamente al personal del CEIIT.
El equipo deberá ser devuelto en las mismas condiciones en las que fue prestado. Cualquier daño o pérdida del equipo será responsabilidad del usuario, quien asumirá los costos de reparación o reposición.
6. Responsabilidad del Usuario:

El usuario es el único responsable del equipo durante el periodo de préstamo. En caso de daño, pérdida o robo del equipo, el usuario deberá cubrir los costos correspondientes.
El usuario se compromete a no modificar o alterar el equipo en ninguna manera que comprometa su funcionalidad o integridad.
7. Devolución del Equipo:

El equipo deberá ser devuelto en la fecha acordada, utilizando el sistema de escaneo QR para registrar la devolución.
La devolución incompleta o en mal estado del equipo podrá derivar en la retención de documentos académicos o la imposición de sanciones por parte de la universidad.
8. Sanciones por Incumplimiento:

El incumplimiento de estos términos y condiciones podrá resultar en la suspensión temporal o permanente del derecho a solicitar préstamos de equipos en el CEIIT.
La universidad se reserva el derecho de tomar medidas disciplinarias adicionales de acuerdo con las normativas internas.
9. Firma y Aceptación Electrónica:

Al solicitar el préstamo, el usuario firmará digitalmente un contrato que certifica la aceptación de estos términos. Dicha firma será vinculante y registrada en la base de datos del CEIIT.
10. Modificaciones de los Términos:

El CEIIT se reserva el derecho de modificar estos términos y condiciones en cualquier momento. Cualquier cambio será notificado a los usuarios a través de los canales oficiales.          </Text>
        </ScrollView>
      </View>

      {/* Switch para aceptación de términos */}
      <View style={styles.checkboxContainer}>
        <Switch
          value={aceptaTerminos}
          onValueChange={handleSwitchChange}
        />
        <Text style={styles.checkboxLabel}>He leído y acepto los términos y condiciones</Text>
      </View>
      {errorTerminos ? <Text style={styles.errorText}>{errorTerminos}</Text> : null}

      {/* Botón para solicitar el préstamo */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleSolicitarPrestamo}
        >
          <Text style={styles.buttonText}>Solicitar Préstamo</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 3,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  cardImage: {
    width: 80,  // Reducir tamaño de la imagen
    height: 80,  // Reducir tamaño de la imagen
    marginBottom: 20,
    borderRadius: 10,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cardDetail: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#8E8E8E',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    color: '#333',
  },
  errorInput: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    marginTop: 5,
  },
  termsContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    elevation: 3,
    marginBottom: 20,
  },
  termsScroll: {
    maxHeight: 200,  // Limitar la altura del contenedor para que sea scrollable
  },
  termsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  termsText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 22,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkboxLabel: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  buttonContainer: {
    marginTop: 20,
  },
  button: {
    backgroundColor: '#1e3a8a',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SolicitudPrestamo;
