import { Button, ConfigProvider, message } from "antd";

function MessageShowcasePage() {
  const [messageApi, contextHolder] = message.useMessage();

  const showSuccessMessage = () => {
    void messageApi.success("Success message");
  };

  const showErrorMessage = () => {
    void messageApi.error({
      content: "Error message",
      duration: 10,
    });
  };

  const showWarningMessage = () => {
    void messageApi.warning({
      content: "Warning message",
      duration: 10,
    });
  };

  const showLoadingMessage = () => {
    void messageApi.loading({
      content: "Loading message",
      duration: 0,
      icon: <span className="ant-message-loading-icon">⌛</span>,
    });
  };

  const showInfoMessage = () => {
    void messageApi.info({
      content: "Info message",
      duration: 10,
    });
  };

  const showCustomDurationMessage = () => {
    void messageApi.success({
      content: "Custom duration message",
      duration: 5,
    });
  };

  const showCustomContentMessage = () => {
    void messageApi.success({
      content: (
        <div>
          <div>Custom content</div>
          <div>Additional information</div>
        </div>
      ),
      duration: 10,
    });
  };

  const showTopMessage = () => {
    void messageApi.success({
      content: "Top message",
      duration: 10,
      className: "ant-message-top",
    });
  };

  const showBottomMessage = () => {
    void messageApi.success({
      content: "Bottom message",
      duration: 10,
      className: "ant-message-bottom",
    });
  };

  const showMessageWithIcon = () => {
    void messageApi.success({
      content: "Message with icon",
      icon: <span>🔔</span>,
      duration: 10,
    });
  };

  const showHTMLMessage = () => {
    void messageApi.success({
      content: (
        <div>
          <strong>HTML content</strong>
          <br />
          <a href="https://example.com">Click here</a>
        </div>
      ),
      duration: 10,
    });
  };

  return (
    <ConfigProvider>
      <div className="app-container">
        {contextHolder}
        <div className="button-group">
          <Button
            type="primary"
            className="ant-btn-success"
            onClick={showSuccessMessage}
          >
            Success Message
          </Button>

          <Button danger className="ant-btn-error" onClick={showErrorMessage}>
            Error Message
          </Button>

          <Button
            type="primary"
            className="ant-btn-warning"
            onClick={showWarningMessage}
          >
            Warning Message
          </Button>

          <Button
            type="primary"
            className="ant-btn-loading"
            onClick={showLoadingMessage}
          >
            Loading Message
          </Button>

          <Button
            type="primary"
            className="ant-btn-info"
            onClick={showInfoMessage}
          >
            Info Message
          </Button>

          <Button
            type="primary"
            className="ant-btn-custom-duration"
            onClick={showCustomDurationMessage}
          >
            Custom Duration
          </Button>

          <Button
            type="primary"
            className="ant-btn-custom-content"
            onClick={showCustomContentMessage}
          >
            Custom Content
          </Button>

          <Button
            type="primary"
            className="ant-btn-top"
            onClick={showTopMessage}
          >
            Top Message
          </Button>

          <Button
            type="primary"
            className="ant-btn-bottom"
            onClick={showBottomMessage}
          >
            Bottom Message
          </Button>

          <Button
            type="primary"
            className="ant-btn-with-icon"
            onClick={showMessageWithIcon}
          >
            Message with Icon
          </Button>

          <Button
            type="primary"
            className="ant-btn-html"
            onClick={showHTMLMessage}
          >
            HTML Message
          </Button>
        </div>
      </div>
    </ConfigProvider>
  );
}

export default MessageShowcasePage;
