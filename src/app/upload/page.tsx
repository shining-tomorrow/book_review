import { list } from '@vercel/blob';
import Upload from '@/app/ui/upload/upload';
import Image from 'next/image';

export default async function UploadPage() {
  const response = await list();

  const containerStyle = {
    minHeight: '100vh',
  };

  /**
   * image height: auto 주기
   * https://github.com/vercel/next.js/discussions/32596
   */
  return (
    <div style={containerStyle}>
      <Upload />
      {response.blobs.map((blob, index) => {
        return (
          <div key={blob.pathname + index} style={{ width: '500px' }}>
            <div>{blob.pathname}</div>
            <Image
              src={blob.url}
              alt={blob.pathname}
              width={0}
              height={0}
              sizes="500px"
              style={{
                width: '100%',
                height: 'auto',
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
