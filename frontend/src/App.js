import axios from 'axios';
import { useEffect, useState } from 'react';
import SinglePost from './components/SinglePost';

function App() {
  const [listOfPost, setListOfPosts] = useState([]);
   const fetchData = async() => {
    const data = await axios.get('http://localhost:3001/posts');
    console.log(data);
    setListOfPosts(data.data);
   }

  //  fetchData();
  useEffect(() => {
    fetchData();
  },[])
 
  return (
    <div>
      {listOfPost.map((singlePost, index) => (
        <SinglePost
        title={singlePost.title}
        text={singlePost.postText}
        userName={singlePost.userName}
        index={index}
        />
      ))}
    </div>
  );
} 

export default App;
