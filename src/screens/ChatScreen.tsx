'use client';
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StatusBar,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  ChatList: undefined;
  Booking: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface Professional {
  id: number;
  name: string;
  profession: string;
  image: string;
  isOnline: boolean;
  lastSeen: string;
}

interface Message {
  id: number;
  sender: 'professional' | 'user';
  text: string;
  time: string;
  status: 'read' | 'delivered';
}

const ChatScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [message, setMessage] = useState('');
  
  // Sample professional data
  const professional: Professional = {
    id: 1,
    name: 'Dr. Sarah Mukasa',
    profession: 'Pediatrician',
    image: '👩🏾‍⚕️',
    isOnline: true,
    lastSeen: 'Online'
  };
  
  // Sample chat messages
  const messages: Message[] = [
    {
      id: 1,
      sender: 'professional',
      text: 'Hello! How can I help you today?',
      time: '10:30 AM',
      status: 'read'
    },
    {
      id: 2,
      sender: 'user',
      text: 'Hi Dr. Mukasa, my 3-year-old son has had a fever since yesterday evening. I\'m quite concerned.',
      time: '10:32 AM',
      status: 'read'
    },
    {
      id: 3,
      sender: 'professional',
      text: 'I understand your concern. What\'s his temperature reading?',
      time: '10:33 AM',
      status: 'read'
    },
    {
      id: 4,
      sender: 'user',
      text: 'It was 38.5°C last night and 38.2°C this morning.',
      time: '10:35 AM',
      status: 'read'
    },
    {
      id: 5,
      sender: 'professional',
      text: 'Has he been eating and drinking normally? Any other symptoms like cough, runny nose, or rash?',
      time: '10:36 AM',
      status: 'read'
    },
    {
      id: 6,
      sender: 'user',
      text: 'His appetite is reduced, but he\'s drinking water. He has a slight runny nose but no rash.',
      time: '10:38 AM',
      status: 'read'
    },
    {
      id: 7,
      sender: 'professional',
      text: 'Based on what you\'ve described, it sounds like he might have a mild viral infection. Have you given him any medication for the fever?',
      time: '10:40 AM',
      status: 'read'
    },
    {
      id: 8,
      sender: 'user',
      text: 'Yes, I gave him children\'s paracetamol last night and this morning.',
      time: '10:41 AM',
      status: 'read'
    },
    {
      id: 9,
      sender: 'professional',
      text: 'That\'s good. I recommend continuing with the paracetamol as directed for children his age. Make sure he stays hydrated and gets plenty of rest. If the fever persists for more than 3 days or goes above 39°C, he should be seen in person.',
      time: '10:45 AM',
      status: 'read'
    },
    {
      id: 10,
      sender: 'professional',
      text: 'Would you like to schedule a video consultation so I can see him and provide a more thorough assessment?',
      time: '10:46 AM',
      status: 'delivered'
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.navigate('ChatList')}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        
        <View style={styles.professionalInfo}>
          <View style={styles.professionalImageContainer}>
            <View style={styles.professionalImage}>
              <Text style={styles.professionalEmoji}>{professional.image}</Text>
            </View>
            {professional.isOnline && (
              <View style={styles.onlineIndicator} />
            )}
          </View>
          
          <View>
            <Text style={styles.professionalName}>{professional.name}</Text>
            <Text style={styles.onlineStatus}>{professional.lastSeen}</Text>
          </View>
        </View>
        
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerButton}>
            <Text style={styles.headerButtonText}>📞</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <Text style={styles.headerButtonText}>🎥</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <Text style={styles.headerButtonText}>⋮</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <KeyboardAvoidingView 
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        {/* Chat messages */}
        <ScrollView style={styles.messagesContainer}>
          {messages.map(message => (
            <View 
              key={message.id} 
              style={[
                styles.messageWrapper,
                message.sender === 'user' ? styles.userMessageWrapper : styles.professionalMessageWrapper
              ]}
            >
              <View 
                style={[
                  styles.messageBubble,
                  message.sender === 'user' ? styles.userMessageBubble : styles.professionalMessageBubble
                ]}
              >
                <Text 
                  style={[
                    styles.messageText,
                    message.sender === 'user' ? styles.userMessageText : styles.professionalMessageText
                  ]}
                >
                  {message.text}
                </Text>
                <View style={styles.messageFooter}>
                  <Text 
                    style={[
                      styles.messageTime,
                      message.sender === 'user' ? styles.userMessageTime : styles.professionalMessageTime
                    ]}
                  >
                    {message.time}
                  </Text>
                  {message.sender === 'user' && (
                    <Text style={styles.messageStatus}>
                      {message.status === 'read' ? '✓✓' : '✓'}
                    </Text>
                  )}
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
        
        {/* Consultation banner */}
        <View style={styles.consultationBanner}>
          <View>
            <Text style={styles.consultationTitle}>Start a Paid Consultation</Text>
            <Text style={styles.consultationSubtitle}>Get detailed medical advice via video call</Text>
          </View>
          <TouchableOpacity 
            style={styles.bookButton}
            onPress={() => navigation.navigate('Booking')}
          >
            <Text style={styles.bookButtonText}>Book Now</Text>
          </TouchableOpacity>
        </View>
        
        {/* Message input */}
        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.attachButton}>
            <Text style={styles.attachButtonText}>📎</Text>
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="Type a message..."
            value={message}
            onChangeText={setMessage}
            placeholderTextColor="#9CA3AF"
          />
          <TouchableOpacity style={styles.sendButton}>
            <Text style={styles.sendButtonText}>➤</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingTop: 48,
    paddingBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  backButtonText: {
    fontSize: 24,
    color: '#374151',
  },
  professionalInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  professionalImageContainer: {
    position: 'relative',
    marginRight: 12,
  },
  professionalImage: {
    width: 40,
    height: 40,
    backgroundColor: '#DBEAFE',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  professionalEmoji: {
    fontSize: 24,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    backgroundColor: '#10B981',
    borderRadius: 6,
    borderWidth: 2,
    borderColor: 'white',
  },
  professionalName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  onlineStatus: {
    fontSize: 12,
    color: '#059669',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerButton: {
    padding: 8,
    marginLeft: 8,
  },
  headerButtonText: {
    fontSize: 20,
    color: '#374151',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  messagesContainer: {
    flex: 1,
    padding: 16,
  },
  messageWrapper: {
    marginBottom: 16,
  },
  userMessageWrapper: {
    alignItems: 'flex-end',
  },
  professionalMessageWrapper: {
    alignItems: 'flex-start',
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 16,
  },
  userMessageBubble: {
    backgroundColor: '#1e3a8a',
    borderBottomRightRadius: 4,
  },
  professionalMessageBubble: {
    backgroundColor: 'white',
    borderBottomLeftRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  messageText: {
    fontSize: 14,
  },
  userMessageText: {
    color: 'white',
  },
  professionalMessageText: {
    color: '#111827',
  },
  messageFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 4,
  },
  messageTime: {
    fontSize: 12,
  },
  userMessageTime: {
    color: '#93C5FD',
  },
  professionalMessageTime: {
    color: '#6B7280',
  },
  messageStatus: {
    fontSize: 12,
    marginLeft: 4,
    color: '#93C5FD',
  },
  consultationBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#EFF6FF',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#DBEAFE',
  },
  consultationTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1e3a8a',
  },
  consultationSubtitle: {
    fontSize: 12,
    color: '#1e40af',
  },
  bookButton: {
    backgroundColor: '#1e3a8a',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  bookButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  attachButton: {
    padding: 8,
  },
  attachButtonText: {
    fontSize: 20,
    color: '#374151',
  },
  input: {
    flex: 1,
    marginHorizontal: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#F3F4F6',
    borderRadius: 20,
    fontSize: 16,
    color: '#111827',
  },
  sendButton: {
    width: 40,
    height: 40,
    backgroundColor: '#1e3a8a',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonText: {
    fontSize: 20,
    color: 'white',
    transform: [{ rotate: '90deg' }],
  },
});

export default ChatScreen;