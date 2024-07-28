import React, { useEffect, useState } from 'react';
import { PlusIcon } from '@heroicons/react/outline';
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from '../../../components/ui/card';
import { Input } from '../../../components/ui/input';
import { Button } from '../../../components/ui/button';
import { Textarea } from '../../../components/ui/textarea';
import { Label } from '../../../components/ui/label';

const AddBlog = () => {
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => setShowForm(!showForm);

  useEffect(() => {
    if (showForm) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    // Cleanup function to reset overflow when component unmounts
    return () => {
      document.body.style.overflow = 'auto';

    };
  }, [showForm]);

  return (
    <div>
      <Button
        onClick={toggleForm}
        className="text-white font-bold bg-blue-500 hover:bg-blue-600 border border-transparent rounded-lg p-2 flex items-center justify-center transition duration-150 ease-in-out"
      >
        <PlusIcon className="h-5 w-5 mr-2" />
        <span>Post</span>
      </Button>
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
          <Card className="rounded-lg h-auto w-3/6 p-6 overflow-y-scroll">
            <CardHeader className="text-center">
              <h1 className="text-2xl font-semibold mb-4">Add Blog</h1>
            </CardHeader>
            <CardContent>
              <form>
                <div className="mb-4">
                  <Label htmlFor="image" className="block text-gray-700 dark:text-white text-sm font-bold mb-2">
                    Image:
                  </Label>
                  <Input
                    type="file"
                    id="image"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-white leading-tight focus:outline-none focus:shadow-outline"
                    accept="image/*"
                  />
                </div>
                <div className="mb-4">
                  <Label htmlFor="title" className="block text-gray-700 dark:text-white text-sm font-bold mb-2">
                    Title:
                  </Label>
                  <Input
                    type="text"
                    id="title"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-white leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div className="mb-4">
                  <Label htmlFor="content" className="block text-gray-700 dark:text-white text-sm font-bold mb-2">
                    Content:
                  </Label>
                  <Textarea
                    id="content"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-white leading-tight focus:outline-none focus:shadow-outline"
                    rows="8"
                  ></Textarea>
                </div>
                <CardFooter className="flex items-center justify-between">
                  <Button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Submit
                  </Button>
                  <Button
                    type="button"
                    onClick={toggleForm}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Cancel
                  </Button>
                </CardFooter>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AddBlog;
