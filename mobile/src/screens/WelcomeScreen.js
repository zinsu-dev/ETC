import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';

const WelcomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>ETC</Text>
        </View>
        <Text style={styles.titleText}>Your journey</Text>
        <Text style={styles.highlightText}>Starts here!</Text>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.primaryButton} onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.primaryButtonText}>Create account</Text>
        </TouchableOpacity>

        <Text style={styles.orText}>Or</Text>

        <View style={styles.socialButtonsContainer}>
          <TouchableOpacity style={styles.socialButton}>
            <Text>Apple</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Text>Google</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.loginLink}>
          <Text style={styles.regularText}>Already have an account? <Text style={styles.linkText}>Log in</Text></Text>
        </TouchableOpacity>

        <Text style={styles.termsText}>
          By continuing, you agree with our <Text style={styles.linkText}>Terms of use</Text> & <Text style={styles.linkText}>Privacy policy</Text>.
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    width: 80,
    height: 80,
    backgroundColor: '#4A85FE',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  logoText: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  titleText: {
    fontSize: 28,
    fontWeight: '600',
    color: '#333',
  },
  highlightText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4A85FE',
  },
  footer: {
    padding: 24,
  },
  primaryButton: {
    backgroundColor: '#4A85FE',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  primaryButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  orText: {
    textAlign: 'center',
    color: '#888',
    marginBottom: 20,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  socialButton: {
    flex: 1,
    padding: 14,
    backgroundColor: '#FFF',
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 8,
    borderWidth: 1,
    borderColor: '#EEE',
  },
  loginLink: {
    alignItems: 'center',
    marginBottom: 24,
  },
  regularText: {
    color: '#555',
  },
  linkText: {
    color: '#4A85FE',
    fontWeight: '600',
  },
  termsText: {
    textAlign: 'center',
    color: '#888',
    fontSize: 12,
  },
});

export default WelcomeScreen;
