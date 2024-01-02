import { toast } from "react-toastify";
import { auth, db, storage } from "../firebase/config";
import { BsCardImage } from "react-icons/bs";
import { collection, addDoc, serverTimestamp, Timestamp } from "firebase/firestore";
import { uploadBytes, getDownloadURL, ref } from "firebase/storage";

const TweetForm = () => {
  // koleksiyonu referans alma
  const tweetsCol = collection(db, "tweets");

  // resmi storage`a yukler ve url`ini dondurur
  const uploadImage = async (image) => {
    // gonderilen dosyayi kontrol etme
    if (!image) {
      return null;
    }

    //  resmin storage`daki yerini ayarlama
    const storageRef = ref(storage, `${new Date().getTime()}${image.name}`);
    // resmi ayarladigimiz konuma yukleme
    const url = await uploadBytes(storageRef, image)
    // yukleme bittiginde url`ini al
      .then((res) => getDownloadURL(res.ref))
      .catch(() => toast.error("Sorry!An error has occurred.."));
    // fonksiyonun cagrildigi yere url gonderme
    return url;
  };

  // formun gonderilmesi
  const handleSubmit = async (e) => {
    e.preventDefault();
    const textContent = e.target[0].value;
    const imageContent = e.target[1].files[0];
    // resmi storage`a yukleyip url`ini alma
    const url = await uploadImage(imageContent);

    if (!textContent) {
      toast.info("Please write something...");
      return;
    }
    //  tweeti koleksiyona ekleme
    await addDoc(tweetsCol, {
      textContent,
      imageContent: url,
      createdAt: serverTimestamp(),
      timestamp: serverTimestamp(),
      user: {
        id: auth.currentUser?.uid,
        name: auth.currentUser?.displayName,
        photo: auth.currentUser?.photoURL,
      },
      likes: [],
    });
    //  inputlari sifirlama
    e.target[0].value = "";
    e.target[1].value = null;
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-3 p-4 border-b-4 border-b-gray-800"
    >
      <img className="rounded-full h-[50px]" src={auth.currentUser?.photoURL} />

      <div className="w-full">
        <input
          placeholder="What`s happening?"
          className="w-full bg-transparent my-2 outline-none placeholder:text-lg"
          type="text"
        />

        <div className="flex h-[45px] items-center justify-between">
          <div className="hover:bg-gray-800 transition p-4 cursor-pointer rounded-full">
            <label htmlFor="picture">
              <BsCardImage />
            </label>
            <input className="hidden" type="file" id="picture" />
          </div>
          <button className="bg-blue-600 px-6 py-2 rounded-full transition hover:bg-blue-500">
            Tweet
          </button>
        </div>
      </div>
    </form>
  );
};

export default TweetForm;
