import React from "react";
import mainBlogImage from '../../assets/blog.jpg';
import subBlogImage1 from '../../assets/blog.jpg';
import subBlogImage2 from '../../assets/blog.jpg';

const BlogView = () => {
  return (
    <div className="max-w-screen-lg mx-auto p-4">
      {/* Main Square */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-2/3 h-64 bg-gray-300 relative rounded-lg overflow-hidden">
          <img
            src={mainBlogImage}
            alt="Main Blog"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
            <h2 className="text-2xl font-bold">Main Blog Title</h2>
            <p className="mt-2">A short description of the main blog content.</p>
          </div>
        </div>

        {/* Sub Squares */}
        <div className="w-full md:w-1/3 flex flex-col gap-4">
          <div className="h-32 bg-gray-300 relative rounded-lg overflow-hidden">
            <img
              src={subBlogImage1}
              alt="Sub Blog 1"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2">
              <h3 className="text-xl font-semibold">Sub Blog Title 1</h3>
              <p className="text-sm">Short description of the sub blog.</p>
            </div>
          </div>

          <div className="h-32 bg-gray-300 relative rounded-lg overflow-hidden">
            <img
              src={subBlogImage2}
              alt="Sub Blog 2"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2">
              <h3 className="text-xl font-semibold">Sub Blog Title 2</h3>
              <p className="text-sm">Short description of the sub blog.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogView;