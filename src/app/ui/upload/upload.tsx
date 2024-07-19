"use client";

import type { PutBlobResult } from "@vercel/blob";
import Image from "next/image";
import { FormEvent, useRef, useState } from "react";

export default function Upload() {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [blob, setBlob] = useState<PutBlobResult | null>(null);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!inputFileRef.current?.files) {
      throw new Error("No file selected");
    }

    const file = inputFileRef.current.files[0];

    const response = await fetch(`/api/upload?filename=${file.name}`, {
      method: "POST",
      body: file,
    });

    const newBlob = (await response.json()) as PutBlobResult;

    setBlob(newBlob);
  };

  return (
    <div>
      <h1>Upload Test</h1>
      <form onSubmit={onSubmit}>
        <input name="file" ref={inputFileRef} type="file" required />
        <button type="submit">Upload</button>
      </form>
      {blob && (
        <div className="w-[500px]">
          Blob url: <a href={blob.url}>{blob.url}</a>
          <Image
            src={blob.url}
            alt={""}
            width={0}
            height={0}
            sizes="500px"
            style={{
              width: "100%",
              height: "auto",
            }}
          />
        </div>
      )}
    </div>
  );
}
