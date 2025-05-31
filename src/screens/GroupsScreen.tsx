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
  FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { GroupsStackParamList } from '../components/BottomNavigation';

type NavigationProp = NativeStackNavigationProp<GroupsStackParamList>;

interface Group {
  id: number;
  name: string;
  members: number;
  image: string;
  color: string;
  isJoined: boolean;
}

const GroupsScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [searchQuery, setSearchQuery] = useState('');
  
  // Sample groups data
  const featuredGroups: Group[] = [
    {
      id: 1,
      name: 'Doctors of Uganda',
      members: 1245,
      image: '👨🏾‍⚕️',
      color: '#DBEAFE',
      isJoined: true
    },
    {
      id: 2,
      name: 'Tech Entrepreneurs',
      members: 876,
      image: '💻',
      color: '#F3E8FF',
      isJoined: false
    },
    {
      id: 3,
      name: 'Legal Professionals',
      members: 932,
      image: '⚖️',
      color: '#FEF3C7',
      isJoined: true
    }
  ];
  
  const allGroups: Group[] = [
    {
      id: 4,
      name: 'Financial Advisors',     
      members: 645,
      image: '🏗️',
      color: '#D1FAE5',
      isJoined: false
    },
    {
      id: 5,
      name: 'Educators Forum',
      members: 1120,
      image: '👩🏾‍🏫',
      color: '#FEE2E2',
      isJoined: false
    },
    {
      id: 6,
      name: 'Architects & Designers',
      members: 532,
      image: '💰',
      color: '#E0E7FF',
      isJoined: false
    },
    {
      id: 7,
      name: 'Mental Health Professionals',
      members: 789,
      image: '🧠',
      color: '#FCE7F3',
      isJoined: true
    },
    {
      id: 8,
      name: 'Software Engineers',
      members: 1567,
      image: '👨🏾‍💻',
      color: '#FFEDD5',
      isJoined: false
    },
    {
      id: 9,
      name: 'Creative Writers',
      members: 423,
      image: '✍️',
      color: '#CCFBF1',
      isJoined: false
    }
  ];

  const renderFeaturedGroup = ({ item }: { item: Group }) => (
    <TouchableOpacity 
      key={item.id}
      style={styles.featuredGroupCard}
      onPress={() => navigation.navigate('GroupChat', { groupId: item.id })}
    >
      <View style={[styles.featuredGroupImage, { backgroundColor: item.color }]}>
        <Text style={styles.groupEmoji}>{item.image}</Text>
      </View>
      <View style={styles.featuredGroupContent}>
        <View style={styles.groupHeader}>
          <View>
            <Text style={styles.groupName}>{item.name}</Text>
            <Text style={styles.memberCount}>{item.members} members</Text>
          </View>
          <TouchableOpacity 
            style={[
              styles.joinButton,
              item.isJoined ? styles.joinedButton : styles.joinButtonActive
            ]}
          >
            <Text 
              style={[
                styles.joinButtonText,
                item.isJoined ? styles.joinedButtonText : styles.joinButtonTextActive
              ]}
            >
              {item.isJoined ? 'Joined' : 'Join'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderAllGroup = ({ item }: { item: Group }) => (
    <TouchableOpacity 
      key={item.id}
      style={styles.allGroupCard}
      onPress={() => navigation.navigate('GroupChat', { groupId: item.id })}
    >
      <View style={[styles.allGroupImage, { backgroundColor: item.color }]}>
        <Text style={styles.groupEmoji}>{item.image}</Text>
      </View>
      <View style={styles.allGroupContent}>
        <View style={styles.groupHeader}>
          <View>
            <Text style={styles.groupName}>{item.name}</Text>
            <Text style={styles.memberCount}>{item.members} members</Text>
          </View>
          <TouchableOpacity 
            style={[
              styles.joinButton,
              item.isJoined ? styles.joinedButton : styles.joinButtonActive
            ]}
          >
            <Text 
              style={[
                styles.joinButtonText,
                item.isJoined ? styles.joinedButtonText : styles.joinButtonTextActive
              ]}
            >
              {item.isJoined ? 'Joined' : 'Join'}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.activeDiscussions}>
          <Text style={styles.activeDiscussionsText}>💬 Active discussions</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.headerTitle}>Professional Groups</Text>
          <TouchableOpacity style={styles.menuButton}>
            <Text style={styles.menuButtonText}>⋮</Text>
          </TouchableOpacity>
        </View>
        
        {/* Search bar */}
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search groups"
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#9CA3AF"
          />
        </View>
      </View>
      
      {/* Content */}
      <ScrollView style={styles.content}>
        {/* Featured groups */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Featured Groups</Text>
          <FlatList
            data={featuredGroups}
            renderItem={renderFeaturedGroup}
            keyExtractor={item => item.id.toString()}
            scrollEnabled={false}
          />
        </View>
        
        {/* All groups */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>All Groups</Text>
          <View style={styles.allGroupsGrid}>
            {allGroups.map(group => renderAllGroup({ item: group }))}
          </View>
        </View>
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
  content: {
    flex: 1,
    padding: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#111827',
    marginBottom: 12,
  },
  featuredGroupCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    flexDirection: 'row',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  featuredGroupImage: {
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featuredGroupContent: {
    flex: 1,
    padding: 16,
  },
  allGroupCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    width: '48%',
  },
  allGroupImage: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    aspectRatio: 1,
  },
  allGroupContent: {
    padding: 12,
  },
  groupEmoji: {
    fontSize: 32,
  },
  groupHeader: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  groupName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
    marginBottom: 4,
  },
  memberCount: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 8,
  },
  joinButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    minWidth: 70,
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  joinButtonActive: {
    backgroundColor: '#2563EB',
  },
  joinedButton: {
    backgroundColor: '#E5E7EB',
  },
  joinButtonText: {
    fontSize: 12,
    fontWeight: '500',
  },
  joinButtonTextActive: {
    color: 'white',
  },
  joinedButtonText: {
    color: '#374151',
  },
  activeDiscussions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  activeDiscussionsText: {
    fontSize: 12,
    color: '#6B7280',
  },
  allGroupsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: -6,
  },
});

export default GroupsScreen;