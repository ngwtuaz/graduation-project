import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Slider from "react-slick";
import SliderPanes from "@/components/slider";
import ListBody from "@/components/list-body";
import CardList from "@/components/card-list";
import CardBook from "@/components/card-book";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import { db } from "../feature/firebase/firebase";
import { useRouter } from "next/router";
import Modal from "@/components/modal";
import Delivery from "@/components/delivery";

export default function Home() {
  const router = useRouter();
  const [listBook, setListBook] = useState(null);
  const [books, setBooks] = useState(null);
  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const { paymentStatus } = router.query;

    if (paymentStatus === "success") {
      setPaymentStatus("success");
      setShowModal(true);
    } else if (paymentStatus === "failure") {
      setPaymentStatus("failure");
      setShowModal(true);
    }

    if (paymentStatus) {
      router.replace("/", undefined, { shallow: true });
    }
  }, [router.query]);

  // Slider ref
  const sliderRef = useRef(null);

  // Fetch favorite books
  async function fetchData() {
    const res = await axios.get("/api/categories");
    const data = await res.data;
    setListBook(data);
    setLoading(true);
  }

  // Fetch books with visible = true
  async function fetchBook() {
    const booksRef = collection(db, "products");
    const q = query(
      booksRef,
      where("visible", "==", true),
      orderBy("timestamp", "desc")
    );
    const querySnapshot = await getDocs(q);
    const booksData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setBooks(booksData);
  }

  useEffect(() => {
    fetchData();
    fetchBook();
  }, []);

  const sliderProducts = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: null,
    prevArrow: null,
  };

  return (
    <div className="min-h-screen">
      <SliderPanes />
      <div className="container m-auto mt-4 p-10">
        <h2 className="font-bold text-3xl flex items-center tracking-[2px] oswald line-space my-8">
          <div className="h-[77px] icon-avatar"> </div>{" "}
          <span className="relative pl-2 bg-white"> SÁCH MỚI CẬP NHẬT </span>{" "}
        </h2>{" "}
        {/* Sản phẩm mới nhất trong slider */}{" "}
        <div className="relative p-10">
          <Slider ref={sliderRef} {...sliderProducts}>
            {" "}
            {books &&
              books
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .slice(0, 8)
                .map((item, index) => (
                  <div key={index}>
                    <CardBook {...item} />{" "}
                  </div>
                ))}{" "}
          </Slider>{" "}
          <button
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-500 text-white p-2 rounded-full"
            onClick={() => sliderRef.current.slickPrev()}
          >
            <FaChevronLeft size={30} />{" "}
          </button>{" "}
          <button
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-500 text-white p-2 rounded-full"
            onClick={() => sliderRef.current.slickNext()}
          >
            <FaChevronRight size={30} />{" "}
          </button>{" "}
        </div>{" "}
        <h2 className="font-bold text-3xl tracking-[2px] oswald line-space mb-8">
          <span className="relative bg-white"> DANH MỤC SẢN PHẨM </span>{" "}
        </h2>{" "}
        <ListBody>
          {" "}
          {loading &&
            listBook.map((item, index) => (
              <CardList key={index} {...item} />
            ))}{" "}
        </ListBody>{" "}
        <h2 className="font-bold text-3xl flex items-center tracking-[2px] oswald line-space my-8">
          <div className="h-[77px] icon-avatar"> </div>{" "}
          <span className="relative pl-2 bg-white">
            CÓ THỂ BẠN SẼ THÍCH SẢN PHẨM NÀY{" "}
          </span>{" "}
        </h2>{" "}
        <div className="relative p-10">
          <Slider ref={sliderRef} {...sliderProducts}>
            {books &&
              books
                .filter(
                  (item) =>
                    Array.isArray(item.categories) &&
                    item.categories.includes("Khoa học Viễn tưởng")
                )
                .map((item, index) => (
                  <div key={index}>
                    <CardBook {...item} />{" "}
                  </div>
                ))}{" "}
          </Slider>{" "}
          <button
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-500 text-white p-2 rounded-full"
            onClick={() => sliderRef.current.slickPrev()}
          >
            <FaChevronLeft size={30} />{" "}
          </button>{" "}
          <button
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-500 text-white p-2 rounded-full"
            onClick={() => sliderRef.current.slickNext()}
          >
            <FaChevronRight size={30} />{" "}
          </button>{" "}
        </div>

      </div>{" "}
      {showModal && (
        <Modal show={showModal}>
          <Delivery />
        </Modal>
      )}{" "}
    </div>
  );
}