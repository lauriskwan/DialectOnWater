import Head from "next/head";
import Menu from "@/components/Menu";
import DialectList from "@/components/DialectList";
import SignOutButton from "@/components/SignOutButton";
import ItemDetailPage from "@/components/ItemDetailPage";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/router";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/firebase";
import { useEffect, useState } from "react";

export default function Home() {
  const { currentUser } = useAuth();
  const router = useRouter();

  const originArray = ["西貢", "香港仔", "銅鑼灣"];
  const typeArray = ["出海專用詞", "生活用語", "口音", "片語", "口訣"];

  const [dialects, setDialects] = useState([]);
  const [origin, setOrigin] = useState(originArray);
  const [dialectType, setDialectType] = useState(typeArray);

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "dialect"),
          where("origin", "in", origin),
          where("dialectType", "in", dialectType),
          orderBy("timeStamp", "desc")
        ),
        (snapshot) => {
          setDialects(snapshot.docs);
        }
      ),
    [origin, dialectType]
  );

  return (
    <>
      <Head>
        <title>Dialect on Water</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="overflow-hidden bg-white rounded-md bg-white  w-full h-full lg:h-4/5 lg:w-4/5 shadow-lg flex items-center flex-col place-content-start relative">
        {/*search-bar*/}
        <div className="bg-blue-100 w-full flex flex-col place-content-between p-6">
          {/*top-bar*/}
          <div className="top-bar min-w-full flex place-content-between">
            <div>
              <h1 className="text-4xl font-extrabold	">你好</h1>
              <span className="user-name text-6xl font-extrabold	">Harry</span>
            </div>
            <div className="self-end">
              <svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="18.1452"
                  cy="18.1452"
                  r="15.1452"
                  stroke="#154058"
                  stroke-width="6"
                />
                <path
                  d="M45 45L31.2097 31.2097"
                  stroke="#154058"
                  stroke-width="6"
                  stroke-linecap="round"
                />
              </svg>
            </div>
          </div>
          {/* searching-bar*/}
          <div className="min-w-full flex mt-5 gap-2">
            <div className="search-location">
              <select
                onChange={(e) => {
                  e.target.value == "所有地區"
                    ? setOrigin(originArray)
                    : setOrigin(
                        originArray.filter(
                          (originItem) => originItem == e.target.value
                        )
                      );
                }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="所有地區">所有地區</option>
                <option value="西貢">西貢</option>
                <option value="香港仔">香港仔</option>
                <option value="銅鑼灣">銅鑼灣</option>
              </select>
            </div>
            <div className="search-type">
              <select
                onChange={(e) => {
                  e.target.value == "所有分類"
                    ? setDialectType(typeArray)
                    : setDialectType(
                        typeArray.filter((type) => type == e.target.value)
                      );
                }}
                className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-700 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
              >
                <option value="所有分類">所有分類</option>
                <option value="出海專用詞">出海專用詞</option>
                <option value="生活用語">生活用語</option>
                <option value="口音">口音</option>
                <option value="片語">片語</option>
                <option value="口訣">口訣</option>
              </select>
            </div>
          </div>
        </div>
        <SignOutButton />
        {/* <ItemDetailPage/> */}
        {/*dialect-list*/}
        {dialects.map((dialect) => (
          <DialectList key={dialect.id} id={dialect.id} dialect={dialect} />
        ))}
        {/* menu */}
        <Menu />
      </main>
    </>
  );
}
