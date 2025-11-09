import { Platform } from 'react-native';

const FontWeights = {
  thin: '100',
  extraLight: '200',
  light: '300',
  regular: '400',
  medium: '500',
  semiBold: '600',
  bold: '700',
  extraBold: '800',
  black: '900',
};

const getFontFamily = (weight = 'regular') => {
  const fontFamilies = {
    thin: Platform.select({
      ios: 'Outfit-Thin',
      android: 'Outfit-Thin',
    }),
    extraLight: Platform.select({
      ios: 'Outfit-ExtraLight',
      android: 'Outfit-ExtraLight',
    }),
    light: Platform.select({
      ios: 'Outfit-Light',
      android: 'Outfit-Light',
    }),
    regular: Platform.select({
      ios: 'Outfit-Regular',
      android: 'Outfit-Regular',
    }),
    medium: Platform.select({
      ios: 'Outfit-Medium',
      android: 'Outfit-Medium',
    }),
    semiBold: Platform.select({
      ios: 'Outfit-SemiBold',
      android: 'Outfit-SemiBold',
    }),
    bold: Platform.select({
      ios: 'Outfit-Bold',
      android: 'Outfit-Bold',
    }),
    extraBold: Platform.select({
      ios: 'Outfit-ExtraBold',
      android: 'Outfit-ExtraBold',
    }),
    black: Platform.select({
      ios: 'Outfit-Black',
      android: 'Outfit-Black',
    }),
  };

  return fontFamilies[weight] || fontFamilies.regular;
};

export const Typography = {
  // Display styles (for large headings)
  displayLarge: {
    fontFamily: getFontFamily('bold'),
    fontSize: 32,
    lineHeight: 40,
    letterSpacing: -0.5,
  },
  displayMedium: {
    fontFamily: getFontFamily('bold'),
    fontSize: 28,
    lineHeight: 36,
    letterSpacing: -0.25,
  },
  displaySmall: {
    fontFamily: getFontFamily('semiBold'),
    fontSize: 24,
    lineHeight: 32,
    letterSpacing: 0,
  },

  // Heading styles
  headingLarge: {
    fontFamily: getFontFamily('semiBold'),
    fontSize: 22,
    lineHeight: 28,
    letterSpacing: 0,
  },
  headingMedium: {
    fontFamily: getFontFamily('semiBold'),
    fontSize: 20,
    lineHeight: 26,
    letterSpacing: 0,
  },
  headingSmall: {
    fontFamily: getFontFamily('medium'),
    fontSize: 18,
    lineHeight: 24,
    letterSpacing: 0,
  },

  // Title styles
  titleLarge: {
    fontFamily: getFontFamily('semiBold'),
    fontSize: 16,
    lineHeight: 22,
    letterSpacing: 0,
  },
  titleMedium: {
    fontFamily: getFontFamily('medium'),
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0,
  },
  titleSmall: {
    fontFamily: getFontFamily('medium'),
    fontSize: 12,
    lineHeight: 18,
    letterSpacing: 0,
  },

  // Body text styles
  bodyLarge: {
    fontFamily: getFontFamily('regular'),
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0,
  },
  bodyMedium: {
    fontFamily: getFontFamily('regular'),
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0,
  },
  bodySmall: {
    fontFamily: getFontFamily('regular'),
    fontSize: 12,
    lineHeight: 18,
    letterSpacing: 0,
  },

  // Label styles
  labelLarge: {
    fontFamily: getFontFamily('semiBold'),
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0,
  },
  labelMedium: {
    fontFamily: getFontFamily('medium'),
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0,
  },
  labelSmall: {
    fontFamily: getFontFamily('medium'),
    fontSize: 10,
    lineHeight: 14,
    letterSpacing: 0,
  },

  // Caption styles 
  caption: {
    fontFamily: getFontFamily('regular'),
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0,
  },
  captionSmall: {
    fontFamily: getFontFamily('regular'),
    fontSize: 10,
    lineHeight: 14,
    letterSpacing: 0,
  },
};

export const getFont = (weight = 'regular', fontSize = 14, lineHeight, letterSpacing = 0) => ({
  fontFamily: getFontFamily(weight),
  fontSize,
  lineHeight: lineHeight || Math.round(fontSize * 1.4),
  letterSpacing,
});

export const ButtonText = {
  large: {
    ...getFont('semiBold', 16),
    lineHeight: 24,
  },
  medium: {
    ...getFont('semiBold', 14),
    lineHeight: 20,
  },
  small: {
    ...getFont('medium', 12),
    lineHeight: 16,
  },
};

export const InputText = {
  default: {
    ...getFont('regular', 14),
    lineHeight: 20,
  },
  label: {
    ...getFont('medium', 14),
    lineHeight: 20,
  },
  placeholder: {
    ...getFont('regular', 14),
    lineHeight: 20,
  },
  error: {
    ...getFont('regular', 12),
    lineHeight: 16,
  },
  hint: {
    ...getFont('regular', 12),
    lineHeight: 16,
  },
};

export const FontFamilies = {
  thin: getFontFamily('thin'),
  extraLight: getFontFamily('extraLight'),
  light: getFontFamily('light'),
  regular: getFontFamily('regular'),
  medium: getFontFamily('medium'),
  semiBold: getFontFamily('semiBold'),
  bold: getFontFamily('bold'),
  extraBold: getFontFamily('extraBold'),
  black: getFontFamily('black'),
};

export default Typography;