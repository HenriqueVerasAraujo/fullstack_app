import React, { useEffect} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';

export default function PostPage() {
    let { id } = useParams();

    useEffect(() => {
        
    },[])
  return (
    <div>{id}</div>
  )
}
