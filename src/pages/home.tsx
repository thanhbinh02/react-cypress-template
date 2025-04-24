import { Button } from 'antd';
import { Link } from 'react-router-dom';

const items = [
  { path: '/message', text: 'Go to Message Showcase' },
  { path: '/button', text: 'Go to Button Showcase' },
  { path: '/input', text: 'Go to Input Showcase' },
  { path: '/radio', text: 'Go to Radio Showcase' },
  { path: '/select', text: 'Go to Select Showcase' },
  { path: '/switch', text: 'Go to Switch Showcase' },
  { path: '/card', text: 'Go to Card Showcase' },
  { path: '/form', text: 'Go to Form Showcase', isPrimary: true },
  { path: '/tooltip', text: 'Go to Tooltip Showcase' },
  { path: '/tag', text: 'Go to Tag Showcase' },
  { path: '/input-number', text: 'Go to Input Number Showcase' },
  { path: '/pop-confirm', text: 'Go to Pop Confirm Showcase' },
  { path: '/spin', text: 'Go to Spin Showcase' },
  { path: '/checkbox', text: 'Go to Checkbox Showcase' },
  { path: '/date-picker', text: 'Go to Date Picker Showcase' },
  { path: '/table', text: 'Go to Table Showcase' },
];

const HomePage = () => {
  return (
    <div className='app-container flex flex-col gap-2'>
      <h1 className='font-bold'>Welcome</h1>

      {items.map(({ path, text, isPrimary }) => (
        <Link to={path} key={path}>
          <Button key={path + text} type={isPrimary ? 'primary' : 'default'}>
            {text}
          </Button>
        </Link>
      ))}
    </div>
  );
};

export default HomePage;
