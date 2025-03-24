import { useState, useRef } from 'react';
import { StyleSheet, View, Text, Pressable, Modal } from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

type Props = {
  isVisible: boolean;
  onClose: () => void;
  onTakePicture: (imageUri: string) => void;
};

export default function CameraComponent({ isVisible, onClose, onTakePicture }: Props) {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);

  if (!permission) {
    // Camera permissions are still loading
    return null;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <Modal animationType="slide" transparent={false} visible={isVisible}>
        <View style={styles.container}>
          <Text style={styles.text}>We need your permission to show the camera</Text>
          <Pressable style={styles.button} onPress={requestPermission}>
            <Text style={styles.buttonText}>Grant Permission</Text>
          </Pressable>
          <Pressable style={[styles.button, styles.closeButton]} onPress={onClose}>
            <Text style={styles.buttonText}>Close</Text>
          </Pressable>
        </View>
      </Modal>
    );
  }

  const toggleCameraFacing = () => {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 1,
        });
        if (photo && photo.uri) {
          onTakePicture(photo.uri);
          onClose();
        }
      } catch (error) {
        console.log('Error taking picture:', error);
      }
    }
  };

  return (
    <Modal animationType="slide" transparent={false} visible={isVisible}>
      <View style={styles.container}>
        <CameraView 
          style={styles.camera} 
          facing={facing}
          ref={cameraRef}
        >
          <View style={styles.buttonContainer}>
            <Pressable style={styles.iconButton} onPress={onClose}>
              <MaterialIcons name="close" size={28} color="white" />
            </Pressable>
            <Pressable style={styles.captureButton} onPress={takePicture}>
              <View style={styles.captureButtonInner} />
            </Pressable>
            <Pressable style={styles.iconButton} onPress={toggleCameraFacing}>
              <MaterialIcons name="flip-camera-ios" size={28} color="white" />
            </Pressable>
          </View>
        </CameraView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 40,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  text: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    margin: 20,
  },
  button: {
    backgroundColor: '#ffd33d',
    padding: 15,
    borderRadius: 10,
    margin: 10,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#25292e',
    fontSize: 16,
    fontWeight: 'bold',
  },
  closeButton: {
    backgroundColor: '#464C55',
  },
  iconButton: {
    padding: 15,
    borderRadius: 50,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: 'rgba(0,0,0,0.2)',
  },
}); 