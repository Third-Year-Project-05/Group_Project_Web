import React from "react";
import mainBlogImage from '../../assets/mainblog.png';
import subBlogImage1 from '../../assets/subblog1.png';
import subBlogImage2 from '../../assets/subblog2.jpg';

const BlogView = () => {
  return (
    <div className="flex justify-center items-center h-full bg-gray-100">
      <div className="w-5/6 h-screen p-6">
        {/* Main Blog and Sub Blogs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Main Blog Section */}
          <div className="rounded-lg overflow-hidden shadow-lg bg-white">
            <img
              src={mainBlogImage}
              alt="Main Blog"
              className="w-full h-96 object-cover"
            />
            <div className="p-6">
              <h2 className="text-2xl font-bold">Top Deaf Awareness Tips!</h2>
              <p className="mt-2 text-gray-600">
                Hi Guys!<br /><br />
                HAPPY DEAF AWARENESS WEEK!<br /><br />
                We have an exciting video lined up for you all to enjoy!<br /><br />
                Continue reading →
              </p>
            </div>
          </div>

          {/* Sub Blogs Section */}
          <div className="flex flex-col gap-6">
            <div className="h-48 flex-grow rounded-lg overflow-hidden shadow-lg bg-white">
              <img
                src={subBlogImage1}
                alt="Sub Blog 1"
                className="w-full h-48 object-cover"
              />
              <div className="p-3 text-xs">
                <h3 className="text-lg font-semibold">Happy Deaf Awareness Week!</h3>
                <p className="mt-1 text-gray-600">
                  Hi everyone!<br /><br />
                  This week it’s Deaf Awareness Week, running from 4-10th May. We’re celebrating all things D/deaf, hearing loss, and D/deaf culture.
                  Continue reading →
                </p>
              </div>
            </div>

            <div className="h-48 flex-grow rounded-lg overflow-hidden shadow-lg bg-white">
              <img
                src={subBlogImage2}
                alt="Sub Blog 2"
                className="w-full h-48 object-cover"
              />
              <div className="p-3 text-xs">
                <h3 className="text-lg font-semibold">How to learn sign language</h3>
                <p className="mt-1 text-gray-600 leading-relaxed">
                  Hello!
                  Hope you’re all well and not too bored? Looking for a new skill/hobby to learn? Look no further!
                  <strong>‘How to learn sign language’</strong>
                  There’s lots of fun ways to learn this skill, and it’s hugely beneficial!
                  Continue reading →<br /><br />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogView;