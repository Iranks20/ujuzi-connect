'use client';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { AccountStackParamList } from '../components/BottomNavigation';
import type { RootStackParamList } from '../../App';

type NavigationProp = NativeStackNavigationProp<AccountStackParamList>;
type RootNavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface Subscription {
  plan: string;
  status: string;
  renewalDate: string;
  features: string[];
}

interface UserStats {
  consultations: number;
  professionals: number;
  applications: number;
}

interface User {
  name: string;
  email: string;
  phone: string;
  location: string;
  avatar: string;
  memberSince: string;
  verificationStatus: string;
  subscription: Subscription;
  stats: UserStats;
}

interface SettingsItem {
  id: string;
  label: string;
}

interface SettingsSection {
  id: string;
  title: string;
  icon: string;
  items: SettingsItem[];
}

const AccountProfileScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const rootNavigation = useNavigation<RootNavigationProp>();

  // Sample user data
  const user: User = {
    name: 'David Mugisha',
    email: 'david.mugisha@example.com',
    phone: '+256 701 234 567',
    location: 'Kampala, Uganda',
    avatar: '👨🏾',
    memberSince: 'June 2023',
    verificationStatus: 'verified',
    subscription: {
      plan: 'Professional',
      status: 'active',
      renewalDate: 'August 15, 2023',
      features: [
        'Unlimited consultations',
        'Priority matching',
        'Access to all professional groups',
        'Advanced job search filters',
        'AI-powered recommendations'
      ]
    },
    stats: {
      consultations: 8,
      professionals: 12,
      applications: 3
    }
  };

  // Sample settings sections
  const settingsSections: SettingsSection[] = [
    {
      id: 'account',
      title: 'Account Settings',
      icon: '👤',
      items: [
        { id: 'profile', label: 'Edit Profile' },
        { id: 'password', label: 'Change Password' },
        { id: 'notifications', label: 'Notification Settings' }
      ]
    },
    {
      id: 'payment',
      title: 'Payment & Subscription',
      icon: '💳',
      items: [
        { id: 'subscription', label: 'Manage Subscription' },
        { id: 'payment-methods', label: 'Payment Methods' },
        { id: 'billing-history', label: 'Billing History' }
      ]
    },
    {
      id: 'privacy',
      title: 'Privacy & Security',
      icon: '🔒',
      items: [
        { id: 'privacy', label: 'Privacy Settings' },
        { id: 'security', label: 'Security Settings' },
        { id: 'data', label: 'Data & Storage' }
      ]
    },
    {
      id: 'help',
      title: 'Help & Support',
      icon: '❓',
      items: [
        { id: 'faq', label: 'FAQ' },
        { id: 'contact', label: 'Contact Support' },
        { id: 'feedback', label: 'Send Feedback' }
      ]
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Account</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <Text style={styles.settingsIcon}>⚙️</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.content}>
        {/* User profile */}
        <View style={styles.profileCard}>
          <View style={styles.profileHeader}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{user.avatar}</Text>
              </View>
              {user.verificationStatus === 'verified' && (
                <View style={styles.verifiedBadge}>
                  <Text style={styles.verifiedIcon}>✓</Text>
                </View>
              )}
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.name}>{user.name}</Text>
              <Text style={styles.email}>{user.email}</Text>
              <View style={styles.badgeContainer}>
                <View style={styles.planBadge}>
                  <Text style={styles.planBadgeText}>{user.subscription.plan} Plan</Text>
                </View>
                <Text style={styles.memberSince}>Member since {user.memberSince}</Text>
              </View>
            </View>
          </View>
          
          {/* User stats */}
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{user.stats.consultations}</Text>
              <Text style={styles.statLabel}>Consultations</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{user.stats.professionals}</Text>
              <Text style={styles.statLabel}>Professionals</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{user.stats.applications}</Text>
              <Text style={styles.statLabel}>Applications</Text>
            </View>
          </View>
        </View>
        
        {/* Subscription info */}
        <View style={styles.subscriptionCard}>
          <View style={styles.subscriptionHeader}>
            <View>
              <Text style={styles.subscriptionTitle}>{user.subscription.plan} Subscription</Text>
              <Text style={styles.subscriptionStatus}>
                {user.subscription.status === 'active' ? 'Active' : 'Inactive'} • Renews on {user.subscription.renewalDate}
              </Text>
            </View>
            <TouchableOpacity style={styles.upgradeButton}>
              <Text style={styles.upgradeButtonText}>Upgrade</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.featuresContainer}>
            <Text style={styles.featuresTitle}>Plan Features:</Text>
            {user.subscription.features.map((feature, index) => (
              <View key={index} style={styles.featureItem}>
                <Text style={styles.featureIcon}>✓</Text>
                <Text style={styles.featureText}>{feature}</Text>
              </View>
            ))}
          </View>
        </View>
        
        {/* Settings sections */}
        <View style={styles.settingsContainer}>
          {settingsSections.map(section => (
            <View key={section.id} style={styles.settingsSection}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionIcon}>{section.icon}</Text>
                <Text style={styles.sectionTitle}>{section.title}</Text>
              </View>
              <View style={styles.sectionContent}>
                {section.items.map(item => (
                  <TouchableOpacity 
                    key={item.id} 
                    style={styles.settingsItem}
                  >
                    <Text style={styles.settingsItemText}>{item.label}</Text>
                    <Text style={styles.settingsItemIcon}>›</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ))}
          
          {/* Logout button */}
          <TouchableOpacity 
            style={styles.logoutButton}
            onPress={() => rootNavigation.navigate('Login')}
          >
            <Text style={styles.logoutButtonText}>Log Out</Text>
          </TouchableOpacity>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
  },
  settingsButton: {
    padding: 8,
  },
  settingsIcon: {
    fontSize: 24,
  },
  content: {
    flex: 1,
  },
  profileCard: {
    backgroundColor: 'white',
    padding: 24,
    marginBottom: 16,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 80,
    height: 80,
    backgroundColor: '#DBEAFE',
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 40,
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#2563EB',
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  verifiedIcon: {
    color: 'white',
    fontSize: 16,
  },
  profileInfo: {
    marginLeft: 16,
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
  },
  email: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  planBadge: {
    backgroundColor: '#DBEAFE',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  planBadgeText: {
    fontSize: 12,
    color: '#1E40AF',
  },
  memberSince: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    marginTop: 24,
    gap: 16,
  },
  statItem: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '600',
    color: '#2563EB',
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
  subscriptionCard: {
    backgroundColor: '#EFF6FF',
    marginHorizontal: 24,
    marginBottom: 24,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  subscriptionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  subscriptionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1E40AF',
  },
  subscriptionStatus: {
    fontSize: 14,
    color: '#1E40AF',
    marginTop: 4,
  },
  upgradeButton: {
    backgroundColor: '#2563EB',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
  },
  upgradeButtonText: {
    color: 'white',
    fontSize: 14,
  },
  featuresContainer: {
    marginTop: 12,
  },
  featuresTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1E40AF',
    marginBottom: 8,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  featureIcon: {
    color: '#2563EB',
    marginRight: 8,
  },
  featureText: {
    fontSize: 14,
    color: '#1E40AF',
  },
  settingsContainer: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  settingsSection: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#F3F4F6',
  },
  sectionIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
  },
  sectionContent: {
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  settingsItemText: {
    fontSize: 16,
    color: '#374151',
  },
  settingsItemIcon: {
    fontSize: 20,
    color: '#9CA3AF',
  },
  logoutButton: {
    borderWidth: 1,
    borderColor: '#FCA5A5',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  logoutButtonText: {
    color: '#DC2626',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default AccountProfileScreen;