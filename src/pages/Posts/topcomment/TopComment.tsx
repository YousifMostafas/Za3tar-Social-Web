import { Avatar, Card } from '@heroui/react'
import type { TopComment } from '../posts.interface'

export default function TopComment({comment}:{comment: TopComment}) {
    const{image , content , commentCreator:{name , photo},createdAt}=comment
  return ( 
  <Card className=" w-full lg:w-3xl bg-orange-50 mt-2">
  
        <Card.Header>
          <Card.Title className="flex items-center pb-3 border-b border-orange-200 gap-3">
    <Avatar>
      <Avatar.Image alt={name} src={photo} />
    </Avatar>
  
    <div className="flex flex-col ">
      <span>{name}</span>
      <span>{new Date(createdAt).toLocaleDateString("en-ca").replaceAll("/", "-")}</span>
    </div>
  </Card.Title>
          <div>
            {content && <p className="pb-4 text-sm">{content}</p>}
            <img className="w-full" src={image} alt="" />
          </div>
        </Card.Header>
        <Card.Footer>

        </Card.Footer>
      </Card> )
}
