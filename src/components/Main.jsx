import { useEffect, useState } from "react";
import TweetForm from "./TweetForm";
import { collection, doc, onSnapshot, query, orderBy} from "firebase/firestore";
import { db } from "../firebase/config";
import Post from "./Post";

const Main = () => {
  const [tweets, setTweets] = useState(null);
  const tweetsCol = collection(db, "tweets");

  useEffect(() => {
    // abone oldugumuz tweetleri filtreleme/siralama
    const queryOption = query(tweetsCol, orderBy("createdAt" , "desc"));
    // onSnapshot koleksiyondaki degisimi izler
    onSnapshot(queryOption, (snapshot) => {
      // gecici olarak tweetleri tuttugumuz dizi
      const tempTweets = [];
      // dokumanlari donup ihtiyacimiz olan bilgileri diziye aktarma
      snapshot.forEach((doc) => tempTweets.push({ ...doc.data(), id: doc.id }));
      // state`e tweetleri aktarma
      setTweets(tempTweets);
    });
  }, []);

  return (
    <main className="main col-span-3 md:col-span-2 xl:col-span-1 border border-gray-800 overflow-y-auto">
      <header className="font-bold p-4 border-b-2 border-gray-800">
        Twitter
      </header>
      <TweetForm />
      {/* Loading */}
      {!tweets && <p className="text-center mt-[200px]">Loading</p>}

      {/* tweetleri listeleme */}
      {tweets?.map((tweet) => (
        <Post key={tweet.id} tweet={tweet} />
      ))}
    </main>
  );
};

export default Main;
