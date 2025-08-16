import {
  HomeIcon,
  TruckIcon,
  ShoppingBagIcon,
  CakeIcon,
  HeartIcon,
  AcademicCapIcon,
  WifiIcon,
  BriefcaseIcon,
  FilmIcon,
  PaperAirplaneIcon,
  WrenchScrewdriverIcon,
  CreditCardIcon,
  ReceiptRefundIcon,
} from '@heroicons/react/24/outline';

export interface CategoryIconData {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  bgColor: string;
  textColor: string;
}

/**
 * Get appropriate icon and color scheme for a given category name
 * @param categoryName - The name of the category
 * @returns Object containing icon component and color classes
 */
export const getCategoryIcon = (categoryName: string): CategoryIconData => {
  const lowerCategory = categoryName.toLowerCase();

  // Food & Dining
  if (
    lowerCategory.includes('food') ||
    lowerCategory.includes('restaurant') ||
    lowerCategory.includes('dining') ||
    lowerCategory.includes('meal') ||
    lowerCategory.includes('grocery')
  ) {
    return {
      icon: CakeIcon,
      bgColor: 'bg-orange-100',
      textColor: 'text-orange-600',
    };
  }

  // Transportation
  if (
    lowerCategory.includes('transport') ||
    lowerCategory.includes('gas') ||
    lowerCategory.includes('fuel') ||
    lowerCategory.includes('car') ||
    lowerCategory.includes('uber') ||
    lowerCategory.includes('lyft') ||
    lowerCategory.includes('taxi')
  ) {
    return {
      icon: TruckIcon,
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-600',
    };
  }

  // Shopping
  if (
    lowerCategory.includes('shopping') ||
    lowerCategory.includes('clothing') ||
    lowerCategory.includes('fashion') ||
    lowerCategory.includes('retail') ||
    lowerCategory.includes('store')
  ) {
    return {
      icon: ShoppingBagIcon,
      bgColor: 'bg-purple-100',
      textColor: 'text-purple-600',
    };
  }

  // Housing
  if (
    lowerCategory.includes('rent') ||
    lowerCategory.includes('mortgage') ||
    lowerCategory.includes('home') ||
    lowerCategory.includes('house') ||
    lowerCategory.includes('utilities') ||
    lowerCategory.includes('electricity') ||
    lowerCategory.includes('water')
  ) {
    return {
      icon: HomeIcon,
      bgColor: 'bg-green-100',
      textColor: 'text-green-600',
    };
  }

  // Healthcare
  if (
    lowerCategory.includes('health') ||
    lowerCategory.includes('medical') ||
    lowerCategory.includes('doctor') ||
    lowerCategory.includes('pharmacy') ||
    lowerCategory.includes('dental') ||
    lowerCategory.includes('hospital')
  ) {
    return {
      icon: HeartIcon,
      bgColor: 'bg-red-100',
      textColor: 'text-red-600',
    };
  }

  // Education
  if (
    lowerCategory.includes('education') ||
    lowerCategory.includes('school') ||
    lowerCategory.includes('college') ||
    lowerCategory.includes('course') ||
    lowerCategory.includes('book') ||
    lowerCategory.includes('tuition')
  ) {
    return {
      icon: AcademicCapIcon,
      bgColor: 'bg-indigo-100',
      textColor: 'text-indigo-600',
    };
  }

  // Technology
  if (
    lowerCategory.includes('tech') ||
    lowerCategory.includes('internet') ||
    lowerCategory.includes('phone') ||
    lowerCategory.includes('software') ||
    lowerCategory.includes('gadget') ||
    lowerCategory.includes('computer')
  ) {
    return {
      icon: WifiIcon,
      bgColor: 'bg-cyan-100',
      textColor: 'text-cyan-600',
    };
  }

  // Entertainment
  if (
    lowerCategory.includes('entertainment') ||
    lowerCategory.includes('movie') ||
    lowerCategory.includes('game') ||
    lowerCategory.includes('concert') ||
    lowerCategory.includes('hobby') ||
    lowerCategory.includes('music')
  ) {
    return {
      icon: FilmIcon,
      bgColor: 'bg-pink-100',
      textColor: 'text-pink-600',
    };
  }

  // Travel
  if (
    lowerCategory.includes('travel') ||
    lowerCategory.includes('vacation') ||
    lowerCategory.includes('flight') ||
    lowerCategory.includes('hotel') ||
    lowerCategory.includes('trip') ||
    lowerCategory.includes('airline')
  ) {
    return {
      icon: PaperAirplaneIcon,
      bgColor: 'bg-yellow-100',
      textColor: 'text-yellow-600',
    };
  }

  // Business
  if (
    lowerCategory.includes('business') ||
    lowerCategory.includes('work') ||
    lowerCategory.includes('office') ||
    lowerCategory.includes('professional') ||
    lowerCategory.includes('meeting')
  ) {
    return {
      icon: BriefcaseIcon,
      bgColor: 'bg-gray-100',
      textColor: 'text-gray-600',
    };
  }

  // Finance
  if (
    lowerCategory.includes('finance') ||
    lowerCategory.includes('bank') ||
    lowerCategory.includes('credit') ||
    lowerCategory.includes('loan') ||
    lowerCategory.includes('investment') ||
    lowerCategory.includes('insurance')
  ) {
    return {
      icon: CreditCardIcon,
      bgColor: 'bg-emerald-100',
      textColor: 'text-emerald-600',
    };
  }

  // Services
  if (
    lowerCategory.includes('service') ||
    lowerCategory.includes('repair') ||
    lowerCategory.includes('maintenance') ||
    lowerCategory.includes('cleaning') ||
    lowerCategory.includes('plumbing')
  ) {
    return {
      icon: WrenchScrewdriverIcon,
      bgColor: 'bg-amber-100',
      textColor: 'text-amber-600',
    };
  }

  // Default fallback
  return {
    icon: ReceiptRefundIcon,
    bgColor: 'bg-primary-100',
    textColor: 'text-primary-600',
  };
};

/**
 * Get category color scheme for consistent styling across components
 * @param categoryName - The name of the category
 * @returns Object containing background and text color classes
 */
export const getCategoryColors = (
  categoryName: string
): { bgColor: string; textColor: string } => {
  const { bgColor, textColor } = getCategoryIcon(categoryName);
  return { bgColor, textColor };
};
