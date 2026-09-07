import { Avatar, Button, Card, Form, Input } from '@heroui/react'
import type { User } from '../../Login/login.interface';
import { DocumentUpload } from 'iconsax-reactjs';
import { useForm } from 'react-hook-form';
import { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { createPostApi } from './creatpostAPI';

export default function CreatePost({user}:{user:User}) {
const{register, handleSubmit}=useForm(
    {defaultValues:{
        body:""
    }}
)
const upload = useRef<HTMLInputElement>(null)
const [postImage, setPostImage] = useState<File | string>("")

function postData(data:{body:string}){
console.log(data)
console.log(postImage)
const formData=new FormData()
if(postImage || data.body){
if(postImage){
formData.append("image",postImage)
}
if(data.body){
formData.append("body",data.body)

}
}
toast.promise(createPostApi(formData),
{loading:"Post creating..." ,
    success: function(message){
    return <h1 className='text-green-400'>{message}</h1>
    }
}
)
}
    const{name, photo}=user;
return (
    <Card className="w-full max-w-4xl bg-orange-800/20 mx-auto rounded-xl shadow-sm">
      <Card.Header className="p-4 sm:p-6 flex flex-col gap-4">
        
        <Card.Title className="flex items-center pb-3 border-b border-orange-200 gap-3">
        
          <h2 className="text-base sm:text-lg font-semibold text-gray-800">
            Hello {name}, what's on your mind?
          </h2>
        </Card.Title>

        <Form onSubmit={handleSubmit(postData)} className="flex flex-col sm:flex-row gap-3 sm:items-center w-full pt-1">
          <div className="flex items-center gap-2 grow w-full">
                 <Avatar className="w-9 h-9 sm:w-10 sm:h-10 shrink-0">
            <Avatar.Image alt={name ?? "User"} src={photo} />
          </Avatar>
          
           
            <Input {...register("body")}
              className="grow focus:ring-orange-300 text-sm sm:text-base w-full" 
              placeholder="Create your post..." 
            />
           <button 
              type="button" 
              aria-label="Upload document or media"
              className="p-1 hover:bg-orange-100 rounded-lg transition-colors shrink-0"
            >
                
              <DocumentUpload size="28" color="#FF8A65" onClick={_ => upload.current?.click()} />
            </button>
          </div>

      
           
                <Button type='submit' className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-5 py-2 w-full sm:w-auto shrink-0 transition-colors">
            Create Post
          </Button>
          <input className='hidden' type='file' ref={upload} onChange={e => setPostImage(e.target.files![0])}></input>
        </Form>

      </Card.Header>
    </Card>
  );
}
