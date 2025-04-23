import { Button, Input, Tag } from 'antd';
import { useState } from 'react';
import { CloseOutlined, TwitterOutlined } from '@ant-design/icons';

const initialTags = [
  { id: 1, text: 'Success', color: 'success', closable: true },
  { id: 2, text: 'Error', color: 'error', closable: false },
  { id: 3, text: 'Processing', color: 'processing', closable: true },
  { id: 4, text: 'Warning', color: 'warning', closable: false },
  { id: 5, text: 'Default', color: 'default', closable: false },
  { id: 6, text: 'Link', link: 'google.com', closable: true },
  { id: 7, text: 'Close Icon', closeIcon: <CloseOutlined />, closable: true },
  { id: 8, text: 'Icon Tag', icon: <TwitterOutlined /> },
];

const TagShowcasePage = () => {
  const [tags, setTags] = useState(initialTags);
  const [inputValue, setInputValue] = useState('');

  const handleClose = (id: number) => {
    setTags((prev) => prev.filter((tag) => tag.id !== id));
  };

  const handleAddTag = () => {
    if (!inputValue.trim()) return;
    const newTag = {
      id: Date.now(),
      text: inputValue,
      color: 'default',
      closable: true,
    };
    setTags([...tags, newTag]);
    setInputValue('');
  };

  return (
    <div style={{ padding: 24 }}>
      <h2>Tag Showcase</h2>

      <div data-testid='tag-container'>
        {tags.map((tag) => (
          <Tag
            key={tag.id}
            color={tag.color}
            icon={tag.icon}
            closable={tag.closable}
            onClose={() => handleClose(tag.id)}
            data-testid={`tag-${tag.id}`}
          >
            {tag.link ? (
              <a href={tag.link} target='_blank' rel='noopener noreferrer'>
                Link
              </a>
            ) : (
              tag.text
            )}
          </Tag>
        ))}
      </div>

      <div style={{ marginTop: 16 }}>
        <Input
          placeholder='New tag name'
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          style={{ width: 200, marginRight: 8 }}
          data-testid='tag-input'
        />
        <Button onClick={handleAddTag} data-testid='add-tag-btn'>
          Add Tag
        </Button>
      </div>
    </div>
  );
};

export default TagShowcasePage;
