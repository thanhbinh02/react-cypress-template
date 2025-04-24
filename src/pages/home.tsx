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
      <Button onClick={() => navigate('/pop-confirm')}>
        Go to Pop Confirm Showcase
      </Button>
      <Button onClick={() => navigate('/spin')}>Go to Spin Showcase</Button>
      <Button onClick={() => navigate('/checkbox')}>
        Go to Checkbox Showcase
      </Button>
      <Button onClick={() => navigate('/date-picker')}>
        Go to Date Picker Showcase
      </Button>
    </div>
  );
};

export default HomePage;
