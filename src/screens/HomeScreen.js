import React, { useEffect, useCallback, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  TextInput,
  ScrollView,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  StatusBar,
  Dimensions,
  Platform,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { fetchProducts } from '../redux/productSlice';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Typography } from '../utils/typography';
import { COLORS } from '../utils/colors';

function TransportIcon({ name, label }) {
  return (
    <TouchableOpacity style={styles.transportIcon} activeOpacity={0.7}>
      <View style={styles.iconContainer}>
        <Ionicons name={name} size={20} color={'#000'} />
      </View>
      <Text style={styles.iconLabel}>{label}</Text>
    </TouchableOpacity>
  );
}

function ExploreCard({ image, title, subtitle, rating, price }) {
  return (
    <View style={styles.exploreCard}>
      <Image source={image} style={styles.exploreImage} />
      <View style={styles.exploreDetails}>
        <Text style={styles.exploreTitle} numberOfLines={1}>{title}</Text>
        <Text style={styles.exploreSubtitle} numberOfLines={1}>{subtitle}</Text>
        <View style={styles.exploreRatingRow}>
          <Ionicons name="star" size={12} color={'#FFD233'} />
          <Text style={styles.exploreRating}>{rating}</Text>
        </View>
        <View style={styles.exploreBottomRow}>
          <View>
          <Text style={styles.priceText}>Start from</Text>
          <Text style={styles.priceValue}>${price}/pax</Text>
          </View>
        
          <View style={styles.tripBadge}>
            <Text style={styles.tripText}>3D2N</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

function RecommendationItem({ item }) {
  const { id, title, price, images, description } = item;
  const imageSource = images && images.length > 0 ? { uri: images[0] } : null;
  const [imageError, setImageError] = useState(false);
  
  return (
    <TouchableOpacity style={styles.recommendationItem} activeOpacity={0.7}>
      {imageSource && !imageError ? (
        <Image 
          source={imageSource} 
          style={styles.recommendationImage}
          onError={() => setImageError(true)}
          defaultSource={require('../images/default.jpg')}
        />
      ) : (
        <Image 
          source={require('../images/default.jpg')}
          style={styles.recommendationImage}
        />
      )}
      <View style={styles.recommendationContent}>
        <Text style={styles.recommendationTitle} numberOfLines={1}>{title}</Text>
        <Text style={styles.recommendationSubtitle} numberOfLines={2}>{description}</Text>
        <View style={styles.exploreRatingRow}>
          <Ionicons name="star" size={12} color={'#FFD233'} />
          <Text style={styles.exploreRating}> 4.5-star rating</Text>
        </View>
        <Text style={styles.recommendationPrice}>${price}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default function HomeScreen() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { items: products, loading, error, offset, limit, hasMore } = useSelector((state) => state.products);
  
  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle('light-content', true);
      if (Platform.OS === 'android') {
        StatusBar.setBackgroundColor(COLORS.primary, true);
      }

      return () => {
        StatusBar.setBarStyle('dark-content', true);
        if (Platform.OS === 'android') {
          StatusBar.setBackgroundColor('#FFFFFF', true);
        }
      };
    }, [])
  );
  
  useEffect(() => {
    dispatch(fetchProducts({ offset: 0, limit }));
  }, [dispatch, limit]);

  useEffect(() => {
    if (error) Alert.alert('Error', error);
  }, [error]);

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      dispatch(fetchProducts({ offset, limit }));
    }
  }, [dispatch, loading, hasMore, offset, limit]);

  const exploreData = [
    {
      id: 1,
      image: require('../images/Explore1.jpg'),
      title: 'Sailing Komodo',
      subtitle: 'Labuan Bajo',
      rating: '4.9',
      price: '200',
    },
    {
      id: 2,
      image: require('../images/Explore2.jpg'),
      title: 'Labengki Sombori',
      subtitle: 'Indonesia & Sulawesi',
      rating: '4.8',
      price: '250',
    },
    {
      id: 3,
      image: require('../images/Explore3.jpg'),
      title: 'Mount Bromo',
      subtitle: 'Volcano in East Java',
      rating: '4.9',
      price: '150',
    },
  ];

  const renderRecommendationItem = ({ item }) => (
    <RecommendationItem item={item} />
  );

  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View style={styles.loadingFooter}>
        <ActivityIndicator size="small" color={COLORS.primary} />
        <Text style={styles.loadingText}>Loading more products...</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>

      <View style={styles.blueBackground}>
        <View style={styles.header}>
          <Text style={styles.welcomeText}>Welcome</Text>
          <TouchableOpacity style={styles.profileAvatar}>
            <Image source={require('../images/profile.jpg')} style={styles.avatarImage} />
          </TouchableOpacity>
        </View>

        <View style={styles.searchWrapper}>
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color={COLORS.textMuted} style={{ marginRight: 8 }} />
            <TextInput
              placeholder="Where to go?"
              placeholderTextColor={COLORS.textMuted}
              style={styles.searchInput}
            />
          </View>
        </View>
      </View>

      <View style={styles.transportSection}>
        <TransportIcon name="bed-outline" label="Hotels" />
        <TransportIcon name="airplane-outline" label="Flights" />
        <TransportIcon name="train-outline" label="Trains" />
        <TransportIcon name="boat-outline" label="Ferry" />
        <TransportIcon name="bus-outline" label="Bus" />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Explore</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {exploreData.map((item) => (
              <ExploreCard key={item.id} {...item} />
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recommendation for you</Text>
          {products.length > 0 ? (
            <FlatList
              data={products}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderRecommendationItem}
              onEndReached={loadMore}
              onEndReachedThreshold={0.5}
              ListFooterComponent={renderFooter}
              showsVerticalScrollIndicator={false}
              scrollEnabled={false} 
            />
          ) : (
            <View style={styles.emptyState}>
              {loading ? (
                <>
                  <ActivityIndicator size="large" color={COLORS.primary} />
                  <Text style={styles.emptyStateText}>Loading products...</Text>
                </>
              ) : (
                <Text style={styles.emptyStateText}>No products available</Text>
              )}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  statusBarBackground: {
    backgroundColor: COLORS.primary,
  },
  blueBackground: {
    backgroundColor: COLORS.primary,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingBottom: 50,
  },
  header: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: '600',
    color: COLORS.white,
  },
  profileAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  searchWrapper: {
    alignItems: 'center',
    marginTop: 5,
    backgroundColor: 'transparent',
    paddingBottom: 0,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    width: '90%',
    borderRadius: 10,
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: COLORS.text,
  },
  transportSection: {
    marginTop: -25,
    zIndex: 999999,
    backgroundColor: COLORS.white,
    marginHorizontal: 12,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  transportIcon: {
    alignItems: 'center',
  },
  iconContainer: {
    backgroundColor: '#B4D1FF',
    width: 40,
    height: 40,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  iconLabel: {
    fontSize: 12,
    color: COLORS.text,
  },
  section: {
    marginTop: 25,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    ...Typography.titleLarge,
    color: COLORS.text,
    marginBottom: 12,
  },
  exploreCard: {
    width: Dimensions.get('window').width * 0.38,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    marginRight: 14,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
    marginBottom: 10,
    marginLeft:2,
  },
  exploreImage: {
    width: '100%',
    height: Dimensions.get('window').width * 0.38,
  },
  exploreDetails: {
    padding: 8,
  },
  exploreTitle: {
    ...Typography.titleLarge,
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
  },
  exploreSubtitle: {
    fontSize: 12,
    ...Typography.bodySmall,
    color: COLORS.textMuted,
  },
  exploreRatingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
    
  },
  exploreRating: {
    fontSize: 12,
    color: COLORS.text,
    marginLeft: 4,
    ...Typography.bodySmall,

  },
  exploreBottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
    justifyContent: 'space-between',
  },
  priceText: {
    fontSize: 11,
    color: COLORS.textMuted,
    ...Typography.bodySmall,

  },
  priceValue: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.text,
    ...Typography.bodySmall,

  },
  tripBadge: {
    backgroundColor: '#000000',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  tripText: {
    fontSize: 10,
    color: COLORS.white,
  },
  recommendationItem: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  recommendationImage: {
    width: Dimensions.get('window').height * 0.17,
    height: Dimensions.get('window').height * 0.17,
    borderRadius: 8,
  },
  recommendationContent: {
    flex: 1,
    marginLeft: 10,
    marginTop:5
  },
  recommendationTitle: {
    fontWeight: '600',
    color: COLORS.text,
    ...Typography.titleLarge,

  },
  recommendationSubtitle: {
    marginTop:5,
    color: COLORS.textMuted,
    marginVertical: 2,
    ...Typography.labelSmall,

  },
  recommendationRating: {
    color: COLORS.orange,
    marginTop:5,
    ...Typography.labelSmall,

  },
  recommendationPrice: {
    fontWeight: '600',
    marginTop:5,
    ...Typography.labelLarge,
    color: COLORS.text,
  },
  imagePlaceholder: {
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingFooter: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 8,
    color: COLORS.textMuted,
    fontSize: 14,
    ...Typography.bodySmall,
  },
  emptyState: {
    paddingVertical: 40,
    alignItems: 'center',
  },
  emptyStateText: {
    color: COLORS.textMuted,
    fontSize: 16,
    marginTop: 10,
    ...Typography.bodyMedium,
  },
});
