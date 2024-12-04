import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill's styles

import { Input } from '../ui/input';
import { DialogFooter } from '../ui/dialog';
import { Button } from '../ui/button';
import { Label } from '../ui/label';

const Form = (handleSubmit) => {
  const [formData, setFormData] = useState({ title: '', content: '', image: null });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleContentChange = (value) => {
    setFormData({ ...formData, content: value });
  };


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
  };


  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="image" className="text-right">
                Image
            </Label>
            <Input
                type="file"
                id="image"
                name="image"
                className="col-span-3"
                onChange={handleFileChange}
            />
            </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="title" className="text-right">
            Title
          </Label>
          <Input
            id="title"
            name="title"
            className="col-span-3"
            required
            onChange={handleInputChange}
          />
        </div>
        <div className="grid grid-cols-4 gap-4">
          <Label htmlFor="content" className="text-right">
            Content
          </Label>
          <div className="col-span-3">
            <ReactQuill
              id="content"
              value={formData.content}
              onChange={handleContentChange}
              theme="snow"
              style={{ height: '100px', marginBottom: '2rem' }}
            />
          </div>
        </div>
      </div>
      <DialogFooter>
        <Button type="submit" className='my-2'>Submit</Button>
      </DialogFooter>
    </form>
  );
};

export default Form;
