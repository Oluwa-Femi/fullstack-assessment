import React from 'react';
import AccessBankIcon from './AccessBankIcon';
import CalendarIcon from './CalendarIcon';
import EntertainmentIcon from './EntertainmentIcon';
import FCMBIcon from './FCMBIcon';
import FoodIcon from './FoodIcon';
import GTBIcon from './GTBIcon';
import HousingIcon from './HousingIcon';
import KudaBankIcon from './KudaBankIcon';
import LinkIcon from './LinkIcon';
import LogoIcon from './LogoIcon';
import PadlockIcon from './PadlockIcon';
import PolarisBankIcon from './PolarisBankIcon';
import ShoppingIcon from './ShoppingIcon';
import StanbicIbtcBankIcon from './StanbicIbtcBankIcon';
import StandardChateredBankIcon from './StandardChateredBankIcon';
import TransportationIcon from './TransportationIcon';
import TripledotIcon from './TripledotIcon';
import UBAIcon from './UBAIcon';
import UserIcon from './UserIcon';
import ZenithBankIcon from './ZenithBankIcon';

export default function Icons({ icon = '', fill = '#000', customClass = '' }) {
  // dynamically determine what icon to display
  const selectedIcon = () => {
    switch (icon) {
      case 'accessbank': 
        return <AccessBankIcon fill={fill} customClass={customClass} />;
      case 'calendar':
        return <CalendarIcon fill={fill} customClass={customClass} />;
      case 'entertainment':
        return <EntertainmentIcon fill={fill} customClass={customClass} />;
      case 'fcmbank': 
        return <FCMBIcon fill={fill} customClass={customClass} />;
      case 'foodanddrinks':
        return <FoodIcon fill={fill} customClass={customClass} />;
      case 'gtbank': 
        return <GTBIcon fill={fill} customClass={customClass} />;
      case 'housing':
        return <HousingIcon fill={fill} customClass={customClass} />;
      case 'kudabank': 
        return <KudaBankIcon fill={fill} customClass={customClass} />;
      case 'link':
        return <LinkIcon fill={fill} customClass={customClass} />;
      case 'logo': 
        return <LogoIcon fill={fill} customClass={customClass} />;
      case 'padlock':
        return <PadlockIcon fill={fill} customClass={customClass} />;
      case 'polarisbank':
        return <PolarisBankIcon fill={fill} customClass={customClass} />;
      case 'shopping': 
        return <ShoppingIcon fill={fill} customClass={customClass} />;
      case 'stanbicibtcbank':
        return <StanbicIbtcBankIcon fill={fill} customClass={customClass} />;
      case 'standardchateredbank':
        return <StandardChateredBankIcon fill={fill} customClass={customClass} />;
      case 'transportation':
        return <TransportationIcon fill={fill} customClass={customClass} />;
      case 'triple-dot':
        return <TripledotIcon fill={fill} customClass={customClass} />;
      case 'unitedbankofafrica': 
        return <UBAIcon fill={fill} customClass={customClass} />;
      case 'user':
        return <UserIcon fill={fill} customClass={customClass} />;
      case 'zenithbank':
        return <ZenithBankIcon fill={fill} customClass={customClass} />;
      default:
        return <LogoIcon fill={fill} customClass={customClass} />;
    }
  };
  
  return selectedIcon();
}
