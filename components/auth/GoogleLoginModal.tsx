import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Modal, 
  TouchableOpacity, 
  TouchableWithoutFeedback,
  FlatList,
  Animated,
  Dimensions
} from 'react-native';
import { X } from 'lucide-react-native';
import colors from '@/constants/colors';
import typography from '@/constants/typography';
import layout from '@/constants/layout';
import { UserProfile } from '@/types';
import Avatar from '@/components/ui/Avatar';

interface GoogleLoginModalProps {
  visible: boolean;
  onClose: () => void;
  accounts: UserProfile[];
  onSelectAccount: (account: UserProfile) => void;
}

const { height } = Dimensions.get('window');

const GoogleLoginModal: React.FC<GoogleLoginModalProps> = ({
  visible,
  onClose,
  accounts,
  onSelectAccount
}) => {
  const slideAnim = React.useRef(new Animated.Value(height)).current;

  React.useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: height,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, slideAnim]);

  const renderAccountItem = ({ item }: { item: UserProfile }) => (
    <TouchableOpacity 
      style={styles.accountItem}
      onPress={() => onSelectAccount(item)}
      activeOpacity={0.7}
    >
      <Avatar source={item.avatar} size={48} />
      <View style={styles.accountInfo}>
        <Text style={styles.accountName}>{item.name}</Text>
        <Text style={styles.accountUsername}>@{item.username}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <Modal
      transparent
      visible={visible}
      animationType="none"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <Animated.View 
              style={[
                styles.modalContainer,
                { transform: [{ translateY: slideAnim }] }
              ]}
            >
              <View style={styles.header}>
                <Text style={styles.title}>Pilih Akun</Text>
                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                  <X size={layout.iconSize.m} color={colors.text} />
                </TouchableOpacity>
              </View>
              
              <FlatList
                data={accounts}
                renderItem={renderAccountItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.accountsList}
              />
              
              <TouchableOpacity 
                style={styles.cancelButton}
                onPress={onClose}
              >
                <Text style={styles.cancelText}>Batal</Text>
              </TouchableOpacity>
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: colors.card,
    borderTopLeftRadius: layout.borderRadius.xl,
    borderTopRightRadius: layout.borderRadius.xl,
    paddingTop: layout.spacing.l,
    paddingBottom: layout.spacing.xl,
    maxHeight: height * 0.7,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: layout.spacing.l,
    paddingBottom: layout.spacing.m,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
  },
  closeButton: {
    padding: layout.spacing.xs,
  },
  accountsList: {
    paddingHorizontal: layout.spacing.l,
    paddingTop: layout.spacing.m,
  },
  accountItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: layout.spacing.m,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  accountInfo: {
    marginLeft: layout.spacing.m,
  },
  accountName: {
    fontSize: typography.fontSize.m,
    fontWeight: typography.fontWeight.medium,
    color: colors.text,
    marginBottom: layout.spacing.xs,
  },
  accountUsername: {
    fontSize: typography.fontSize.s,
    color: colors.textSecondary,
  },
  cancelButton: {
    marginTop: layout.spacing.l,
    marginHorizontal: layout.spacing.l,
    paddingVertical: layout.spacing.m,
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: layout.borderRadius.m,
  },
  cancelText: {
    fontSize: typography.fontSize.m,
    fontWeight: typography.fontWeight.medium,
    color: colors.textSecondary,
  },
});

export default GoogleLoginModal;