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
import type { GroupsStackParamList } from '../components/BottomNavigation';

type NavigationProp = NativeStackNavigationProp<GroupsStackParamList>;

interface Sender {
  name: string;
  role: string;
  image: string;
  isAdmin: boolean;
  isCurrentUser?: boolean;
}

interface Message {
  id: number;
  sender: Sender;
  text: string;
  time: string;
  likes: number;
  replies: number;
}

interface Group {
  id: number;
  name: string;
  members: number;
  image: string;
  color: string;
  description: string;
  onlineCount: number;
}

const GroupChatScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [message, setMessage] = useState('');
  
  // Sample group data
  const group: Group = {
    id: 1,
    name: 'Doctors of Uganda',
    members: 1245,
    image: '👨🏾‍⚕️',
    color: '#DBEAFE',
    description: 'A community of medical professionals across Uganda sharing knowledge, opportunities, and support.',
    onlineCount: 42
  };
  
  // Sample chat messages
  const messages: Message[] = [
    {
      id: 1,
      sender: {
        name: 'Dr. Sarah Mukasa',
        role: 'Pediatrician',
        image: '👩🏾‍⚕️',
        isAdmin: true
      },
      text: 'Welcome to our monthly discussion on pediatric care innovations! Let\'s share recent experiences and challenges.',
      time: '10:30 AM',
      likes: 12,
      replies: 3
    },
    {
      id: 2,
      sender: {
        name: 'Dr. John Okello',
        role: 'Cardiologist',
        image: '👨🏾‍⚕️',
        isAdmin: false
      },
      text: 'I\'ve been implementing the new WHO guidelines for hypertension management. Has anyone else started using them?',
      time: '10:35 AM',
      likes: 8,
      replies: 5
    },
    {
      id: 3,
      sender: {
        name: 'Dr. Amina Hassan',
        role: 'General Practitioner',
        image: '👩🏾‍⚕️',
        isAdmin: false
      },
      text: 'Yes, I\'ve been using them for about a month now. The new blood pressure thresholds are making a big difference in my rural practice.',
      time: '10:38 AM',
      likes: 5,
      replies: 2
    },
    {
      id: 4,
      sender: {
        name: 'Dr. Robert Kigongo',
        role: 'Surgeon',
        image: '👨🏾‍⚕️',
        isAdmin: false
      },
      text: 'Has anyone attended the recent surgical techniques workshop in Kampala? I missed it but would love to get the materials.',
      time: '10:42 AM',
      likes: 3,
      replies: 7
    },
    {
      id: 5,
      sender: {
        name: 'You',
        role: 'Medical Student',
        image: '👨🏾‍⚕️',
        isAdmin: false,
        isCurrentUser: true
      },
      text: 'I\'m a final year medical student and I\'m looking for mentorship opportunities in pediatrics. Any advice on how to approach this?',
      time: '10:45 AM',
      likes: 0,
      replies: 0
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.navigate('GroupsMain')}
          >
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          
          <View style={styles.groupInfo}>
            <View style={[styles.groupImage, { backgroundColor: group.color }]}>
              <Text style={styles.groupEmoji}>{group.image}</Text>
            </View>
            <View style={styles.groupDetails}>
              <Text style={styles.groupName}>{group.name}</Text>
              <Text style={styles.groupStats}>
                {group.onlineCount} online • {group.members} members
              </Text>
            </View>
          </View>
          
          <TouchableOpacity style={styles.menuButton}>
            <Text style={styles.menuButtonText}>⋮</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      {/* Group description */}
      <View style={styles.descriptionContainer}>
        <Text style={styles.description}>{group.description}</Text>
      </View>
      
      <KeyboardAvoidingView 
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        {/* Chat messages */}
        <ScrollView style={styles.messagesContainer}>
          {messages.map((message) => (
            <View 
              key={message.id} 
              style={[
                styles.messageWrapper,
                message.sender.isCurrentUser ? styles.userMessageWrapper : styles.otherMessageWrapper
              ]}
            >
              <View style={[
                styles.messageContent,
                message.sender.isCurrentUser ? styles.userMessageContent : styles.otherMessageContent
              ]}>
                {/* Message header */}
                <View style={styles.messageHeader}>
                  {!message.sender.isCurrentUser && (
                    <View style={styles.senderImage}>
                      <Text style={styles.senderEmoji}>{message.sender.image}</Text>
                    </View>
                  )}
                  <View style={[
                    styles.senderInfo,
                    message.sender.isCurrentUser ? styles.userSenderInfo : styles.otherSenderInfo
                  ]}>
                    <Text style={styles.senderName}>{message.sender.name}</Text>
                    {message.sender.isAdmin && (
                      <View style={styles.adminBadge}>
                        <Text style={styles.adminText}>Admin</Text>
                      </View>
                    )}
                    <Text style={styles.messageTime}>{message.time}</Text>
                  </View>
                </View>
                
                {/* Message content */}
                <View style={[
                  styles.messageBubble,
                  message.sender.isCurrentUser ? styles.userMessageBubble : styles.otherMessageBubble
                ]}>
                  <Text style={[
                    styles.messageText,
                    message.sender.isCurrentUser ? styles.userMessageText : styles.otherMessageText
                  ]}>
                    {message.text}
                  </Text>
                </View>
                
                {/* Message actions */}
                <View style={[
                  styles.messageActions,
                  message.sender.isCurrentUser ? styles.userMessageActions : styles.otherMessageActions
                ]}>
                  <TouchableOpacity style={styles.actionButton}>
                    <Text style={styles.actionIcon}>👍</Text>
                    {message.likes > 0 && (
                      <Text style={styles.actionCount}>{message.likes}</Text>
                    )}
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.actionButton}>
                    <Text style={styles.actionIcon}>💬</Text>
                    {message.replies > 0 && (
                      <Text style={styles.actionCount}>{message.replies}</Text>
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
        
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
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    fontSize: 24,
    color: '#374151',
  },
  groupInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  groupImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  groupEmoji: {
    fontSize: 20,
  },
  groupDetails: {
    marginLeft: 12,
  },
  groupName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  groupStats: {
    fontSize: 12,
    color: '#6B7280',
  },
  menuButton: {
    padding: 8,
    backgroundColor: '#F3F4F6',
    borderRadius: 20,
  },
  menuButtonText: {
    fontSize: 20,
    color: '#374151',
  },
  descriptionContainer: {
    backgroundColor: 'white',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  description: {
    fontSize: 14,
    color: '#4B5563',
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
  otherMessageWrapper: {
    alignItems: 'flex-start',
  },
  messageContent: {
    maxWidth: '85%',
  },
  userMessageContent: {
    alignItems: 'flex-end',
  },
  otherMessageContent: {
    alignItems: 'flex-start',
  },
  messageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  senderImage: {
    width: 32,
    height: 32,
    backgroundColor: '#DBEAFE',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  senderEmoji: {
    fontSize: 18,
  },
  senderInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userSenderInfo: {
    justifyContent: 'flex-end',
  },
  otherSenderInfo: {
    justifyContent: 'flex-start',
  },
  senderName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
  },
  adminBadge: {
    backgroundColor: '#DBEAFE',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginLeft: 4,
  },
  adminText: {
    fontSize: 12,
    color: '#1E40AF',
  },
  messageTime: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 8,
  },
  messageBubble: {
    padding: 12,
    borderRadius: 12,
  },
  userMessageBubble: {
    backgroundColor: '#2563EB',
  },
  otherMessageBubble: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  messageText: {
    fontSize: 14,
  },
  userMessageText: {
    color: 'white',
  },
  otherMessageText: {
    color: '#111827',
  },
  messageActions: {
    flexDirection: 'row',
    marginTop: 4,
  },
  userMessageActions: {
    justifyContent: 'flex-end',
  },
  otherMessageActions: {
    justifyContent: 'flex-start',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  actionIcon: {
    fontSize: 16,
    color: '#6B7280',
    marginRight: 4,
  },
  actionCount: {
    fontSize: 12,
    color: '#6B7280',
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
    backgroundColor: '#2563EB',
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

export default GroupChatScreen;