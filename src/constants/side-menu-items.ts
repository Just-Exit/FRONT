import type { Href } from 'expo-router';
import type { ImageSourcePropType } from 'react-native';

export type SideMenuItem = {
  key: 'collection' | 'body-analysis' | 'donation' | 'settings' | 'support';
  label: string;
  icon: ImageSourcePropType;
  route?: Href;
};

export const sideMenuItems: SideMenuItem[] = [
  {
    key: 'collection',
    label: '나의 컬렉션',
    icon: require('../../assets/images/sidemenu/bookmark_2.png'),
    route: '/collection',
  },
  {
    key: 'body-analysis',
    label: '체형 분석',
    icon: require('../../assets/images/sidemenu/bodyshape.png'),
  },
  {
    key: 'donation',
    label: '기부 현황',
    icon: require('../../assets/images/sidemenu/donation.png'),
  },
  {
    key: 'settings',
    label: '설정',
    icon: require('../../assets/images/sidemenu/gear.png'),
  },
  {
    key: 'support',
    label: '고객 센터',
    icon: require('../../assets/images/sidemenu/customer.png'),
  },
];
