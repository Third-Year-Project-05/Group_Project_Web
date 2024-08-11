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

        console.log(userString);
        
        // Parse the JSON string to an object
        const user = userString ? JSON.parse(userString) : null;

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
    //   formData.append("image", file);
      formData.append("title", data.title);
      formData.append("content", data.content);
      formData.append("status", "approved");
      formData.append("author", "Admin");
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
        <Button variant="outline">Add Blog</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Add Blog Post</DialogTitle>
          <DialogDescription>
            Add your blog post here. Click submit when you are done
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            {/* <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="image" className="text-right">
                Image
              </Label>
              <Input type="file" id="image" name="image" className="col-span-3" onChange={handleFileChange}/>
            </div> */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input id="title" name="title" className="col-span-3" required onChange={handleInputChange} />
            </div>
            <div className="grid grid-cols-4 gap-4">
              <Label htmlFor="content" className="text-right">
                Content
              </Label>
              <Textarea id="content" name="content" className="col-span-3" rows={10} required onChange={handleInputChange}/>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Submit</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default AddBlog