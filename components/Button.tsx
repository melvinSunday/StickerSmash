import { StyleSheet, View, Pressable, Text } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

type Props = {
  label: string;
  theme?: 'primary' | 'camera';
  onPress?: () => void;
};

export default function Button({ label, theme, onPress }: Props) {
  if (theme === 'primary') {
    return (
      <View style={[styles.buttonContainer]}>
        <Pressable 
          style={({ pressed }) => [
            styles.button,
            styles.primaryButton,
            pressed && styles.buttonPressed
          ]} 
          onPress={onPress}
        >
          <FontAwesome name="picture-o" size={20} color="#25292e" style={styles.buttonIcon} />
          <Text style={styles.primaryLabel}>{label}</Text>
        </Pressable>
      </View>
    );
  }

  if (theme === 'camera') {
    return (
      <View style={[styles.buttonContainer]}>
        <Pressable 
          style={({ pressed }) => [
            styles.button,
            styles.primaryButton,
            pressed && styles.buttonPressed
          ]}
          onPress={onPress}
        >
          <FontAwesome name="camera" size={20} color="#25292e" style={styles.buttonIcon} />
          <Text style={styles.primaryLabel}>{label}</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.buttonContainer}>
      <Pressable 
        style={({ pressed }) => [
          styles.button,
          styles.secondaryButton,
          pressed && styles.buttonPressed
        ]}
        onPress={onPress}
      >
        <Text style={styles.secondaryLabel}>{label}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: 320,
    height: 56,
    marginVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  primaryButton: {
    backgroundColor: '#ffd33d',
  },
  secondaryButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  buttonPressed: {
    transform: [{ scale: 0.98 }],
    opacity: 0.9,
  },
  buttonIcon: {
    marginRight: 12,
  },
  primaryLabel: {
    color: '#25292e',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryLabel: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  }
});
