import { Textarea } from "../../../components/ui/textarea"
import { Button } from "../../../components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog"
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"
import { addBlog } from "../../../api"
import { useEffect, useState } from "react"
import { useToast } from "../../../components/ui/use-toast"
import Form from "../../../components/blog/addBlog-form"

const AddBlog = () => {
    const { toast } = useToast();
    const [open, setOpen] = useState(false);
    const [file, setFile] = useState(null);
    const [data, setData] = useState({ title: "", content: "", email: ""});
  
    const handleFileChange = (e) => {
      setFile(e.target.files[0]);
    };
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    };

    useEffect(() => {
        // Retrieve user data from localStorage
        const userString = localStorage.getItem("user");
        
        // Parse the JSON string to an object
        const user = userString ? JSON.parse(userString) : null;

        console.log(user);

        // Update state with the email value if user object exists
        setData((prevState) => ({
            ...prevState,
            email: user ? user.email : "",
        }));
    }, []);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
    //   if (!file) {
    //     alert("Please select an image file");
    //     return;
    //   }

  
      const formData = new FormData();
      console.log(formData);
    //   formData.append("image", file);
      formData.append("title", data.title);
      formData.append("content", data.content);
      formData.append("status", "pending");
      // formData.append("author", "Admin");
      formData.append("email", data.email);

      addBlog(formData);

      //close the form
        e.target.reset();
        setOpen(false);

        //toast
        toast({
            title: "Blog Added",
            description: "Your blog has been added successfully",
            variant: "success",
        });

        // setInterval(() => {
        //     window.location.reload();
        // }, 3000);

    };


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-5/6 self-center">Add Blog</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Add Blog Post</DialogTitle>
          <DialogDescription>
            Add your blog post here. Click submit when you are done
          </DialogDescription>
        </DialogHeader>
        <Form handleSubmit={handleSubmit} />
      </DialogContent>
    </Dialog>
  )
}

export default AddBlog