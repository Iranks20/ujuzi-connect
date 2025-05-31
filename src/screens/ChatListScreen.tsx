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
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { ChatStackParamList } from '../components/BottomNavigation';

type NavigationProp = NativeStackNavigationProp<ChatStackParamList>;

interface Professional {
  name: string;
  profession: string;
  image: string;
  isOnline: boolean;
}

interface LastMessage {
  text: string;
  time: string;
  isUnread: boolean;
  unreadCount: number;
}

interface Conversation {
  id: number;
  professional: Professional;
  lastMessage: LastMessage;
}

const ChatListScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [searchQuery, setSearchQuery] = useState('');
  
  // Sample chat conversations
  const conversations: Conversation[] = [
    {
      id: 1,
      professional: {
        name: 'Dr. Sarah Mukasa',
        profession: 'Pediatrician',
        image: '👩🏾‍⚕️',
        isOnline: true
      },
      lastMessage: {
        text: 'Would you like to schedule a video consultation?',
        time: '10:46 AM',
        isUnread: true,
        unreadCount: 1
      }
    },
    {
      id: 2,
      professional: {
        name: 'Adv. John Okello',
        profession: 'Corporate Lawyer',
        image: '👨🏾‍⚖️',
        isOnline: false
      },
      lastMessage: {
        text: 'I\'ve reviewed the contract and have some points to discuss.',
        time: 'Yesterday',
        isUnread: false,
        unreadCount: 0
      }
    },
    {
      id: 3,
      professional: {
        name: 'Dr. Amina Hassan',
        profession: 'Psychologist',
        image: '👩🏾‍💼',
        isOnline: true
      },
      lastMessage: {
        text: 'That\'s great progress! Let\'s continue in our next session.',
        time: 'Yesterday',
        isUnread: false,
        unreadCount: 0
      }
    },
    {
      id: 4,
      professional: {
        name: 'Eng. Robert Kigongo',
        profession: 'Civil Engineer',
        image: '👨🏾‍🔧',
        isOnline: false
      },
      lastMessage: {
        text: 'I\'ll send you the structural assessment report tomorrow.',
        time: 'Monday',
        isUnread: false,
        unreadCount: 0
      }
    },
    {
      id: 5,
      professional: {
        name: 'Prof. Elizabeth Ochieng',
        profession: 'Mathematics Tutor',
        image: '👩🏾‍🏫',
        isOnline: false
      },
      lastMessage: {
        text: 'Don\'t forget to complete the practice problems before our next class.',
        time: 'Jul 2',
        isUnread: false,
        unreadCount: 0
      }
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.headerTitle}>Messages</Text>
          <TouchableOpacity style={styles.menuButton}>
            <Text style={styles.menuButtonText}>⋮</Text>
          </TouchableOpacity>
        </View>
        
        {/* Search bar */}
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search messages"
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#9CA3AF"
          />
        </View>
      </View>
      
      {/* Conversation list */}
      <ScrollView style={styles.conversationList}>
        {conversations.map((conversation) => (
          <TouchableOpacity 
            key={conversation.id}
            style={styles.conversationItem}
            onPress={() => navigation.navigate('Chat', { professionalId: conversation.id })}
          >
            <View style={styles.conversationContent}>
              {/* Profile image */}
              <View style={styles.profileImageContainer}>
                <View style={styles.profileImage}>
                  <Text style={styles.profileEmoji}>{conversation.professional.image}</Text>
                </View>
                {conversation.professional.isOnline && (
                  <View style={styles.onlineIndicator} />
                )}
              </View>
              
              {/* Conversation details */}
              <View style={styles.conversationDetails}>
                <View style={styles.conversationHeader}>
                  <Text style={styles.professionalName}>
                    {conversation.professional.name}
                  </Text>
                  <Text style={styles.messageTime}>
                    {conversation.lastMessage.time}
                  </Text>
                </View>
                <Text style={styles.professionalProfession}>
                  {conversation.professional.profession}
                </Text>
                <View style={styles.messageContainer}>
                  <Text 
                    style={[
                      styles.messageText,
                      conversation.lastMessage.isUnread && styles.unreadMessageText
                    ]}
                    numberOfLines={1}
                  >
                    {conversation.lastMessage.text}
                  </Text>
                  {conversation.lastMessage.isUnread && conversation.lastMessage.unreadCount > 0 && (
                    <View style={styles.unreadBadge}>
                      <Text style={styles.unreadCount}>
                        {conversation.lastMessage.unreadCount}
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
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
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 12,
  },
  searchIcon: {
    fontSize: 20,
    color: '#9CA3AF',
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: '#111827',
  },
  conversationList: {
    flex: 1,
  },
  conversationItem: {
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  conversationContent: {
    flexDirection: 'row',
    padding: 16,
  },
  profileImageContainer: {
    position: 'relative',
  },
  profileImage: {
    width: 48,
    height: 48,
    backgroundColor: '#DBEAFE',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileEmoji: {
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
  conversationDetails: {
    flex: 1,
    marginLeft: 12,
  },
  conversationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  professionalName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
  },
  messageTime: {
    fontSize: 12,
    color: '#6B7280',
  },
  professionalProfession: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  messageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  messageText: {
    flex: 1,
    fontSize: 14,
    color: '#6B7280',
    marginRight: 8,
  },
  unreadMessageText: {
    color: '#111827',
    fontWeight: '500',
  },
  unreadBadge: {
    backgroundColor: '#2563EB',
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  unreadCount: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
});

export default ChatListScreen;