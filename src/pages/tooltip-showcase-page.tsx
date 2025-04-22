import { Tooltip, Input, Button, Flex } from 'antd';

const TooltipShowcasePage = () => {
  return (
    <div
      style={{
        padding: '24px',
        maxWidth: '600px',
        margin: '0 auto',
        color: '#2f2f30',
      }}
    >
      <h1 style={{ color: '#61656b' }}>Tooltip Showcase</h1>
      <div style={{ textAlign: 'left' }}>
        <>
          <h3>Tooltip Placement</h3>
          <Flex justify='space-between'>
            <Tooltip title='Placement left' placement='left'>
              <Button data-testid='tooltipLeft'>Left</Button>
            </Tooltip>

            <Tooltip title='Placement top' placement='top'>
              <Button data-testid='tooltipTop'>Top</Button>
            </Tooltip>

            <Tooltip title='Placement right' placement='right'>
              <Button data-testid='tooltipRight'>Right</Button>
            </Tooltip>

            <Tooltip title='Placement bottom' placement='bottom'>
              <Button data-testid='tooltipBottom'>Bottom</Button>
            </Tooltip>
          </Flex>
        </>

        <>
          <h3>Tooltip Hover</h3>

          <Tooltip title='Please enter your email' placement='topLeft'>
            <Input
              placeholder='Tooltip hover'
              style={{ width: '100%' }}
              data-testid='input-hover'
            />
          </Tooltip>
        </>

        <>
          <h3>Tooltip Trigger Click</h3>
          <Tooltip
            title='Please enter your password'
            placement='bottom'
            trigger='click'
          >
            <Input
              placeholder='Tooltip Click'
              style={{ width: '100%' }}
              data-testid='input-click'
            />
          </Tooltip>
        </>

        <>
          <h3>Tooltip title is empty</h3>
          <Tooltip title={null}>
            <Button data-testid='tooltip-disabled'>
              Button with Empty Tooltip
            </Button>
          </Tooltip>
        </>
      </div>
    </div>
  );
};

export default TooltipShowcasePage;
