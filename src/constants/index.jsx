import { BiHomeCircle } from 'react-icons/bi';
import {
  AiOutlineBell,
  AiOutlineMail,
  AiOutlineUser,
} from 'react-icons/ai';
import { RiBookmarkLine } from 'react-icons/ri';

export const navSections = [
  {
    title: 'Home',
    icon: <BiHomeCircle />,
  },
  {
    title: 'Notifications',
    icon: <AiOutlineBell />,
  },
  {
    title: 'Messages',
    icon: <AiOutlineMail />,
  },
  {
    title: 'Profile',
    icon: <AiOutlineUser />,
  },
  {
    title: 'Favorites',
    icon: <RiBookmarkLine />,
  },
];