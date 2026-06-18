// app/components/loader/Loader.js
"use client";
import { Circles } from "react-loader-spinner";

export default function Loader({ visible }) {
  return (
    <div className="d-flex align-items-center justify-content-center p-4">
      <Circles visible={visible} color="#f4a261" height={60} width={60} ariaLabel="circles-loading" />
    </div>
  );
}
