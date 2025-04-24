import { Button, Space } from "antd";
import {
  DownloadOutlined,
  SearchOutlined,
  PlusOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import BackToHome from "@/components/back-to-home";

const ButtonShowcasePage = () => {
  return (
    <div className="button-showcase">
      <BackToHome />

      <Space direction="vertical" size="large">
        {/* Button Types */}

        <Space>
          <Button type="primary">Primary Button</Button>
          <Button>Default Button</Button>
          <Button type="dashed">Dashed Button</Button>
          <Button type="text">Text Button</Button>
          <Button type="link">Link Button</Button>
        </Space>

        {/* Button States */}
        <Space>
          <Button type="primary" disabled>
            Disabled Button
          </Button>
          <Button type="primary" loading>
            Loading Button
          </Button>
          <Button type="primary" ghost>
            Ghost Button
          </Button>
        </Space>

        {/* Button Sizes */}
        <Space>
          <Button type="primary" size="large">
            Large Button
          </Button>
          <Button type="primary">Medium Button</Button>
          <Button type="primary" size="small">
            Small Button
          </Button>
        </Space>

        {/* Button with Icons */}
        <Space>
          <Button type="primary" icon={<DownloadOutlined />}>
            Download
          </Button>
          <Button icon={<SearchOutlined />}>Search</Button>
          <Button type="primary" shape="circle" icon={<PlusOutlined />} />
          <Button type="primary" icon={<LoadingOutlined />}>
            Loading
          </Button>
        </Space>

        {/* Button Groups */}
        <Space>
          <Button.Group>
            <Button>Cancel</Button>
            <Button type="primary">OK</Button>
          </Button.Group>
        </Space>
      </Space>
    </div>
  );
};

export default ButtonShowcasePage;
