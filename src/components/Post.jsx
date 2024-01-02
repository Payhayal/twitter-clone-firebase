/* eslint-disable react/prop-types */
import { BsThreeDots } from "react-icons/bs";
import { BiMessageRounded } from "react-icons/bi";
import { FaRetweet } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import { AiOutlineHeart } from "react-icons/ai";
import { FiShare2 } from "react-icons/fi";

import { auth, db } from "../firebase/config";
import moment from "moment/moment";
import { arrayRemove, arrayUnion, deleteDoc, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
// import "moment/locale/tr" farkli dile cevirmek icin

// eslint-disable-next-line react/prop-types
const Post = ({ tweet }) => {
  const [isLiked, setIsLiked] = useState(false);
  // firebasedeki timestamp degerini tarihe cevirdim
  const date = tweet.createdAt?.toDate();
  //   moment kutuphanesiyle tweet atilma tarihinden itibaren gecen zaman ayarlandi
  const time_ago = moment(date).fromNow();

  useEffect(() => {
 const found = tweet.likes.find((userId) => userId === auth.currentUser.uid);
 setIsLiked(found);
  }, [tweet]);

  // tweet`i siler
  const handleDelete = () => {
 const answer = confirm("Do you want to delete the tweet?");
  if(answer) {
    // silmek istedigimiz doc`un referansini alma
    const ref = doc(db,"tweets", tweet.id);
    // doc`u silme
    deleteDoc(ref)
    .then(() => toast.error("Your tweet was deleted.. "))
    .catch(() => toast.error("Sorry!An error has occurred.. "));
  }
  }
  // tweet` like`lar
  const handleLike = async()=> {
    const ref = doc(db, "tweets" , tweet.id);
    // document`ta guncelleme
    await updateDoc(ref, {
      // like varsa diziden kullaniciyi kaldirir
      // like yoksa diziye kullaniciyi ekler
      likes: isLiked
      ? arrayRemove(auth.currentUser.uid)
      : arrayUnion(auth.currentUser.uid),
      timestamp: serverTimestamp(),
    })
    // const updateTimestamp = await updateDoc(ref, {timestamp: serverTimestamp()})
  }
  
  return (
    <div className="flex gap-3 p-3 border-b-[0.5px] border-gray-800">
      <img 
      className="w-14 h-14 rounded-full" 
      src={tweet.user?.photo} />

      <div className="w-full">
        {/* user info*/}
        <div className="flex justify-between">
          <div className="flex items-center gap-3">
            <p className="font-bold">{tweet.user.name}</p>
            <p className="text-gray-400">@{tweet.user.name.toLowerCase()}</p>
            <p className="text-gray-400">{time_ago}</p>
          </div>
          {/* tweet`i oturumu acik olan kullanici attiysa "..." iconunu goster,digerlerinde gosterme  */}
          {tweet.user?.id === auth.currentUser?.uid && 
          (<BsThreeDots onClick={handleDelete} />)}
        </div>
        {/* tweets */}
        <div className="my-3">
          <p>{tweet.textContent}</p>
          {tweet.imageContent && <img className="rounded-lg mt-3" src={tweet.imageContent} />}
        </div>
        {/* buttons */}
        <div className="flex items-center justify-between">
          <div className="p-2 rounded-full cursor-pointer transition hover:bg-gray-700">
            <BiMessageRounded className="text-lg" />
          </div>

          <div className="p-2 rounded-full cursor-pointer transition hover:bg-gray-700">
            <FaRetweet className="text-lg" />
          </div>

          <div onClick={handleLike} className="flex items-center gap-1 p-2 rounded-full cursor-pointer transition hover:bg-gray-700">
            {isLiked ? (<FcLike className="text-lg" />) : (<AiOutlineHeart className="text-lg" />)}
            <span>{tweet.likes.length}</span>
          </div>

          <div className="p-2 rounded-full cursor-pointer transition hover:bg-gray-700">
            <FiShare2 className="text-lg" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
