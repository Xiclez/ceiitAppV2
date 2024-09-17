import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

const QRScanScreen = ({ userRole }) => {
  const [scanResult, setScanResult] = useState(null);
  const [scanning, setScanning] = useState(true);
  const [cameraAuthorized, setCameraAuthorized] = useState(false);
  const devices = useCameraDevices(); // Get the available camera devices
  const [device, setDevice] = useState(null); // State to hold the selected camera device (back camera)

  useEffect(() => {
    checkCameraPermission(); // Check for camera permissions when the component mounts
  }, []);

  useEffect(() => {
    if (devices) {
      // Buscar explícitamente la cámara con el nombre "2 (BACK)"
      const backCamera = Object.values(devices).find(device => device.name.includes('2 (BACK)'));
      
      if (backCamera) {
        console.log('Seleccionando la cámara trasera correcta:', backCamera);
        setDevice(backCamera);
      } else {
        console.log('No se detectó la cámara trasera con el nombre "2 (BACK)"');
      }
    }
  }, [devices]);
  
   // Re-run the effect when devices change

   const checkCameraPermission = async () => {
    try {
      const result = await check(PERMISSIONS.ANDROID.CAMERA);
      console.log('Resultado del permiso de cámara:', result);
      if (result === RESULTS.GRANTED) {
        setCameraAuthorized(true); // Permiso concedido
      } else {
        requestCameraPermission(); // Solicitar permiso si no está concedido
      }
    } catch (error) {
      console.log('Error al verificar el permiso de la cámara:', error);
    }
  };
  

  const requestCameraPermission = async () => {
    try {
      const result = await request(PERMISSIONS.ANDROID.CAMERA); // Use PERMISSIONS.IOS.CAMERA for iOS
      if (result === RESULTS.GRANTED) {
        setCameraAuthorized(true); // Camera permission is granted after request
      } else {
        Alert.alert('Permiso Denegado', 'Por favor, habilita el acceso a la cámara en la configuración.'); // Alert user if permission is denied
      }
    } catch (error) {
      console.log('Error requesting camera permission:', error);
    }
  };

  const onScanSuccess = (qrData) => {
    const scannedData = qrData; // Simulated QR data
    setScanning(false); // Stop scanning once a QR code is detected
    handleScanResult(scannedData); // Handle the scanned data
  };

  const handleScanResult = (scannedData) => {
    // Simulate fetching object or loan order details from server
    if (scannedData.includes('object')) {
      const object = {
        name: 'SIERRA DE MESA RYOBI',
        status: 'Disponible',
        isLoanedByUser: userRole === 'user' && Math.random() > 0.5, // Randomly determine if object is loaned by the user
      };
      setScanResult(object);
    } else if (scannedData.includes('loan')) {
      const loanOrder = {
        studentName: 'Juan Ramirez',
        matricula: '3422',
        objectName: 'SIERRA DE MESA RYOBI',
      };
      setScanResult(loanOrder);
    } else {
      Alert.alert('Invalid QR Code', 'This QR code does not match any known objects or loan orders.'); // Alert if QR code is invalid
    }
  };

  const handleRescan = () => {
    setScanResult(null); // Reset the scan result
    setScanning(true); // Allow rescan
  };

  const renderUserActions = () => {
    if (scanResult.isLoanedByUser) {
      return (
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Reportar Problema</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Obtener Ayuda</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Obtener Ayuda</Text>
        </TouchableOpacity>
      );
    }
  };

  const renderAdminActions = () => {
    if (scanResult.objectName) {
      // Loan order scanned
      return (
        <View>
          <Text style={styles.infoText}>Por favor, escanee el QR de {scanResult.objectName} a prestar</Text>
        </View>
      );
    } else {
      // Object scanned
      return (
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Iniciar Prestamo</Text>
        </TouchableOpacity>
      );
    }
  };

  const renderScanResult = () => {
    if (!scanResult) return null; // If no result, don't display anything

    if (userRole === 'user') {
      return (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>{scanResult.name}</Text>
          {renderUserActions()}
        </View>
      );
    }

    if (userRole === 'admin') {
      return (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>{scanResult.name || scanResult.objectName}</Text>
          {renderAdminActions()}
        </View>
      );
    }
  };

  // If no camera or permissions haven't been granted yet, display a loading message
  if (!device || !cameraAuthorized) {
    return <Text style={styles.centerText}>Cargando cámara...</Text>;
  }

  return (
    <View style={styles.container}>
      {scanning ? (
        <Camera
          style={{ flex: 1 }}
          device={device} // Use the back camera
          isActive={true} // Camera is active
          frameProcessor={onScanSuccess} // Use Vision Camera's Frame Processor for QR detection
          frameProcessorFps={5} // Process frames at 5 FPS
        />
      ) : (
        <View>
          {renderScanResult()}
          <TouchableOpacity style={styles.rescanButton} onPress={handleRescan}>
            <Text style={styles.buttonText}>Escanear de nuevo</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  centerText: {
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 20,
  },
  resultContainer: {
    marginVertical: 20,
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
  },
  resultText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    backgroundColor: '#1e90ff',
    padding: 10,
    borderRadius: 5,
    margin: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  infoText: {
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 15,
  },
  rescanButton: {
    backgroundColor: '#d9534f',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
});

export default QRScanScreen;
