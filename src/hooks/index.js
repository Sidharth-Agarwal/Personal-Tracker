/**
 * Custom Hooks Barrel Export
 */

// Context hooks (already exported from contexts)
export { useAuth } from '../contexts/AuthContext';
export { useUserProfile } from '../contexts/UserProfileContext';
export { useNotification } from '../contexts/NotificationContext';
export { useTheme } from '../contexts/ThemeContext';

// Custom hooks
export { useCalorieCalculation } from './useCalorieCalculation';
export { useChartData } from './useChartData';
export { useLocalStorage } from './useLocalStorage';
export { useWorkouts } from './useWorkouts';
export { useDebounce } from './useDebounce';
export { 
  useMediaQuery, 
  useIsMobile, 
  useIsTablet, 
  useIsDesktop,
  useIsSmallScreen,
  useIsLargeScreen 
} from './useMediaQuery';
export { useClickOutside } from './useClickOutside';
export { useForm } from './useForm';
export { useToggle } from './useToggle';